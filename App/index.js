import {context} from '../app.json';
/*Exports App State, Storage and Data Source Controller*/
import {StorageController} from 'Hitract/Api/Controller';
import {MountProtocol} from 'Hitract/Api/Protocol';
const App = MountProtocol(class AppContext extends StorageController{})

//exports
export default new App(context.namespace)
export Bookmark from '../Bookmark';
export * from '../Locale';






