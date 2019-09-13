/**
 * @format
 */
import {AppRegistry} from 'react-native';
import AppContainer from './App/AppContainer'; //Use for new app navigation stack
import {name} from './app.json';
AppRegistry.registerComponent(name, () => AppContainer);
