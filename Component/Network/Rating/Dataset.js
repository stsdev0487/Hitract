import { Dataset} from 'Hitract/Api';
import {RatingModel} from './Model';


export default class RatingDataset extends Dataset{
	constructor(items){
		super(items, RatingModel)
	}
}