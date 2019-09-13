import {StyleSheet} from 'react-native'
import align from './align'



//Sets style of component to fill container with customization
export const contentFill = { ...StyleSheet.absoluteFillObject }

export const contentWrap = { flexWrap: align.wrap }

export const flexContainer = { flex: 1 }


//Sets component style to fill the parent/super container (position: 'absolute', left: 0, right: 0, top: 0, bottom: 0)
export const fillContainer = { ...StyleSheet.absoluteFill }

export const verticalContainer = {
	display: 'flex',
	flexDirection: align.vertical
}

export const horizontalContainer = {
	display: 'flex',
	flexDirection: align.horizontal
}

export const overlayContainer = {
	...fillContainer,
	alignItems: align.center,
	overflow: 'hidden'
}


export const standardButtonContainer = {
	height: 33
}

export default {
	button:{
		standard: standardButtonContainer,
	},
	flex: {
		style: flexContainer
	},
	content:{
		fill: {
			style: contentFill
		},
		wrap:{
			style: contentWrap
		}
	},
	fill:{
		style: fillContainer
	},
	horizontal:{
		style: horizontalContainer
	},
	vertical:{
		style: verticalContainer
	}
}