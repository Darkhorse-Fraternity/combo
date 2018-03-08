import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,

} from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { connect } from 'react-redux'


import { find } from '../../../redux/module/leancloud'
// import {addListNormalizrEntity} from '../../../redux/actions/list'
import { IDO, IUSE } from '../../../redux/reqKeys'
// import {IRECORD, ICARD,IUSE} from '../../../redux/reqKeys'
import { selfUser, iUse } from '../../../request/LCModle'
import { req } from '../../../redux/actions/req'

import {
    StyledAgendaRow
} from './style'

import RecordRow from '../../Record/RecordRow'

import { withTheme } from 'styled-components'


LocaleConfig.locales['cn'] = {
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    dayNamesShort: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
};

LocaleConfig.defaultLocale = 'cn';


@connect(
    state => ({
        data: state.normalizr.get(IDO),
    }),
    (dispatch, props) => ({
        load: () => {
            //获取iDo


            const use = props.navigation.state.params.iUse
            const param = {
                'where': {
                    ...selfUser(),
                    ...iUse(use.objectId)
                }
            }
            find(IDO, param, { 'normalizr': true, dataMap: item => item.results })
        }
    })
)

@withTheme

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            data: {}
        };
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if( nextProps.data !== prevState.data) {
    //         return {
    //             data: nextProps.data.toJS()
    //         };
    //     }
    // }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            const data = nextProps.data.toJS()
            const timestamp = new Date().getTime()
            const today = this.timeToString(timestamp);
            const nData = {}
            Object.keys(data).map(key => {
                const obj = data[key]
                const strTime = this.timeToString(obj.updatedAt);
                nData[strTime] = [obj]
            })


            this.setState({ data: nData })
        }
    }


    componentDidMount() {
        this.props.load()
    }


    render() {

        const data = this.state.data
        const timestamp = new Date().getTime()
        const maxDate = this.timeToString(timestamp);
        console.log('data:', data);
        return (
            <Agenda
                // style={{ height: Dimensions.get('window').height - 60 }}
                items={data}
                loadItemsForMonth={this.loadItems.bind(this)}
                // selected={'2018-03-01'}
                minDate={'2017-01-01'}
                maxDate={maxDate}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                renderEmptyData={this.renderEmptyData.bind(this)}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                theme={this.props.theme && this.props.theme.calendar}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: 50
                        });
                    }
                }
            }
            //console.log(this.state.items);
            console.log('newItems0:', day, this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });

            console.log('newItems1:', day, newItems);
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <StyledAgendaRow>
                <RecordRow item={item} navigation={this.props.navigation}/>
            </StyledAgendaRow>
        );
    }

    renderEmptyData(item) {
        return (
            <View/>
        )
    }

    renderEmptyDate() {
        return (
            <View/>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});
