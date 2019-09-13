import {Data,Model,Valid} from 'Hitract/Api';
import UniversityTopicDataset from './Topic/Dataset';
import RatingDataset from 'Hitract/Component/Network/Rating/Dataset';
import RatingPreset from 'Hitract/Component/Network/Rating/Preset';

//exports
export class UniversityModel extends Model{
	constructor(){
		super(...arguments)
		const invalidRatings = Valid.array(this.get('data.ratings')) === false || this.get('data.ratings').length === 0
		if(invalidRatings){
			Data.set(this,'data.ratings', RatingPreset())
		}
	}
	get alias(){ return this.institutionShortName }
	get avatar(){ return this.smallImageUrl }
	get averageScore(){ return this.get('data.averageScore') }
	get code(){ return this.institutionCode }
	get description(){ return this.get('data.description') }
	get institutionCode(){ return this.get('data.institutionCode') }
	get institutionId(){ return this.get('data.institutionId') }
	get institutionName(){ return this.get('data.institutionName') }
	get institutionRatings(){ return this.get('data.institutionRatings') }

	get institutionShortName(){ return this.get('data.institutionShortName') }
	get institutionTopics(){ return this.get('data.institutionTopics') }
	get institutionWikiUrl(){ return this.get('data.institutionWikiUrl') }
	get isUniversity(){ return true }

	get largeImageUrl(){ return this.get('data.largeImageUrl') }


	get mediumImageUrl(){ return this.get('data.mediumImageUrl') }

	get name(){ return this.institutionName }

	get pictureDescription(){ return this.get('data.pictureDescription') }
	get pictureUrl(){ return this.get('data.pictureUrl') }
	get pictureWikiUrl(){ return this.get('data.pictureWikiUrl') }

	get ratings(){ return new RatingDataset(this.get('data.ratings')) }

	get shortName(){ return this.alias }

	get smallImageUrl(){ return this.get('data.smallImageUrl') }

	get topics(){ return new UniversityTopicDataset(this.institutionTopics) }
}

