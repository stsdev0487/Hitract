import {Dataset} from 'Hitract/Api';
import {CourseTopicModel} from './Model';

export default class CourseTopicDataset extends Dataset{
	constructor(items){
		super(items, CourseTopicModel)
	}
}









