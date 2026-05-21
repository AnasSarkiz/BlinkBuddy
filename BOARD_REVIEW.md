# BlinkBuddy Board Order Review

Date: May 21, 2026

## Final Order Gate

Prototype order status: **OK to order after JLC/manufacturer preview review**.

I do not see a board-code blocker in the current nets or placements. The remaining must-do step is the manufacturer preview: confirm part rotations, top-side assembly, OLED mechanical fit, USB-C connector position, and exposed left/right light sensors before paying for the order.

## Verdict

The current board code passes typecheck, netlist, placement DRC, and plain `tsci build`. The main electrical connections are coherent. OLED and ESP32-C3 placement are treated as accepted by the board owner.

Before ordering, the remaining blockers are supplier/BOM verification with internet access and manufacturer assembly preview. The ESP32-C3 auto-program path has now been added in the board code.

## Current Check Results

| Check | Result | Notes |
| --- | --- | --- |
| `bun run typecheck` | Pass | TypeScript completed successfully. |
| `bunx tsci check netlist` | Pass | 0 errors, 0 warnings. |
| `bunx tsci check placement` | Pass | 0 DRC errors, 0 warnings. The report still lists accepted OLED body intrusions for parts intentionally placed under the display. |
| `bunx tsci build` | Pass with warnings | `dist/index/circuit.json` was generated. Supplier footprint fetches failed because this environment cannot reach JLC/supplier URLs. |
| `bunx tsci build --pcb-png --pcb-svgs` | Preview export fails | Circuit generation passes, but PCB SVG/PNG rendering fails on a tscircuit renderer route-point error. Do not trust old `dist/index/pcb.svg` or `dist/index/pcb.png` as current outputs. |
| Assembly side check | Pass | All placed components in `index.circuit.tsx` are on the top layer. The only bottom-layer item found is the bottom ground copper pour, not an assembled component. |

Generated current artifact:

- `dist/index/circuit.json`

## Confirmed Fixes

| Area | Status |
| --- | --- |
| USB ESD protection | Added ESD1 using real JLC/LCSC part `USBLC6-2SC6`, part `C7519`. It connects to USB D+, USB D-, VBUS, and GND. |
| Buzzer NC pin | Fixed. BZ1 `NC` is no longer tied to GND. |
| I2C pullups | R3/R4 are placed near the left/Qwiic side and connect to `V3_3`, `I2C_SDA`, and `I2C_SCL`. |
| Silkscreen labels | Custom labels were reviewed and placed by their real features: USB-C, Qwiic pin order, left/right sensors, button labels, antenna keepout, and testpoints. |
| Sensor placement | Reviewed. The light sensors are left/right at the board edge and the motion sensor is on the left side with usable clearance. |
| ESP32-C3 programming flow | Added CH340C DTR/RTS auto-program network using Q2/Q3, R10/R11, BOOT pull-up R12, and EN capacitor C7. |
| Single assembly side | Components are on the top assembly side. |

## Confirmed Electrical Connections

| Subsystem | Review |
| --- | --- |
| USB-C power | J1 VBUS pins connect to `VBUS_5V`; shield and ground pins connect to `GND`. |
| USB-C CC resistors | CC1 and CC2 each have a 5.1k pull-down to `GND`, correct for a USB-C sink/device. |
| 3.3 V regulator | `VBUS_5V` feeds the XC6206 3.3 V regulator. Input and output capacitors are present. |
| USB serial | CH340C D+ and D- connect to USB D+ and D-. CH340C TXD/RXD connect to ESP32-C3 RXD/TXD. |
| Auto-program | CH340C DTR/RTS connect through Q2/Q3 to ESP32-C3 `EN` and `IO9` / `BOOT`. R5 pulls `EN` up, R12 pulls `BOOT` up, and C7 adds reset delay on `EN`. The logic matches Espressif's ESP32-C3 auto-download truth table. |
| ESP32-C3 power | ESP32-C3 3V3 pins connect to `V3_3`; ground pins and exposed pad connect to `GND`. |
| I2C bus | OLED, LIS3DHTR accelerometer, and Qwiic connector share `I2C_SDA` and `I2C_SCL`. Pullups R3/R4 connect to `V3_3`. |
| Accelerometer | LIS3DHTR is configured for I2C with CS tied high, SA0 tied high, and RES tied low. |
| Light sensors | Left and right LDRs form voltage dividers with R6/R7 to ESP32-C3 ADC pins. |
| Buttons | SW1, SW2, and SW3 short their GPIO lines to `GND` when pressed. Firmware must enable internal pullups. |
| Buzzer | ESP32-C3 drives Q1 through R8; Q1 switches the buzzer low side. |
| LED | ESP32-C3 drives D1 through R9; the LED returns to `GND`. |
| Testpoints | Testpoints exist for `GND`, `3V3`, `TX`, `RX`, `EN`, and `BOOT`. |

## Sensor Placement Review

| Sensor | Placement Review | Order Notes |
| --- | --- | --- |
| `LDR_L` left light sensor | Good. It is on the left/top edge area, about 2.8 mm inside the board edge, with R6 nearby for the divider. | Keep this area exposed in the final enclosure so the OLED frame or case does not shade it. |
| `LDR_R` right light sensor | Good. It mirrors the left sensor on the right/top edge area, about 3.0 mm inside the board edge, with R7 nearby for the divider. | Keep this area exposed and avoid dark soldermask/cover material over the sensing face. |
| `U4` LIS3DHTR motion sensor | Good. It is near the left board edge, about 2.2 mm inside the edge, and close to the I2C/Qwiic side. Motion sensing will work from this location. | Firmware should map the accelerometer axes according to the final board orientation. |

## Manufacturer / 3D Screenshot Review

The provided PCB and 3D-viewer screenshots were reviewed on May 21, 2026.

| Area | Visual Review |
| --- | --- |
| OLED fit | The large OLED sits over the main electronics as intended and leaves the buttons and light sensors exposed. |
| Buttons | SW1, SW2, and SW3 are accessible below the OLED. |
| Light sensors | Left and right LDRs are visible at the board edges and not covered by the OLED in the screenshots. |
| Motion sensor | U4 is exposed on the left side and not blocked by the OLED. |
| USB-C | The USB-C connector is reachable from the board edge. |
| Qwiic | J2 is visible and reachable from the left edge. |
| ESP32-C3 antenna | The antenna keepout area is visible and remains at the board edge. |
| Testpoints | Top testpoints are visible and reachable. |

Visual caution: confirm in the final manufacturer preview that the OLED part is available for the selected assembly service and that the OLED mounting/connector height matches the real part. The screenshots show the intended clearance, but this is still a mechanical/BOM confirmation item before paying for assembly.

## Current Issues Before Ordering

### P1 - Supplier Footprint/BOM Verification Not Completed

The design uses JLC/LCSC parts, but this environment cannot fetch live supplier footprints. Before ordering, run the build with internet access and verify every part, footprint, rotation, and assembly-side mapping in the manufacturer preview.

### P1 - Manufacturer Preview Required

Because several parts are intentionally under the large OLED body and the local PCB image exporter fails, the final visual sign-off must happen in the JLC/manufacturer viewer. Check top-side placement, pick-and-place rotation, OLED outline, USB-C access, Qwiic access, button access, and that both LDR sensing faces remain exposed.

### P2 - PCB Preview Export Fails

`bunx tsci build --pcb-png --pcb-svgs` currently fails while rendering PCB SVG/PNG previews, even though circuit generation passes. This appears to be a tscircuit renderer route-point issue. Use `dist/index/circuit.json` and the manufacturer preview until this export issue is resolved.

### P2 - USB Routing Has No Explicit Impedance Constraint

USB D+/D- length matching is acceptable for full-speed USB, and ESD1 protects the USB lines. The design still does not explicitly constrain USB differential impedance.

Measured trace lengths:

- `USB_DP`: 82.98 mm total.
- `USB_DM`: 83.38 mm total.
- Mismatch: about 0.40 mm total.

### P2 - Analog Light-Sensor Trace Is Long

The left LDR ADC net is about 82.65 mm total. This is acceptable for a slow light sensor, but firmware should average/filter ADC readings.

### P2 - Imported Component Metadata Is Incomplete

The build reports underspecified pin metadata and missing `requires_power` / `requires_ground` attributes on imported parts. The explicit netlist was reviewed and passes, but incomplete metadata limits automated semantic checks.

## Order Recommendation

The design is coherent enough for a prototype after manufacturer preview review. Do not place a production order until:

1. Supplier/BOM/footprint validation passes with internet access.
2. JLC/manufacturer assembly preview confirms rotations, side, and placement.
3. Auto-program behavior is smoke-tested on the first assembled prototype.
4. PCB SVG/PNG preview export is either fixed or replaced by a verified manufacturer preview.
