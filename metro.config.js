/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require("metro-config");
// blacklist is a function that takes an array of regexes and combines
// them with the default blacklist to return a single regex.
const blacklist = require('metro-config/src/defaults/blacklist');

//https://facebook.github.io/metro/docs/en/configuration
module.exports = (async ()=>{
  const {resolver: {sourceExts, assetExts}} = await getDefaultConfig();
  return {
    resolver: {
      blacklistRE: blacklist([/@developer\/.*/, /@package-scripts\/.*/, /@material-design-kit\/.*/]),
      assetExts: assetExts.filter(ext=>ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    },
    transformer: {
      getTransformOptions: async ()=>({
        transform: {
          experimentalImportSupport: false
        },
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    //The number of workers we should parallelize the transformer on.
    maxWorkers: 50
  };
})();


