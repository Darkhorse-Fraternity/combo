/**
 * Created by lintong on 2017/9/26.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {backViewColor} from '../../configure'
import {ICARD, IUSEExist, IUSE} from '../../redux/reqKeys'
import {addNormalizrEntity} from '../../redux/module/normalizr'
import {update, add} from '../../redux/module/leancloud'
import {bindActionCreators} from 'redux';
import HeaderBtn from '../../components/Button/HeaderBtn'
import {existSearch} from '../../request/leanCloud'
import {selfUser, iCard} from '../../request/LCModle'
import {req, reqChangeData} from '../../redux/actions/req'
import {addListNormalizrEntity} from '../../redux/actions/list'
import moment from 'moment'
//static displayName = PublishDetail
@connect(
    (state, props) => ({
        //data:state.req.get()
        iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardID),
        useExist: state.req.get(IUSEExist),
        load: state.req.get(IUSE).get('load')
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        refresh: async (data) => {
            const id = data.objectId
            const param = {
                state: data.state === 0 ? 1 : 0
            }

            const res = await  await update(id, param, ICARD)

            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(ICARD, entity))
        },
        exist: async () => {
            const id = props.navigation.state.params.iCardID
            const params = existSearch(IUSE, {
                where: {
                    ...iCard(id),
                    ...selfUser()
                }
            })
            req(params, IUSEExist)
        },
        add: async () => {
            const id = props.navigation.state.params.iCardID
            const param = {
                cycle: 0,
                time: 0,
                // notifyTime:option&&option.notifyTime||"20.00",
                doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
                ...selfUser(),
                ...iCard(id)
            }
            const res = await add(param, IUSE)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addListNormalizrEntity(IUSE, entity))
            dispatch(reqChangeData(IUSEExist, {
                results: {
                    results: [],
                    count: 1
                }
            }))
        }
    })
)
export default class PublishDetail extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            // title: params.title,
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentDidMount() {
        this.props.exist()
    }

    __alert = (iCard) => {
        Alert.alert(
            '确定取消发布?',
            '取消发布后意味着您不再提供服务',
            [{text: '取消'}, {
                text: '确定', onPress: () => {
                    this.props.refresh(iCard)
                }
            }]
        )
    }

    _renderHeader = () => {
        const {navigation} = this.props;
        const {state} = navigation;
        const {params} = state;


        const useExist = this.props.useExist.toJS().data
        const exist = useExist.results && useExist.results.count >= 1
        const load = this.props.useExist.get('load')
        console.log('useExist:', this.props.useExist.get('load'));
        const text = exist ? "正在使用" : '立即使用'
        return (
            <View style={styles.header}>
                <Text style={styles.title}>{params.data.title}</Text>
                <View style={styles.headerIn}>
                    <Text style={styles.useNum}>使用人数： {params.data.useNum || (exist? 1:0)}</Text>
                    <HeaderBtn
                        style={styles.headerBtn}
                        load={this.props.load || load}
                        disabled={exist}
                        title={text}
                        onPress={() => {
                            this.props.add()
                        }}/>
                </View>
            </View>
        )

    }

    _renderRow(title: string, onPress: Function = () => {
    }) {
        return (
            <TouchableOpacity onPress={onPress} style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={styles.rowText}>
                        {title}
                    </Text>
                </View>
                <View style={styles.row2}>
                    <View style={styles.arrowView}/>
                </View>
            </TouchableOpacity>
        );
    }

    render(): ReactElement<any> {
        const iCard = this.props.iCard.toJS()
        return (
            <View style={[this.props.style, styles.wrap]}>
                {this._renderHeader()}

                {this._renderRow('修改配置', () => {
                    this.props.navigation.navigate('OptionView', {opData: iCard})
                })}
                {/*{this._renderRow(iCard.state === 0 ? "马上发布" : '取消发布', () => {*/}
                {/*if (iCard.state === 0) {*/}
                {/*this.props.refresh(iCard)*/}
                {/*} else {*/}
                {/*this.__alert(iCard)*/}
                {/*}*/}
                {/*})}*/}
                {this._renderRow("发布设置", () => {
                    this.props.navigation.navigate('Publishing',
                        {iCardID: this.props.navigation.state.params.iCardID})
                })}
                {this._renderRow('查看记录', () => {
                    this.props.navigation.navigate('Serve', {iCard})
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: "white",
        // flexDirection: 'row'
    },
    header: {
        padding: 25,
    },
    headerIn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    useNum: {
        marginTop: 10,
        fontSize: 15,
        color: 'rgb(50,50,50)',
    },

    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },


    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowText: {
        marginLeft: 10,
        fontSize: 14,
        color: 'rgb(100,100,100)',
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        marginRight: 5,
        width: 10,
        height: 10,
    },
    headerBtn: {
        marginTop: 5,
        width: 85,
    },
})
