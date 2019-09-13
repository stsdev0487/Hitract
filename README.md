Hitract Project
-------

### Project Structure & Directory Outline

**Repository Structure:**

1. `/App` (_app construction + build modules_)
    1. `/App/AppContainer.js` (changed from _/App.js_)
        * Provides main/entry application container for React
    2. `/App/AppIndex.js` (_app routes & navigation module/helper_)
        * Provides index index of app's navigable sections and includes aliases for some app features
    3. `/App/Navigation` (changed from _/Navigation_)
        * Provides application navigation for application
        * Includes launch screen, menu drawer & authentication switch

2. `/Api` (_Endpoint Requests, Api Interface_)
    1. `/Api/Authority` (_Controllers for authentication_)
    2. `/Api/Controller` (_Controllers for data_)
    
3. `/configuration` (_configuration .json files_)
    1. `/configuration/api.json` (Api module configuration for _hitract_ REST api)
    2. `/configuration/facebook.json` (minimal _fbdk_ information)
    3. `/configuration/firebase.json` (minimal _fbdk_ information)
        
4. `/Component` (new directory for shared _/components_)
    1. `migration in progress`
        1. `/components` + `UI/Component`
            
5. `/images` (_image assets_)

6. `/Locale` (_collection of localized phrases_)

7. `/Screen` (_feature-centric views + nested-navigation_)
    1. `/Screen/Account`
        1. Account, Profile + User Settings Stacks
    1. `/Screen/Contact`
        1. Notifications, HitMail + Communication Stacks
    1. `/Screen/Media`
        1. HitPics + Gallery Stacks
    1. `/Screen/Network`
        1. HitFeed, Social Stream + Profile Stacks
    1. `/Screen/OnBoard`
        1. Auth, Login, OnBoard Stacks
    1. `/Screen/Search`
        1. Search, Results, Stacks (_empty_)

8. `/UI` (_UI + design_)
    1. `/UI/Component` (_shared UI components_)
        1. `needs to move to /Component folder`
        
        
*Application Bundle*

1. `/android` (_android app build_)  
2. `app.json` (_app details + information_)  
3. `/index.js`
    * Registers app container into React
4. `/ios` (_ios app build_)  
5. `/node_modules` (_npm installed modules_)  
6. `package.json` (_node package configuration_)



*Repository & Module Configuration Files*
1. `/.buckconfig`
2. `/.flowconfig`
3. `/.gitattributes`
4. `/.gitignore`
5. `/.watchmanconfig`
6. `/babel.config.js`
7. `/metro.config.js`
8. `package-lock.json` (_npm lock file_)
9. `yarn.lock` (_yarn package manager lock file_)

*Ignored, Changed or Unused*
1. `/AppContainer.js` (previous entry/container & named _App.js_)


> In progress. To be continued... 


## React Native

#### Import + Require
There are quirks when loading modules that differ from standard _node.js or javascript_ environments.

##### `import`
The `import` operation allows use of the _registered name of the app_ to target the root directory of the project.

```jsx 
import {Gradient,icon} from 'Hitract/UI';
```



##### `require`

I. Images use require to load the cached assets.  
II. You must specify string path. 
III. Does not support use of the _registered name of the app_ to resolve paths.

```jsx  
//Used for Image.source attribute
require('../images/path/to/image/graphic.png')
```