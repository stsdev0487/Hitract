import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    mainCardView: {
        paddingHorizontal: 8,
    },
    innerCardView: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 11,
        top: -40,
        left: 0,
        right: 0,
        paddingTop: 55,
        paddingBottom: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderColor: "rgb(223,226,230)",

        shadowColor: "rgb(223,226,230)",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowRadius: 9,
        shadowOpacity: 1,
        borderStyle: "solid",
        elevation: 4,
        marginHorizontal: 10

    },
    imageStyle: {
        width: '100%',
        height: 200,
    },
    labelView: {

    },
    labelTextView: {
    },
    locationText: {
        color: 'black'
    },
    imageView: {
        alignItems: 'center',
        borderRadius: 12,
        position: 'absolute',
        top: -70,
        left: 0,
        right: 0,
        zIndex: 1100
    },
    universityLogo: {
        width: 120,
        height: 120,
        borderRadius: 18,
        //borderWidth: 1,
        borderColor: "rgb(223,226,230)",
    },
    universityNameView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 0
    },
    titleText: {
        paddingVertical: 5
    },
    boldText: {
        fontWeight: 'bold',
        color: 'black'
    },
    descriptionText: {
        color: 'grey',
        textAlignVertical: "center"
    },
    seeMoreView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
    },
    seeMoreText: {
        color: 'grey'
    },
    downArrow: {
        width: 12,
        height: 12,
        top: 1,
        right: 4
    },
    mainRatingView: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    mainStarView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    starView: {
        flexDirection: 'row',
        paddingRight: 5,
        width: 180,
        alignItems: 'center',
        marginRight: 5
    },
    ratingText: {
        color: 'grey'
    },
    starImage: {
        marginHorizontal: 1
    }
});

export default styles;