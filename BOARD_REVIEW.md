# BlinkBuddy Board Order Review

Date: May 28, 2026

## Final Order Gate

Prototype order status: **Ordered and under production**.

The first BlinkBuddy prototype order has been placed and is under production as of May 25, 2026. I do not see a remaining connection/netlist blocker in the board code, build output, or PCB preview export used for the order. A May 23 hover concern exposed a real generated PCB route mismatch, where a GND generated route endpoint landed on the 3.3 V side of R3. R3/R4 were moved away from the Qwiic ground pads, the board was rebuilt, and a generated PCB route audit now passes with zero cross-net route endpoints.

The 3.3 V regulator has been upgraded from the previous 200 mA XC6206P332MR-G to `XC6220B331MR-G` / JLC `C86534`, a 1 A fixed 3.3 V SOT-25 regulator. Because the order is now in production, the remaining risk-management work is first-article inspection: confirm part rotations, top-side assembly, OLED mechanical fit, USB-C connector position, and exposed left/right light sensors on the delivered boards.

## JLC SMT Confirmation - May 28, 2026

JLC asked for confirmation of U2 polarity/placement and reported a package mismatch for J1.

U2 is `CH340C`, JLC `C84681`, placed on the top side with `pcbRotation={0}`. The generated PCB coordinates place U2 pin 1 / `GND` at the lower-left pad, matching the polarity marker shown in the JLC corrected placement preview. The source netlist and generated `dist/index/circuit.json` agree on all connected U2 pins:

| U2 pin | Signal | Verified net |
| --- | --- | --- |
| 1 | `GND` | `GND` |
| 2 | `TXD` | `ESP_RX` |
| 3 | `RXD` | `ESP_TX` |
| 4 | `V3` | `V3_3` |
| 5 | `D_POS` | `USB_DP` |
| 6 | `D_NEG` | `USB_DM` |
| 13 | `DTR` | `USB_DTR` |
| 14 | `RTS` | `USB_RTS` |
| 16 | `VCC` | `V3_3` |

Unused CH340C pins 7, 8, 9, 10, 11, 12, and 15 have no generated PCB trace endpoints. A generated route endpoint audit of the U2 pads found `violations: []`: every `pcb_trace` endpoint touching U2 lands on the expected `source_net_*` from the generated circuit JSON. `bunx tsci check netlist` was rerun on May 28 and reported `Errors: 0` and `Warnings: 0`.

Conclusion for JLC: U2 polarity, placement, and routed connections are correct, so it is OK to proceed with U2 as shown.

For J1, the existing PCB copper and holes cannot be changed during SMT assembly. A replacement USB-C connector is only acceptable if JLC can provide a direct footprint-compatible and pin-compatible substitute for the already-fabricated pads. If the replacement part requires different pad geometry, holes, shell tabs, or pin mapping, the safe options are to cancel/reorder with a corrected PCB or leave J1 unpopulated and hand-solder a compatible connector later.

## Verdict

The current board code passes typecheck, netlist, placement DRC, plain `tsci build`, and PCB PNG/SVG preview export. The main signal connections are coherent. OLED and ESP32-C3 placement are treated as accepted by the board owner.

The pre-order blockers have now become delivery inspection items. When the boards arrive, verify supplier substitutions, assembly orientation, solder quality, OLED fit, USB-C access, Qwiic access, LDR exposure, and ESP32-C3 auto-program behavior on the first assembled unit.

## Current Check Results

| Check | Result | Notes |
| --- | --- | --- |
| `bun run typecheck` | Pass | TypeScript completed successfully. |
| `bunx tsci check netlist` | Pass | 0 errors, 0 warnings. Rechecked May 28, 2026 for the JLC U2 SMT confirmation; U2 pin nets match the generated circuit JSON. |
| Generated PCB route endpoint audit | Pass | Custom audit of every `pcb_trace` endpoint found 0 cross-net endpoints after moving R3/R4. This specifically checks the generated PCB JSON, not only the source netlist. |
| PCB-viewer connectivity map check | Pass | Using `../../pcb-viewer`'s `circuit-json-to-connectivity-map`, `TP_GND` and `TP_3V3` are now on separate rendered connectivity nets and do not include each other on hover. |
| `bunx tsci check schematic-placement` | Exit 0 with schematic-only issues | Reports schematic label/pin padding issues for U1, U3, BZ1, Q1, Q2, and Q3. This does not affect PCB fabrication and was not treated as an order blocker because schematic cleanup was intentionally deprioritized. |
| `bunx tsci check placement` | Pass | 0 DRC errors, 0 warnings. The report lists accepted OLED body intrusions for parts intentionally placed under the display. |
| `bunx tsci check trace-length USB_DP` | Pass | `USB_DP` total length: 82.98 mm. |
| `bunx tsci check trace-length USB_DM` | Pass | `USB_DM` total length: 83.38 mm. USB pair mismatch is about 0.40 mm. |
| `bunx tsci check trace-length I2C_SDA` | Pass | `I2C_SDA` total length: 105.73 mm after moving R3. |
| `bunx tsci check trace-length I2C_SCL` | Pass | `I2C_SCL` total length: 105.49 mm after moving R4. |
| `bunx tsci check trace-length LDR_LEFT` | Pass | `LDR_LEFT` total length: 82.65 mm. Firmware should average/filter this ADC reading. |
| `bunx tsci check trace-length LDR_RIGHT` | Pass | `LDR_RIGHT` total length: 16.68 mm. |
| `bunx tsci check routing-difficulty` | Inconclusive | The command dispatched 10 sub-solvers but produced no final result after an extended wait. It was treated as a CLI/tool hang, not a board-code failure. |
| `bunx tsci build` | Pass with warnings | `dist/index/circuit.json` was generated. Imported part metadata warnings remain. |
| `bunx tsci build --pcb-png --pcb-svgs` | Pass with warnings | The previous PCB preview renderer issue is fixed. Current `dist/index/pcb.svg` and `dist/index/pcb.png` were generated successfully. Imported part metadata warnings remain. |
| Assembly side check | Pass | All placed components in `index.circuit.tsx` are on the top layer. The only bottom-layer item found is the bottom ground copper pour, not an assembled component. |

Generated current artifacts:

- `dist/index/circuit.json`
- `dist/index/pcb.svg`
- `dist/index/pcb.png`

## Confirmed Fixes

| Area | Status |
| --- | --- |
| USB ESD protection | Added ESD1 using real JLC/LCSC part `USBLC6-2SC6`, part `C7519`. It connects to USB D+, USB D-, VBUS, and GND. |
| Buzzer NC pin | Fixed. BZ1 `NC` is no longer tied to GND. |
| I2C pullups | R3/R4 are placed near the left/Qwiic side and connect to `V3_3`, `I2C_SDA`, and `I2C_SCL`. On May 23 they were moved from x=-36.2 mm to x=-30.8 mm to remove generated routing pressure near the Qwiic GND pads. |
| Silkscreen labels | Custom labels were reviewed and placed by their real features: USB-C, Qwiic pin order, left/right sensors, button labels, antenna keepout, and testpoints. |
| Sensor placement | Reviewed. The light sensors are left/right at the board edge and the motion sensor is on the left side with usable clearance. |
| ESP32-C3 programming flow | Added CH340C DTR/RTS auto-program network using Q2/Q3, R10/R11, BOOT pull-up R12, and EN capacitor C7. |
| 3.3 V regulator headroom | Upgraded U3 to `XC6220B331MR-G`, JLC `C86534`, fixed 3.3 V, 1 A, SOT-25. |
| Single assembly side | Components are on the top assembly side. |

## Confirmed Electrical Connections

| Subsystem | Review |
| --- | --- |
| USB-C power | J1 VBUS pins connect to `VBUS_5V`; shield and ground pins connect to `GND`. |
| USB-C CC resistors | CC1 and CC2 each have a 5.1k pull-down to `GND`, correct for a USB-C sink/device. |
| 3.3 V regulator | `VBUS_5V` feeds `XC6220B331MR-G` U3. U3 `VIN` and `CE` connect to `VBUS_5V`, `VOUT` connects to `V3_3`, and `VSS` connects to `GND`. Input and output capacitors are present. |
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

## Testpoint Continuity Addendum

The May 23, 2026 PCB-viewer hover screenshots made `TP_GND` and `TP_3V3` look like they might be connected. This was investigated in both the BlinkBuddy generated output and the local `../../pcb-viewer` code.

| Item | Verified Result |
| --- | --- |
| Source trace for `TP_GND` | `.TP_GND > .pin1` connects to `net.GND`. |
| Source trace for `TP_3V3` | `.TP_3V3 > .pin1` connects to `net.V3_3`. |
| Netlist result | `TP_GND pin1` appears only under `NET: GND`; `TP_3V3 pin1` appears only under `NET: V3_3`. |
| Root cause before fix | The source netlist was clean, but generated PCB traces `source_net_0_mst37_0` and `source_net_0_mst39_0` were GND traces with an endpoint on `R3.pin1`, which belongs to `V3_3`. |
| Why the viewer highlighted both | `pcb-viewer` builds a connectivity map from the full generated circuit JSON, then highlights every primitive connected to the hovered rendered net. Because the generated PCB JSON had a real bad route endpoint, the viewer correctly highlighted both testpoints. |
| Fix applied | Moved I2C pullups R3/R4 from `pcbX={-36.2}` to `pcbX={-30.8}` and rebuilt the board. |
| Generated PCB route endpoint audit after fix | Pass: `bad_count: 0`. No generated `pcb_trace` endpoint lands on a port from another source net. |
| PCB-viewer connectivity map after fix | Pass: `TP_GND` and `TP_3V3` resolve to separate rendered connectivity nets and no longer include each other. |

Conclusion: the hover highlight was not a simple viewer artifact. It exposed a real generated PCB route mismatch. That mismatch is now fixed in the generated output and verified with an explicit route endpoint audit plus the `pcb-viewer` connectivity map.

## Deep Electrical Review Addendum

### Resolved - 3.3 V Regulator Current Margin

U3 has been upgraded to `XC6220B331MR-G`, JLC `C86534`, a fixed 3.3 V SOT-25 LDO rated at 1 A. This gives enough current headroom for ESP32-C3 radio peaks plus the OLED, CH340C, LIS3DHTR, LED, Qwiic connector, and buzzer pulses.

The replacement uses the existing regulator area with a small SOT-25 footprint. Its enable pin `CE` is tied to `VBUS_5V`, so the 3.3 V rail turns on automatically when USB power is present. C5 remains on the input side and C6 remains on the output side.

### Resolved - GPIO8 Button Boot Strap Risk

`BTN_RIGHT` has been moved from ESP32-C3 `IO8` to `IO18`, so the right button no longer pulls the GPIO8 boot strapping pin low during reset. Firmware pin maps and bring-up notes now use GPIO18 for RIGHT.

## Live JLC Stock Spot Check

Live/recent JLC pages were checked on May 22, 2026 for the selected order-critical parts. The following imported JLC part numbers show stock in recent JLC results: ESP32-C3 module `C2934560`, USB-C `C165948`, Qwiic connector `C160404`, upgraded regulator `C86534`, CH340C `C84681`, LIS3DHTR `C15134`, OLED `C7466000`, GL5528 `C125627`, switches `C273519`, buzzer `C94598`, USB ESD `C7519`, LED `C2286`, S8050 `C2146`, and the resistor/capacitor families used by the design.

Important caveat: the OLED `C7466000` is listed as wave-solder/high assembly difficulty on JLC, so it must be confirmed in the JLC PCBA quote and assembly preview. The JLC preview remains the source of truth for rotations, footprints, and assembly availability.

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

## Current Issues For First Article

### P1 - Supplier Footprint/BOM Verification On Delivered Boards

The prototype order is now in production. When the boards arrive, verify the actual assembled parts, footprints, rotations, and assembly-side mapping against the intended design.

### P1 - First-Article Visual Inspection Required

Because several parts are intentionally under the large OLED body, visually inspect the first delivered board before powering several units. Check top-side placement, pick-and-place rotation, OLED outline, USB-C access, Qwiic access, button access, and that both LDR sensing faces remain exposed.

### Resolved - PCB Preview Export

`bunx tsci build --pcb-png --pcb-svgs` now completes and writes `dist/index/pcb.svg` and `dist/index/pcb.png`. This removes the previous local preview-export blocker.

### P2 - USB Routing Has No Explicit Impedance Constraint

USB D+/D- length matching is acceptable for full-speed USB, and ESD1 protects the USB lines. The design still does not explicitly constrain USB differential impedance.

Measured trace lengths from May 22, 2026:

- `USB_DP`: 82.98 mm total.
- `USB_DM`: 83.38 mm total.
- Mismatch: about 0.40 mm total.

### P2 - Analog Light-Sensor Trace Is Long

The left LDR ADC net is about 82.65 mm total. This is acceptable for a slow light sensor, but firmware should average/filter ADC readings.

The right LDR ADC net is much shorter at about 16.68 mm total.

### P2 - Imported Component Metadata Is Incomplete

The build reports underspecified pin metadata and missing `requires_power` / `requires_ground` attributes on imported parts. The explicit netlist was reviewed and passes, but incomplete metadata limits automated semantic checks.

### P3 - Routing Difficulty Check Did Not Complete

`bunx tsci check routing-difficulty` was run on May 22, 2026. It detected the entrypoint and dispatched 10 sub-solvers, then produced no final report after an extended wait. This looks like a CLI/tool hang. It is not currently treated as an order blocker because `tsci build`, netlist, placement DRC, trace-length checks, and PCB PNG/SVG export all complete.

## Order Recommendation

The prototype order has been placed and is under production. Do not scale beyond this prototype run until:

1. The delivered supplier/BOM/footprint choices match the intended design.
2. First-article inspection confirms rotations, side, and placement.
3. Auto-program behavior is smoke-tested on the first assembled prototype.
4. The first physical fit check confirms the OLED, buttons, LDR windows, USB-C, Qwiic connector, and enclosure clearance.
