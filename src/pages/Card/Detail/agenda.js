import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,

} from 'react-native';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { connect } from 'react-redux'


import { classSearch } from '../../../request/leanCloud'
// import {addListNormalizrEntity} from '../../../redux/actions/list'
import { IDO, IUSE } from '../../../redux/reqKeys'
// import {IRECORD, ICARD,IUSE} from '../../../redux/reqKeys'
import { selfUser, iUse } from '../../../request/LCModle'
import { req } from '../../../redux/actions/req'

import Calendar from '../../../components/Calendar'


import {
    StyledAgendaRow
} from './style'

import RecordRow from '../../Record/RecordRow'

import { withTheme } from 'styled-components'


@connect(
    state => ({}),
    (dispatch, props) => ({
        load: async (first, last, callback) => {
            //获取iDo

            const use = props.navigation.state.params.iUse
            const param = {
                'where': {
                    ...selfUser(),
                    ...iUse(use.objectId),
                    "createdAt": {
                        "$gte": { "__type": "Date", "iso": first + "T00:00:00.000Z" },
                        "$lte": { "__type": "Date", "iso": last + "T00:00:00.000Z" },
                    }
                }
            }
            const params = classSearch(IDO, param)
            const res = await  req(params)

            callback && callback(res.results)
            // find(IDO, param, { 'normalizr': true, dataMap: item => item.results })
        }
    })
)

@withTheme

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);


        this.state = {
            data: {},
        };
        // this.shouldComponentUpdate = shouldComponentUpdate.bind(this);


    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if( nextProps.data !== prevState.data) {
    //         return {
    //             // data: nextProps.data.toJS()
    //         };
    //     }
    // }


    // changeData = (map) => {
    //     if (map) {
    //
    //         const data = map.toJS()
    //
    //
    //         const nData = {}
    //         const keys = Object.keys(data)
    //
    //         const timestamp = new Date().getTime()
    //         const today = this.timeToString(timestamp);
    //
    //         let selected = keys.length > 0 ? today : ""
    //
    //         const flag = keys.length > 1
    //         keys.map((key, index) => {
    //             const obj = data[key]
    //             const strTime = this.timeToString(obj.updatedAt);
    //             nData[strTime] = [obj]
    //             if (index !== keys.length - 1) selected = strTime
    //
    //         })
    //
    //
    //         return {
    //             data: nData,
    //             selected: selected
    //         }
    //     }
    //
    // }


    componentDidMount() {

    }


    render() {

        const data = this.state.data



        return (
                <Calendar date={new Date()} fetchData={(data) => {

                    this.props.navigation.navigate('RComment', { data: data })

                }} busyDay={data} move={(firstDay, lastDay,) => {
                    this.props.load(firstDay, lastDay, (res) => {
                        if (res.length > 0) {
                            const data = this.state.data
                            res.map(item => {
                                const strTime = this.timeToString(item.updatedAt);
                                data[strTime] = item

                            })
                            this.setState({ data: data })
                        }

                    })

                }}/>
        );
    }

    loadItems(day) {
        // setTimeout(() => {
        //     for (let i = -15; i < 85; i++) {
        //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        //         const strTime = this.timeToString(time);
        //         if (!this.state.items[strTime]) {
        //             this.state.items[strTime] = [];
        //             const numItems = Math.floor(Math.random() * 5);
        //             for (let j = 0; j < numItems; j++) {
        //                 this.state.items[strTime].push({
        //                     name: 'Item for ' + strTime,
        //                     height: 50
        //                 });
        //             }
        //         }
        //     }
        //     //console.log(this.state.items);
        //     console.log('newItems0:', day, this.state.items);
        //     const newItems = {};
        //     Object.keys(this.state.items).forEach(key => {
        //         newItems[key] = this.state.items[key];
        //     });
        //
        //     console.log('newItems1:', day, newItems);
        //     this.setState({
        //         items: newItems
        //     });
        // }, 1000);
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
