import {Data,Model,Valid} from 'Hitract/Api';
import UniversityModel from 'Hitract/Component/Network/University/Model';
import CourseTopicDataset from './Topic/Dataset';
import RatingDataset from 'Hitract/Component/Network/Rating/Dataset';
import RatingPreset from 'Hitract/Component/Network/Rating/Preset';

//exports
export class CourseModel extends Model{
	constructor(){
		super(...arguments)
		const invalidRatings = Valid.array(this.get('data.ratings')) === false || this.get('data.ratings').length === 0
		if(invalidRatings){
			Data.set(this, 'data.ratings', RatingPreset())
		}
	}
	get averageDifficultyScore(){ return this.get('data.averageDifficultyScore') }
	get averageFunnyScore(){ return this.get('data.averageFunnyScore') }
	get averageScore(){ return this.get('data.averageScore') }
	get averageTempoScore(){ return this.get('data.averageTempoScore') }
	get averageTeacherScore(){ return this.get('data.averageTeacherScore') }
	get averageWhatLearntScore(){ return this.get('data.averageWhatLearntScore') }

	get code(){ return this.courseCode }
	get comments(){ return this.get('data.comments') }

	get courseCode(){ return this.get('data.courseCode') }
	get courseFileUploads(){ return this.get('data.courseFileUploads') }
	get courseId(){ return this.get('data.courseId') }

	get courseRatings(){ return this.get('data.courseRatings') }
	get courseTopics(){ return this.get('data.courseTopics') }

	get creditSystem(){ return this.get('data.creditSystem') }
	get credits(){ return this.get('data.credits') }

	get description(){ return this.descriptionSv || this.descriptionEnglish }
	get descriptionEnglish(){ return this.get('data.descriptionEn') }
	get descriptionSv(){ return this.get('data.descriptionSv') }

	get educationLevel(){ return this.get('data.educationLevel') }
	get examUploads(){ return this.get('data.examUploads') }
	get exerciseUploads(){ return this.get('data.excerciseUploads') }

	get institution(){ return this.get('data.institution') }
	get isCourse(){ return true }

	get metadata(){ return this.get('data.metadatas') }

	get name(){ return this.title }

	get otherUploads(){ return this.get('data.otherUploads') }

	get randomMetadataImageUrl(){ return this.get('data.randomMetadataImageUrl') }

	get ratings(){ return new RatingDataset(this.get('data.ratings')) }

	get subjects(){ return this.get('data.subjects') }

	get title(){ return this.titleSv || this.titleEnglish }
	get titleEnglish(){ return this.get('data.titleEn') }
	get titleSv(){ return this.get('data.titleSv') }

	get topics(){ return new CourseTopicDataset(this.courseTopics) }

	get university(){ return new UniversityModel(this.institution) }

}