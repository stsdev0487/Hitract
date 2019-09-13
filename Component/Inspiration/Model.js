import Api, {Data} from 'Hitract/Api';
import {Screen} from 'Hitract/App';
import Model from '../Slider/Model';
const images = ['thumbnail','small','medium','large']

class InspirationItemModel extends Model.Item{
	get uri(){ return this.get('data.image.medium') }
	get placeholder(){ return isPlaceholder.call(this) }
}

export default class InspirationSlideModel extends Model{
	static Item = InspirationItemModel
	constructor(inspirationCollectionItem, index){
		super(inspirationCollectionItem, index)
		this.label = Screen.Inspirations.label
		const items = this.items
		for(let index=0;index<4;index++){
			if(!items[index]){
				items[index] = new InspirationItemModel({}, index)
			}
		}
	}
	get empty(){ return isEmpty.call(this) }
	get items(){ return this.get('data.inspirations') || [] }
	set items(items){ return this.set('data.inspirations', items) }
	get showsCreateCollage(){
		return this.empty === true
	}
	get showsDialog(){
		return showDialog.call(this)
	}
	get showsEdit(){
		return this.empty === false
	}
}

//scope actions
function isPlaceholder(){
	for(const type of images){
		if(this.has(`data.image.${type}`)){
			return false
		}
	}
	return true
}

function isEmpty(){
	for(const item of this.items){
		if(item.placeholder === false){
			return false
		}
	}
	return this.has('data.hobby') === false
}

function showDialog(){
	for(const item of this.items){
		if(item.placeholder === false){
			return false
		}
	}
	return this.has('data.hobby') === true
}