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
import {BlurView} from 'react-native-blur';
// import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';

import {
    IDO,
    IUSEExist,
    IUSE,
    ICOMMENT
} from '../../../redux/reqKeys'
import {addNormalizrEntity} from '../../../redux/module/normalizr'
import {update, add, search} from '../../../redux/module/leancloud'
import {selfUser, iCard, iDo} from '../../../request/LCModle'
import {req, reqChangeData} from '../../../redux/actions/req'
import {addListNormalizrEntity} from '../../../redux/actions/list'
import ChatSendForm, {FormID} from '../../../components/Form/ChatSendForm'
import {
    StyledHeader,
    StyledBody,
    StyledContent
} from './style'

import {formValueSelector} from 'redux-form/immutable'
import {reset} from 'redux-form'
import {immutableRenderDecorator} from 'react-immutable-render-mixin';


const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
//static displayName = RComment

const Name = 'text'

@connect(
    state => ({
        //data:state.req.get()
    }),
    (dispatch, props) => ({
        load: async () => {
            const iDoData = props.navigation.state.params.data

            dispatch(search(false, {
                where: {
                    ...iDo(iDoData.objectId)
                },
            }, ICOMMENT))

        },
        send: () => dispatch(async (dispatch, getState) => {
            const iDoData = props.navigation.state.params.data

            const selector = formValueSelector(FormID) // <-- same as form name
            KeyboardUtils.dismiss()

            const text = selector(getState(), Name)
            const param = {
                text,
                ...selfUser(),
                ...iDo(iDoData.objectId)
            }
            const res = await add(param, ICOMMENT)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addListNormalizrEntity(ICOMMENT, entity))

            dispatch(reset(FormID))


            // // dispatch(reqChangeData(IUSEExist, {

            //     results: {
            //         results: [],
            //         count: 1
            //     }
            // }))
        })
    })
)

@immutableRenderDecorator

export default class RComment extends Component {
    constructor(props: Object) {
        super(props);
        this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
        this.onKeyboardResigned = this.onKeyboardResigned.bind(this);

        this.state = {

            text: '',
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



    componentDidMount() {
        this.props.load()
    }

    componentWillUnmount() {
        KeyboardUtils.dismiss()
    }

    _renderHeader = () => {
        const data = this.props.navigation.state.params.data
        return (
            <StyledHeader>
                <RecordRow item={data} showChat={false}/>
            </StyledHeader>
        )
    }


    onKeyboardResigned() {
    }

    keyboardAccessoryViewContent() {
        const {objectId} = this.props.navigation.state.params.data
        const InnerContainerComponent = (IsIOS && BlurView) ? BlurView : View;
        return (
            <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
                {/*<View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>*/}
                <ChatSendForm
                    maxHeight={200}
                    ref={(r) => {
                        this.textInputRef = r;
                    }}
                    name={Name}
                    maxLength={5000}
                    placeholder='消息'
                    //onFocus={() => this.resetKeyboardView()}
                    // onChangeText={text => this.setState({text})}
                    testID='input'
                    localSaveID={objectId}
                    key=''
                    localSaveEnable
                    onSubmit={this.props.send}
                />
            </InnerContainerComponent>
        );
    }


    render(): ReactElement<any> {

        return (
            <StyledContent>
                <StyledBody
                    keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
                >
                    {this._renderHeader()}
                </StyledBody>

                <KeyboardAccessoryView
                    renderContent={this.keyboardAccessoryViewContent}
                    trackInteractive={TrackInteractive}
                    kbInputRef={this.textInputRef}
                    onKeyboardResigned={this.onKeyboardResigned}
                    revealKeyboardInteractive
                />
            </StyledContent>
        );
    }
}

const styles = StyleSheet.create({
    blurContainer: {
        ...Platform.select({
            ios: {
                flex: 1,
            },
        }),
    },

})
