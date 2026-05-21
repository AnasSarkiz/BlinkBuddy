# BlinkBuddy MicroPython Firmware

This is the recommended first firmware path for BlinkBuddy.

It runs on ESP32-C3 MicroPython and makes the board work as an interactive OLED buddy:

- Animated eyes on the OLED.
- Eyes follow left/right light using the two LDR sensors.
- Shake/motion blink reaction from the LIS3DHTR accelerometer.
- `LEFT`, `OK`, `RIGHT` button navigation.
- Buzzer feedback.
- LED heartbeat.
- USB serial debug output.

## Files

| File | Purpose |
| --- | --- |
| `main.py` | Complete BlinkBuddy application, including OLED driver and board behavior. |

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

## Expected Behavior

On boot:

1. OLED shows `BlinkBuddy` startup.
2. Buzzer beeps.
3. The eyes screen appears.

Controls:

- `LEFT`: previous screen.
- `OK`: blink/beep.
- `RIGHT`: next screen.

Screens:

- Eyes screen.
- Sensor values.
- About/status.

Light behavior:

- More light on left sensor: eyes look left.
- More light on right sensor: eyes look right.
- Low light: sleepy eyes.

Motion behavior:

- Shake or quick movement: blink reaction.

## If OLED Is Blank

The display is driven as an SSD1306/SSD1309-compatible 128x64 I2C OLED at address `0x3C`.

If serial debug works but the OLED stays blank:

1. Check OLED power and I2C soldering.
2. Confirm OLED I2C address with the serial scan printed at startup.
3. Try changing `OLED_ADDR` in `main.py` from `0x3C` to `0x3D`.
