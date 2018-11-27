/**
 * Created by lintong on 2017/9/26.
 * @flow
 */
'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Platform
} from 'react-native'
import { ICARD, IUSE, CARDLIST } from '../../redux/reqKeys'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/Button'

import { connect } from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import CardCell from './CardCell'
import {
  StyledTitleView,
  StyledTitleText,
  StyledHeader,
  StyledHerderButton,
  StyledHeaderText
} from './style'
import CardTemplate from './CardTemplate'
import { habits } from '../../configure/habit'

const listKey = ICARD


@connect(
  state => ({
    data: state.normalizr.get(listKey)
  }),
  (dispatch, props) => ({})
)

export default class Publish extends Component {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      //title: '新建卡片',
    }
  };

  shouldComponentUpdate(nextProps: Object) {
    return !immutable.is(this.props, nextProps)
  }

  componentDidMount() {
  }

  renderRow({ item, index }: Object) {

    // console.log('test:', item);
    const { iconAndColor, title, img } = item
    const { color, name } = iconAndColor || { name: 'sun', color: '#b0d2ee' }

    return (
      <CardCell
        title={title}
        name={name}
        color={color}
        img={img}
        onPress={() => {
          this.props.navigation.navigate('cardInfo', { iCardId: item.objectId })
        }}/>
    )

  }

  _listHeaderComponet = () => {
    return (
      <View>
        <StyledHeader>
          <StyledHeaderText>
            「 种一棵树最好的时间是十年前，其次是现在。 」
          </StyledHeaderText>
          <StyledHerderButton
            style={styles.headerBtn}
            title={'新建习惯卡片'}
            onPress={() => {
              this.props.navigation.navigate('creat')
            }}/>
        </StyledHeader>


        {Object.keys(habits).map((name)=>[
          <StyledTitleView key={name}>
            <StyledTitleText>
              {name}
            </StyledTitleText>
          </StyledTitleView>,
          <CardTemplate key={'template '+name} data={habits[name]} onPress={(habit) => {
            this.props.navigation.navigate('creat', { habit: habit })
          }}/>
        ])}

        <StyledTitleView>
          <StyledTitleText>
            圈子推荐
          </StyledTitleText>
        </StyledTitleView>
      </View>
    )
  }

  render() {

    return (
      <LCList
        ListHeaderComponent={this._listHeaderComponet}
        style={[this.props.style, styles.list]}
        reqKey={listKey} //在normalizr 中的位置
        sKey={CARDLIST}  //在list 中的位置
        callPath={CARDLIST} //表示走云函数,并告知云函数的路径
        numColumns={4}
        columnWrapperStyle={{ padding: 0 }}
        renderItem={this.renderRow.bind(this)}
        dataMap={(data) => {
          return { results: data.result }
        }}
        reqParam={{}}
      />
    );
  }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    // backgroundColor: '#F5FCFF'
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
    shadowColor: "black",
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


  list: {
    flex: 1,
  },

  period: {
    marginTop: 5,

  },


})




