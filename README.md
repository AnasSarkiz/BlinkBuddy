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

Latest local review, May 22, 2026:

- Typecheck, netlist, placement DRC, trace-length checks, plain build, and PCB PNG/SVG preview export completed.
- `dist/index/circuit.json`, `dist/index/pcb.svg`, and `dist/index/pcb.png` were generated.
- `bunx tsci check schematic-placement` exits successfully but reports schematic-only box/label padding issues. These are not PCB-order blockers.
- `bunx tsci check routing-difficulty` was attempted but did not finish after dispatching solvers, so it is documented as inconclusive in `BOARD_REVIEW.md`.
- Supplier footprint fetches still fail in this local environment because supplier URLs are not reachable here. Re-check BOM/footprints in the manufacturer preview before ordering.

## Before Ordering

Read `BOARD_REVIEW.md` before ordering. The main electrical nets were reviewed and the build/preview checks now pass locally, but the board still needs internet-enabled supplier footprint/BOM verification and manufacturer assembly-preview review.
