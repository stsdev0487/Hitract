@developer
----------



Usage
--------------
Requests to `metro` for `react-native` debugger `index.delta` are not allowed.  To enable them:

*react-native debugger*
> ./node_modules/@react-native-community/cli/build/commands/server/middleware/getSecurityHeadersMiddleware.js

Set access control to connect `react-native-console` component
`res.setHeader('Access-Control-Allow-Origin', '*');`

