//Style definitions of list GUIs
import {Data} from 'Hitract/Api';
import {color, layer, letting, text} from 'Hitract/UI';

const Bound = {
	card:{
		get container(){
			return {
				letting: {x: letting.x.standard},
			}
		},
		style: {
			marginLeft: letting.standard,
			marginRight: letting.standard
		},
		get width(){ return letting.contain.x(this.style).width }
	}
}

const detail = {
	center: text.ellipse(text.inline, {
		style: {
			paddingRight: letting.medium,
			textAlign: 'left'
		}
	}),
	component: {
		style: letting.contain.x({
			...layer.shadow[2],
			...layer.radius[0],
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: color.whiteShade,
			height: 33,
			marginLeft: letting.medium,
			marginRight: letting.medium,
			marginTop: letting.standard
		}, Bound.card.container)
	},
	left: Data.define(text.inline, {
		style: {
			paddingLeft: letting.line,
			textAlign: 'right'
		}
	}),
	right: Data.define(text.inline, {
		style: {
			paddingRight: letting.line,
			textAlign: 'left'
		}
	})
}

export default {
	detail
}
