import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
	pin1: ["VDD_IO"],
	pin2: ["NC1"],
	pin3: ["NC2"],
	pin4: ["pin4"],
	pin5: ["GND1"],
	pin6: ["pin6"],
	pin7: ["pin7"],
	pin8: ["CS"],
	pin9: ["INT2"],
	pin10: ["RES"],
	pin11: ["INT1"],
	pin12: ["GND2"],
	pin13: ["ADC3"],
	pin14: ["VDD"],
	pin15: ["ADC2"],
	pin16: ["ADC1"],
} as const;

export const LIS3DHTR = (props: ChipProps<typeof pinLabels>) => {
	return (
		<chip
			pinLabels={pinLabels}
			supplierPartNumbers={{
				jlcpcb: ["C15134"],
			}}
			manufacturerPartNumber="LIS3DHTR"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin1"]}
						pcbX="-1.400048mm"
						pcbY="1.000125mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="-1.400048mm"
						pcbY="0.499999mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin3"]}
						pcbX="-1.400048mm"
						pcbY="0.000127mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin4"]}
						pcbX="-1.400048mm"
						pcbY="-0.499999mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin5"]}
						pcbX="-1.400048mm"
						pcbY="-0.999871mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin6"]}
						pcbX="-0.499872mm"
						pcbY="-1.399921mm"
						width="0.2800096mm"
						height="0.7999984mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin7"]}
						pcbX="0mm"
						pcbY="-1.399921mm"
						width="0.2800096mm"
						height="0.7999984mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin8"]}
						pcbX="0.500126mm"
						pcbY="-1.399921mm"
						width="0.2800096mm"
						height="0.7999984mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin9"]}
						pcbX="1.400048mm"
						pcbY="-0.999871mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin10"]}
						pcbX="1.400048mm"
						pcbY="-0.499999mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin11"]}
						pcbX="1.400048mm"
						pcbY="0.000127mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin12"]}
						pcbX="1.400048mm"
						pcbY="0.499999mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin13"]}
						pcbX="1.400048mm"
						pcbY="1.000125mm"
						width="0.7999984mm"
						height="0.2800096mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin14"]}
						pcbX="0.500126mm"
						pcbY="1.399921mm"
						width="0.2800096mm"
						height="0.7999984mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin15"]}
						pcbX="0mm"
						pcbY="1.399921mm"
						width="0.2800096mm"
						height="0.7999984mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin16"]}
						pcbX="-0.499872mm"
						pcbY="1.399921mm"
						width="0.2800096mm"
						height="0.7999984mm"
						radius="0.1400048mm"
						shape="pill"
					/>
					<silkscreenpath
						route={[
							{ x: -1.724888600000014, y: 1.450111399999983 },
							{ x: -1.724888600000014, y: 1.7251171999999855 },
							{ x: -1.0248899999999992, y: 1.7251171999999855 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 1.0250932000000006, y: 1.7251171999999855 },
							{ x: 1.7251171999999855, y: 1.7251171999999855 },
							{ x: 1.7251171999999855, y: 1.450111399999983 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -1.724888600000014, y: -1.449882800000026 },
							{ x: -1.724888600000014, y: -1.7248886000000283 },
							{ x: -1.0248899999999992, y: -1.7248886000000283 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 1.0250932000000006, y: -1.7248886000000283 },
							{ x: 1.7251171999999855, y: -1.7248886000000283 },
							{ x: 1.7251171999999855, y: -1.449882800000026 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -2.049678400000005, y: 1.574926999999974 },
							{ x: -1.9240564439124341, y: 1.698648786962778 },
							{ x: -1.799698052107189, y: 1.573656999999983 },
							{ x: -1.9240564439124341, y: 1.4486652130371738 },
							{ x: -2.049678400000005, y: 1.5723869999999778 },
						]}
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="-0.3048mm"
						pcbY="2.727327mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -2.5614000000000203, y: 1.977326999999974 },
							{ x: 1.9517999999999773, y: 1.977326999999974 },
							{ x: 1.9517999999999773, y: -1.9770730000000185 },
							{ x: -2.5614000000000203, y: -1.9770730000000185 },
							{ x: -2.5614000000000203, y: 1.977326999999974 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C15134.obj?uuid=c4b5277f94624e3ba038828676140c3b",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C15134.step?uuid=c4b5277f94624e3ba038828676140c3b",
				pcbRotationOffset: 0,
				modelOriginPosition: { x: 0, y: 0, z: 0 },
			}}
			{...props}
		/>
	);
};
