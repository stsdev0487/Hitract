import {Model,Dataset} from 'Hitract/Api';


//exports
export class CompanyModel extends Model{
	get companyName(){ return this.get('data.companyName') }
	get isCompany(){ return true }
	get name(){ return this.companyName }
	get ratings(){ return this.get('data.companyRatings') || [] }
}

export class CompanyDataset extends Dataset{
	static Model = CompanyModel
	constructor(items){
		super(items, CompanyModel)
	}
}