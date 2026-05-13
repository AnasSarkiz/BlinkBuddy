import { A_0603WAF1001T5E } from "./imports/A_0603WAF1001T5E";
import { A_0603WAF1002T5E } from "./imports/A_0603WAF1002T5E";
import { A_0603WAF4701T5E } from "./imports/A_0603WAF4701T5E";
import { A_0603WAF5101T5E } from "./imports/A_0603WAF5101T5E";
import { CC0603KRX7R9BB104 } from "./imports/CC0603KRX7R9BB104";
import { CH340C } from "./imports/CH340C";
import { CL10A106MQ8NNNC } from "./imports/CL10A106MQ8NNNC";
import { ESP32_C3_WROOM_02_N4 } from "./imports/ESP32_C3_WROOM_02_N4";
import { GL5528 } from "./imports/GL5528";
import { KT_0603R } from "./imports/KT_0603R";
import { LIS3DHTR } from "./imports/LIS3DHTR";
import { MLT_5020 } from "./imports/MLT_5020";
import { S8050_J3Y_RANGE_200_350_ } from "./imports/S8050_J3Y_RANGE_200_350_";
import { SM04B_SRSS_TB_LF__SN_ } from "./imports/SM04B_SRSS_TB_LF__SN_";
import { TL3301AF160QG } from "./imports/TL3301AF160QG";
import { TYPE_C_31_M_12 } from "./imports/TYPE_C_31_M_12";
import { XC6206P332MR_G } from "./imports/XC6206P332MR_G";

const signalTrace = "0.18mm";
const powerTrace = "0.45mm";

export default () => (
	<board
		width="72mm"
		height="48mm"
		layers={2}
		borderRadius="3mm"
		title="BlinkBuddy Sense Qwiic"
	>
		<TYPE_C_31_M_12
			name="J1"
			pcbX={0}
			pcbY={20.3}
			pcbRotation={180}
			layer="top"
		/>
		<SM04B_SRSS_TB_LF__SN_
			name="J2"
			pcbX={21}
			pcbY={20.4}
			pcbRotation={180}
			layer="top"
		/>

		<XC6206P332MR_G
			name="U3"
			pcbX={-11}
			pcbY={16}
			pcbRotation={180}
			layer="top"
		/>
		<CH340C name="U2" pcbX={-24} pcbY={10.2} pcbRotation={0} layer="top" />
		<ESP32_C3_WROOM_02_N4
			name="U1"
			pcbX={20}
			pcbY={2.2}
			pcbRotation={270}
			layer="top"
		/>

		<LIS3DHTR name="U4" pcbX={4} pcbY={-7} pcbRotation={0} layer="top" />
		<GL5528 name="LDR_L" pcbX={-33} pcbY={0} pcbRotation={90} layer="top" />
		<GL5528 name="LDR_R" pcbX={33} pcbY={-13} pcbRotation={270} layer="top" />

		<TL3301AF160QG
			name="SW1"
			pcbX={-16}
			pcbY={-16.5}
			pcbRotation={90}
			layer="top"
		/>
		<TL3301AF160QG
			name="SW2"
			pcbX={0}
			pcbY={-16.5}
			pcbRotation={90}
			layer="top"
		/>
		<TL3301AF160QG
			name="SW3"
			pcbX={16}
			pcbY={-16.5}
			pcbRotation={90}
			layer="top"
		/>

		<MLT_5020 name="BZ1" pcbX={-29} pcbY={-8} pcbRotation={0} layer="top" />
		<S8050_J3Y_RANGE_200_350_
			name="Q1"
			pcbX={-18}
			pcbY={-5}
			pcbRotation={90}
			layer="top"
		/>
		<KT_0603R name="D1" pcbX={27} pcbY={-21.5} pcbRotation={180} layer="top" />

		<A_0603WAF5101T5E
			name="R1"
			pcbX={-7.5}
			pcbY={15.4}
			pcbRotation={90}
			layer="top"
		/>
		<A_0603WAF5101T5E name="R2" pcbX={7.5} pcbY={15.4} layer="top" />
		<A_0603WAF4701T5E
			name="R3"
			pcbX={16.4}
			pcbY={14}
			pcbRotation={0}
			layer="top"
		/>
		<A_0603WAF4701T5E
			name="R4"
			pcbX={24}
			pcbY={16}
			pcbRotation={0}
			layer="top"
		/>
		<A_0603WAF1002T5E name="R5" pcbX={10} pcbY={20.2} layer="top" />
		<A_0603WAF1002T5E
			name="R6"
			pcbX={-23.5}
			pcbY={-4.2}
			pcbRotation={90}
			layer="top"
		/>
		<A_0603WAF1002T5E
			name="R7"
			pcbX={28.5}
			pcbY={-16.6}
			pcbRotation={90}
			layer="top"
		/>
		<A_0603WAF1001T5E
			name="R8"
			pcbX={-13}
			pcbY={-5}
			pcbRotation={0}
			layer="top"
		/>
		<A_0603WAF1001T5E
			name="R9"
			pcbX={23}
			pcbY={-21.5}
			pcbRotation={0}
			layer="top"
		/>

		<CC0603KRX7R9BB104
			name="C1"
			pcbX={11.2}
			pcbY={12.8}
			pcbRotation={0}
			layer="top"
		/>
		<CC0603KRX7R9BB104
			name="C2"
			pcbX={-16.6}
			pcbY={8.3}
			pcbRotation={90}
			layer="top"
		/>
		<CC0603KRX7R9BB104
			name="C3"
			pcbX={-2}
			pcbY={-7}
			pcbRotation={90}
			layer="top"
		/>
		<CC0603KRX7R9BB104
			name="C4"
			pcbX={-15.8}
			pcbY={17.2}
			pcbRotation={90}
			layer="top"
		/>
		<CL10A106MQ8NNNC
			name="C5"
			pcbX={1}
			pcbY={12.8}
			pcbRotation={90}
			layer="top"
		/>
		<CL10A106MQ8NNNC
			name="C6"
			pcbX={-4}
			pcbY={12.8}
			pcbRotation={90}
			layer="top"
		/>

		<testpoint
			name="TP_GND"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={-25}
			pcbY={-22}
			layer="top"
		/>
		<testpoint
			name="TP_3V3"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={-19}
			pcbY={-22}
			layer="top"
		/>
		<testpoint
			name="TP_TX"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={-13}
			pcbY={-22}
			layer="top"
		/>
		<testpoint
			name="TP_RX"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={-7}
			pcbY={-22}
			layer="top"
		/>
		<testpoint
			name="TP_EN"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={-1}
			pcbY={-22}
			layer="top"
		/>
		<testpoint
			name="TP_BOOT"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={5}
			pcbY={-22}
			layer="top"
		/>

		<keepout
			shape="rect"
			pcbX={31}
			pcbY={2.5}
			width="8mm"
			height="23mm"
			layers={["top", "bottom"]}
		/>

		<trace from=".J1 > .A1B12" to="net.GND" thickness={powerTrace} />
		<trace from=".J1 > .B1A12" to="net.GND" thickness={powerTrace} />
		<trace from=".J1 > .EH1" to="net.GND" thickness={powerTrace} />
		<trace from=".J1 > .EH2" to="net.GND" thickness={powerTrace} />
		<trace from=".J1 > .EH3" to="net.GND" thickness={powerTrace} />
		<trace from=".J1 > .EH4" to="net.GND" thickness={powerTrace} />
		<trace from=".J1 > .B4A9" to="net.VBUS_5V" thickness={powerTrace} />
		<trace from=".J1 > .A4B9" to="net.VBUS_5V" thickness={powerTrace} />
		<trace from=".J1 > .A5" to=".R1 > .pin1" thickness={signalTrace} />
		<trace from=".J1 > .B5" to=".R2 > .pin1" thickness={signalTrace} />
		<trace from=".R1 > .pin2" to="net.GND" thickness={signalTrace} />
		<trace from=".R2 > .pin2" to="net.GND" thickness={signalTrace} />

		<trace from=".J1 > .A6" to="net.USB_DP" thickness={signalTrace} />
		<trace from=".J1 > .B6" to="net.USB_DP" thickness={signalTrace} />
		<trace from=".J1 > .A7" to="net.USB_DM" thickness={signalTrace} />
		<trace from=".J1 > .B7" to="net.USB_DM" thickness={signalTrace} />
		<trace from=".U2 > .D_POS" to="net.USB_DP" thickness={signalTrace} />
		<trace from=".U2 > .D_NEG" to="net.USB_DM" thickness={signalTrace} />

		<trace from=".U3 > .Vin" to="net.VBUS_5V" thickness={powerTrace} />
		<trace from=".U3 > .Vout" to="net.V3_3" thickness={powerTrace} />
		<trace from=".U3 > .GND" to="net.GND" thickness={powerTrace} />
		<trace from=".C4 > .pin1" to="net.VBUS_5V" thickness={powerTrace} />
		<trace from=".C4 > .pin2" to="net.GND" thickness={powerTrace} />
		<trace from=".C5 > .pin1" to="net.VBUS_5V" thickness={powerTrace} />
		<trace from=".C5 > .pin2" to="net.GND" thickness={powerTrace} />
		<trace from=".C6 > .pin1" to="net.V3_3" thickness={powerTrace} />
		<trace from=".C6 > .pin2" to="net.GND" thickness={powerTrace} />

		<trace from=".U1 > .3V3" to="net.V3_3" thickness={powerTrace} />
		<trace from=".U1 > .GND" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .EP1" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .pin20" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .pin21" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .pin22" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .pin23" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .pin24" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .pin25" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .pin26" to="net.GND" thickness={powerTrace} />
		<trace from=".U1 > .pin27" to="net.GND" thickness={powerTrace} />
		<trace from=".C1 > .pin1" to="net.V3_3" thickness={powerTrace} />
		<trace from=".C1 > .pin2" to="net.GND" thickness={powerTrace} />

		<trace from=".U2 > .VCC" to="net.V3_3" thickness={powerTrace} />
		<trace from=".U2 > .V3" to="net.V3_3" thickness={powerTrace} />
		<trace from=".U2 > .GND" to="net.GND" thickness={powerTrace} />
		<trace from=".C2 > .pin1" to="net.V3_3" thickness={powerTrace} />
		<trace from=".C2 > .pin2" to="net.GND" thickness={powerTrace} />
		<trace from=".U2 > .TXD" to="net.ESP_RX" thickness={signalTrace} />
		<trace from=".U2 > .RXD" to="net.ESP_TX" thickness={signalTrace} />
		<trace from=".U1 > .RXD" to="net.ESP_RX" thickness={signalTrace} />
		<trace from=".U1 > .TXD" to="net.ESP_TX" thickness={signalTrace} />

		<trace from=".U1 > .IO4" to="net.I2C_SDA" thickness={signalTrace} />
		<trace from=".U1 > .IO5" to="net.I2C_SCL" thickness={signalTrace} />
		<trace from=".J2 > .pin1" to="net.GND" thickness={powerTrace} />
		<trace from=".J2 > .pin2" to="net.V3_3" thickness={powerTrace} />
		<trace from=".J2 > .pin3" to="net.I2C_SDA" thickness={signalTrace} />
		<trace from=".J2 > .pin4" to="net.I2C_SCL" thickness={signalTrace} />
		<trace from=".J2 > .pin5" to="net.GND" thickness={powerTrace} />
		<trace from=".J2 > .pin6" to="net.GND" thickness={powerTrace} />
		<trace from=".R3 > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".R3 > .pin2" to="net.I2C_SDA" thickness={signalTrace} />
		<trace from=".R4 > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".R4 > .pin2" to="net.I2C_SCL" thickness={signalTrace} />

		<trace from=".U4 > .VDD_IO" to="net.V3_3" thickness={powerTrace} />
		<trace from=".U4 > .VDD" to="net.V3_3" thickness={powerTrace} />
		<trace from=".U4 > .GND1" to="net.GND" thickness={powerTrace} />
		<trace from=".U4 > .GND2" to="net.GND" thickness={powerTrace} />
		<trace from=".U4 > .pin4" to="net.I2C_SCL" thickness={signalTrace} />
		<trace from=".U4 > .pin6" to="net.I2C_SDA" thickness={signalTrace} />
		<trace from=".U4 > .CS" to="net.V3_3" thickness={signalTrace} />
		<trace from=".U4 > .pin7" to="net.V3_3" thickness={signalTrace} />
		<trace from=".U4 > .RES" to="net.GND" thickness={signalTrace} />
		<trace from=".C3 > .pin1" to="net.V3_3" thickness={powerTrace} />
		<trace from=".C3 > .pin2" to="net.GND" thickness={powerTrace} />

		<trace from=".LDR_L > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".LDR_L > .pin2" to="net.LDR_LEFT" thickness={signalTrace} />
		<trace from=".R6 > .pin1" to="net.LDR_LEFT" thickness={signalTrace} />
		<trace from=".R6 > .pin2" to="net.GND" thickness={signalTrace} />
		<trace from=".U1 > .IO0" to="net.LDR_LEFT" thickness={signalTrace} />
		<trace from=".LDR_R > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".LDR_R > .pin2" to="net.LDR_RIGHT" thickness={signalTrace} />
		<trace from=".R7 > .pin1" to="net.LDR_RIGHT" thickness={signalTrace} />
		<trace from=".R7 > .pin2" to="net.GND" thickness={signalTrace} />
		<trace from=".U1 > .IO1" to="net.LDR_RIGHT" thickness={signalTrace} />

		<trace from=".U1 > .IO6" to="net.BTN_LEFT" thickness={signalTrace} />
		<trace from=".U1 > .IO7" to="net.BTN_OK" thickness={signalTrace} />
		<trace from=".U1 > .IO8" to="net.BTN_RIGHT" thickness={signalTrace} />
		<trace from=".SW1 > .pin1" to="net.BTN_LEFT" thickness={signalTrace} />
		<trace from=".SW1 > .pin4" to="net.BTN_LEFT" thickness={signalTrace} />
		<trace from=".SW1 > .pin2" to="net.GND" thickness={signalTrace} />
		<trace from=".SW1 > .pin3" to="net.GND" thickness={signalTrace} />
		<trace from=".SW2 > .pin1" to="net.BTN_OK" thickness={signalTrace} />
		<trace from=".SW2 > .pin4" to="net.BTN_OK" thickness={signalTrace} />
		<trace from=".SW2 > .pin2" to="net.GND" thickness={signalTrace} />
		<trace from=".SW2 > .pin3" to="net.GND" thickness={signalTrace} />
		<trace from=".SW3 > .pin1" to="net.BTN_RIGHT" thickness={signalTrace} />
		<trace from=".SW3 > .pin4" to="net.BTN_RIGHT" thickness={signalTrace} />
		<trace from=".SW3 > .pin2" to="net.GND" thickness={signalTrace} />
		<trace from=".SW3 > .pin3" to="net.GND" thickness={signalTrace} />

		<trace from=".U1 > .IO10" to=".R8 > .pin1" thickness={signalTrace} />
		<trace from=".R8 > .pin2" to=".Q1 > .B" thickness={signalTrace} />
		<trace from=".Q1 > .E" to="net.GND" thickness={powerTrace} />
		<trace from=".Q1 > .C" to="net.BUZZ_LOW" thickness={powerTrace} />
		<trace from=".BZ1 > ._POS" to="net.V3_3" thickness={powerTrace} />
		<trace from=".BZ1 > ._NEG" to="net.BUZZ_LOW" thickness={powerTrace} />
		<trace from=".BZ1 > .NC" to="net.GND" thickness={signalTrace} />

		<trace from=".U1 > .IO3" to=".R9 > .pin1" thickness={signalTrace} />
		<trace from=".R9 > .pin2" to=".D1 > .pin1" thickness={signalTrace} />
		<trace from=".D1 > .pin2" to="net.GND" thickness={signalTrace} />

		<trace from=".R5 > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".R5 > .pin2" to="net.ESP_EN" thickness={signalTrace} />
		<trace from=".U1 > .EN" to="net.ESP_EN" thickness={signalTrace} />

		<trace from=".TP_GND > .pin1" to="net.GND" thickness={signalTrace} />
		<trace from=".TP_3V3 > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".TP_TX > .pin1" to="net.ESP_TX" thickness={signalTrace} />
		<trace from=".TP_RX > .pin1" to="net.ESP_RX" thickness={signalTrace} />
		<trace from=".TP_EN > .pin1" to="net.ESP_EN" thickness={signalTrace} />
		<trace from=".TP_BOOT > .pin1" to=".U1 > .IO9" thickness={signalTrace} />

		<copperpour
			name="GND_TOP"
			connectsTo="net.GND"
			layer="top"
			clearance="0.25mm"
			outline={[
				{ x: -35, y: -23 },
				{ x: 35, y: -23 },
				{ x: 35, y: -9 },
				{ x: 27, y: -9 },
				{ x: 27, y: 14 },
				{ x: 35, y: 14 },
				{ x: 35, y: 23 },
				{ x: -35, y: 23 },
			]}
		/>
		<copperpour
			name="GND_BOTTOM"
			connectsTo="net.GND"
			layer="bottom"
			clearance="0.25mm"
			outline={[
				{ x: -35, y: -23 },
				{ x: 35, y: -23 },
				{ x: 35, y: -9 },
				{ x: 27, y: -9 },
				{ x: 27, y: 14 },
				{ x: 35, y: 14 },
				{ x: 35, y: 23 },
				{ x: -35, y: 23 },
			]}
		/>

		<silkscreenrect
			pcbX={0}
			pcbY={3.4}
			width="24mm"
			height="13mm"
			cornerRadius="1.2mm"
		/>
		<silkscreenpath
			route={[
				{ x: -7.6, y: 5.5 },
				{ x: -5.8, y: 6.5 },
				{ x: -4, y: 5.5 },
			]}
		/>
		<silkscreenpath
			route={[
				{ x: 4, y: 5.5 },
				{ x: 5.8, y: 6.5 },
				{ x: 7.6, y: 5.5 },
			]}
		/>
		<silkscreenpath
			route={[
				{ x: -5.5, y: 0.5 },
				{ x: -2.5, y: -1 },
				{ x: 2.5, y: -1 },
				{ x: 5.5, y: 0.5 },
			]}
		/>
		<silkscreentext
			text="OLED FACE ZONE"
			pcbX={0}
			pcbY={11.2}
			fontSize="0.85mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="BlinkBuddy Sense Qwiic"
			pcbX={-20}
			pcbY={22.2}
			fontSize="0.9mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="USB-C"
			pcbX={0}
			pcbY={16.7}
			fontSize="0.8mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="QWIIC"
			pcbX={21}
			pcbY={16.7}
			fontSize="0.8mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="G 3V S D"
			pcbX={21}
			pcbY={15}
			fontSize="0.65mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="L"
			pcbX={-33.2}
			pcbY={4.4}
			fontSize="1mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="R"
			pcbX={33.2}
			pcbY={-8.8}
			fontSize="1mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="LEFT"
			pcbX={-16}
			pcbY={-10.6}
			fontSize="0.8mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="OK"
			pcbX={0}
			pcbY={-10.6}
			fontSize="0.8mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="RIGHT"
			pcbX={16}
			pcbY={-10.6}
			fontSize="0.8mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="ANTENNA NO COPPER"
			pcbX={31.5}
			pcbY={10.6}
			fontSize="0.55mm"
			anchorAlignment="center"
			pcbRotation={90}
		/>
		<silkscreentext
			text="GND  3V3  TX  RX  EN  BOOT"
			pcbX={-10}
			pcbY={-20.4}
			fontSize="0.65mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="BOTTOM: ROUTES + GND POUR"
			pcbX={0}
			pcbY={0}
			fontSize="0.8mm"
			anchorAlignment="center"
			layer="bottom"
		/>
	</board>
);
