(async (Export, ...x)=>await Export(...(await Promise.all(x.map(i=>typeof (i) === 'function' && i.constructor.name === 'AsyncFunction' ? i():i)))))
(async function Api(DataProfile){
	const {storage} = window.modules

	class Record extends Map{
		constructor(data){
			super(Object.entries(data))
		}
		get _date(){ return this.get('_date') }
		get date(){ return this._date }
		get moment(){ return this._date }
		get timestamp(){ return this._date }

	}

	return {
		Output:{
			async records(){
				const fields = await storage.fields()
				const records = []
				for(const field of fields){
					if(field.startsWith('record')){
						records.push(new Record(await storage.get(field)))
					}
				}

				return records
			},
			profile(_, input){
				console.dir(arguments)
				return DataProfile
			}
		}
	}
})