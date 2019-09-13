import {Dataset} from 'Hitract/Api';
import {UniversityTopicModel} from './Model';


export default class UniversityTopicDataset extends Dataset{
	constructor(items){
		super(items, UniversityTopicModel)
	}
}









