# BlinkBuddy

BlinkBuddy is a compact ESP32-C3 sensor and display board built around a large OLED module. It combines a front OLED screen, left and right light sensors, a motion sensor, three user buttons, a buzzer, a status LED, USB-C power/programming, and a Qwiic I2C expansion connector.

The purpose of the board is to act as a small interactive display badge or sensor companion: it can show status and animations on the OLED, react to motion, measure light from both sides, accept button input, and provide feedback with sound and an LED.

## Hardware Overview

- Board size: 82 mm x 60 mm.
- PCB: 2 layers.
- Assembly side: top side components.
- Main controller: ESP32-C3-WROOM-02.
- Display: HS242L03B2C01 OLED module.
- USB interface: USB-C connector, USBLC6-2SC6 ESD protection, and CH340C USB serial bridge.
- Expansion: Qwiic-compatible I2C connector.
- Sensors: LIS3DHTR accelerometer and two GL5528 light-dependent resistors.
- Inputs: three tactile switches.
- Outputs: buzzer and red status LED.

## How The Board Works

USB-C provides 5 V on `VBUS_5V`. ESD1 protects USB D+, USB D-, and VBUS with a USBLC6-2SC6 device. The XC6220B331MR-G regulator converts VBUS to the board `V3_3` rail used by the ESP32-C3, OLED, accelerometer, Qwiic connector, light sensors, CH340C, LED, and buzzer driver. Its `CE` enable pin is tied to VBUS so the 3.3 V rail turns on whenever USB power is present.

The ESP32-C3 is the main processor. It communicates with the OLED, LIS3DHTR accelerometer, and Qwiic connector over the shared I2C bus. R3 and R4 provide the I2C pullups to 3.3 V.

The CH340C provides USB serial communication between the USB-C connector and the ESP32-C3 UART. Its DTR and RTS control lines also drive the ESP32-C3 auto-program circuit through Q2 and Q3, allowing tools such as `esptool` to reset the ESP32-C3 and enter download mode through `EN` and `BOOT` / `IO9`. EN and BOOT testpoints remain available for manual recovery.

The left and right LDRs are connected as voltage dividers into ESP32-C3 ADC pins. Firmware reads these ADC values to detect light level or directional light changes.

SW1, SW2, and SW3 connect their GPIO lines to ground when pressed. Firmware should configure these GPIOs with internal pullups.

The buzzer is switched by Q1 from an ESP32-C3 GPIO through base resistor R8. The status LED is driven by an ESP32-C3 GPIO through current-limit resistor R9.

## Firmware Expectations

- Configure button GPIOs with internal pullups.
- Do not hold the RIGHT button while plugging in USB-C or resetting the board; it is on ESP32-C3 `GPIO8`, which is also a boot strapping pin.
- Read the LDR ADC channels with averaging or filtering.
- Use I2C for the OLED and LIS3DHTR accelerometer.
- Drive the buzzer GPIO with a tone/PWM output if sound patterns are needed.
- Drive the LED GPIO as an active-high status indicator.
- Use normal ESP32-C3 UART flashing through the CH340C auto-program circuit. Keep manual BOOT/EN testpoints available for recovery.

The first firmware is in `programming/`. The recommended version is `programming/micropython/`; it implements animated eyes, light-following behavior, motion reactions, button navigation, buzzer feedback, LED status, and USB serial debug output.

The printable enclosure design is in `enclosure/`. It includes a parametric OpenSCAD case with a bottom tray, OLED faceplate, exposed buttons, exposed light sensors, USB-C access, Qwiic access, and antenna clearance.

## Development Checks

Useful local checks:

```bash
bun run typecheck
bunx tsci check netlist
bunx tsci check schematic-placement
bunx tsci check placement
bunx tsci check trace-length USB_DP
bunx tsci check trace-length USB_DM
bunx tsci check trace-length I2C_SDA
bunx tsci check trace-length I2C_SCL
bunx tsci check trace-length LDR_LEFT
bunx tsci check trace-length LDR_RIGHT
bunx tsci build
bunx tsci build --pcb-png --pcb-svgs
```

Generated build artifacts are written to `dist/index/`.

Latest project status, May 28, 2026:

- The first BlinkBuddy prototype order has been placed and is under production.
- JLC asked for SMT confirmation. U2 / CH340C polarity and routed connections were rechecked against `dist/index/circuit.json`; U2 is OK to proceed as shown.
- J1 / USB-C still needs a JLC assembly decision because the selected connector package does not match the already-fabricated pads. Only a footprint-compatible replacement should be accepted for this order.
- The remaining work has shifted from pre-order review to incoming inspection, firmware flashing, and first-article bring-up when the boards arrive.

Latest local review, May 23, 2026:

- Typecheck, netlist, placement DRC, trace-length checks, plain build, and PCB PNG/SVG preview export completed.
- `dist/index/circuit.json`, `dist/index/pcb.svg`, and `dist/index/pcb.png` were generated.
- A generated PCB route endpoint audit was added after a TP_GND / TP_3V3 hover concern. The source netlist was clean, but the old generated PCB output had a GND route endpoint on `R3.pin1` (`V3_3`). R3/R4 were moved and the rebuilt output now passes the audit with zero cross-net endpoints.
- The local `../../pcb-viewer` connectivity map now keeps `TP_GND` and `TP_3V3` on separate rendered nets, so hovering either testpoint should not highlight the other.
- `bunx tsci check schematic-placement` exits successfully but reports schematic-only box/label padding issues. These are not PCB-order blockers.
- `bunx tsci check routing-difficulty` was attempted but did not finish after dispatching solvers, so it is documented as inconclusive in `BOARD_REVIEW.md`.
- The internet-enabled local build completed, but the manufacturer preview is still the source of truth for BOM availability, footprints, rotations, and assembly side.

## Production / Bring-Up Notes

Read `BOARD_REVIEW.md` for the order review and first-article checklist. The first prototype order is now under production, so the next critical steps are incoming inspection, firmware flashing, USB serial verification, OLED/button/sensor bring-up, and enclosure fit checking. For first bring-up, keep the RIGHT button released during power-on/reset because it shares ESP32-C3 `GPIO8`.
