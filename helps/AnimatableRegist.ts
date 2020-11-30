import * as Animatable from 'react-native-animatable';

const ComboZoomOut = {
  from: {
    scaleY: 1,
  },
  to: {
    scaleY: 0,
  },
};

Animatable.initializeRegistryWithDefinitions({ ComboZoomOut });
