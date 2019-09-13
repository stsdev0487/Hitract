import React from 'react';
import {Area, Profile} from 'Hitract/Component';
import Api, {Data} from 'Hitract/Api';
import Bookmark from 'Hitract/Bookmark';
import {Account} from 'Hitract/App';

export default class AccountProfile extends React.Component{
	state = {loading: true, data:null}
	async refresh(reload=true){
		this.setState(await authorizedState(this, ()=>Api.account.profile({reload})))
	}
	render(){
		const {data} = this.state
		const {navigation} = this.props

		return (<Area refresh={(...input)=>this.refresh(...input)} loading={this.state.loading}>

			<Profile.MetadataNames navigation={navigation}
								   metadataNames={Data.get(data,'metadataNames') || []} />

			<Profile.ProfileCard navigation={navigation}
						  buddies={Data.get(data,'buddies') || []}
						  companySizes={Data.get(data, 'companySizes') || []}
						  counties={Data.get(data, 'counties') || []}
						  employmentTypes={Data.get(data,'employmentTypes') || []}
						  primaryInstitution={Data.get(data, 'primaryInstitution') || {}}
						  studentIndustries={Data.get(data, 'studentIndustries') || []}
						  verified={Data.get(data,'verified') || false}/>

			<Profile.Inspirations navigation={navigation}
								  inspirationCollections={Data.get(data,'inspirationCollections') || []}/>

			<Profile.Courses navigation={navigation}
							 studentCourses={Data.get(data, 'studentCourses') || []}
							 institutions={Data.get(data, 'institutions') || []} />

			<Profile.Portfolio navigation={navigation}
							   workExperiences={Data.get(data, 'workExperiences') || []} />

			<Profile.Hobbies navigation={navigation}
							 studentHobbies={Data.get(data, 'studentHobbies') || []} />

			<Profile.Traits navigation={navigation}
							characteristics={Data.get(data,'characteristics') || []} />
		</Area>)
	}
}


//scope actions
function authorizedState(component,loader){
	if(Api.authenticated) return loadStateDataSource(loader)
	component.props.navigation.navigate(Bookmark.OnBoard)
	return {loading: true}
}

async function loadStateDataSource(loader){
	let data = null
	try{ data = await loader() }
	catch(error){ data = null }
	return { loading: data === null, data  }
}