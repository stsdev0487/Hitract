const setting = require('../setting')

const entry = {
	clean(locator){ return locator.split('/').filter(entry.empty).join('/') },
	empty(text){ return text.length > 0 },
	locator(item){ return item.get('path').replace(setting.folder.project, '') },
	trim(text){ return text.trim() }
}


//exports
module.exports = entry