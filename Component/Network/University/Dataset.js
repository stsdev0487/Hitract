import {Dataset} from 'Hitract/Api';
import {UniversityModel} from './Model';

//exports
export default class UniversityDataset extends Dataset{
	constructor(items){
		super(items, UniversityModel)
	}
}