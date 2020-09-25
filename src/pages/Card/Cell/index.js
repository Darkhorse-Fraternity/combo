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
// import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './style';


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
            parallax,
            parallaxProps,
            even,
            carouselRef
        } = this.props;

        // console.log('test:', this.props);

        const source = img ? { uri: img.url } : require('../../../../source/img/my/icon-60.png')

        return  (
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
            data,
        } = this.props;

        const { title, notifyText,period } = iCard
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
                </TouchableOpacity>

        );
    }
}
