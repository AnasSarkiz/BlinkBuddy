# BlinkBuddy MicroPython Firmware

This is the recommended first firmware path for BlinkBuddy.

If this is the first time powering a newly received board, read `../FIRST_BRINGUP.md` first.

It runs on ESP32-C3 MicroPython and makes the board work as an interactive OLED buddy:

- Animated eyes on the OLED.
- Natural idle blinking even when the board is not moving.
- Eyes follow left/right light using the two LDR sensors.
- Shake/motion blink reaction from the LIS3DHTR accelerometer.
- `LEFT`, `OK`, `RIGHT` button navigation.
- Buzzer feedback.
- LED heartbeat.
- USB serial debug output.

## Files

| File | Purpose |
| --- | --- |
| `main.py` | Complete BlinkBuddy application, including OLED driver, serial diagnostics, and board behavior. |

## Install Tools

Install Python tools:

```bash
python3 -m pip install esptool mpremote
```

## Flash MicroPython To ESP32-C3

1. Download the latest ESP32-C3 MicroPython `.bin` firmware from:

   <https://micropython.org/download/ESP32_GENERIC_C3/>

2. Connect BlinkBuddy with USB-C.

3. Find the serial port:

```bash
ls /dev/cu.*
```

On macOS the CH340 port often looks like:

```txt
/dev/cu.wchusbserial...
```

4. Erase and flash MicroPython:

```bash
esptool.py --chip esp32c3 --port /dev/cu.wchusbserialXXXX erase_flash
esptool.py --chip esp32c3 --port /dev/cu.wchusbserialXXXX --baud 460800 write_flash -z 0x0 ESP32_GENERIC_C3-*.bin
```

Replace `/dev/cu.wchusbserialXXXX` and the firmware filename with your real values.

## Upload BlinkBuddy Code

From this folder:

```bash
cd programming/micropython
mpremote connect /dev/cu.wchusbserialXXXX fs cp main.py :main.py
mpremote connect /dev/cu.wchusbserialXXXX reset
```

Open the serial console:

```bash
mpremote connect /dev/cu.wchusbserialXXXX
```

Expected startup serial output should look similar to:

```txt
BlinkBuddy MicroPython firmware
I2C scan: ['0x19', '0x3c']
OLED OK at 0x3c
LIS3DH: ok
BlinkBuddy app running
```

## Expected Behavior

On boot:

1. OLED shows `BlinkBuddy` startup.
2. Buzzer beeps.
3. The eyes screen appears.

Controls:

- `LEFT`: previous screen.
- `OK`: blink/beep.
- `RIGHT`: next screen.

Boot/reset caution: do not hold `RIGHT` while plugging in USB-C, resetting, or flashing. It is on ESP32-C3 `GPIO8`, which is also a boot strapping pin.

Screens:

- Eyes screen.
- Sensor values.
- About/status.

Light behavior:

- More light on left sensor: eyes look left.
- More light on right sensor: eyes look right.
- Low light: sleepy eyes.
- No motion required: eyes blink naturally every few seconds.

Motion behavior:

- Shake or quick movement: blink reaction.

## If OLED Is Blank

The display is driven as an SSD1306/SSD1309-compatible 128x64 I2C OLED at address `0x3C`.

If serial debug works but the OLED stays blank:

1. Check OLED power and I2C soldering.
2. Confirm OLED I2C address with the serial scan printed at startup.
3. If the scan shows neither `0x3C` nor `0x3D`, inspect OLED soldering and the shared I2C traces.
