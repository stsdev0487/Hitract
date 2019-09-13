import {StyleSheet} from 'react-native';
import {align, color, font, layer, letting} from 'Hitract/UI';
import {ItemFrame} from './Item';

export const LeafletComponent = {
	width: ItemFrame.component.width + letting.double,
}

export const LeafletIndicatorPace = {
	height: 6,
	width: 6,
	flexShrink: 0,
	marginHorizontal: letting.minor,
	backgroundColor: color.white
}

export default StyleSheet.create({
	scrollView: {
		...LeafletComponent,
		overflow: layer.visible
	}
})




export const indicator = StyleSheet.create({
	indicatorComponentView:{
		paddingVertical: letting.mid,
		flexDirection: align.row,
		alignContent:align.center,
		alignItems: align.items,
		paddingHorizontal: letting.minor
	},
	paceView:{
		...LeafletIndicatorPace,
		borderRadius: LeafletIndicatorPace.width / 2
	},
	paceViewActive:{
		...LeafletIndicatorPace,
		backgroundColor: color.azureBlue,
		borderRadius: LeafletIndicatorPace.width / 2
	}
})