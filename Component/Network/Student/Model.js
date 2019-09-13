import {Model} from 'Hitract/Api';

export class StudentModel extends Model{
	get avatar(){ return this.get('data.pictureUrl') }
	get firstName(){ return this.get('data.firstName') }
	get fullName(){ return this.get('data.fullName') }
	get lastName(){ return this.get('data.lastName') }
	get studentId(){ return this.get('data.studentId') }
}