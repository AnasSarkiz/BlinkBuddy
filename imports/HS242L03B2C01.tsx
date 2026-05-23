import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
	pin1: ["GND"],
	pin2: ["VCC"],
	pin3: ["SCL"],
	pin4: ["SDA"],
} as const;

export const HS242L03B2C01 = (props: ChipProps<typeof pinLabels>) => {
	return (
		<chip
			pinLabels={pinLabels}
			supplierPartNumbers={{
				jlcpcb: ["C7466000"],
			}}
			manufacturerPartNumber="HS242L03B2C01"
			footprint={
				<footprint>
					<hole
						pcbX="-33.8755038mm"
						pcbY="19.499961mm"
						diameter="3.1000192mm"
					/>
					<hole
						pcbX="-33.8755038mm"
						pcbY="-19.499961mm"
						diameter="3.1000192mm"
					/>
					<hole
						pcbX="34.1243602mm"
						pcbY="-19.499961mm"
						diameter="3.1000192mm"
					/>
					<hole pcbX="34.1243602mm" pcbY="19.499961mm" diameter="3.1000192mm" />
					<platedhole
						portHints={["pin1"]}
						pcbX="-33.3743618mm"
						pcbY="-3.809873mm"
						outerDiameter="1.5999968mm"
						holeDiameter="0.999998mm"
						shape="circle"
					/>
					<platedhole
						portHints={["pin2"]}
						pcbX="-33.3743618mm"
						pcbY="-1.269873mm"
						outerDiameter="1.5999968mm"
						holeDiameter="0.999998mm"
						shape="circle"
					/>
					<platedhole
						portHints={["pin3"]}
						pcbX="-33.3743618mm"
						pcbY="1.270127mm"
						outerDiameter="1.5999968mm"
						holeDiameter="0.999998mm"
						shape="circle"
					/>
					<platedhole
						portHints={["pin4"]}
						pcbX="-33.3743618mm"
						pcbY="3.810127mm"
						outerDiameter="1.5999968mm"
						holeDiameter="0.999998mm"
						shape="circle"
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C7466000.obj?uuid=c04611bc2cfb420ea2709931287e519e",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C7466000.step?uuid=c04611bc2cfb420ea2709931287e519e",
				pcbRotationOffset: 0,
				modelOriginPosition: {
					x: -0.12445359999992434,
					y: -0.00012700000002041634,
					z: -8.480405999999999,
				},
			}}
			{...props}
		/>
	);
};
