import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  DeviceEventEmitter,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Sounds from 'react-native-sound';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import * as Animatable from 'react-native-animatable';

const SOUND_PLAY_BTN_STOP_KEY = 'SOUND_PLAY_BTN_STOP_KEY';

interface SoundPlayBtn extends TouchableOpacityProps {
  uri: string;
  size?: number;
  progressColor?: string;
  color?: string;
  title: string;
  onPress?: () => void;
  choice?: boolean;
}

export const SoundPlayBtn = (props: SoundPlayBtn) => {
  const {
    uri,
    style,
    size = 45,
    progressColor = '#e575ec',
    color = 'rgb(80,80,80)',
    title,
    onPress,
    choice = false,
    ...other
  } = props;

  const [paused, setPaused] = useState(false);

  const soundRef = useRef(
    new Sounds(uri, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      //   if (ref.current.isPlaying()) {
      //     setPaused(true);
      //   }
    }),
  );

  const progressRef = useRef<AnimatedCircularProgress>(null);
  const [select, setSelect] = useState(choice);
  const timeRef = useRef<NodeJS.Timeout>();

  const onStop = () => {
    setSelect(false);
    setPaused(false);
    // timeRef.current && clearInterval(timeRef.current);
    progressRef.current?.animate(0, 10);
    soundRef.current.stop();
  };

  const onPlay = () => {
    setSelect(true);
    setPaused(true);
    // timeRef.current && clearInterval(timeRef.current);
    DeviceEventEmitter.emit(SOUND_PLAY_BTN_STOP_KEY, title);

    // timeRef.current = setInterval(() => {
    //   if (duration > 0) {
    //     // soundRef.current.getCurrentTime((seconds) => {
    //     //   //   console.log('seconds', seconds);
    //     //   const percent = (seconds / duration) * 100;
    //     // });
    //   }
    // }, 100);
    const duration = soundRef.current.getDuration() || 0;
    progressRef.current?.animate(100, duration);
    soundRef.current.play((sc) => {
      if (sc) {
        setPaused(false);
        // timeRef.current && clearInterval(timeRef.current);
        progressRef.current?.animate(0, 10);
      }
    });
  };

  useEffect(() => {
    // Sounds.setCategory('Playback');
    const deEmitter = DeviceEventEmitter.addListener(
      SOUND_PLAY_BTN_STOP_KEY,
      (item: string) => {
        if (item !== title) {
          onStop();
        }
      },
    );

    // ref.current.getCurrentTime((seconds) => console.log('at ' + seconds));

    return () => {
      // deEmitter.
      deEmitter.remove();
      soundRef.current.release();
      timeRef.current && clearInterval(timeRef.current);
    };
  }, []);

  const togglePaused = () => {
    onPress && onPress();
    if (soundRef.current.isPlaying()) {
      // ref.current.
      onStop();
    } else {
      onPlay();
    }
  }; // add this toggle function

  return (
    <TouchableOpacity
      onPress={togglePaused}
      style={[styles.container, style]}
      {...other}>
      <AnimatedCircularProgress
        ref={progressRef}
        size={size * 0.82}
        style={[styles.progress, {top: size * 0.137, left: size * 0.065}]}
        width={3}
        rotation={0}
        backgroundWidth={3}
        fill={0}
        tintColor={progressColor}
        backgroundColor={color}
      />
      <Icon
        color={color}
        size={size}
        name={paused ? 'pause-circle-outline' : 'play-circle-outline'}
      />
      <View style={styles.bottom}>
        {select && (
          <Animatable.View
            animation="zoomIn"
            style={[styles.select, {backgroundColor: progressColor}]}>
            <Foundation color={'white'} size={12} name={'check'} />
          </Animatable.View>
        )}
        <Text style={[styles.text, {color: color}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderColor: 'black',
    // borderWidth: 1,
  },
  progress: {
    position: 'absolute',
    top: 1,
    zIndex: 100,
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 20,
  },
  text: {
    alignSelf: 'center',
    fontSize: 12,
  },
  select: {
    backgroundColor: '#57a417',
    height: 15,
    width: 15,
    borderRadius: 7.5,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
