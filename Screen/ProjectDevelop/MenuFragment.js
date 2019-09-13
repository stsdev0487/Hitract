
class ProjectDevelopFragment{
	render(){
		return (<View style={ProjectDevelop.ui.navigationSegment}>
			<Text uppercase style={{...font.variant.bold, color: 'rgb(239,9,40)', fontSize: font.standard}}>
				Project Bookmarks (Development)
			</Text>

			{/*Inaccessible Route Views*/}
			<Touch {...attribute.button} onPress={()=>projectDevelop(this, 'all')}>
				<Icon {...attribute.icon} style={{color: 'rgb(239,9,40)'}} name='class'/>
				<Text style={{color: 'rgb(239,9,40)'}}>Open</Text>
			</Touch>


			{/*<Button {...attribute.button} onPress={()=>projectDevelop(this, 'updated')}>*/}
			{/*	<Icon {...attribute.icon} name='style' style={{color: 'rgb(239,9,40)', fontSize: font.standard}}/>*/}
			{/*	<Text style={{color: 'rgb(239,9,40)', fontSize: font.standard}}>UI Updates</Text>*/}
			{/*	<Icon {...attribute.icon} name='palette' style={{color: 'rgb(239,9,40)', fontSize: font.standard}}/>*/}

			{/*</Button>*/}

			{/*<Button {...attribute.button} onPress={()=>projectDevelop(this, 'in-progress')}>*/}
			{/*	<Icon {...attribute.icon} name='timelapse' style={{color: 'rgb(239,9,40)', fontSize: font.standard}}/>*/}
			{/*	<Text style={{color: 'rgb(239,9,40)', fontSize: font.standard}}>In Progress</Text>*/}
			{/*	<Icon {...attribute.icon} name='toys' style={{color: 'rgb(239,9,40)', fontSize: font.standard}}/>*/}
			{/*</Button>*/}


		</View>)
	}
}

function projectDevelop({props}, type){
	props.navigation.navigate(Bookmark.ProjectDevelop, {type})
}