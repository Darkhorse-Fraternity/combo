/**
 * Created by lintong on 2018/1/16.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    ScrollView,
    TouchableOpacity,
    Text,
    PixelRatio
} from 'react-native'
import {connect} from 'react-redux'
import RecordRow from '../RecordRow'
import {StyledText} from './style'
import {BlurView} from 'react-native-blur';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
//static displayName = RComment
@connect(
    state => ({
        //data:state.req.get()
    }),
    dispatch => ({
        //...bindActionCreators({},dispatch),
    })
)
export default class RComment extends Component {
    constructor(props: Object) {
        super(props);
        this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
        this.onKeyboardResigned = this.onKeyboardResigned.bind(this);

        this.state = {
            customKeyboard: {
                component: undefined,
                initialProps: undefined,
            },
            receivedKeyboardData: undefined,
        };

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            // title: '主页',
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }


    componentWillUnmount() {
        KeyboardUtils.dismiss()
    }

    _renderHeader = () => {
        const data = this.props.navigation.state.params.data
        return (
            <View>
                <RecordRow item={data} showChat={false}/>
                <View style={styles.line}/>
                <StyledText>my test</StyledText>
            </View>
        )
    }


    onKeyboardResigned() {
    }

    keyboardAccessoryViewContent() {
        const InnerContainerComponent = (IsIOS && BlurView) ? BlurView : View;
        return (
            <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
                <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>

                <View style={styles.inputContainer}>
                    <AutoGrowingTextInput
                        maxHeight={200}
                        style={styles.textInput}
                        ref={(r) => {
                            this.textInputRef = r;
                        }}
                        placeholder={'消息'}
                        underlineColorAndroid="transparent"
                        //onFocus={() => this.resetKeyboardView()}
                        testID={'input'}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => KeyboardUtils.dismiss()}>
                        <Text>发送</Text>
                    </TouchableOpacity>
                </View>
            </InnerContainerComponent>
        );
    }


    render(): ReactElement<any> {

        return (
            <View style={[this.props.style, styles.wrap]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
                >
                    {this._renderHeader()}
                </ScrollView>

                <KeyboardAccessoryView
                    renderContent={this.keyboardAccessoryViewContent}
                    onHeightChanged={IsIOS ? height => this.setState({keyboardAccessoryViewHeight: height}) :
                        undefined}
                    trackInteractive={TrackInteractive}
                    kbInputRef={this.textInputRef}
                    kbComponent={this.state.customKeyboard.component}
                    kbInitialProps={this.state.customKeyboard.initialProps}
                    onItemSelected={this.onKeyboardItemSelected}
                    onKeyboardResigned={this.onKeyboardResigned}
                    revealKeyboardInteractive
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
        // paddingHorizontal: 20,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    line: {
        height: StyleSheet.hairlineWidth * 2,
        backgroundColor: '#ebebeb',
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    blurContainer: {
        ...Platform.select({
            ios: {
                flex: 1,
            },
        }),
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 5,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 18,
    },
    sendButton: {
        paddingRight: 15,
        paddingLeft: 15,
        alignSelf: 'center',
    },
})
