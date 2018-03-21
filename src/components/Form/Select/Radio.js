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



const SelectWrapper = styled.View`
  flex: 1;
`

export default  class Radio extends Component {
    constructor(props) {
        super(props)
        let value = props.value
        // console.log('value:', typeof value,value);
        // if (typeof defoultValue === 'object' && defoultValue.toJS) {
        //     defoultValue = defoultValue.toJS()
        // }

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
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.onValueChange(nextProps.value)
        }
    }


    onValueChange(newValue) {
        this.setState({
            value: newValue
        }, () => {
            this.props.onValueChange(newValue)
        })
    }


    __renderItem = (item) => {
        const {
            keyName,
        } = this.props
        const key = keyName.length !== 0 ? item[keyName] + '' : item+''

        // console.log('key:',keyName, key,item);
        return (
            <TouchableOpacity key={key} onPress={() => {
                this.onValueChange(item)
            }}>
                {this.props.renderItem(item, this.state.value)}
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



