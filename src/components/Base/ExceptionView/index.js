/*@flow*/
import React, { Component, isValidElement } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import {
    StyledContent,
    StyledReportBtn,
    StyledReportText,
    StyledActivityIndicator,
    StyledImage,
    StyleReportView,
} from './style'


export const ExceptionType = {
    Loading: 'exceptionTypeLoading',
    NoData: 'exceptionTypeNoData',
    NetError: 'exceptionTypeError',
};


export default class ExceptionView extends Component {

    static propTypes = {
        exceptionType: PropTypes.string,
        prompt: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        image: PropTypes.number,
        otherTips: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        onRefresh: PropTypes.func,
        tipBtnText: PropTypes.string
    };
    static defaultProps = {
        exceptionType: ExceptionType.Loading,
        tipBtnText: '点击刷新'
    };

    constructor(props: Object) {
        super(props);
    }

    renderPrompt() {
        if (isValidElement(this.props.prompt)) {
            return this.props.prompt;
        }
        return (
            <Text style={styles.text}>
                {this.getPromptText(this.props.exceptionType)}
            </Text>
        );
    }

    renderOtherTips() {
        if (isValidElement(this.props.otherTips)) {
            return this.props.otherTips;
        }
        return (
            <Text style={styles.otherTips}>{this.props.otherTips}</Text>
        );
    }

    renderTipButton = () => {

        return (
            <StyledReportBtn onPress={() => {
                this.props.onRefresh && this.props.onRefresh()
            }}>
                <StyledReportText>
                    {this.props.tipBtnText}
                </StyledReportText>
            </StyledReportBtn>
        )

    }

    render() {
        // let prompt = this.getPromptText(this.props.exceptionType);
        // console.log('test:', this.props.styles);
        // const style = {height:300,... this.props.styles}
        // console.log('test:', style);
        const { otherTips, onRefresh, refresh,style,styles } = this.props
        return (
            <StyledContent
                style={[style,styles]}>
                {this._renderPromptIndicator(this.props.exceptionType)}
                {this.renderPrompt()}
                {otherTips && this.renderOtherTips()}
                {!refresh && onRefresh ? this.renderTipButton():
                <StyleReportView/>}
                {/*<Button*/}
                {/*style={}*/}
                {/*onPress={() => {*/}
                {/*this.props.onRefresh && this.props.onRefresh()*/}
                {/*}}>*/}

                {/**/}
                {/*</Button>*/}

            </StyledContent>
        );
    }

    _renderPromptIndicator = (type: string) => {
        switch (type) {
            case ExceptionType.Loading:
                return (
                    <StyledActivityIndicator color="#9e9e9e" size="large"/>
                );
            case ExceptionType.NoData:
            case ExceptionType.NetError:
                return (
                    <StyledImage
                        source={require('../../../../source/img/my/icon-60.png')}
                    />
                );
        }
    };

    getPromptText(type: string): string {
        if (this.props.prompt) {
            return this.props.prompt
        }
        let prompt;
        switch (type) {
            case ExceptionType.Loading:
                prompt = '正在加载...';
                break;
            case ExceptionType.NoData:
                prompt = '没有数据';
                break;
            case ExceptionType.NetError:
                prompt = '网络异常';
                break;
            default:
                prompt = 'there is nothing to show';
        }
        return prompt;
    }
}

const styles = StyleSheet.create({
    image: {
        // position:'absolute',
        width: 50,
        height: 50
    },
    text: {
        fontSize: 20,
        color: 'rgb(200,200,200)',
        alignSelf: 'center',
    },
    otherTips: {
        marginTop: 27,
        marginLeft: 43,
        marginRight: 43,
        fontSize: 13,
        color: '#9e9e9e',
        lineHeight: 26,
    },
});
