import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    headerView: {
    },
    imageStyle: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    labelView: {
        zIndex: 111,
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
    },
    labelTextView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        borderRadius: 4,
        width: 185,
        height: 20,
        justifyContent: 'center',
        paddingLeft: 10,
        maxWidth: 185
    },
    locationText: {
        color: 'black'
    }
});

export default styles;