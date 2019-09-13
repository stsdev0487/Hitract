TextInput 
---------

## Properties
Enum Values marked with '*' are default values


* allowFontScaling: true

* autoCapitalize: 
    - enum('none', 'sentences'*, 'words', 'characters')
    
* autoCompleteType: (android)
    - off
    - username
    - password
    - email
    - name
    - tel
    - street-address
    - postal-code
    - cc-number
    - cc-csc
    - cc-exp
    - cc-exp-month
    - cc-exp-year
    
* autoCorrect: true

* autoFocus: false

* blurOnSubmit: 
    - multiline default: false
    - single-line default: true

* caretHidden: false

* clearButtonMode: 
    - enum('never'*, 'while-editing', 'unless-editing', 'always')

* clearTextOnFocus: (iOS)

* contextMenuHidden false

* dataDetectorTypesL (iOS)
    - enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), 
    - array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all')

* defaultValue

* disableFullscreenUI: false

* editable: true

* enablesReturnKeyAutomatically: false

* importantForAutofill (android)
    - enum('auto', 'no', 'noExcludeDescendants', 'yes', 'yesExcludeDescendants')
    
* inlineImageLeft (android)
    - file path to resource image
    
* inlineImagePadding (android)
    - number

* inputAccessoryViewID (iOS)

* keyboardAppearance (iOS)
    - enum('default', 'light', 'dark')
    
* keyboardType
    * Cross platform:
        - default
        - number-pad
        - decimal-pad
        - numeric
        - email-address
        - phone-pad
    
    * iOS Only:
        - ascii-capable
        - numbers-and-punctuation
        - url
        - name-phone-pad
        - twitter
        - web-search
        
    * Android Only:
        - visible-password

* maxFontSizeMultiplier

* maxLength
    - number

* multiline: false

* numberOfLines
    - number 

* placeholder
    - text

* placeholderTextColor
    - color
    
* rejectResponderTermination ???

* returnKeyLabel (android)
    
* returnKeyType 
    - enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo')
    
    * Cross platform:
        done
        go
        next
        search
        send
    
    * Android Only:
        none
        previous
        
    * iOS Only:
        default
        emergency-call
        google
        join
        route
        yahoo
        

* scrollEnabled: true (iOS)

* secureTextEntry: false

* selection
    - object: {start: number,end: number}

* selectionColor
    - color

* selectionState (iOS)

* selectTextOnFocus

* showSoftInputOnFocus: true (android)

* spellCheck: (default value inherited from autoCorrect)

* style
    borderLeftWidth
    borderTopWidth
    borderRightWidth
    borderBottomWidth
    borderTopLeftRadius
    borderTopRightRadius
    borderBottomRightRadius
    borderBottomLeftRadius
    
* textBreakStrategy (android)
    - enum('simple'*, 'highQuality', 'balanced')
    
* textContentType (iOS)
    - enum('none', 'URL', 'addressCity', 'addressCityAndState', 'addressState', 'countryName', 'creditCardNumber', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'nickname', 'organizationName', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'username', 'password')

* underlineColorAndroid (android)

* value
    - string
    
Methods:
    * clear
    * isFocused

Event Listeners:
* onBlur

* onChange
    - arguments = { nativeEvent: { eventCount, target, text} }

* onChangeText

* onContentSizeChange
    - arguments = { nativeEvent: { contentSize: { width, height } } }

* onEndEditing

* onFocus
    - arguments = { nativeEvent: { target } }

* onKeyPress
    - arguments = { nativeEvent: { target } }

* onLayout
    - arguments = { nativeEvent: {layout: {x, y, width, height}, target } 

* onScroll
    - arguments = { nativeEvent: { contentOffset: { x, y } } }

* onSelectionChange
    - arguments = { nativeEvent: { selection: { start, end } } }

* onSubmitEditing
    - arguments = {nativeEvent: {text, eventCount, target}}


