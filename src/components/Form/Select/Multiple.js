import React, { Component } from 'react'
import {
    Modal,
    Picker,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import {fromJS} from 'immutable';



const SelectWrapper = styled.View`
`

export default class Multiple extends Component {
    constructor(props) {
        super(props)
        let value = props.value
        // console.log('value:', typeof value, value);
        if (typeof value === 'object' && value.toJS) {
            value = value.toJS()
        }

        this.state = {
            value: value
        }

        this.onValueChange = this.onValueChange.bind(this)
    }


    static propTypes = {
        onValueChange: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        renderItem: PropTypes.func.isRequired,
        keyName: PropTypes.string,
        value: PropTypes.any
    };
    static defaultProps = {
        componentName: 'Radio',
        onValueChange: () => {
        },
        keyName: '',
        // value: [],
    };

    componentWillReceiveProps(nextProps) {
        // if (nextProps.value !== this.state.value) {
        //     this.onValueChange(nextProps.value)
        // }
    }


    onValueChange(newValue) {
        // this.setState({
        //     value: newValue
        // }, () => {
            this.props.onValueChange(fromJS(newValue))
        // })
    }


    __renderItem = (item) => {
        const {
            keyName,
        } = this.props
        const key = keyName.length !== 0 ? item[keyName] + '' : item + ''

        const  value  = this.props.value.toJS && this.props.value.toJS()

        const index = value.indexOf(item)
        const contain = index !== -1
        // console.log('key:',keyName, key,item);
        return (
            <TouchableOpacity key={key}  onPress={() => {

                if (contain) {
                    value.splice(index, 1)
                } else {
                    value.push(item)
                }

                this.onValueChange(value)


            }}>
                {this.props.renderItem(item, contain)}
            </TouchableOpacity>
        )

    }

    render() {
        const {
            options,
            theme,
            style,
            ...rest
        } = this.props
        // const { value } = this.state


        return (
            <SelectWrapper style={style} theme={theme}>
                {options.map(option => this.__renderItem(option))}
            </SelectWrapper>
        )
    }
}



