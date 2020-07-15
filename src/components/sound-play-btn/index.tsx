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
import Sounds from 'react-native-sound';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const SOUND_PLAY_BTN_STOP_KEY = 'SOUND_PLAY_BTN_STOP_KEY';

interface SoundPlayBtn extends TouchableOpacityProps {
  uri: string;
  size?: number;
  progressColor?: string;
  color?: string;
  title: string;
}

export const SoundPlayBtn = (props: SoundPlayBtn) => {
  const {
    uri,
    style,
    size = 45,
    progressColor = '#e575ec',
    color = 'rgb(80,80,80)',
    title,
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

  const timeRef = useRef<NodeJS.Timeout>();

  const onStop = () => {
    setPaused(false);
    soundRef.current.stop(() => {
      timeRef.current && clearInterval(timeRef.current);
      progressRef.current?.animate(0, 100);
    });
  };

  const onPlay = () => {
    timeRef.current && clearInterval(timeRef.current);
    DeviceEventEmitter.emit(SOUND_PLAY_BTN_STOP_KEY, uri);
    setPaused(true);

    timeRef.current = setInterval(() => {
      const duration = soundRef.current.getDuration() || 0;
      if (duration > 0) {
        // soundRef.current.getCurrentTime((seconds) => {
        //   //   console.log('seconds', seconds);
        //   const percent = (seconds / duration) * 100;

        // });
        progressRef.current?.animate(100, duration);
      }
    }, 100);

    soundRef.current.play((sc) => {
      if (sc) {
        setPaused(false);
        timeRef.current && clearInterval(timeRef.current);
        progressRef.current?.animate(0, 100);
      }
    });
  };

  useEffect(() => {
    // Sounds.setCategory('Playback');
    const deEmitter = DeviceEventEmitter.addListener(
      SOUND_PLAY_BTN_STOP_KEY,
      (url: string) => {
        if (url !== uri) {
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
        size={size * 0.78}
        style={[styles.progress, {top: size * 0.14, left: size * 0.08}]}
        width={2}
        rotation={0}
        backgroundWidth={2}
        fill={0}
        tintColor={progressColor}
        backgroundColor="#3d5875"
      />
      <Icon
        color={color}
        size={size}
        name={paused ? 'pause-circle-outline' : 'play-circle-outline'}
      />
      <Text style={[styles.text, {color: color}]}>{title}</Text>
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
  text: {
    alignSelf: 'center',
    fontSize: 12,
  },
});
