import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';

import PropTypes from 'prop-types';
import {Icon} from 'Hitract/UI';
import {Icons} from 'Hitract/Bookmark';

const {width} = Dimensions.get ('window');

class RelatedCourses extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      arrSwipeData: this.props.data,
      currentSelectIndex: this.props.currentSelectIndex <
        this.props.data.length
        ? this.props.currentSelectIndex
        : this.props.data.length - 1,
      childViewHeight: 200,
    };

    this.viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};
  }

  _onPressNextBtn = () => {
    if (this.state.currentSelectIndex < this.state.arrSwipeData.length - 1) {
      this.swiper.scrollToIndex ({
        index: this.state.currentSelectIndex + 1,
        animated: true,
      });
    }
  };

  _onPressBackBtn = () => {
    if (this.state.currentSelectIndex != 0) {
      this.swiper.scrollToIndex ({
        index: this.state.currentSelectIndex - 1,
        animated: true,
      });
    }
  };


  onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems && viewableItems.length > 0) {
      this.setState ({
        currentSelectIndex: viewableItems[0].index,
      });
      let that = this;
    }
  };

  getItemLayout = (data, index) => ({
    length: this.props.containerWidth - 80,
    offset: (this.props.containerWidth - 80) * index,
    index,
  });

  _onPressItem(item, index) {
    this.swiper.scrollToIndex ({
      index: index,
      animated: true,
    });
    console.log (item);
  }

  renderItem = ({item, index}) => {
    return (
      <View
        style={[{width: this.props.containerWidth - 80}]}
      >
        <TouchableOpacity onPress={() => this._onPressItem(item, index)}>
          <View style={styles.cardBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.codeTitle}>{item.courseCode}</Text>
            <Text style={styles.nameTitle}>{item.universityName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render () {
    return (
      <View style={[this.props.style, {width: this.props.containerWidth}]}>
        <FlatList
          ref={flatList => {
            this.swiper = flatList;
          }}
          keyboardShouldPersistTaps="always"
          scrollEnabled={true}
          data={this.state.arrSwipeData}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString ()}
          renderItem={this.renderItem}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          getItemLayout={this.getItemLayout}
          horizontal
          directionalLockEnabled
          pagingEnabled
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={this.state.currentSelectIndex}
        />

        {this.state.currentSelectIndex > 0
          ? <View
              style={[
                styles.IconStyle,
                {left: 15, height: this.state.childViewHeight},
              ]}
            >
              <View style={styles.viewBtn}>
                <TouchableWithoutFeedback onPress={this._onPressBackBtn}>
                  <Icon name={Icons.backward} style={styles.IconImageView}/>

                </TouchableWithoutFeedback>
              </View>
            </View>
          : null}

        {this.state.currentSelectIndex < this.state.arrSwipeData.length - 1
          ? <View
              style={[
                styles.IconStyle,
                {right: 15, height: this.state.childViewHeight},
              ]}
            >
              <View style={styles.viewBtn}>
                <TouchableWithoutFeedback onPress={this._onPressNextBtn}>
                  <Icon name={Icons.forward} style={styles.IconImageView}/>
                </TouchableWithoutFeedback>
              </View>
            </View>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  cardBox: {
    height: 170,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
    shadowOffset: {width: 0, height: 2},
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  codeTitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#808080',
  },
  nameTitle: {
    fontSize: 12,
    color: '#808080',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  IconStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    top: -8,
  },
  IconImageView: {
    width: 15,
    height: 15,
  },
  viewBtn: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

RelatedCourses.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.oneOfType ([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  containerWidth: PropTypes.number,
  currentSelectIndex: PropTypes.number
};

RelatedCourses.defaultProps = {
  style: {},
  containerWidth: width,
  currentSelectIndex: 0
};

export default RelatedCourses;
