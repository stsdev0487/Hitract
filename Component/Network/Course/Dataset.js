import {Dataset} from 'Hitract/Api';
import {CourseModel} from './Model';


//exports
export default class CourseDataset extends Dataset{
	constructor(items){
		super(items, CourseModel)
	}
}