import {Model} from 'Hitract/Api';
import {StudentModel} from 'Hitract/Component/Network/Student/Model';
import StudentDataset from 'Hitract/Component/Network/Student/Dataset';

//exports
export class UniversityTopicPostModel extends Model{
	get content(){ return this.get('data.content') }
	get institutionTopicPostId(){ return this.get('data.institutionTopicPostId') }
	get downVoters(){ return new StudentDataset(this.get('data.downVoters')) }
	get downVotes(){ return this.downVoters.count }
	get student(){ return new StudentModel(this.get('data.student')) }
	get upVoters(){ return new StudentDataset(this.get('data.upVoters')) }
	get upVotes(){ return this.upVoters.count  }
}