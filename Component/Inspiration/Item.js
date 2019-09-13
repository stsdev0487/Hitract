import {letting} from 'Hitract/UI';
import Model from './Model';

const BorderRadiusRatio = 0.83 //0.74 with border
const BorderRadius = letting.single * BorderRadiusRatio
const BorderWidth = letting.point
export const ItemLetting = {x: letting.standard * 2, y: 0}

export const ItemFrame = letting.contain.x({}, {letting: {x: letting.standard * 2}})
ItemFrame.height = ItemFrame.width

const ItemImageBound = {width: (ItemFrame.width / 2) - (letting.standard * 1.5)} //letting: {x: (ItemLetting.x * 2) /*+ (BorderWidth/2) with border*/
export const ItemImageFrame = ItemImageBound //letting.contain.x(ItemImageBound, ItemImageBound)
ItemImageFrame.height = ItemImageFrame.width


//exports
export default {
	Frame: ItemFrame,
	ImageFrame: ItemImageFrame,
	Letting: ItemLetting,
	Model: Model.Item,
	Radius: BorderRadius
}

