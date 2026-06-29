import { A_0603WAF1001T5E } from "./imports/A_0603WAF1001T5E";
import { A_0603WAF1002T5E } from "./imports/A_0603WAF1002T5E";
import { A_0603WAF4701T5E } from "./imports/A_0603WAF4701T5E";
import { A_0603WAF5101T5E } from "./imports/A_0603WAF5101T5E";
import { CC0603KRX7R9BB104 } from "./imports/CC0603KRX7R9BB104";
import { CH340C } from "./imports/CH340C";
import { CL10A106MQ8NNNC } from "./imports/CL10A106MQ8NNNC";
import { ESP32_C3_WROOM_02_N4 } from "./imports/ESP32_C3_WROOM_02_N4";
import { GL5528 } from "./imports/GL5528";
import { HS242L03B2C01 } from "./imports/HS242L03B2C01";
import { KT_0603R } from "./imports/KT_0603R";
import { LIS3DHTR } from "./imports/LIS3DHTR";
import { MLT_5020 } from "./imports/MLT_5020";
import { S8050_J3Y_RANGE_200_350_ } from "./imports/S8050_J3Y_RANGE_200_350_";
import { SM04B_SRSS_TB_LF__SN_ } from "./imports/SM04B_SRSS_TB_LF__SN_";
import { TL3301AF160QG } from "./imports/TL3301AF160QG";
import { TYPE_C_31_M_12 } from "./imports/TYPE_C_31_M_12";
import { USBLC6_2SC6 } from "./imports/USBLC6_2SC6";
import { XC6220B331MR_G } from "./imports/XC6220B331MR_G";
import { BoardLinkQrSilkscreen } from "./BoardLinkQrSilkscreen";

const signalTrace = "0.18mm";
const powerTrace = "0.45mm";
export default () => (
	<board
		width="82mm"
		height="60mm"
		layers={2}
		borderRadius="2mm"
		minViaPadDiameter={0.45}
		minViaHoleDiameter={0.3}
		title="BlinkBuddy Sense Qwiic"
	>
		<TYPE_C_31_M_12
			name="J1"
			pcbX={24}
			pcbY={25}
			pcbRotation={180}
			layer="top"
		/>
		<SM04B_SRSS_TB_LF__SN_
			name="J2"
			pcbX={-38.2}
			pcbY={4}
			pcbRotation={270}
			layer="top"
		/>

		<XC6220B331MR_G
			name="U3"
			pcbX={-25}
			pcbY={6}
			pcbRotation={180}
			layer="top"
		/>
		<CH340C name="U2" pcbX={-16} pcbY={-11} pcbRotation={0} layer="top" />
		<ESP32_C3_WROOM_02_N4
			name="U1"
			pcbX={23}
			pcbY={-5.2}
			pcbRotation={270}
			layer="top"
		/>

		<LIS3DHTR name="U4" pcbX={-37} pcbY={-9} pcbRotation={0} layer="top" />
		<GL5528
			name="LDR_L"
			pcbX={-31.5}
			pcbY={-26.4}
			pcbRotation={90}
			layer="top"
		/>
		<GL5528
			name="LDR_R"
			pcbX={31.5}
			pcbY={-26.2}
			pcbRotation={270}
			layer="top"
		/>
		<HS242L03B2C01 name="OLED1" pcbX={1} pcbY={2.5} layer="top" />

		<TL3301AF160QG
			name="SW1"
			pcbX={-18}
			pcbY={-23}
			pcbRotation={90}
			layer="top"
		/>
		<TL3301AF160QG
			name="SW2"
			pcbX={0}
			pcbY={-23}
			pcbRotation={90}
			layer="top"
		/>
		<TL3301AF160QG
			name="SW3"
			pcbX={18}
			pcbY={-23}
			pcbRotation={90}
			layer="top"
		/>

		<MLT_5020 name="BZ1" pcbX={-27} pcbY={-1} pcbRotation={0} layer="top" />
		<S8050_J3Y_RANGE_200_350_
			name="Q1"
			pcbX={-19}
			pcbY={2}
			pcbRotation={90}
			layer="top"
		/>
		<KT_0603R name="D1" pcbX={36} pcbY={14} pcbRotation={180} layer="top" />
		<USBLC6_2SC6 name="ESD1" pcbX={24} pcbY={14.8} layer="top" />
		<S8050_J3Y_RANGE_200_350_
			name="Q2"
			pcbX={-6}
			pcbY={-6.8}
			pcbRotation={90}
			layer="top"
		/>
		<S8050_J3Y_RANGE_200_350_
			name="Q3"
			pcbX={-6}
			pcbY={-2.2}
			pcbRotation={90}
			layer="top"
		/>

		<A_0603WAF5101T5E
			name="R1"
			pcbX={17}
			pcbY={20}
			pcbRotation={90}
			layer="top"
		/>
		<A_0603WAF5101T5E
			name="R2"
			pcbX={31}
			pcbY={20}
			pcbRotation={270}
			layer="top"
		/>
		<A_0603WAF4701T5E
			name="R3"
			pcbX={-30.8}
			pcbY={11.2}
			pcbRotation={90}
			layer="top"
		/>
		<A_0603WAF4701T5E
			name="R4"
			pcbX={-30.8}
			pcbY={14.8}
			pcbRotation={90}
			layer="top"
		/>
		<A_0603WAF1002T5E name="R5" pcbX={12.5} pcbY={-7} layer="top" />
		<A_0603WAF1002T5E
			name="R6"
			pcbX={-34}
			pcbY={-21.5}
			pcbRotation={90}
			layer="top"
		/>
		<A_0603WAF1002T5E
			name="R7"
			pcbX={34}
			pcbY={-21.2}
			pcbRotation={90}
			layer="top"
		/>
		<A_0603WAF1001T5E
			name="R8"
			pcbX={-15.5}
			pcbY={2}
			pcbRotation={0}
			layer="top"
		/>
		<A_0603WAF1001T5E
			name="R9"
			pcbX={28}
			pcbY={12}
			pcbRotation={0}
			layer="top"
		/>
		<A_0603WAF1002T5E
			name="R10"
			pcbX={-8.5}
			pcbY={-10}
			pcbRotation={0}
			layer="top"
		/>
		<A_0603WAF1002T5E
			name="R11"
			pcbX={-11}
			pcbY={-2.2}
			pcbRotation={0}
			layer="top"
		/>
		<A_0603WAF1002T5E
			name="R12"
			pcbX={8.5}
			pcbY={-10}
			pcbRotation={90}
			layer="top"
		/>

		<CC0603KRX7R9BB104
			name="C1"
			pcbX={12.5}
			pcbY={0}
			pcbRotation={0}
			layer="top"
		/>
		<CC0603KRX7R9BB104
			name="C2"
			pcbX={-23.5}
			pcbY={-11}
			pcbRotation={90}
			layer="top"
		/>
		<CC0603KRX7R9BB104
			name="C3"
			pcbX={-33.5}
			pcbY={-9}
			pcbRotation={90}
			layer="top"
		/>
		<CC0603KRX7R9BB104
			name="C4"
			pcbX={-25}
			pcbY={9.7}
			pcbRotation={90}
			layer="top"
		/>
		<CL10A106MQ8NNNC
			name="C5"
			pcbX={-22.5}
			pcbY={2}
			pcbRotation={90}
			layer="top"
		/>
		<CL10A106MQ8NNNC
			name="C6"
			pcbX={-22}
			pcbY={6}
			pcbRotation={90}
			layer="top"
		/>
		<CC0603KRX7R9BB104
			name="C7"
			pcbX={8.5}
			pcbY={-4}
			pcbRotation={90}
			layer="top"
		/>

		<testpoint
			name="TP_GND"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={-15}
			pcbY={27}
			layer="top"
		/>
		<testpoint
			name="TP_3V3"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={-9}
			pcbY={27}
			layer="top"
		/>
		<testpoint
			name="TP_TX"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={-3}
			pcbY={27}
			layer="top"
		/>
		<testpoint
			name="TP_RX"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={3}
			pcbY={27}
			layer="top"
		/>
		<testpoint
			name="TP_EN"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={9}
			pcbY={27}
			layer="top"
		/>
		<testpoint
			name="TP_BOOT"
			footprintVariant="pad"
			padShape="circle"
			padDiameter="1.1mm"
			pcbX={15}
			pcbY={27}
			layer="top"
		/>

		<keepout
			shape="rect"
			pcbX={34}
			pcbY={-5}
			width="8mm"
			height="20mm"
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
		<trace from=".ESD1 > .IO1_A" to="net.USB_DP" thickness={signalTrace} />
		<trace from=".ESD1 > .IO1_B" to="net.USB_DP" thickness={signalTrace} />
		<trace from=".ESD1 > .IO2_A" to="net.USB_DM" thickness={signalTrace} />
		<trace from=".ESD1 > .IO2_B" to="net.USB_DM" thickness={signalTrace} />
		<trace from=".ESD1 > .VBUS" to="net.VBUS_5V" thickness={signalTrace} />
		<trace from=".ESD1 > .GND" to="net.GND" thickness={signalTrace} />

		<trace from=".U3 > .VIN" to="net.VBUS_5V" thickness={powerTrace} />
		<trace from=".U3 > .CE" to="net.VBUS_5V" thickness={signalTrace} />
		<trace from=".U3 > .VOUT" to="net.V3_3" thickness={powerTrace} />
		<trace from=".U3 > .VSS" to="net.GND" thickness={powerTrace} />
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
		<trace from=".U2 > .DTR" to="net.USB_DTR" thickness={signalTrace} />
		<trace from=".U2 > .RTS" to="net.USB_RTS" thickness={signalTrace} />

		<trace from=".U1 > .IO4" to="net.I2C_SDA" thickness={signalTrace} />
		<trace from=".U1 > .IO5" to="net.I2C_SCL" thickness={signalTrace} />
		<trace from=".J2 > .pin1" to="net.GND" thickness={powerTrace} />
		<trace from=".J2 > .pin2" to="net.V3_3" thickness={powerTrace} />
		<trace from=".J2 > .pin3" to="net.I2C_SDA" thickness={signalTrace} />
		<trace from=".J2 > .pin4" to="net.I2C_SCL" thickness={signalTrace} />
		<trace from=".J2 > .pin5" to="net.GND" thickness={powerTrace} />
		<trace from=".J2 > .pin6" to="net.GND" thickness={powerTrace} />
		<trace from=".OLED1 > .GND" to="net.GND" thickness={powerTrace} />
		<trace from=".OLED1 > .VCC" to="net.V3_3" thickness={powerTrace} />
		<trace from=".OLED1 > .SDA" to="net.I2C_SDA" thickness={signalTrace} />
		<trace from=".OLED1 > .SCL" to="net.I2C_SCL" thickness={signalTrace} />
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

		<trace from=".U1 > .IO3" to=".R9 > .pin1" thickness={signalTrace} />
		<trace from=".R9 > .pin2" to=".D1 > .pin1" thickness={signalTrace} />
		<trace from=".D1 > .pin2" to="net.GND" thickness={signalTrace} />

		<trace from=".R5 > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".R5 > .pin2" to="net.ESP_EN" thickness={signalTrace} />
		<trace from=".U1 > .EN" to="net.ESP_EN" thickness={signalTrace} />
		<trace from=".C7 > .pin1" to="net.ESP_EN" thickness={signalTrace} />
		<trace from=".C7 > .pin2" to="net.GND" thickness={signalTrace} />
		<trace from=".R10 > .pin1" to="net.USB_DTR" thickness={signalTrace} />
		<trace from=".R10 > .pin2" to=".Q2 > .B" thickness={signalTrace} />
		<trace from=".Q2 > .E" to="net.USB_RTS" thickness={signalTrace} />
		<trace from=".Q2 > .C" to="net.ESP_EN" thickness={signalTrace} />
		<trace from=".R11 > .pin1" to="net.USB_RTS" thickness={signalTrace} />
		<trace from=".R11 > .pin2" to=".Q3 > .B" thickness={signalTrace} />
		<trace from=".Q3 > .E" to="net.USB_DTR" thickness={signalTrace} />
		<trace from=".Q3 > .C" to="net.ESP_BOOT" thickness={signalTrace} />
		<trace from=".R12 > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".R12 > .pin2" to="net.ESP_BOOT" thickness={signalTrace} />
		<trace from=".U1 > .IO9" to="net.ESP_BOOT" thickness={signalTrace} />

		<trace from=".TP_GND > .pin1" to="net.GND" thickness={signalTrace} />
		<trace from=".TP_3V3 > .pin1" to="net.V3_3" thickness={signalTrace} />
		<trace from=".TP_TX > .pin1" to="net.ESP_TX" thickness={signalTrace} />
		<trace from=".TP_RX > .pin1" to="net.ESP_RX" thickness={signalTrace} />
		<trace from=".TP_EN > .pin1" to="net.ESP_EN" thickness={signalTrace} />
		<trace from=".TP_BOOT > .pin1" to="net.ESP_BOOT" thickness={signalTrace} />

		<copperpour
			name="GND_TOP"
			connectsTo="net.GND"
			layer="top"
			clearance="0.25mm"
			outline={[
				{ x: -41, y: -29 },
				{ x: 40, y: -29 },
				{ x: 40, y: -15 },
				{ x: 30, y: -15 },
				{ x: 30, y: 5 },
				{ x: 40, y: 5 },
				{ x: 40, y: 29 },
				{ x: -41, y: 29 },
			]}
		/>
		<copperpour
			name="GND_BOTTOM"
			connectsTo="net.GND"
			layer="bottom"
			clearance="0.25mm"
			outline={[
				{ x: -40, y: -29 },
				{ x: 40, y: -29 },
				{ x: 40, y: -15 },
				{ x: 30, y: -15 },
				{ x: 30, y: 5 },
				{ x: 40, y: 5 },
				{ x: 40, y: 29 },
				{ x: -40, y: 29 },
			]}
		/>

		<silkscreentext
			text="BlinkBuddy Sense Qwiic"
			pcbX={0}
			pcbY={-28}
			fontSize="0.9mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="USB-C"
			pcbX={35}
			pcbY={25}
			fontSize="0.8mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="QWIIC"
			pcbX={-40}
			pcbY={4}
			fontSize="0.55mm"
			anchorAlignment="center"
			pcbRotation={90}
		/>
		<silkscreentext
			text="G 3V SDA SCL"
			pcbX={-40}
			pcbY={13}
			fontSize="0.45mm"
			anchorAlignment="center"
			pcbRotation={90}
		/>
		<silkscreentext
			text="L"
			pcbX={-37.6}
			pcbY={-26.4}
			fontSize="1mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="R"
			pcbX={37.6}
			pcbY={-26.2}
			fontSize="1mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="LEFT"
			pcbX={-18}
			pcbY={-19.05}
			fontSize="0.55mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="OK"
			pcbX={0}
			pcbY={-19.05}
			fontSize="0.55mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="RIGHT"
			pcbX={18}
			pcbY={-19.05}
			fontSize="0.55mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="ANTENNA NO COPPER"
			pcbX={38.5}
			pcbY={-5}
			fontSize="0.45mm"
			anchorAlignment="center"
			pcbRotation={90}
		/>
		<silkscreentext
			text="GND  3V3  TX  RX  EN  BOOT"
			pcbX={0}
			pcbY={28.7}
			fontSize="0.65mm"
			anchorAlignment="center"
		/>
		<silkscreentext
			text="tscircuit"
			pcbX={0}
			pcbY={10}
			fontSize="4mm"
			anchorAlignment="center"
			layers={["top"]}
		/>
		<silkscreentext
			text="ts"
			pcbX={-33}
			isKnockout={true}
			pcbY={27}
			knockoutPadding={"0.5mm"}
			fontSize="4mm"
			anchorAlignment="center"
			layers={["top"]}
		/>
		<silkscreentext
			text="created with tscircuit"
			pcbX={0}
			pcbY={-10}
			fontSize="3.5mm"
			anchorAlignment="center"
			pcbRotation={180}
			layers={["bottom"]}
		/>
		<silkscreentext
			text="ts"
			pcbX={0}
			isKnockout={true}
			pcbY={-18}
			knockoutPadding={"0.5mm"}
			fontSize="10mm"
			anchorAlignment="center"
			pcbRotation={180}
			layers={["bottom"]}
		/>
		<silkscreentext
			text="by Anas Sarkiz"
			pcbX={0}
			pcbY={20}
			fontSize="2mm"
			anchorAlignment="center"
			pcbRotation={180}
			layers={["bottom"]}
		/>
		<BoardLinkQrSilkscreen />
	</board>
);
