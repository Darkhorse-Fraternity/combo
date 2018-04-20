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
import { IDO, IDOCALENDAR } from '../../../redux/reqKeys'
// import {IRECORD, ICARD,IUSE} from '../../../redux/reqKeys'
import { selfUser, iUse } from '../../../request/LCModle'
import { req,clear } from '../../../redux/actions/req'

import Calendar from '../../../components/Calendar'
import moment from 'moment'

import {
    StyledAgendaRow
} from './style'

import RecordRow from '../../Record/RecordRow'

import { withTheme } from 'styled-components'


@connect(
    state => ({
        data:state.req.get(IDOCALENDAR)
    }),
    (dispatch, props) => ({
        load: (first, last) => {
            //获取iDo
            dispatch((dispatch,getState)=>{

                const data = getState().req.get(IDOCALENDAR).get('data').toJS()

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
                req(params,IDOCALENDAR,{dataMap:datas=>{

                    datas.results.forEach(item => {
                        const date = moment(item.createdAt).format("YYYY-MM-DD")
                        data[date] = item
                    })

                    // console.log('first:', first,datas,data);
                    return data
                }})

            })
        },
        clear:()=>dispatch(clear(IDOCALENDAR)),
    })
)

@withTheme

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.props.clear()
    }




    render() {


        const data = this.props.data.get('data').toJS()
        // console.log('data:', data);
        const load = this.props.data.get('load')

        return (
                <Calendar date={new Date()} load={load} fetchData={(item) => {
                    this.props.navigation.navigate('RComment', { data: item })
                }} busyDay={data} move={this.props.load}/>
        );
    }



    renderItem(item) {
        return (
            <StyledAgendaRow>
                <RecordRow item={item} navigation={this.props.navigation}/>
            </StyledAgendaRow>
        );
    }



}


