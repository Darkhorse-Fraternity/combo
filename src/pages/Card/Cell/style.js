import {StyleSheet, Dimensions, Platform} from 'react-native';
const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 130;
  return Math.round(value);
}

const slideHeight = viewportWidth * 0.63;
const slideWidth = viewportWidth / 2 - 20;
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
    margin: 5,
    // elevation: 10,
  },
  androidShadow: {
    flex: 1,
    // position: 'absolute',
    top: 0,
    // left: itemHorizontalMargin,
    // right: itemHorizontalMargin,
    bottom: 18,
    borderRadius: entryBorderRadius,
    elevation: 5,
    margin: 5,
  },

  doneView: {
    position: 'absolute',
    top: 3,
    width: 40,
    height: 80,
    right: 20,
    backgroundColor: 'white',
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 11,
  },
  overViewText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  doneText: {
    color: 'rgb(150,150,150)',
    fontSize: 13,
  },
  overView: {
    ...StyleSheet.absoluteFillObject,
    height: slideHeight / 2,
    top: slideHeight / 5,
    left: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '98%',
    zIndex: 50000,
    elevation: 10,
  },
  refreshView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomContainer: {
    paddingTop: 15,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: '100%',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: colors.black,
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 10 - entryBorderRadius,
    paddingBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: colors.black,
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
