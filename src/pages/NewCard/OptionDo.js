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
    TouchableOpacity,
    Dimensions,
    Keyboard
} from 'react-native'
import * as Animatable from 'react-native-animatable';

import { mainColor } from '../../configure'
import { AutoGrowingInput,TextInput } from '../../components/Form/Cunstom'
import { Radio, Multiple } from '../../components/Form/Select'
import Toast from 'react-native-simple-toast'

export const StaticOption = {
    notifyTime: '20:00',
    period: '7',
    notifyText: '',
    record: []
}

import {
    formValues,
} from 'redux-form/immutable'


@formValues('title','notifyTime', 'notifyText', 'period', 'record')

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

        if(this.props.title.length === 0){

            Toast.show('没有标题是不行的~')
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
            <TouchableOpacity
                onPress={this.__backStep}
                style={[styles.sureBtn]}>
                <Text>返回</Text>
            </TouchableOpacity>
        )
    }

    __renderItem = (props) => {
        return (
            <Animatable.View animation="fadeInLeft"
                             delay={Math.random() * 300}
            >
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ option: props.index, type: props.type })
                    }}
                    style={[styles.item]}>
                    <Text
                        style={{ backgroundColor: 'white', padding: 15 }}
                        numberOfLines={1}>
                        {props.title}
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        )
    }


    __renderTitle = ()=> {

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
                    placeholder={"title,不可为空~"}
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
                        { backgroundColor: selItem === item ? '#31d930' : 'white' }]}
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
                        { backgroundColor: selItem === item ? '#31d930' : 'white' }]}
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
                    marginHorizontal: 5,
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
                        { backgroundColor: contain ? '#31d930' : 'white' }]}
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


    render(): ReactElement<any> {
        const revise = this.props.revise
        const notifyText = this.props.notifyText.length > 0 ? this.props.notifyText : '未定义'
        // console.log('test:', this.props.record);
        let record = this.props.record
        record = (record.length === 0 || record.size === 0)
            ? '无' : record.join('+')
        return (
            <View
                onStartShouldSetResponder={() => true}
                onResponderGrant={() => {
                    Keyboard.dismiss()
                }}
                style={[styles.wrap, this.props.style]}>

                {this.state.option === 0 && (<ScrollView style={[styles.wrap]}>
                    {revise && (<this.__renderItem
                        title={"标题:   " + this.props.title  }
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
                    {!revise && (<this.__renderItem
                        title={"周期:   " + this.props.period + '天'}
                        type="period"
                        index={1}/>)}
                    <this.__renderItem
                        title={"记录方式:   " + record}
                        type="record"
                        index={1}/>

                </ScrollView>)}

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
                this.state.type === 'record' &&
                this.__remderRecord()}

                {this.__remderBack()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 20
    },
    item: {
        marginTop: 10,
        flexDirection: 'row',
        width: 200
    },
    sureBtn: {
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        padding: 15,
        paddingLeft: 40,
        top: Dimensions.get('window').height - 150,
    },
    notifyTimeItem: {
        width: 60,
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
        lineHeight: 40,

    },
})
