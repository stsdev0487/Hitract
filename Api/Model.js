import Valid from './Valid';
import * as Data from './Data';



//exports
export class Model{
	constructor(data, index){
		if(data instanceof Model) data = data.data
		this.invalidData = Valid.data(data) === false
		this.data = this.invalidData === false ? data:{}
		this.index = Valid.number(index) ? index:-1
	}
	get created(){ return this.get('data.createdAgoString') }
	get createdNumberOfDaysAgo(){ return this.get('data.createdNumberOfDaysAgo') }
	get date(){
		return {
			created: this.get('data.created'),
			updated: this.get('data.updated')
		}
	}
	delete(notation){ return Data.unset(this, notation) }
	get(notation){ return Data.get(this, notation) }
	has(notation){ return Data.has(this, notation) }
	get id(){ return this.get('data.id') }
	set(notation, value){ return Data.set(this, notation, value) }
	get typeName(){ return this.get('data.type') }
	get views(){ return this.get('data.views') }
}

export class Dataset extends Array{
	constructor(items, DatasetModel=Model){
		if(Valid.function(DatasetModel) !== true) throw new Error(items)
		items = Valid.array(items) ? items:[]
		super(...items.map((item,index)=>item instanceof DatasetModel ? item:new DatasetModel(item, index)))
	}
	get count(){ return this.length }
	get total(){ return this.filter(item=>item.invalidData === false).length }

}
