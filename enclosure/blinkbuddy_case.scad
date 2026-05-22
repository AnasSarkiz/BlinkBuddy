// BlinkBuddy printable enclosure.
// Open in OpenSCAD, set part to "base", "top", "buttons", "sensor_windows", or "assembly", then export STL.

part = "assembly";

$fn = 64;

body_color = [0.02, 0.06, 0.20, 1.0];          // midnight blue
top_color = [0.04, 0.14, 0.36, 1.0];           // rich blue top
bezel_color = [0.0, 0.025, 0.08, 1.0];         // near-navy OLED surround
button_color = [1.0, 0.44, 0.08, 1.0];         // bright orange button caps
sensor_color = [0.60, 0.95, 1.0, 0.5];         // translucent ice blue preview
pcb_color = [0.18, 0.23, 0.26, 0.22];          // muted transparent PCB preview

// PCB dimensions from index.circuit.tsx
pcb_w = 82;
pcb_h = 60;
pcb_radius = 2;
pcb_thickness = 1.6;
pcb_clearance = 0.35;

// Case tuning
wall = 2.0;
bottom_thickness = 1.6;
base_wall_height = 16.0;
top_plate_thickness = 2.2;
top_air_gap = 16.5;
corner_radius = 4.0;
oled_clearance_margin = 1.8;
oled_bezel_height = 3.2;
pcb_support_height = 1.25;
mount_hole_d = 3.1;
locator_pin_d = 2.45;
locator_pin_height = 17.0;
locator_pedestal_d = 5.6;

outer_w = pcb_w + 2 * (wall + pcb_clearance);
outer_h = pcb_h + 2 * (wall + pcb_clearance);
inner_w = pcb_w + 2 * pcb_clearance;
inner_h = pcb_h + 2 * pcb_clearance;

// Board coordinate features. Same XY origin as PCB.
oled_x = 1;
oled_y = 2.5;
oled_body_w = 71.1;
oled_body_h = 42.1;
oled_window_w = 58;
oled_window_h = 35;

usb_x = 24;
usb_y = 30;
qwiic_x = -41;
qwiic_y = 4;

button_y = -23;
button_cutout = 8.2;
button_positions = [
  [-18, button_y],
  [0, button_y],
  [18, button_y]
];

ldr_window_d = 9.5;
ldr_positions = [
  [-31.5, -26.4],
  [31.5, -26.2]
];

motion_window = [-37, -9];

// OLED mounting holes imported from HS242L03B2C01, shifted by OLED pcbX/Y.
oled_mount_holes = [
  [oled_x - 33.8755, oled_y + 19.5],
  [oled_x - 33.8755, oled_y - 19.5],
  [oled_x + 34.1244, oled_y - 19.5],
  [oled_x + 34.1244, oled_y + 19.5]
];

module rounded_rect_2d(w, h, r) {
  offset(r = r) {
    square([w - 2 * r, h - 2 * r], center = true);
  }
}

module rounded_box(w, h, z, r) {
  linear_extrude(height = z) {
    rounded_rect_2d(w, h, r);
  }
}

module slot_2d(w, h, r = 1.5) {
  rounded_rect_2d(w, h, min(r, min(w, h) / 2 - 0.05));
}

module oled_locator_post(x, y) {
  translate([x, y, bottom_thickness]) {
    // Wide low pedestal supports the PCB around the OLED/module hole.
    cylinder(d = locator_pedestal_d, h = pcb_support_height);

    // Slim locator pin fits through the 3.1 mm mounting hole without colliding.
    translate([0, 0, pcb_support_height - 0.01]) {
      cylinder(d = locator_pin_d, h = locator_pin_height);
    }
  }
}

module pcb_shadow(z = 0.3) {
  color(pcb_color) {
    translate([0, 0, bottom_thickness + 0.15]) {
      rounded_box(pcb_w, pcb_h, z, pcb_radius);
    }
  }
}

module base_tray() {
  difference() {
    rounded_box(outer_w, outer_h, bottom_thickness + base_wall_height, corner_radius);

    translate([0, 0, bottom_thickness]) {
      rounded_box(inner_w, inner_h, base_wall_height + 0.2, pcb_radius + pcb_clearance);
    }

    // USB-C cable mouth on the top edge. Oversized for molded USB-C plugs.
    translate([usb_x, outer_h / 2 - wall / 2, bottom_thickness + 4.2]) {
      cube([18, wall + 1.2, 8.6], center = true);
    }

    // Qwiic cable mouth on the left edge.
    translate([-outer_w / 2 + wall / 2, qwiic_y, bottom_thickness + 4.0]) {
      cube([wall + 1.2, 16, 8.0], center = true);
    }

    // Keep ESP antenna edge open and plastic-light.
    translate([outer_w / 2 - wall / 2, -5, bottom_thickness + 5.5]) {
      cube([wall + 1.2, 26, 11.0], center = true);
    }
  }

  // Board supports aligned to OLED/module holes. The slim pins fit through the 3.1 mm holes.
  for (p = oled_mount_holes) {
    oled_locator_post(p[0], p[1]);
  }
}

module top_faceplate(zpos = 0) {
  translate([0, 0, zpos]) {
    difference() {
      union() {
        rounded_box(outer_w, outer_h, top_plate_thickness, corner_radius);

        oled_bezel();

        // Friendly rounded brow around buttons.
        translate([0, button_y, top_plate_thickness - 0.01]) {
          linear_extrude(height = 1.0) {
            slot_2d(62, 16, 4);
          }
        }
      }

      // OLED visible area.
      translate([oled_x, oled_y, -0.2]) {
        linear_extrude(height = top_plate_thickness + oled_bezel_height + 1.2) {
          slot_2d(oled_window_w, oled_window_h, 1.8);
        }
      }

      // Full OLED body relief underneath the faceplate so the cover does not press on the module frame.
      translate([oled_x, oled_y, -0.3]) {
        linear_extrude(height = top_plate_thickness + 0.6) {
          slot_2d(oled_body_w + 1.0, oled_body_h + 1.0, 2.5);
        }
      }

      // OLED screw access holes.
      for (p = oled_mount_holes) {
        translate([p[0], p[1], -0.2]) {
          cylinder(d = mount_hole_d + 1.0, h = top_plate_thickness + oled_bezel_height + 1.2);
        }
      }

      // Button openings.
      for (p = button_positions) {
        translate([p[0], p[1], -0.2]) {
          cylinder(d = button_cutout, h = top_plate_thickness + 3.4);
        }
      }

      // Light sensor windows.
      for (p = ldr_positions) {
        translate([p[0], p[1], -0.2]) {
          cylinder(d = ldr_window_d, h = top_plate_thickness + 3.4);
        }
      }

      // Motion sensor window on left side.
      translate([motion_window[0], motion_window[1], -0.2]) {
        linear_extrude(height = top_plate_thickness + 3.4) {
          slot_2d(10, 10, 2);
        }
      }

      // USB-C top access relief.
      translate([usb_x, outer_h / 2 - 3.0, -0.2]) {
        linear_extrude(height = top_plate_thickness + 3.4) {
          slot_2d(20, 12, 2);
        }
      }

      // Qwiic access relief.
      translate([-outer_w / 2 + 3.0, qwiic_y, -0.2]) {
        linear_extrude(height = top_plate_thickness + 3.4) {
          slot_2d(10, 19, 2);
        }
      }

      // ESP antenna area: keep cover open near antenna side.
      translate([outer_w / 2 - 6, -5, -0.2]) {
        linear_extrude(height = top_plate_thickness + 3.4) {
          slot_2d(14, 24, 2);
        }
      }
    }
  }
}

module oled_bezel() {
  translate([oled_x, oled_y, top_plate_thickness - 0.01]) {
    linear_extrude(height = oled_bezel_height) {
      difference() {
        slot_2d(oled_body_w + 2 * oled_clearance_margin, oled_body_h + 2 * oled_clearance_margin, 3.0);
        slot_2d(oled_window_w, oled_window_h, 1.8);
      }
    }
  }
}

module button_caps() {
  for (i = [0 : len(button_positions) - 1]) {
    p = button_positions[i];
    translate([p[0], p[1], 0]) {
      union() {
        cylinder(d = 7.1, h = 2.2);
        translate([0, 0, 2.2]) {
          cylinder(d1 = 7.1, d2 = 6.4, h = 1.3);
        }
      }
    }
  }
}

module sensor_windows() {
  for (p = ldr_positions) {
    translate([p[0], p[1], 0]) {
      cylinder(d = ldr_window_d - 0.6, h = 0.8);
    }
  }

  translate([motion_window[0], motion_window[1], 0]) {
    linear_extrude(height = 0.8) {
      slot_2d(9.2, 9.2, 2);
    }
  }
}

module colored_top_faceplate(zpos = 0) {
  color(top_color) {
    top_faceplate(zpos);
  }

  color(bezel_color) {
    translate([0, 0, zpos]) {
      oled_bezel();
    }
  }
}

module assembly_preview() {
  color(body_color) {
    base_tray();
  }
  pcb_shadow();
  colored_top_faceplate(bottom_thickness + top_air_gap);
  color(button_color) {
    translate([0, 0, bottom_thickness + top_air_gap + top_plate_thickness + 0.2]) {
      button_caps();
    }
  }
  color(sensor_color) {
    translate([0, 0, bottom_thickness + top_air_gap + top_plate_thickness + 0.05]) {
      sensor_windows();
    }
  }
}

if (part == "base") {
  base_tray();
} else if (part == "top") {
  top_faceplate();
} else if (part == "buttons") {
  button_caps();
} else if (part == "sensor_windows") {
  sensor_windows();
} else {
  assembly_preview();
}
