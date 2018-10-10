import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import * as Animatable from 'react-native-animatable';

export default class Cell extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    image = () => {
        const {
            iCard: { img },

        } = this.props;

        const source = img ? { uri: img.url } : require('../../../../source/img/my/icon-60.png')

        return (
            <Image
                source={source}
                defaultSource={ require('../../../../source/img/my/icon-60.png')}
                resizeMode={'center'}
                style={styles.image}
            />
        );
    }

    render() {
        const {
            iCard,
            even,
            onPress,
            onLongPress,
            done,
            data,
        } = this.props;

        const { title, notifyText } = iCard
        const time =  data.time

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={1}
            >
                {title}
                {/*{ title.toUpperCase() }*/}
            </Text>
        ) : false;

        return (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.slideInnerContainer}
                    onLongPress={onLongPress}
                    onPress={onPress}
                >
                    {Platform.OS ==='ios' &&(<View style={styles.shadow}/>)}
                    <View style={styles.androidShadow}>
                        <View
                            style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                            {this.image()}
                            {Platform.OS ==='ios' &&
                            (<View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}/>)}
                        </View>
                        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                            {uppercaseTitle}
                            <Text
                                style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                                numberOfLines={1}
                            >
                                {notifyText||`第${time}次打卡`}
                            </Text>
                        </View>
                    </View>
                    {done &&
                    (<Animatable.View
                        animation="fadeInDown"
                        style={styles.doneView}>
                        <Icon
                            color='green'
                            name={'md-checkmark'}
                            size={25}/>
                        <Text style={styles.doneText}>
                            {moment(data.doneDate.iso).format("MM/DD")}
                        </Text>
                    </Animatable.View>)}

                </TouchableOpacity>

        );
    }
}
