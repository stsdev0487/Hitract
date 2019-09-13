import {Model} from 'Hitract/Api';
import {CourseModel} from 'Hitract/Component/Network/Course/Model';
import {StudentModel} from 'Hitract/Component/Network/Student/Model';
import CourseTopicPostDataset from './Post/Dataset';

export class CourseTopicModel extends Model{
	get course(){ return new CourseModel(this.get('data.course')) }
	get courseTopicId(){ return this.get('data.courseTopicId') }
	get header(){ return this.get('data.header') }
	get content(){ return this.get('data.content') }
	post(post){
		const posts = this.get('data.courseTopicPosts') || []
		posts.unshift(post)
		return (this.set('data.courseTopicPosts', posts),this)
	}
	get posts(){ return new CourseTopicPostDataset(this.get('data.courseTopicPosts')) }
	get student(){ return new StudentModel(this.get('data.student')) }
}




