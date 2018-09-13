import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Button from "../Button";
import theme from '../../Theme'
import { required } from "../../request/validation";

const backWidth = Dimensions.get('window').width / 3


export default class BackTabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    underlineColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,

  };


  renderTabOption(name: string, page: number) {

    const {
      activeTab,
      activeTextColor = '#000000',
      inactiveTextColor = '#979797',
      textStyle = {},
      tabs
    } = this.props


    const isTabActive = activeTab === page;
    const numberOfTabs = tabs.length;
    const tabUnderlineWidth = 72

    const tabUnderlineStyle = {
      width: tabUnderlineWidth,
      height: 7,
      backgroundColor: this.props.underlineColor || theme.mainColor,
    };


    // let outputRange = lastActiveTab - page < 0 && isTabActive ? [0, 1] : [1, 0]

    // if(isTabActive){
    //   console.log('inputRange:', inputRange);
    // }


    const inputRange = []
    const outputRange = []
    for (let i=0;i<numberOfTabs;i++)
    {
      inputRange.push(i)
      outputRange.push(0)
    }
    outputRange.splice(page,1,1)

    const scaleX = this.props.scrollValue.interpolate({
      inputRange: inputRange,
      outputRange: outputRange,
    });



    return <TouchableOpacity
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => this.props.goToPage(page)}>
      <View style={[styles.tab]}>
        <Animated.Text style={[{
          fontSize: isTabActive ? 18 : 15,
          color: isTabActive ? activeTextColor : inactiveTextColor
        }, textStyle]}>
          {name}
        </Animated.Text>
        { <Animated.View style={[tabUnderlineStyle,
          {
            transform: [{ scaleX }]
          },
        ]}/>}
      </View>
    </TouchableOpacity>;
  }

  render() {




    // console.log('this.props.scrollValue:', translateX);


    const background = TouchableNativeFeedback.SelectableBackgroundBorderless &&
      TouchableNativeFeedback.SelectableBackgroundBorderless()
    return (
      <View style={[styles.tabBar, this.props.style]}>
        {this.props.tabs.map((tab, i) =>
          this.renderTabOption(tab, i))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'transparent',
    alignItems: 'center'
  },
  tab: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center'
  },


});
