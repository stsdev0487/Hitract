
import axios from 'axios'
const CancelToken = axios.CancelToken;

const instance =  axios.create({
	baseURL: 'https://some-domain.com/api/',
	timeout: 1000,
	headers: {'X-Custom-Header': 'foobar'}
});

// Set config defaults when creating the instance
var instance = axios.create({
	baseURL: 'https://api.example.com'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

const RequesetConfiguration = {
	// `url` is the server URL that will be used for the request
	url: '/user',

	// `method` is the request method to be used when making the request
	method: 'get', // default

	// `baseURL` will be prepended to `url` unless `url` is absolute.
	// It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
	// to methods of that instance.
	baseURL: 'https://some-domain.com/api/',

	// `transformRequest` allows changes to the request data before it is sent to the server
	// This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
	// The last function in the array must return a string, an ArrayBuffer, or a Stream
	transformRequest: [
		function(data){
			// Do whatever you want to transform the data

			return data;
		}
	],

	// `transformResponse` allows changes to the response data to be made before
	// it is passed to then/catch
	transformResponse: [
		function(data){
			// Do whatever you want to transform the data

			return data;
		}
	],

	// `headers` are custom headers to be sent
	headers: {'X-Requested-With': 'XMLHttpRequest'},

	// `params` are the URL parameters to be sent with the request
	// Must be a plain object or a URLSearchParams object
	params: {
		ID: 12345
	},

	// `paramsSerializer` is an optional function in charge of serializing `params`
	// (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
	paramsSerializer: function(params){
		return Qs.stringify(params, {arrayFormat: 'brackets'})
	},

	// `data` is the data to be sent as the request body
	// Only applicable for request methods 'PUT', 'POST', and 'PATCH'
	// When no `transformRequest` is set, must be of one of the following types:
	// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
	// - Browser only: FormData, File, Blob
	// - Node only: Stream
	data: {
		firstName: 'Fred'
	},

	// `timeout` specifies the number of milliseconds before the request times out.
	// If the request takes longer than `timeout`, the request will be aborted.
	timeout: 1000,

	// `withCredentials` indicates whether or not cross-site Access-Control requests
	// should be made using credentials
	withCredentials: false, // default

	// `adapter` allows custom handling of requests which makes testing easier.
	// Return a promise and supply a valid response (see [response docs](#response-api)).
	adapter: function(config){
		/* ... */
	},

	// `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
	// This will set an `Authorization` header, overwriting any existing
	// `Authorization` custom headers you have set using `headers`.
	auth: {
		username: 'janedoe',
		password: 's00pers3cret'
	},

	// `responseType` indicates the type of data that the server will respond with
	// options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
	responseType: 'json', // default

	// `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
	xsrfCookieName: 'XSRF-TOKEN', // default

	// `xsrfHeaderName` is the name of the http header that carries the xsrf token value
	xsrfHeaderName: 'X-XSRF-TOKEN', // default

	// `progress` allows handling of progress events for 'POST' and 'PUT uploads'
	// as well as 'GET' downloads
	progress: function(progressEvent){
		// Do whatever you want with the native progress event
	},

	// `maxContentLength` defines the max size of the http response content allowed
	maxContentLength: 2000,

	// `validateStatus` defines whether to resolve or reject the promise for a given
	// HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
	// or `undefined`), the promise will be resolved; otherwise, the promise will be
	// rejected.
	validateStatus: function(status){
		return status >= 200 && status < 300; // default
	},

	// `maxRedirects` defines the maximum number of redirects to follow in node.js.
	// If set to 0, no redirects will be followed.
	maxRedirects: 5, // default

	// `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
	// and https requests, respectively, in node.js. This allows to configure options like
	// `keepAlive` that are not enabled by default.
	//httpAgent: new http.Agent({keepAlive: true}),
	//httpsAgent: new https.Agent({keepAlive: true})
}


const ResponseSchema = {
	// `data` is the response that was provided by the server
	data: {},

	// `status` is the HTTP status code from the server response
	status: 200,

	// `statusText` is the HTTP status message from the server response
	statusText: 'OK',

	// `headers` the headers that the server responded with
	headers: {},

	// `config` is the config that was provided to `axios` for the request
	config: {}
}

//Canceling Requests
var call1 = CancelToken.source();
var call2 = CancelToken.source();

axios.get('http://slowwly.robertomurray.co.uk/delay/3000/url/https://jsonplaceholder.typicode.com/posts/1', {
	cancelToken: call1.token
}).catch(function(thrown){
	if(axios.isCancel(thrown)){
		console.log('First request canceled', thrown.message);
	}
	else{
		// handle error
	}
});

// Fake time between user searches
setTimeout(function(){
	// Cancel current call
	call1.cancel('Operation canceled by the user.');

	// Make call again
	axios.get('https://jsonplaceholder.typicode.com/posts/1', {
		cancelToken: call2.token
	}).then(function(resp){
		console.log('Success', resp.status);
	});
}, 1000)