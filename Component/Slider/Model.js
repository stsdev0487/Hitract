import {Data, Type, Valid, Model} from 'Hitract/Api';

export class SlideItemModel extends Model{
	get placeholder(){ return Valid(this.uri) === false }
	get source(){ return Valid.number(this.uri) ? this.uri:{uri: this.uri} }
	get uri(){ return this.get(this, 'data.uri') }
}

export default class SlideModel extends Model{
	static Item = SlideItemModel
	constructor(data, index){
		super(data,index)
		this.state = {}
		this.items = this.items.map(mapItem, this)
	}
	get count(){ return this.get('items.length') || 0 }
	get empty(){ return this.count === 0 }
	get items(){ return this.get('data.items') || [] }
	set items(items){ return this.set('data.items', items) }

}


//scope actions
function mapItem(item, index){
	if(item instanceof this.constructor.Item) return item
	return new this.constructor.Item(item,index)
}
