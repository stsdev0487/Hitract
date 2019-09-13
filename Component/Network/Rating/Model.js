import {Model} from 'Hitract/Api';

export class RatingModel extends Model{
	get averageScore(){ return this.get('data.averageScore') }
	get countRatings(){ return this.get('data.countRatings') }
	get ratingId(){ return this.get('data.ratingId') }
	get ratingType(){ return this.get('data.ratingType') }
	get totalScore(){ return this.get('data.totalScore') }
}