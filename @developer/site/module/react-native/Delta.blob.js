(async function define_module(...x){ const define = async (module, ...inputs)=>await window.modules.define('ReactNative.Delta.blob', {value:await module(...inputs)}); return window.modules.has('ReactNative.Delta.blob')?window.modules.get('ReactNative.Delta.blob'):await (async ([module],asyncs,...inputs)=>await define(module, ...(await Promise.all(asyncs)).concat(inputs)))(x.splice(0, 1),(x=x.map(i=>i instanceof Promise?async ()=>await i:i).reduce((l, i)=>((typeof(i)==='function'&&i.constructor.name==='AsyncFunction')?l[0].push(i()):l.push(i),l),[[]]))[0], ...x.slice(1, x.length)); })
(async function export_module(DeltaPatcher){
	'use strict';

	let cachedBundleUrls = new Map();

	/**
	 * Converts the passed delta URL into an URL object containing already the
	 * whole JS bundle Blob.
	 */
	return deltaUrlToBlobUrl
	//scope actions
	async function deltaUrlToBlobUrl(deltaUrl){
		const client = DeltaPatcher.get(deltaUrl);
		const revisionId = client.getLastRevisionId() ? `&revisionId=${client.getLastRevisionId()}`:'';
		const data = await window.modules.http(deltaUrl + revisionId);
		const bundle = await data.json();
		const deltaPatcher = client.applyDelta(bundle);
		let cachedBundle = cachedBundleUrls.get(deltaUrl); // If nothing changed, avoid recreating a bundle blob by reusing the
		// previous one.

		if(deltaPatcher.getLastNumModifiedFiles() === 0 && cachedBundle != null && cachedBundle !== ''){
			return cachedBundle;
		} // Clean up the previous bundle URL to not leak memory.

		if(cachedBundle != null && cachedBundle !== ''){
			URL.revokeObjectURL(cachedBundle);
		} // To make Source Maps work correctly, we need to add a newline between
		// modules.

		const blobContent = deltaPatcher.getAllModules().map(module=>module + '\n'); // Build the blob with the whole JS bundle.

		const blob = new Blob(blobContent, { type: 'application/javascript' });
		const bundleContents = URL.createObjectURL(blob);
		cachedBundleUrls.set(deltaUrl, bundleContents);
		return bundleContents;
	}


}, async function load_assets(){
	const url = window.HTMLElement.SourceCode.url('react-native/index.js')
	window.modules.import.assets(url.at('Delta.Patcher.js'))
	return window.modules.wait('modules.ReactNative.Delta.Patcher', true)
})