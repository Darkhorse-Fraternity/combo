/**
 * Created by lintong on 2017/9/26.
 * @flow
 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { ICARD, CARDLIST } from '../../redux/reqKeys';
import LCList from '../../components/Base/LCList';
import CardCell from './CardCell';
import {
  StyledContent,
  StyledTitleView,
  StyledTitleText,
  StyledTop,
  StyledHerderButton,
  StyledHeaderText,
  StyledIcon,
  StyledNarBarRightView,
} from './style';
import CardTemplate from './CardTemplate';
import { habits } from '../../configure/habit';
import NavBar from '../../components/Nav/bar/NavBar';

const listKey = ICARD;


@connect(
  state => ({
    data: state.normalizr.get(listKey)
  }),
  (dispatch, props) => ({})
)

export default class Publish extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = () => ({
    header: null,
  });

  componentDidMount() {
  }


  _listHeaderComponet = () => {
    const habitTemplate = Object.keys(habits).map(name => [
      <StyledTitleView key={name}>
        <StyledTitleText>
          {name}
        </StyledTitleText>
      </StyledTitleView>,
      <CardTemplate
        key={`template ${name}`}
        data={habits[name]}
        onPress={(habit) => {
          this.props.navigation.navigate('creat', { habit });
        }}
      />
    ]);
    const habitView = [];
    habitTemplate.forEach((item) => {
      item.forEach((cell) => {
        habitView.push(cell);
      });
    });
    return (
      <StyledTop removeClippedSubviews>
        <StyledHeaderText>
          「 种一棵树最好的时间是十年前，其次是现在。 」
        </StyledHeaderText>
        <View style={{ paddingHorizontal: 20 }}>
          <StyledHerderButton
            style={styles.headerBtn}
            title="自建习惯卡片"
            onPress={() => {
              this.props.navigation.navigate('creat');
            }}
          />
        </View>

        {habitView}

        <StyledTitleView key="bottom">
          <StyledTitleText>
            圈子推荐
          </StyledTitleText>
        </StyledTitleView>
      </StyledTop>
    );
  }

  renderRow({ item }) {
    // console.log('test:', item);
    const { iconAndColor, title, img } = item;
    const { color, name } = iconAndColor || { name: 'sun', color: '#b0d2ee' };

    return (
      <CardCell
        title={title}
        name={name}
        color={color}
        img={img}
        onPress={() => {
          this.props.navigation.navigate('cardInfo', { iCardId: item.objectId });
        }}
      />
    );
  }


  renderNarBarRightView = () => (
    <StyledNarBarRightView>
      <Button
        background={TouchableNativeFeedback.SelectableBackgroundBorderless
  && TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={() => {
          this.props.navigation.navigate('search');
        }}
        style={{ paddingHorizontal: 10 }}
      >
        <StyledIcon
          size={20}
          color="black"
          name="search"
        />
      </Button>
    </StyledNarBarRightView>
  )

  render() {
    const { navigation } = this.props;
    const { goBack } = navigation;
    return (
      <StyledContent>
        <NavBar
          onBackPress={goBack}
          rightView={this.renderNarBarRightView}
        />
        <LCList
          ListHeaderComponent={this._listHeaderComponet}
          style={[this.props.style, styles.list]}
          reqKey={listKey} // 在normalizr 中的位置
          sKey={CARDLIST} // 在list 中的位置
          callPath={CARDLIST} // 表示走云函数,并告知云函数的路径
          numColumns={4}
          columnWrapperStyle={{ padding: 0 }}
          renderItem={this.renderRow.bind(this)}
          dataMap={data => ({ results: data.result })}
          reqParam={{}}
        />
      </StyledContent>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  list: {
    flex: 1,
    overflow: 'hidden',
  },

  itemAdd: {
    width: width / 2 - 15,
    height: 200,
    // marginTop: 20,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shadow: {
    backgroundColor: 'white',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    borderRadius: 10,
    elevation: 10,
    // margin: 10,
    // elevation: 10,
  },


  period: {
    marginTop: 5,

  },


});
