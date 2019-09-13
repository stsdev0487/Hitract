/*Application properties to configure other dependencies.*/

//Configuration for `Hitract/Api` module
export api from './api.json';

//Namespace of StorageController used by the `Api` + `Api/Authority` modules
// * If this value changes, make sure to clear additional stores created for the app
export const authorityNamespace = 'HitractApi';

//Configuration for `fsdk` module
export facebook from './facebook.json';

//Namespace of StorageController used by the `HitractApp` component
export const localeNamespace = 'HitractLocale';

/*App json including locale language code specifying property of phrases configured by `Hitract/App/Locale`*/
export * from '../app.json';



