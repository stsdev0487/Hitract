import {Model} from 'Hitract/Api';
import StudentDataset from 'Hitract/Component/Network/Student/Dataset';
import {StudentModel} from 'Hitract/Component/Network/Student/Model';

//exports
export class CourseTopicPostModel extends Model{
	get content(){ return this.get('data.content') }
	get courseTopicPostId(){ return this.get('data.courseTopicPostId') }
	get downVoters(){ return new StudentDataset(this.get('data.downVoters')) }
	get downVotes(){ return this.downVoters.count }
	get student(){ return new StudentModel(this.get('data.student')) }
	get upVoters(){ return new StudentDataset(this.get('data.upVoters')) }
	get upVotes(){ return this.upVoters.count  }
}