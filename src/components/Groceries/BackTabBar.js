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
    TouchableNativeFeedback
} from 'react-native';

import Button from "../Button";
import theme from '../../Theme'
import { required } from "../../request/validation";

const backWidth = Dimensions.get('window').width / 4

export default class BackTabBar extends Component {
    static propTypes = {
        goToPage: PropTypes.func,
        onBackPress: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        underlineColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
    };

    renderTabOption(name: string, page: number) {
        const containerWidth = this.props.containerWidth - backWidth * 2;
        const numberOfTabs = this.props.tabs.length;
        const tabWidth = containerWidth / numberOfTabs ;
        const isTabActive = this.props.activeTab === page;
        const activeTextColor = this.props.activeTextColor || '#f1bd49';
        const inactiveTextColor = this.props.inactiveTextColor || '#999999';
        const textStyle = this.props.textStyle || {};
        return <TouchableOpacity
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => this.props.goToPage(page)}>
            <View style={[styles.tab,
                { width: tabWidth }]}>
                <Text style={[{
                    color: isTabActive ? activeTextColor : inactiveTextColor,
                    fontWeight: isTabActive ? 'bold' : 'normal',
                    fontSize: isTabActive ? 15: 14
                }, textStyle]}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>;
    }

    render() {
        const containerWidth = this.props.containerWidth  - backWidth * 2;
        const numberOfTabs = this.props.tabs.length;
        const tabWidth = containerWidth / numberOfTabs ;
        const underLineWidth = tabWidth / 3
        const tabUnderlineStyle = {
            position: 'absolute',
            width: underLineWidth,
            height: 3,
            backgroundColor: this.props.underlineColor || theme.mainColor,
            bottom: 5,
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1,],
            outputRange: [-tabWidth , 0],
        });
        // console.log('this.props.onBackPress:', this.props.onBackPress);

        const background = TouchableNativeFeedback.SelectableBackgroundBorderless &&
            TouchableNativeFeedback.SelectableBackgroundBorderless()
        return (
            <View style={[styles.tabs, {
                backgroundColor:
                this.props.backgroundColor || 'white',paddingTop:20
            }, this.props.style,]}>
                <Button
                    background={background}
                    onPress={()=>{
                        this.props.onBackPress &&
                        this.props.onBackPress()
                    }}
                    style={{ width: backWidth,
                        justifyContent:'center',paddingLeft:16}}>
                    <Image
                        style={{tintColor:'black'}}
                        source={require('react-navigation/src/views/assets/back-icon.png')}/>
                </Button>
                <View style={[styles.tab, styles.contain]}>
                    {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                    <Animated.View style={[tabUnderlineStyle,
                        {
                            transform: [
                                { translateX },
                            ]
                        },
                    ]}/>
                </View>
                <View style={{ width: backWidth }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: 10,
        flexDirection: 'row'
    },
    contain: {
        flexDirection: 'row',
    },
    tabs: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'transparent',
    },
});
