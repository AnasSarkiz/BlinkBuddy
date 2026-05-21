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

- Base: matte black.
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
- `buttons`: flat side on the bed.

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

If the buttons rub, increase:

```scad
button_cutout = 8.2;
```

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
