import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
	pin1: ["pin1"],
	pin2: ["pin2"],
	pin3: ["pin3"],
	pin4: ["pin4"],
} as const;

export const TL3301AF160QG = (props: ChipProps<typeof pinLabels>) => {
	return (
		<chip
			pinLabels={pinLabels}
			supplierPartNumbers={{
				jlcpcb: ["C273519"],
			}}
			manufacturerPartNumber="TL3301AF160QG"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin1"]}
						pcbX="-2.249932mm"
						pcbY="-4.64312mm"
						width="1.3999972mm"
						height="2.2999954mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin4"]}
						pcbX="2.249932mm"
						pcbY="-4.64312mm"
						width="1.3999972mm"
						height="2.2999954mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="-2.249932mm"
						pcbY="4.64312mm"
						width="1.3999972mm"
						height="2.2999954mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin3"]}
						pcbX="2.249932mm"
						pcbY="4.64312mm"
						width="1.3999972mm"
						height="2.2999954mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: -3.1262065999999322, y: -2.6468069999998534 },
							{ x: -3.1262065999999322, y: 2.596006999999986 },
							{ x: 3.1262065999999322, y: 2.596006999999986 },
							{ x: 3.1262065999999322, y: -2.6468069999998534 },
							{ x: -3.1262065999999322, y: -2.6468069999998534 },
						]}
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="0mm"
						pcbY="6.7912mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -3.374200000000087, y: 6.041200000000117 },
							{ x: 3.3741999999998598, y: 6.041200000000117 },
							{ x: 3.3741999999998598, y: -6.04119999999989 },
							{ x: -3.374200000000087, y: -6.04119999999989 },
							{ x: -3.374200000000087, y: 6.041200000000117 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C273519.obj?uuid=0944049685e5464291fe826e016d2a30",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C273519.step?uuid=0944049685e5464291fe826e016d2a30",
				pcbRotationOffset: 90,
				modelOriginPosition: { x: 0, y: 0, z: 0 },
			}}
			{...props}
		/>
	);
};
