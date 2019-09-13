import {Dataset} from 'Hitract/Api';
import {CourseTopicPostModel} from './Model';


//exports
export default class CourseTopicPostDataset extends Dataset{
	constructor(items){
		super(items, CourseTopicPostModel)
	}
}