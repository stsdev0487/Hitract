(async (Export, ...x)=>await Export(...(await Promise.all(x.map(i=>typeof (i) === 'function' && i.constructor.name === 'AsyncFunction' ? i():i)))))
(async function Structure(...x){
	const {storage, is} = window.modules
	const SnippetMaximum = 120
	return {
		Student:{
			async aboutMe(student, input){
				console.log({arguments})
				console.log(input.snippet)
				const dataset = await storage.get('DataProfile')
				if(is.not.text(dataset.aboutMe)) return null
				return input.snippet ? `${dataset.aboutMe.slice(0, SnippetMaximum)}...`:dataset.aboutMe
			}
		}
	}
})