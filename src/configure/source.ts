export interface SoundsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
  title: string;
  type: 'normal' | 'encourage';
  key: SoundsKeys;
}

export type SoundsKeys = 'bell' | 'swich' | 'wooden_fish' | 'en' | 'wao';

type SoundFcnType = () => {[key in SoundsKeys]: SoundsType};

export const soundsSource: SoundFcnType = () => {
  return {
    bell: {
      source: require('@music/sound/dot/right.mp3'),
      title: 'bell',
      key: 'bell',
      type: 'normal',
    },
    swich: {
      source: require('@music/sound/dot/switch.mp3'),
      title: 'swich',
      type: 'normal',
      key: 'swich',
    },
    wooden_fish: {
      source: require('@music/sound/dot/wooden_fish.mp3'),
      title: 'wooden_fish',
      key: 'wooden_fish',
      type: 'normal',
    },
    en: {
      source: require('@music/sound/incentive/en.mp3'),
      title: 'en!',
      key: 'en',
      type: 'encourage',
    },
    wao: {
      source: require('@music/sound/incentive/wao.mp3'),
      title: 'wao!',
      key: 'wao',
      type: 'encourage',
    },
  };
};
