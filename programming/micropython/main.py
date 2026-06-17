from machine import ADC, I2C, PWM, Pin, freq
from micropython import const
from time import sleep_ms, ticks_diff, ticks_ms
import framebuf

try:
    freq(160_000_000)
except Exception as exc:
    print("CPU frequency setup skipped:", exc)


SET_CONTRAST = const(0x81)
SET_ENTIRE_ON = const(0xA4)
SET_NORM_INV = const(0xA6)
SET_DISP = const(0xAE)
SET_MEM_ADDR = const(0x20)
SET_COL_ADDR = const(0x21)
SET_PAGE_ADDR = const(0x22)
SET_DISP_START_LINE = const(0x40)
SET_SEG_REMAP = const(0xA0)
SET_MUX_RATIO = const(0xA8)
SET_COM_OUT_DIR = const(0xC0)
SET_DISP_OFFSET = const(0xD3)
SET_COM_PIN_CFG = const(0xDA)
SET_DISP_CLK_DIV = const(0xD5)
SET_PRECHARGE = const(0xD9)
SET_VCOM_DESEL = const(0xDB)
SET_CHARGE_PUMP = const(0x8D)


class SSD1306(framebuf.FrameBuffer):
    def __init__(self, width, height, external_vcc=False):
        self.width = width
        self.height = height
        self.external_vcc = external_vcc
        self.pages = self.height // 8
        self.buffer = bytearray(self.pages * self.width)
        super().__init__(self.buffer, self.width, self.height, framebuf.MONO_VLSB)
        self.init_display()

    def init_display(self):
        for cmd in (
            SET_DISP | 0x00,
            SET_MEM_ADDR,
            0x00,
            SET_DISP_START_LINE | 0x00,
            SET_SEG_REMAP | 0x01,
            SET_MUX_RATIO,
            self.height - 1,
            SET_COM_OUT_DIR | 0x08,
            SET_DISP_OFFSET,
            0x00,
            SET_COM_PIN_CFG,
            0x02 if self.height == 32 else 0x12,
            SET_DISP_CLK_DIV,
            0x80,
            SET_PRECHARGE,
            0x22 if self.external_vcc else 0xF1,
            SET_VCOM_DESEL,
            0x30,
            SET_CONTRAST,
            0xFF,
            SET_ENTIRE_ON,
            SET_NORM_INV,
            SET_CHARGE_PUMP,
            0x10 if self.external_vcc else 0x14,
            SET_DISP | 0x01,
        ):
            self.write_cmd(cmd)
        self.fill(0)
        self.show()

    def poweroff(self):
        self.write_cmd(SET_DISP | 0x00)

    def poweron(self):
        self.write_cmd(SET_DISP | 0x01)

    def contrast(self, contrast):
        self.write_cmd(SET_CONTRAST)
        self.write_cmd(contrast)

    def invert(self, invert):
        self.write_cmd(SET_NORM_INV | (invert & 1))

    def show(self):
        x0 = 0
        x1 = self.width - 1
        if self.width == 64:
            x0 += 32
            x1 += 32
        self.write_cmd(SET_COL_ADDR)
        self.write_cmd(x0)
        self.write_cmd(x1)
        self.write_cmd(SET_PAGE_ADDR)
        self.write_cmd(0)
        self.write_cmd(self.pages - 1)
        self.write_data(self.buffer)


class SSD1306_I2C(SSD1306):
    def __init__(self, width, height, i2c, addr=0x3C, external_vcc=False):
        self.i2c = i2c
        self.addr = addr
        self.temp = bytearray(2)
        self.write_list = [b"\x40", None]
        super().__init__(width, height, external_vcc)

    def write_cmd(self, cmd):
        self.temp[0] = 0x80
        self.temp[1] = cmd
        self.i2c.writeto(self.addr, self.temp)

    def write_data(self, buf):
        self.write_list[1] = buf
        self.i2c.writevto(self.addr, self.write_list)


PIN_LDR_LEFT = const(0)
PIN_LDR_RIGHT = const(1)
PIN_LED = const(3)
PIN_I2C_SDA = const(4)
PIN_I2C_SCL = const(5)
PIN_BUTTON_LEFT = const(6)
PIN_BUTTON_OK = const(7)
PIN_BUTTON_RIGHT = const(8)
PIN_BUZZER = const(10)

OLED_WIDTH = const(128)
OLED_HEIGHT = const(64)
OLED_ADDR_PRIMARY = const(0x3C)
OLED_ADDR_ALT = const(0x3D)
LIS3DH_ADDR = const(0x19)

SCREEN_EYES = const(0)
SCREEN_SENSORS = const(1)
SCREEN_ABOUT = const(2)
BLINK_DURATION_MS = const(170)
IDLE_BLINK_BASE_MS = const(3000)
IDLE_BLINK_SPREAD_MS = const(3000)


class Button:
    def __init__(self, pin):
        self.pin = Pin(pin, Pin.IN, Pin.PULL_UP)
        self.stable = 1
        self.last_raw = 1
        self.last_change = ticks_ms()

    def pressed(self):
        raw = self.pin.value()
        now = ticks_ms()
        if raw != self.last_raw:
            self.last_raw = raw
            self.last_change = now
        if ticks_diff(now, self.last_change) > 35 and raw != self.stable:
            self.stable = raw
            return raw == 0
        return False


class LIS3DH:
    CTRL_REG1 = const(0x20)
    CTRL_REG4 = const(0x23)
    OUT_X_L = const(0x28)

    def __init__(self, i2c, found_devices, addr=LIS3DH_ADDR):
        self.i2c = i2c
        self.addr = addr
        self.ready = addr in found_devices
        self.last = (0.0, 0.0, 0.0)
        if self.ready:
            try:
                # 50 Hz, all axes enabled.
                self.i2c.writeto_mem(addr, self.CTRL_REG1, bytes([0x47]))
                # +/-4g, high-resolution mode.
                self.i2c.writeto_mem(addr, self.CTRL_REG4, bytes([0x18]))
            except OSError as exc:
                print("LIS3DH init failed:", exc)
                self.ready = False

    def read(self):
        if not self.ready:
            return (0.0, 0.0, 0.0, 0.0)
        try:
            data = self.i2c.readfrom_mem(self.addr, self.OUT_X_L | 0x80, 6)
        except OSError as exc:
            print("LIS3DH read failed:", exc)
            self.ready = False
            return (0.0, 0.0, 0.0, 0.0)
        x = self._convert(data[1], data[0])
        y = self._convert(data[3], data[2])
        z = self._convert(data[5], data[4])
        movement = abs(x - self.last[0]) + abs(y - self.last[1]) + abs(z - self.last[2])
        self.last = (x, y, z)
        return (x, y, z, movement)

    @staticmethod
    def _convert(msb, lsb):
        raw = (msb << 8) | lsb
        if raw & 0x8000:
            raw -= 65536
        return raw / 16384.0


def clamp(value, low, high):
    return max(low, min(high, value))


def map_range(value, in_min, in_max, out_min, out_max):
    value = clamp(value, in_min, in_max)
    return int((value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)


def configure_adc(pin):
    adc = ADC(Pin(pin))
    try:
        adc.atten(ADC.ATTN_11DB)
    except AttributeError:
        pass
    return adc


def smooth_adc(adc):
    total = 0
    for _ in range(8):
        total += adc.read()
        sleep_ms(1)
    return total // 8


def set_pwm_duty(pwm, duty_u16):
    if hasattr(pwm, "duty_u16"):
        pwm.duty_u16(duty_u16)
    else:
        pwm.duty(int(duty_u16 * 1023 / 65535))


def beep(beep_freq=1800, duration=40):
    buzzer.freq(beep_freq)
    set_pwm_duty(buzzer, 26000)
    sleep_ms(duration)
    set_pwm_duty(buzzer, 0)


def display_is_ready():
    return display_ready[0] and oled[0] is not None


def safe_show():
    if not display_is_ready():
        return
    try:
        oled[0].show()
    except OSError as exc:
        display_ready[0] = False
        print("OLED write failed:", exc)


def draw_text_center(text, y):
    if not display_is_ready():
        return
    x = max(0, (OLED_WIDTH - len(text) * 8) // 2)
    oled[0].text(text, x, y)


def draw_eye(cx, cy, offset, closed=False, is_sleepy=False):
    if not display_is_ready():
        return
    if closed:
        oled[0].fill_rect(cx - 20, cy, 40, 4, 1)
        return

    h = 18 if is_sleepy else 28
    y = cy - h // 2
    oled[0].rect(cx - 24, y, 48, h, 1)
    oled[0].fill_rect(cx - 22, y + 1, 44, h - 2, 0)
    pupil = 4 if is_sleepy else 6
    oled[0].fill_rect(cx + offset - pupil // 2, cy - pupil // 2, pupil, pupil, 1)


def draw_eyes():
    if not display_is_ready():
        return
    closed = ticks_diff(blink_until[0], ticks_ms()) > 0
    oled[0].fill(0)
    draw_eye(36, 28, eye_offset[0], closed, sleepy[0])
    draw_eye(92, 28, eye_offset[0], closed, sleepy[0])
    oled[0].text("L", 0, 56)
    oled[0].text(str(map_range(ldr_left[0], 0, 4095, 0, 100)) + "%", 10, 56)
    oled[0].text("R", 96, 56)
    oled[0].text(str(map_range(ldr_right[0], 0, 4095, 0, 100)) + "%", 106, 56)
    if sleepy[0]:
        draw_text_center("sleepy", 46)
    elif movement[0] > 0.55:
        draw_text_center("motion", 46)
    safe_show()


def draw_sensors():
    if not display_is_ready():
        return
    oled[0].fill(0)
    oled[0].text("Sensors", 0, 0)
    oled[0].text("Light L: {}%".format(map_range(ldr_left[0], 0, 4095, 0, 100)), 0, 16)
    oled[0].text("Light R: {}%".format(map_range(ldr_right[0], 0, 4095, 0, 100)), 0, 28)
    oled[0].text("Motion: {:.2f}".format(movement[0]), 0, 40)
    oled[0].text("LIS3DH {}".format("OK" if lis.ready else "missing"), 0, 52)
    safe_show()


def draw_about():
    if not display_is_ready():
        return
    oled[0].fill(0)
    draw_text_center("BlinkBuddy", 8)
    draw_text_center("LEFT OK RIGHT", 26)
    draw_text_center("eyes follow", 42)
    draw_text_center("USB-C flash", 54)
    safe_show()


def draw_screen():
    if screen[0] == SCREEN_EYES:
        draw_eyes()
    elif screen[0] == SCREEN_SENSORS:
        draw_sensors()
    else:
        draw_about()


def next_screen():
    screen[0] = (screen[0] + 1) % 3
    beep(1600, 30)


def previous_screen():
    screen[0] = (screen[0] - 1) % 3
    beep(1300, 30)


def schedule_idle_blink(now):
    variation = (ldr_left[0] + ldr_right[0] + (now // 37)) % IDLE_BLINK_SPREAD_MS
    next_idle_blink[0] = now + IDLE_BLINK_BASE_MS + variation


def trigger_blink(now=None, duration=BLINK_DURATION_MS):
    if now is None:
        now = ticks_ms()
    blink_until[0] = now + duration
    schedule_idle_blink(now)


print("")
print("BlinkBuddy MicroPython firmware")
print("Keep RIGHT released during power-up/reset/upload; it is ESP32-C3 GPIO8.")
print("Pins: LDR L/R=GPIO0/GPIO1, LED=GPIO3, I2C SDA/SCL=GPIO4/GPIO5")
print("Pins: buttons L/OK/R=GPIO6/GPIO7/GPIO8, buzzer=GPIO10")

led = Pin(PIN_LED, Pin.OUT)
led.value(0)

buzzer = PWM(Pin(PIN_BUZZER))
buzzer.freq(1800)
set_pwm_duty(buzzer, 0)

i2c = I2C(0, scl=Pin(PIN_I2C_SCL), sda=Pin(PIN_I2C_SDA), freq=400_000)
i2c_devices = i2c.scan()
print("I2C scan:", [hex(addr) for addr in i2c_devices])

oled = [None]
display_ready = [False]
oled_addr = OLED_ADDR_PRIMARY
if OLED_ADDR_PRIMARY not in i2c_devices and OLED_ADDR_ALT in i2c_devices:
    oled_addr = OLED_ADDR_ALT

try:
    oled[0] = SSD1306_I2C(OLED_WIDTH, OLED_HEIGHT, i2c, addr=oled_addr)
    display_ready[0] = True
    oled[0].fill(0)
    draw_text_center("BlinkBuddy", 20)
    draw_text_center("starting...", 38)
    safe_show()
    print("OLED OK at", hex(oled_addr))
except OSError as exc:
    print("OLED missing or not responding:", exc)
    print("Firmware will continue with serial, LED, buzzer, buttons, and sensors.")

btn_left = Button(PIN_BUTTON_LEFT)
btn_ok = Button(PIN_BUTTON_OK)
btn_right = Button(PIN_BUTTON_RIGHT)

adc_left = configure_adc(PIN_LDR_LEFT)
adc_right = configure_adc(PIN_LDR_RIGHT)

lis = LIS3DH(i2c, i2c_devices)
print("LIS3DH:", "ok" if lis.ready else "missing")

screen = [SCREEN_EYES]
ldr_left = [0]
ldr_right = [0]
sleepy = [False]
movement = [0.0]
target_eye_offset = [0]
eye_offset = [0]
blink_until = [0]
next_idle_blink = [0]

last_sensor = ticks_ms()
last_ui = ticks_ms()
last_debug = ticks_ms()
schedule_idle_blink(last_sensor)

beep(1800, 70)
led.value(1)
sleep_ms(160)
led.value(0)

print("BlinkBuddy app running")

while True:
    now = ticks_ms()

    if btn_left.pressed():
        previous_screen()
        print("button=LEFT screen={}".format(screen[0]))
    if btn_ok.pressed():
        trigger_blink(now)
        beep(2200, 35)
        print("button=OK")
    if btn_right.pressed():
        next_screen()
        print("button=RIGHT screen={}".format(screen[0]))

    if ticks_diff(now, next_idle_blink[0]) >= 0:
        trigger_blink(now)

    if ticks_diff(now, last_sensor) >= 120:
        last_sensor = now
        ldr_left[0] = smooth_adc(adc_left)
        ldr_right[0] = smooth_adc(adc_right)
        diff = ldr_right[0] - ldr_left[0]
        target_eye_offset[0] = map_range(diff, -1800, 1800, -12, 12)
        eye_offset[0] += int((target_eye_offset[0] - eye_offset[0]) / 3)
        sleepy[0] = (ldr_left[0] + ldr_right[0]) // 2 < 650

        _, _, _, movement[0] = lis.read()
        if movement[0] > 0.9:
            trigger_blink(now)

        led.value((now // 500) % 2)

    if ticks_diff(now, last_ui) >= 80:
        last_ui = now
        draw_screen()

    if ticks_diff(now, last_debug) >= 1000:
        last_debug = now
        print(
            "ldr_left={} ldr_right={} eye={} movement={:.2f} lis={} oled={}".format(
                ldr_left[0],
                ldr_right[0],
                target_eye_offset[0],
                movement[0],
                "ok" if lis.ready else "missing",
                "ok" if display_ready[0] else "missing",
            )
        )
