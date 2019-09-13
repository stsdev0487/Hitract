import {color, container} from 'Hitract/UI';

export const GradientPalette = {
	hitract: [color.azureBlue, color.tiffanyBlue],
	facebook: [color.navyBlueLight, color.navyBlue]
}

export const ButtonGradient = {
	start: {x: 0, y: 0.5},
	end: {x: 1.25, y: 0.5}
}

export const CornerGradient = {
	end: {x: 1.1, y: 0.1},
	start: {x: 0.47, y: 0.35}
}

export const FillGradient = {
	...container.fill,
	end: {x: 1, y: 0},
	start: {x: 1, y: 1}
}

export const DiagonalGradient = {
	...container.fill,
	start: {x: 0, y: 1},
	end: {x: 1, y: 0}
}
