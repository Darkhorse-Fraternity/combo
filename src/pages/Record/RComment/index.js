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
    Text,
    PixelRatio,
    Clipboard,
    Keyboard,
    TouchableOpacity
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
import Dialog from '../../../components/Dialog'


const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
//static displayName = RComment
import Toast from 'react-native-simple-toast'

const Name = 'text'

import { findByID } from "../../../redux/module/leancloud";

@connect(
    (state, props) => ({
        //data:state.req.get()
        user: state.user.data,
        iDoData: state.normalizr.get(IDO).get(props.navigation.state.params.iDoID)
    }),
    (dispatch, props) => ({
        find: () => {
            const id = props.navigation.state.params.iDoID
            console.log('id:', id);
            findByID(IDO, id)

        },
        send: () => dispatch(async (dispatch, getState) => {
            const state = getState()
            const iDoID = props.navigation.state.params.iDoID
            let iDoData = state.normalizr.get(IDO).get(props.navigation.state.params.iDoID)
            iDoData = iDoData && iDoData.toJS()

            const selector = formValueSelector(FormID) // <-- same as form name
            // KeyboardUtils.dismiss()
            KeyboardUtils.dismiss()


            const text = selector(state, Name)
            const param = {
                text,
                ...selfUser(),
                ...iDo(iDoID)
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


            dispatch(addNormalizrEntity(ICOMMENT, entity))
            if (iDoData) {
                iDoData.commentNum++
                dispatch(addNormalizrEntity(IDO, iDoData))
            }

            // // dispatch(addNormalizrEntities(key,data))
            dispatch(listAdd(ICOMMENT + iDoID, entity.objectId))

            dispatch(reset(FormID))
        }),
        delete: async (item) => {
            const iDoID = props.navigation.state.params.iDoID
            await remove(item.objectId, ICOMMENT)
            dispatch(claerByID(ICOMMENT + iDoID, item.objectId))
        },
        copy: (item) => {
            Clipboard.setString(item.text)
            Toast.show('已复制评论!')
        },
        refresh: () => {
            dispatch(async (dispatch, getState) => {
                const state = getState()
                const user = state.user.data
                let iDoData = state.normalizr.get(IDO).get(props.navigation.state.params.iDoID)
                iDoData = iDoData && iDoData.toJS()
                let iDoID = props.navigation.state.params.iDoID
                if (iDoData && iDoData.commentNew &&
                    iDoData.user === user.objectId) {

                    const params = {
                        commentNew: false
                    }
                    const res = await update(iDoID, params, IDO)

                    iDoData = {
                        ...iDoData,
                        ...res,
                        ...params
                    }

                    dispatch(addNormalizrEntity(IDO, iDoData))

                }

            })

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
        if (!this.props.iDoData) {
            this.props.find()
        }else {
            this.props.refresh()
        }
    }

    componentWillUnmount() {
        KeyboardUtils.dismiss()
    }

    _renderHeader = () => {
        let iDoData = this.props.iDoData
        iDoData = iDoData && iDoData.toJS()
        return (
            <StyledHeader>
                {iDoData && <RecordRow item={iDoData} showChat={false} showImage={true}/>}
            </StyledHeader>
        )
    }


    onKeyboardResigned() {
    }

    keyboardAccessoryViewContent() {
        const iDoID = this.props.navigation.state.params.iDoID
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
                    localSaveID={iDoID}
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
        return (<StyledRow onPress={async () => {
            const { user } = this.props

            // if (item.user.objectId === user.objectId) {
            //     showSelector(['删除', '复制'], (index) => {
            //         if (index === 0) {
            //             this.props.delete(item)
            //         } else if (index === 1) {
            //             this.props.copy(item)
            //         }
            //     })
            // } else {
            //     showSelector(['复制'], (index) => {
            //         if (index === 0) {
            //             this.props.copy(item)
            //         }
            //     })
            // }

            const items = [{ label: '复制', id: 'copy' }]
            if (item.user.objectId === user.objectId) {
                items.push({ label: '删除', id: 'delete' })
            }
            const { selectedItem } = await Dialog.showPicker('请选择', null, { items });
            if (selectedItem) {
                const { id } = selectedItem
                // console.log('You selected item:', selectedItem);
                this.props[id] && this.props[id](item)
            }


        }}>
            <StyledRowLeft>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Following', { user: item.user })
                }}>
                    <StyledAvatar source={source}/>
                </TouchableOpacity>
            </StyledRowLeft>
            <StyledRowRight>
                <StyledNickText>
                    {item.user.nickname || '路人甲'}
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

        const iDoID = this.props.navigation.state.params.iDoID

        const params = {
            where: {
                ...iDo(iDoID),

            },
            include: 'user'
        }

        return (
            <StyledContent>
                <LCList
                    keyboardDismissMode='interactive'
                    ListHeaderComponent={this._renderHeader}
                    style={[styles.list]}
                    reqKey={ICOMMENT}
                    sKey={ICOMMENT + iDoID}
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
        backgroundColor: 'white',
        borderTopColor: 'rgb(200,200,200)',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    list: {
        // marginBottom: 50
    }
})
