# BlinkBuddy 3D Printable Enclosure

This folder contains a parametric OpenSCAD enclosure for the BlinkBuddy PCB.

It is designed around the current board:

- PCB: `82 mm x 60 mm`
- PCB corner radius: about `2 mm`
- Large OLED mounted on top
- Three exposed buttons
- Left/right LDR light sensors exposed
- Left-side motion sensor exposed
- USB-C and Qwiic connector access
- ESP32-C3 antenna edge kept open

This is a tall-clearance draft. The OLED module in the tscircuit 3D viewer sits high above the PCB, so the default case gives the top cover about `16.5 mm` of air gap above the board area instead of a low snap-on skin.

## STEP Measurement Note

The provided `/Users/anassarkiz/Downloads/BlinkBuddy.step` file was measured on May 21, 2026:

- X size: `82.0 mm`
- Y size: `60.0 mm`
- Z size: `2.4 mm`

That STEP file appears to contain the PCB/pads only, not the full component and OLED 3D assembly. It confirms the board outline, but it does **not** provide the real OLED stack height. The current enclosure therefore uses a screenshot-based tall clearance of `16.5 mm`.

For exact enclosure tuning, export a full assembly model if tscircuit offers one. GLB or GLTF may include the visible 3D components better than the current STEP export.

## Mount Hole / Screw Closure Check

The OLED/module mounting holes were double-checked against the board STEP coordinates:

| Hole | Enclosure XY | STEP XY | Status |
| --- | --- | --- | --- |
| Top-left | `(-32.8755, 22.0)` | `(-32.8755, 22.0)` | Aligned |
| Bottom-left | `(-32.8755, -17.0)` | `(-32.8755, -17.0)` | Aligned |
| Bottom-right | `(35.1244, -17.0)` | `(35.1244, -17.0)` | Aligned |
| Top-right | `(35.1244, 22.0)` | `(35.1244, 22.0)` | Aligned |

The board/OLED mounting holes are about `3.1 mm` diameter. The screw-fastened design now uses:

- `5.6 mm` low base pedestals aligned under the four holes.
- `2.6 mm` slim M2 screw posts that pass through the `3.1 mm` board/OLED holes without colliding.
- `1.45 mm` pilot holes in those posts for M2 self-tapping/thread-forming screws.
- `3.2 mm` top-cover screw clearance holes, intentionally oversized so the holes are visible and easy to use.
- `6.0 mm` shallow counterbores for M2 screw heads.

The top cover is fastened by M2 screws through the top cover into the four slim support posts. The underside locating lip and small friction ribs still help align the cover and keep it from rattling.

The front/bottom lip is intentionally only in the center. The left and right bottom corners stay open so the underside lip does not shade or collide with the LDR sensor windows.

## Fit Audit

Current calculated fit values:

| Check | Value | Result |
| --- | --- | --- |
| PCB size | `82.0 mm x 60.0 mm` | Matches board code and STEP measurement. |
| Base inside tray | `82.7 mm x 60.7 mm` | Gives `0.35 mm` PCB clearance per side. |
| Base outside size | `86.7 mm x 64.7 mm` | Includes `2.0 mm` wall plus PCB clearance. |
| Top locating lip clearance | `0.30 mm` per side | Should fit normal FDM prints; tune if tight/loose. |
| Snap rib remaining clearance | about `0.16 mm` | Intentionally snug; sand ribs if needed. |
| Screw post diameter | `2.6 mm` in `3.1 mm` holes | About `0.25 mm` radial clearance. |
| M2 pilot hole | `1.45 mm` | Intended for M2 self-tapping/thread-forming screws. |
| Top screw clearance | `3.2 mm` | Oversized so M2 screws pass cleanly and the holes are visible. |
| Screw post top gap | about `0.31 mm` below cover | Prevents post/cover collision. |
| Screw bridge before bite | about `4.6 mm` from counterbore | M2 x 12 mm or M2 x 14 mm should still get useful thread bite. |
| Top cover/base overlap | about `3.5 mm` | Lip engages the base wall instead of just sitting on top. |
| Remaining bottom lip to LDR centers | about `17.7 mm` | Clear of the `9.5 mm` LDR windows. |
| Button plunger depth | about `11.8 mm` | Targets the real switch plungers with `0.4 mm` press gap. |

This audit checks the SCAD dimensions against the board coordinates. The one thing it cannot prove locally is the exact OLED/module vertical stack height, because the available STEP file contains the PCB/pads but not the full assembled OLED height.

## Files

| File | Purpose |
| --- | --- |
| `blinkbuddy_case.scad` | Parametric printable case/cover design. |

## Parts

The OpenSCAD file can generate:

- `base`: bottom tray for the PCB.
- `top`: top faceplate/bezel with OLED, button, sensor, USB-C, and Qwiic openings.
- `buttons`: optional printed button caps.
- `sensor_windows`: optional translucent inserts for LDR/motion sensor openings.
- `assembly`: preview of all parts together.

## Color Plan

The OpenSCAD assembly preview includes colors:

- Base: midnight blue.
- Top cover: rich blue.
- OLED bezel: near-navy.
- Button caps: bright orange.
- Optional sensor-window inserts: translucent ice blue.

The faint shape inside the assembly preview is only a muted transparent PCB reference, not a printed part.

Important: STL files do not reliably store color for normal slicers. Treat color as a preview/material plan. For real prints, export the parts separately and print each with the filament color you want.

Recommended physical colors:

- `base`: midnight blue PETG or PLA.
- `top`: royal blue, rich blue, or slightly lighter blue PETG/PLA.
- `buttons`: orange, amber, coral, or another bright accent color.
- `sensor_windows`: clear/translucent filament, or skip these inserts and leave the sensor holes open.

## Export STL

1. Install OpenSCAD.
2. Open `blinkbuddy_case.scad`.
3. Change the first line:

```scad
part = "base";
```

4. Press `F6` to render.
5. Export STL.
6. Repeat for:

```scad
part = "top";
part = "buttons";
part = "sensor_windows";
```

## STL vs STEP

For 3D printing, use **STL**. That is the normal format for slicers.

Use **STEP** only if you want to edit the enclosure in CAD software such as Fusion 360, FreeCAD, or Onshape. OpenSCAD can export STL directly, but STEP export support depends on your OpenSCAD version and setup.

For this project:

- Print files: export `base`, `top`, `buttons`, and optionally `sensor_windows` as STL.
- CAD collaboration/editing: STEP is nice, but not required for printing.

## Print Settings

Recommended first print:

- Material: PLA or PETG.
- Layer height: `0.20 mm`.
- Nozzle: `0.4 mm`.
- Walls/perimeters: `3`.
- Infill: `20%`.
- Supports: off for `base`; maybe on for `top` depending on your slicer orientation.

Print orientation:

- `base`: flat bottom on the bed.
- `top`: outside face on the bed if your slicer bridges the cutouts cleanly; otherwise rotate for best finish.
- `buttons`: stem side on the bed; use a brim if the tall stems wobble while printing.

## Fit Tuning

If the PCB is too tight or too loose, edit:

```scad
pcb_clearance = 0.35;
```

For most FDM printers:

- Tight printer: use `0.45`.
- Very accurate printer: use `0.25`.

If the top cover hits the OLED/module stack, increase:

```scad
top_air_gap = 16.5;
base_wall_height = 16.0;
```

Keep `base_wall_height` close to `top_air_gap` so the side walls reach the top faceplate.

If the OLED bezel feels too low or too thin, tune:

```scad
oled_bezel_height = 3.2;
oled_clearance_margin = 1.8;
```

If the top cover is too loose or too tight in the body, tune:

```scad
top_lip_clearance = 0.30;
snap_rib_thickness = 0.28;
snap_rib_length = 10.0;
```

Use these rules:

- If the cover is too tight, increase `top_lip_clearance` or decrease `snap_rib_thickness`.
- If the cover is loose, decrease `top_lip_clearance` or increase `snap_rib_thickness` slightly.
- Sand the snap ribs lightly after printing if the first fit is close but too stiff.

If the screws are too tight or too loose in the support posts, tune:

```scad
m2_pilot_d = 1.45;
m2_clearance_d = 3.2;
screw_head_d = 6.0;
```

Recommended first screws: M2 x 12 mm or M2 x 14 mm. The posts stop just below the cover so they do not collide with the cover holes, and the screw bridges that small gap before biting into the post.

If the buttons rub, increase:

```scad
button_cutout = 8.2;
```

The printed button XY centers match the real board switches:

| Printed cap | Board switch | XY |
| --- | --- | --- |
| Left | `SW1` | `(-18, -23)` |
| OK | `SW2` | `(0, -23)` |
| Right | `SW3` | `(18, -23)` |

The caps now include a long underside plunger. The default assumes the tactile switch button/plunger top is about `5.0 mm` above the PCB. With the current case stack, the plunger reaches down to about `0.4 mm` above the switch before pressing, so it should click after a short travel instead of holding the switch down all the time.

The orange finger pads sit above the raised blue button brow, not just above the flat top cover. This prevents the brow from visually cutting into the button caps in the assembly preview.

If the printed buttons do not click the real switches, tune:

```scad
button_brow_height = 1.0;
switch_plunger_height = 5.0;
button_press_gap = 0.4;
button_rest_gap_above_brow = 0.35;
button_stem_d = 3.0;
```

Use these rules:

- If a button floats and never clicks, increase `switch_plunger_height` or decrease `button_press_gap`.
- If a button is always pressed, decrease `switch_plunger_height` or increase `button_press_gap`.
- If a button wobbles too much, increase `button_guide_d`, but keep it smaller than `button_cutout`.

## Important Before Final Print

Print a cheap draft first and test fit the real assembled PCB.

Check:

1. USB-C cable fits.
2. Qwiic cable fits.
3. All three buttons click cleanly.
4. Left and right LDRs are not covered.
5. OLED is not pressed by the cover.
6. ESP32 antenna edge remains plastic-only/open, with no metal nearby.

Best next step: export the full board assembly as GLB/GLTF if available and compare it against this OpenSCAD model in a CAD tool. That will give the exact OLED height instead of relying on screenshots.
