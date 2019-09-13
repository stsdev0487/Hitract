import {Dataset} from 'Hitract/Api';
import {UniversityTopicPostModel} from './Model';

//exports
export default class UniversityTopicPostDataset extends Dataset{
	constructor(items){
		super(items, UniversityTopicPostModel)
	}
}