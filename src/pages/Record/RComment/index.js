/**
 * Created by lintong on 2018/1/16.
 * @flow
 */

'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    ScrollView,
    TouchableOpacity,
    Text,
    PixelRatio,
    Clipboard
} from 'react-native'
import { connect } from 'react-redux'
import RecordRow from '../RecordRow'
import { BlurView } from 'react-native-blur';
// import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import LCList from '../../../components/Base/LCList'

import { KeyboardAccessoryView, KeyboardUtils } from 'react-native-keyboard-input';

import {
    ICOMMENT, IDO
} from '../../../redux/reqKeys'
import { add, remove, update } from '../../../redux/module/leancloud'
import { selfUser, iDo } from '../../../request/LCModle'
import { add as listAdd, claerByID } from '../../../redux/actions/list'
import { addNormalizrEntity, } from '../../../redux/module/normalizr'
import ChatSendForm, { FormID } from '../../../components/Form/ChatSendForm'
import {
    StyledHeader,
    StyledContent,
    StyledRow,
    StyledRowLeft,
    StyledAvatar,
    StyledRowRight,
    StyledNickText,
    StyledContentText,
    StyledDate,
} from './style'
import moment from 'moment'
import { formValueSelector } from 'redux-form/immutable'
import { reset } from 'redux-form'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { showSelector } from '../../../components/Selector'


const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
//static displayName = RComment
import Toast from 'react-native-simple-toast'

const Name = 'text'

@connect(
    state => ({
        //data:state.req.get()
        user: state.user.data
    }),
    (dispatch, props) => ({
        send: () => dispatch(async (dispatch, getState) => {
            const iDoData = props.navigation.state.params.data

            const selector = formValueSelector(FormID) // <-- same as form name
            KeyboardUtils.dismiss()

            const state = getState()
            const text = selector(state, Name)
            const param = {
                text,
                ...selfUser(),
                ...iDo(iDoData.objectId)
            }
            // const res = await add(param, ICOMMENT)


            const res = await add(param, ICOMMENT) //

            console.log('res:', res);


            const entity = {
                ...param,
                ...res,
                user: state.user.data
            }
            // dispatch(addListNormalizrEntity(ICOMMENT, entity))

            iDoData.commentNum++

            dispatch(addNormalizrEntity(ICOMMENT, entity))

            dispatch(addNormalizrEntity(IDO, iDoData))
            // // dispatch(addNormalizrEntities(key,data))
            dispatch(listAdd(ICOMMENT + iDoData.objectId, entity.objectId))

            dispatch(reset(FormID))
        }),
        delete: async (item) => {
            const iDoData = props.navigation.state.params.data
            await remove(item.objectId, ICOMMENT)
            dispatch(claerByID(ICOMMENT + iDoData.objectId, item.objectId))
        },
        copy: (item) => {
            Clipboard.setString(item.text)
            Toast.show('已复制评论!')
        },
        refresh: async (user) => {
            let iDoData = props.navigation.state.params.data
            if (iDoData.commentNew && iDoData.user.objectId === user.objectId) {

                const params = {
                    commentNew: false
                }
                const res = await update(iDoData.objectId, params, IDO)

                iDoData = {
                    ...iDoData,
                    ...res,
                    ...params
                }

                dispatch(addNormalizrEntity(IDO, iDoData))

            }
        }
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
        this.props.refresh(this.props.user)
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
        const { objectId } = this.props.navigation.state.params.data
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
                    placeholder='请输入评论'
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


    renderRow({ item }: Object): ReactElement<any> {
        const date = moment(item.createdAt).format("MM/DD HH:mm")
        const my_head = require('../../../../source/img/my/my_head.png');
        const source = item.user.avatar ? { uri: item.user.avatar.url } : my_head
        return (<StyledRow onPress={() => {
            const { user } = this.props

            if (item.user.objectId === user.objectId) {
                showSelector(['删除', '复制'], (index) => {
                    if (index === 0) {
                        this.props.delete(item)
                    } else if (index === 1) {
                        this.props.copy(item)
                    }
                })
            } else {
                showSelector(['复制'], (index) => {
                    if (index === 0) {
                        this.props.copy(item)
                    }
                })
            }

        }}>
            <StyledRowLeft>
                <StyledAvatar source={source}/>
            </StyledRowLeft>
            <StyledRowRight>
                <StyledNickText>
                    {item.user.username}
                </StyledNickText>
                <StyledContentText>
                    {item.text}
                </StyledContentText>
                <StyledDate>
                    {date}
                </StyledDate>
            </StyledRowRight>
        </StyledRow>)
    }


    render(): ReactElement<any> {

        const iDoData = this.props.navigation.state.params.data

        const params = {
            where: {
                ...iDo(iDoData.objectId),

            },
            include: 'user'
        }

        return (
            <StyledContent>
                <LCList
                    ListHeaderComponent={this._renderHeader}
                    style={[styles.list]}
                    reqKey={ICOMMENT}
                    sKey={ICOMMENT + iDoData.objectId}
                    renderItem={this.renderRow.bind(this)}
                    reqParam={params}
                    noDataPrompt='还没有评论~'
                />
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
    list: {
        marginBottom: 50
    }
})
