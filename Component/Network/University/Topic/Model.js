import {Model} from 'Hitract/Api';
import UniversityTopicPostDataset from './Post/Dataset';

export class UniversityTopicModel extends Model{
	get institution(){ return this.get('data.institution') } //UniversitySearchModel Required
	get institutionTopicId(){ return this.get('data.institutionTopicId') }
	get institutionTopicPosts(){ return this.get('data.institutionTopicPosts') }
	get header(){ return this.get('data.header') }
	get content(){ return this.get('data.content') }
	post(post){
		const posts = this.get('data.institutionTopicPosts') || []
		posts.unshift(post)
		return (this.set('data.institutionTopicPosts', posts),this)
	}
	get posts(){ return new UniversityTopicPostDataset(this.institutionTopicPosts) }
}
