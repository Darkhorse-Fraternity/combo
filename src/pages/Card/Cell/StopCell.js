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

export default class StopCell extends Component {

    static propTypes = {
        titel: PropTypes.string,
        des: PropTypes.string,
        onPress: PropTypes.func
    };

    image = () => {
        const source =   require('../../../../source/img/my/icon-60.png')

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
            onPress,
            title,
            des
        } = this.props;


        const uppercaseTitle = title ? (
            <Text
                style={[styles.title]}
                numberOfLines={2}
            >
                {title}
                {/*{ title.toUpperCase() }*/}
            </Text>
        ) : false;

        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.slideInnerContainer}
                    onPress={onPress}
                >
                    {Platform.OS ==='ios' &&(<View style={styles.shadow}/>)}
                    <View style={styles.androidShadow}>
                        <View
                            style={[styles.imageContainer]}>
                            {this.image()}
                            {Platform.OS ==='ios' &&
                            (<View style={styles.radiusMask}/>)}
                        </View>
                        <View style={styles.textContainer}>
                            {uppercaseTitle}
                            <Text
                                style={styles.subtitle}
                                numberOfLines={2}
                            >
                                {des}
                            </Text>
                        </View>
                    </View>

                </TouchableOpacity>

            </View>
        );
    }
}
