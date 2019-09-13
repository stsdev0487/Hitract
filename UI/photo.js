/*Styling for photographs displayed throughout entire app*/
import color from './color';
import font from './font';
import layer from './layer';
import letting from './letting';
import align from './align';
import container from './container';

const Size = {
	medium:{
		height: 112,
		width: 163
	}
}

export const roundedPhotoContainer = {
	...layer.radius[3],
	...Size.medium,
	overflow:'hidden'
};

export const roundedPhotoImage = { ...container.fill.style };

export const roundedPhotoOverlay = {
	...layer.overlay[2],

	paddingLeft: letting.single,
	paddingRight: letting.single,
	alignItems: align.center,
	justifyContent: align.center
}

export const roundedPhotoText = {
	...font.sans,
	color: color.white,
	fontSize: font.standard,
}

export const roundedPhotoTextTitle = {
	...roundedPhotoText,
	height: letting.double,
	fontSize: font.medium,
	get lineHeight(){ return this.height  }
}

export const roundedPhotoTextBlurb = {
	...roundedPhotoText,
	textAlign: align.center
}

//exports
export default {
	rounded:{
		container:{
			style:{ ...roundedPhotoContainer, margin: letting.small }
		},
		image:{
			style: { ...roundedPhotoImage }
		},
		overlay:{
			component:{
				style:{ ...roundedPhotoOverlay }
			},
			title: {
				style: { ...roundedPhotoTextTitle }
			},
			blurb:{
				numberOfLines:3,
				style:{ ...roundedPhotoTextBlurb  }
			}
		}
	}
}