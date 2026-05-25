# BlinkBuddy Firmware

This folder contains firmware for the BlinkBuddy board.

Recommended path: use `micropython/` first. It is easier to edit, upload, and tune after the board arrives.

The older `src/main.cpp` + `platformio.ini` firmware is kept as an Arduino/PlatformIO alternative.

It makes the board behave like an interactive OLED buddy:

- Shows animated eyes on the OLED.
- Moves the eyes left/right using the two light sensors.
- Blinks/reacts when the board is moved or shaken.
- Uses the three buttons as `LEFT`, `OK`, and `RIGHT`.
- Beeps on button press and startup.
- Blinks the status LED.
- Prints live debug data over USB serial.

## Hardware Pin Map

| Function | ESP32-C3 Pin |
| --- | --- |
| OLED / I2C SDA | `GPIO4` |
| OLED / I2C SCL | `GPIO5` |
| LIS3DHTR / I2C SDA | `GPIO4` |
| LIS3DHTR / I2C SCL | `GPIO5` |
| Left light sensor | `GPIO0` |
| Right light sensor | `GPIO1` |
| Left button | `GPIO6` |
| OK button | `GPIO7` |
| Right button | `GPIO8` boot strapping pin |
| Status LED | `GPIO3` |
| Buzzer | `GPIO10` |

## Boot / Reset Note

Do not hold the RIGHT button while plugging in USB-C, pressing reset, or starting a firmware upload. RIGHT is wired to ESP32-C3 `GPIO8`, which is also a boot strapping pin, and holding it low during reset can affect boot mode.

## Install Option A: MicroPython Recommended

Open:

```txt
programming/micropython/README.md
```

That version includes `boot.py`, `main.py`, and the OLED driver. It can be uploaded with `mpremote` after flashing ESP32-C3 MicroPython.

## Install Option B: PlatformIO / Arduino C++

1. Install VS Code.
2. Install the PlatformIO extension.
3. Open this `programming` folder in VS Code.
4. Connect the board with USB-C.
5. Click PlatformIO `Upload`.

Or from terminal:

```bash
cd programming
pio run -t upload
pio device monitor
```

The board has CH340C USB serial and an auto-program circuit, so upload should work directly over USB-C.

## Install Option C: Arduino IDE

1. Install Arduino IDE.
2. Add the ESP32 board package.
3. Select an ESP32-C3 board profile such as `ESP32C3 Dev Module`.
4. Install libraries:
   - `U8g2`
   - `Adafruit LIS3DH`
   - `Adafruit Unified Sensor`
5. Open `src/main.cpp` as an Arduino sketch or copy it into a `.ino` file.
6. Select the CH340 serial port.
7. Upload.

## OLED Driver Note

The firmware uses a `128x64 SSD1309` U8g2 constructor because the selected large OLED module is a 4-pin I2C OLED class part. If the screen stays blank but serial logs work, try the alternate `SSD1306` constructor shown in `src/main.cpp`.

## Expected Behavior

On power-up:

1. OLED shows a startup screen.
2. Buzzer beeps once.
3. The main eye screen appears.

Main screen:

- More light on the left sensor makes the eyes look left.
- More light on the right sensor makes the eyes look right.
- Similar light keeps the eyes centered.
- Low light makes the eyes look sleepy.
- Shake or tilt causes a blink/react animation.

Buttons:

- `LEFT`: previous screen.
- `OK`: select / blink / beep.
- `RIGHT`: next screen.

Screens:

- Eyes screen.
- Sensor values screen.
- About/status screen.

## First Bring-Up Checklist

After the assembled board arrives:

1. Plug in USB-C and confirm the board appears as a CH340 serial port.
2. Keep RIGHT released, then upload firmware.
3. Open serial monitor at `115200`.
4. Confirm OLED startup screen appears.
5. Cover the left and right LDRs separately and confirm the eyes move.
6. Press all three buttons and confirm screen changes/beeps.
7. Shake/tilt the board and confirm motion status changes.
