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
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import * as Animatable from 'react-native-animatable';

export default class SliderEntry extends Component {

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

        return 0 ? (
            <ParallaxImage
                carouselRef={carouselRef}
                //dimensions={{width:100,height:100}}
                source={source}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
            <Image
                source={source}
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
            over,
            done,
            data,
            load,
            refreshLoad,
            onRefresh
        } = this.props;

        const { title, notifyText } = iCard


        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
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
                                numberOfLines={2}
                            >
                                {notifyText}
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
                    {over && (<TouchableOpacity

                        onPress={onRefresh}
                        disabled={refreshLoad}
                        style={styles.overView}>
                        <View style={styles.refreshView}>
                            {refreshLoad ?
                                (<ActivityIndicator size="small" color={"white"}/>) :
                                (<Icon
                                    color='white'
                                    name={'md-refresh'}
                                    size={25}/>)}
                            <Text style={styles.overViewText}>
                                点击再来一组
                            </Text>
                        </View>
                    </TouchableOpacity>)}

                </TouchableOpacity>

            </View>
        );
    }
}
