export const soundsNormalSource = () => {
  return {
    bell: {source: require('@music/sound/dot/right.mp3'), title: 'bell'},
    swich: {
      source: require('@music/sound/dot/switch.mp3'),
      title: 'swich',
    },
    wooden_fish: {
      source: require('@music/sound/dot/wooden_fish.mp3'),
      title: 'wooden_fish',
    },
  };
};

export const soundsIncentiveSource = () => {
  return {
    en: {source: require('@music/sound/incentive/en.mp3'), title: 'en!'},
    wao: {source: require('@music/sound/incentive/wao.mp3'), title: 'wao!'},
  };
};
