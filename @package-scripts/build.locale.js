const tool = require('./tool')
const folder = require('path').join(__dirname, '../')
const Project = {
	folder,
	base: require('path').dirname(folder),
	locale: require('path').join(folder, 'Locale/structure'),
	images: require('path').join(folder,'images')
}


tool.build_locale(Project)
