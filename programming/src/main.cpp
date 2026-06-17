#include <Arduino.h>
#include <U8g2lib.h>
#include <Wire.h>
#include <Adafruit_LIS3DH.h>
#include <Adafruit_Sensor.h>
#include <cmath>

namespace Pins {
constexpr uint8_t LdrLeft = 0;
constexpr uint8_t LdrRight = 1;
constexpr uint8_t Led = 3;
constexpr uint8_t I2cSda = 4;
constexpr uint8_t I2cScl = 5;
constexpr uint8_t ButtonLeft = 6;
constexpr uint8_t ButtonOk = 7;
constexpr uint8_t ButtonRight = 8;
constexpr uint8_t Buzzer = 10;
} // namespace Pins

constexpr uint8_t Lis3dhAddress = 0x19;
constexpr uint32_t SerialBaud = 115200;
constexpr uint16_t DebounceMs = 35;
constexpr uint16_t UiFrameMs = 80;
constexpr uint16_t SensorFrameMs = 120;
constexpr uint16_t BlinkDurationMs = 170;
constexpr uint16_t IdleBlinkBaseMs = 3000;
constexpr uint16_t IdleBlinkSpreadMs = 3000;

// Large 4-pin I2C OLED. If the screen is blank, try the SSD1306 constructor below.
U8G2_SSD1309_128X64_NONAME0_F_HW_I2C display(U8G2_R0, U8X8_PIN_NONE);
// U8G2_SSD1306_128X64_NONAME_F_HW_I2C display(U8G2_R0, U8X8_PIN_NONE);

Adafruit_LIS3DH lis = Adafruit_LIS3DH();

enum class Screen : uint8_t {
  Eyes = 0,
  Sensors = 1,
  About = 2,
};

struct Button {
  uint8_t pin;
  bool stablePressed = false;
  bool lastRawPressed = false;
  uint32_t lastChangeMs = 0;

  bool update() {
    const bool rawPressed = digitalRead(pin) == LOW;
    const uint32_t now = millis();

    if (rawPressed != lastRawPressed) {
      lastRawPressed = rawPressed;
      lastChangeMs = now;
    }

    if ((now - lastChangeMs) > DebounceMs && rawPressed != stablePressed) {
      stablePressed = rawPressed;
      return stablePressed;
    }

    return false;
  }
};

Button btnLeft{Pins::ButtonLeft};
Button btnOk{Pins::ButtonOk};
Button btnRight{Pins::ButtonRight};

Screen screen = Screen::Eyes;
bool lisReady = false;
int ldrLeftRaw = 0;
int ldrRightRaw = 0;
float accelX = 0;
float accelY = 0;
float accelZ = 0;
float movement = 0;
uint32_t lastUiMs = 0;
uint32_t lastSensorMs = 0;
uint32_t blinkUntilMs = 0;
uint32_t nextIdleBlinkMs = 0;
uint32_t lastSerialMs = 0;

int eyeOffset = 0;
int targetEyeOffset = 0;
bool sleepy = false;

void beep(uint16_t frequency = 1800, uint16_t durationMs = 35) {
  tone(Pins::Buzzer, frequency, durationMs);
}

void nextScreen() {
  screen = static_cast<Screen>((static_cast<uint8_t>(screen) + 1) % 3);
  beep(1600, 30);
}

void previousScreen() {
  const uint8_t current = static_cast<uint8_t>(screen);
  screen = static_cast<Screen>(current == 0 ? 2 : current - 1);
  beep(1300, 30);
}

void scheduleIdleBlink(uint32_t now) {
  const uint32_t variation =
      (static_cast<uint32_t>(ldrLeftRaw + ldrRightRaw) + (now / 37)) %
      IdleBlinkSpreadMs;
  nextIdleBlinkMs = now + IdleBlinkBaseMs + variation;
}

void triggerBlink(uint32_t now, uint16_t durationMs = BlinkDurationMs) {
  blinkUntilMs = now + durationMs;
  scheduleIdleBlink(now);
}

int smoothAnalogRead(uint8_t pin) {
  uint32_t total = 0;
  for (int i = 0; i < 8; i++) {
    total += analogRead(pin);
    delayMicroseconds(250);
  }
  return static_cast<int>(total / 8);
}

void readSensors() {
  ldrLeftRaw = smoothAnalogRead(Pins::LdrLeft);
  ldrRightRaw = smoothAnalogRead(Pins::LdrRight);

  const int diff = ldrRightRaw - ldrLeftRaw;
  targetEyeOffset = constrain(map(diff, -1800, 1800, -12, 12), -12, 12);

  const int averageLight = (ldrLeftRaw + ldrRightRaw) / 2;
  sleepy = averageLight < 650;

  if (lisReady) {
    sensors_event_t event;
    lis.getEvent(&event);
    const float dx = event.acceleration.x - accelX;
    const float dy = event.acceleration.y - accelY;
    const float dz = event.acceleration.z - accelZ;
    movement = fabsf(dx) + fabsf(dy) + fabsf(dz);
    accelX = event.acceleration.x;
    accelY = event.acceleration.y;
    accelZ = event.acceleration.z;

    if (movement > 8.0f) {
      triggerBlink(millis());
    }
  }
}

void drawCenteredText(const char *text, int y, const uint8_t *font) {
  display.setFont(font);
  const int width = display.getStrWidth(text);
  display.drawStr((128 - width) / 2, y, text);
}

void drawEye(int cx, int cy, int pupilOffset, bool closed) {
  if (closed) {
    display.drawRBox(cx - 22, cy - 3, 44, 6, 3);
    return;
  }

  display.drawRFrame(cx - 24, cy - 16, 48, sleepy ? 20 : 32, 10);
  display.drawDisc(cx + pupilOffset, cy, sleepy ? 4 : 7);
}

void drawEyesScreen() {
  const bool blink = millis() < blinkUntilMs;
  eyeOffset += (targetEyeOffset - eyeOffset) / 3;

  display.clearBuffer();
  drawEye(36, 30, eyeOffset, blink);
  drawEye(92, 30, eyeOffset, blink);

  display.setFont(u8g2_font_5x8_tf);
  display.drawStr(2, 62, "L");
  display.setCursor(10, 62);
  display.print(map(ldrLeftRaw, 0, 4095, 0, 100));
  display.print("%");

  display.drawStr(96, 62, "R");
  display.setCursor(104, 62);
  display.print(map(ldrRightRaw, 0, 4095, 0, 100));
  display.print("%");

  if (sleepy) {
    drawCenteredText("sleepy", 58, u8g2_font_5x8_tf);
  } else if (movement > 4.0f) {
    drawCenteredText("motion", 58, u8g2_font_5x8_tf);
  }

  display.sendBuffer();
}

void drawSensorsScreen() {
  display.clearBuffer();
  display.setFont(u8g2_font_6x10_tf);
  display.drawStr(0, 10, "Sensors");

  display.setCursor(0, 24);
  display.print("Light L: ");
  display.print(map(ldrLeftRaw, 0, 4095, 0, 100));
  display.print("%");

  display.setCursor(0, 36);
  display.print("Light R: ");
  display.print(map(ldrRightRaw, 0, 4095, 0, 100));
  display.print("%");

  display.setCursor(0, 48);
  display.print("Motion: ");
  display.print(lisReady ? movement : -1, 1);

  display.setCursor(0, 60);
  display.print(lisReady ? "LIS3DH OK" : "LIS3DH missing");

  display.sendBuffer();
}

void drawAboutScreen() {
  display.clearBuffer();
  drawCenteredText("BlinkBuddy", 14, u8g2_font_7x14B_tf);
  drawCenteredText("LEFT  OK  RIGHT", 32, u8g2_font_6x10_tf);
  drawCenteredText("eyes follow light", 46, u8g2_font_6x10_tf);
  drawCenteredText("USB-C programming", 60, u8g2_font_5x8_tf);
  display.sendBuffer();
}

void drawCurrentScreen() {
  switch (screen) {
  case Screen::Eyes:
    drawEyesScreen();
    break;
  case Screen::Sensors:
    drawSensorsScreen();
    break;
  case Screen::About:
    drawAboutScreen();
    break;
  }
}

void printDebug() {
  Serial.print("ldr_left=");
  Serial.print(ldrLeftRaw);
  Serial.print(" ldr_right=");
  Serial.print(ldrRightRaw);
  Serial.print(" eye=");
  Serial.print(targetEyeOffset);
  Serial.print(" movement=");
  Serial.print(movement, 2);
  Serial.print(" lis=");
  Serial.println(lisReady ? "ok" : "missing");
}

void setup() {
  pinMode(Pins::Led, OUTPUT);
  pinMode(Pins::Buzzer, OUTPUT);
  pinMode(Pins::ButtonLeft, INPUT_PULLUP);
  pinMode(Pins::ButtonOk, INPUT_PULLUP);
  pinMode(Pins::ButtonRight, INPUT_PULLUP);

  analogReadResolution(12);
  analogSetPinAttenuation(Pins::LdrLeft, ADC_11db);
  analogSetPinAttenuation(Pins::LdrRight, ADC_11db);

  Serial.begin(SerialBaud);
  delay(150);

  Wire.begin(Pins::I2cSda, Pins::I2cScl);
  Wire.setClock(400000);

  display.setI2CAddress(0x3C << 1);
  display.begin();
  display.clearBuffer();
  drawCenteredText("BlinkBuddy", 26, u8g2_font_7x14B_tf);
  drawCenteredText("starting...", 44, u8g2_font_6x10_tf);
  display.sendBuffer();

  lisReady = lis.begin(Lis3dhAddress);
  if (lisReady) {
    lis.setRange(LIS3DH_RANGE_4_G);
    lis.setDataRate(LIS3DH_DATARATE_50_HZ);
  }

  beep(1800, 60);
  digitalWrite(Pins::Led, HIGH);
  delay(250);
  digitalWrite(Pins::Led, LOW);

  Serial.println("BlinkBuddy firmware started");
  Serial.println(lisReady ? "LIS3DH detected at 0x19" : "LIS3DH not detected");
  scheduleIdleBlink(millis());
}

void loop() {
  const uint32_t now = millis();

  if (btnLeft.update()) {
    previousScreen();
  }
  if (btnOk.update()) {
    triggerBlink(now);
    beep(2200, 35);
  }
  if (btnRight.update()) {
    nextScreen();
  }

  if (static_cast<int32_t>(now - nextIdleBlinkMs) >= 0) {
    triggerBlink(now);
  }

  if (now - lastSensorMs >= SensorFrameMs) {
    lastSensorMs = now;
    readSensors();
    digitalWrite(Pins::Led, (now / 500) % 2);
  }

  if (now - lastUiMs >= UiFrameMs) {
    lastUiMs = now;
    drawCurrentScreen();
  }

  if (now - lastSerialMs >= 1000) {
    lastSerialMs = now;
    printDebug();
  }
}
