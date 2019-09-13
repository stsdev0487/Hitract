(async function define_module(...x){ const define = async (module, ...inputs)=>await window.modules.define('index', {value:await module(...inputs)}); return window.modules.has('index')?window.modules.get('index'):await (async ([module],asyncs,...inputs)=>await define(module, ...(await Promise.all(asyncs)).concat(inputs)))(x.splice(0, 1),(x=x.map(i=>i instanceof Promise?async ()=>await i:i).reduce((l, i)=>((typeof(i)==='function'&&i.constructor.name==='AsyncFunction')?l[0].push(i()):l.push(i),l),[[]]))[0], ...x.slice(1, x.length)); })
(async function export_module(){
	let sequence = {
		source: [URL.join('Api/structure.graphql'),URL.join('Api/api.graphql')],
		logic: [URL.join('Api/structure.js'), URL.join('Api/api.js')]
	}
	const Structure = await window.modules.wait('modules.Structure', true)
	window.api = await Structure.create(sequence)
	console.log('loaded')




	//console.log(resolve(Schema, `{
	//	get(id: 39393){
	//		created
	//		createdAgoString
	//		createdNumberOfDaysAgo
	//		id
	//		type
	//		updated
	//	}
	//}`))



})