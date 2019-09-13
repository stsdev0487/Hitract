import {Dataset} from 'Hitract/Api';
import {StudentModel} from './Model';
export default class StudentDataset extends Dataset{
	constructor(items){
		super(items, StudentModel)
	}
}