/**
 * Created by lintong on 2017/8/4.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Keyboard
} from 'react-native'
import * as Animatable from 'react-native-animatable';

import { AutoGrowingInput, TextInput } from '../../components/Form/Cunstom'
import { Radio, Multiple } from '../../components/Form/Select'
import Toast from 'react-native-simple-toast'
import { mainColor } from '../../Theme'

export const StaticOption = {
    notifyTime: '20:00',
    period: '7',
    notifyText: '',
    record: [],
    recordDay: [1, 2, 3, 4, 5, 6, 7],
}

import {
    formValues,
} from 'redux-form/immutable'
import Button from '../../components/Button'

@formValues('title', 'notifyTime', 'notifyText', 'period', 'record', 'recordDay')

export default class OptionDo extends Component {
    constructor(props: Object) {
        super(props);

        this.state = {
            option: 0,
            type: 'notifyTime'
        }
    }

    static propTypes = {};
    static defaultProps = {};


    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }

    __backStep = () => {

        if (!this.props.title || this.props.title.length === 0) {

            Toast.show('卡片名称不可为空~')
            return;
        }

        if (this.state.option !== 0) {
            this.setState({ option: 0 })
        } else {


            this.props.goBack && this.props.goBack()

        }
    }

    __remderBack = () => {
        return (
            <Animatable.View animation="fadeInLeft"
                             delay={Math.random() * 300}
            >
                <Button
                    onPress={this.__backStep}
                    style={[styles.item, styles.shadow, { marginBottom: 20 }]}>
                    <Text>返回</Text>
                </Button>
            </Animatable.View>
        )
    }

    __renderDone = () => {
        return (
            <Animatable.View animation="fadeInRight"
                             delay={Math.random() * 300}
            >
                <Button
                    onPress={this.props.done}
                    style={[styles.done, styles.shadow, { marginBottom: 50 }]}>
                    <Text>提交</Text>
                </Button>
            </Animatable.View>
        )

    }

    __renderItem = (props) => {
        return (
            <Animatable.View animation="fadeInLeft"
                             delay={Math.random() * 300}
            >
                <Button
                    onPress={() => {
                        this.setState({ option: props.index, type: props.type })
                    }}
                    style={[styles.item, styles.shadow]}>
                    <Text
                        style={{}}
                        numberOfLines={1}>
                        {props.title}
                    </Text>
                </Button>
            </Animatable.View>
        )
    }


    __renderTitle = () => {

        return (
            <View
                style={{
                    marginHorizontal: 5,
                    backgroundColor: 'white'
                }}>
                <TextInput
                    name='title'
                    placeholderTextColor="rgba(180,180,180,1)"
                    selectionColor={mainColor}
                    returnKeyType='done'
                    autoFocus={true}
                    maxLength={50}
                    //keyboardType={boardType}
                    style={styles.textInputStyle}
                    underlineColorAndroid='transparent'
                    placeholder={"卡片名称"}
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                />
            </View>
        )


    }

    __renderperiod = () => {
        const items = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

        const __renderRadioItem = (item, selItem) => {
            return (
                <View
                    style={[styles.notifyTimeItem,
                        { backgroundColor: selItem === item ? '#31d930' : 'transparent' }]}
                    key={item}>
                    <Text
                        style={{ color: selItem === item ? 'white' : 'black' }}>{item}</Text>
                </View>)
        }

        return (
            <Radio
                style={styles.notifyTimeView}
                name='period'
                //keyName='ItemId'
                options={items}
                renderItem={__renderRadioItem}/>
        )
    }

    __renderNotifyTime = () => {
        const items = ['5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
            , '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']

        const __renderRadioItem = (item, selItem) => {
            return (
                <View

                    style={[styles.notifyTimeItem,
                        { backgroundColor: selItem === item ? '#31d930' : 'transparent' }]}
                    key={item}>
                    <Text
                        style={{ color: selItem === item ? 'white' : 'black' }}>{item}</Text>
                </View>)
        }

        return (
            <Radio
                style={styles.notifyTimeView}
                name='notifyTime'
                //keyName='ItemId'
                options={items}
                renderItem={__renderRadioItem}/>
        )
    }

    __remderNotifyText = () => {


        return (
            <View
                style={{
                    backgroundColor: 'white'
                }}>
                <AutoGrowingInput
                    name='notifyText'
                    maxHeight={200}
                    defaultValue={this.state.notifyText}
                    placeholderTextColor="rgba(180,180,180,1)"
                    selectionColor={mainColor}
                    returnKeyType='done'
                    autoFocus={true}
                    maxLength={100}
                    //keyboardType={boardType}
                    style={styles.textInputStyle}
                    underlineColorAndroid='transparent'
                    placeholder={"提醒文字"}
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                />
            </View>
        )

    }


    __remderRecord = () => {

        const items = ['文字', '图片']

        const __renderRadioItem = (item, contain) => {
            return (
                <View
                    style={[styles.notifyTimeItem,
                        { backgroundColor: contain ? '#31d930' : 'transparent' }]}
                    key={item}>
                    <Text style={{ color: contain ? 'white' : 'black' }}>{item}</Text>
                </View>)
        }


        return (
            <Multiple
                style={styles.notifyTimeView}
                name='record'
                //keyName='ItemId'
                options={items}
                renderItem={__renderRadioItem}/>
        )

    }

    __renderRecordDay = () => {

        const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        const sels = [1, 2, 3, 4, 5, 6, 7]

        const __renderRadioItem = (item, contain) => {
            return (
                <View
                    style={[styles.notifyTimeItem,
                        { backgroundColor: contain ? '#31d930' : 'transparent' }]}
                    key={names[item]}>
                    <Text style={{ color: contain ? 'white' : 'black' }}>{names[item - 1]}</Text>
                </View>)
        }

        return (
            <Multiple
                style={styles.notifyTimeView}
                name='recordDay'
                //keyName='ItemId'
                options={sels}
                renderItem={__renderRadioItem}/>
        )
    }


    __renderDayText = (recordDay) => {
        const days = recordDay.toJS().sort();

        // console.log('days:', days);

        if (days.length === 0) {
            return "无"
        } else if (days.length === 7) {
            return "每天"
        } else if (days.length === 2 && days[0] === 6) {
            return '休息日'
        } else if (days.length === 5 && days[4] === 5) {
            return '工作日'
        } else {
            const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            return days.map(day => names[day - 1]).toString()
        }


    }

    render(): ReactElement<any> {
        const revise = this.props.revise
        const notifyText = this.props.notifyText && this.props.notifyText.length > 0
            ? this.props.notifyText : '未定义'
        // console.log('test:', this.props.record);
        let record = this.props.record
        record = (record.length === 0 || record.size === 0)
            ? '无' : record.join('+')


        const recordDay = this.__renderDayText(this.props.recordDay)


        return (
            <ScrollView
                // onStartShouldSetResponder={() => true}
                // onResponderGrant={() => {
                //     Keyboard.dismiss()
                // }}
                style={[styles.wrap, this.props.style]}>
                {this.__remderBack()}


                {this.state.option === 0 && (<View >
                    {(<this.__renderItem
                        title={"卡片名称:   " + this.props.title}
                        type="title"
                        index={1}/>)}
                    <this.__renderItem
                        title={"提醒时间:   " + this.props.notifyTime}
                        type="notifyTime"
                        index={1}/>
                    <this.__renderItem
                        title={"提醒文字:   " + notifyText}
                        type="notifyText"
                        index={1}/>
                    <this.__renderItem
                        title={"提醒日:   " + recordDay}
                        type="recordDay"
                        index={1}/>
                    <this.__renderItem
                        title={"周期:   " + this.props.period + '天'}
                        type="period"
                        index={1}/>
                    <this.__renderItem
                        title={"记录方式:   " + record}
                        type="record"
                        index={1}/>
                    {!revise && this.__renderDone()}
                </View>)}


                {this.state.option === 1 &&
                this.state.type === 'title' &&
                this.__renderTitle()}

                {this.state.option === 1 &&
                this.state.type === 'notifyTime' &&
                this.__renderNotifyTime()}

                {this.state.option === 1 &&
                this.state.type === 'period' &&
                this.__renderperiod()}

                {this.state.option === 1 &&
                this.state.type === 'notifyText' &&
                this.__remderNotifyText()}

                {this.state.option === 1 &&
                this.state.type === 'recordDay' &&
                this.__renderRecordDay()}

                {this.state.option === 1 &&
                this.state.type === 'record' &&
                this.__remderRecord()}


            </ScrollView>
        );
    }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        paddingTop:80,
    },
    item: {
        marginTop: 7.5,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        alignSelf: 'flex-start',
        marginBottom:7.5,
        marginRight:5,
    },
    done:{
        marginTop: 7.5,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        alignSelf: 'flex-end',
        marginBottom:7.5,
        marginLeft:5,
    },

    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 2, height: 5 },
        shadowRadius: 5,
        elevation: 5
    },

    notifyTimeItem: {
        width: (width - 20- 40)/4,
        height: 35,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 8,
    },
    notifyTimeView: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    textInputStyle: {
        // width:200,
        // marginLeft: 0,
        height: 50,
        textAlign: 'left',
        fontSize: 15,
        color: 'black',

    },
    line:{
        backgroundColor:'rgb(150,150,150)',
        height:StyleSheet.hairlineWidth,
        margin:5,
    }
})
