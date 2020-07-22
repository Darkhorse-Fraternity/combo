/**
 * Created by lintong on 2018/10/15.
 * @flow
 */

import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  InteractionManager,
  Platform,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {formValueSelector, change} from 'redux-form/immutable'; // <-- same as form name
import {StyledSubTitleView, StyledSubTitle} from './style';
import {StyledCell, StyledCellImage} from './Cell/style';
import Cell from './Cell';
import ColorCell from './Cell/ColorCell';
import svgs from '../../../../../source/icons';
// import colors from '../../../../../source/colors'
import {colorsCutThree, iconsCutThree} from './IconAndColorData';

export const FormID = 'CreatCardForm';
const selector = formValueSelector(FormID);

interface IconAndColorType {
  icon?: string;
  color?: string;
  onChange?: (field: string, value: string | Object) => void;
}

@connect(
  (state) => ({
    // iconAndColor: selector(state, 'iconAndColor'),
    icon: selector(state, 'icon'),
    color: selector(state, 'color'),
  }),
  (dispatch) => ({
    onChange: (field: string, value: string | object) => {
      dispatch(change('CreatCardForm', field, value));
    },
  }),
)
export default class IconAndColor extends PureComponent<
  IconAndColorType,
  {iconShow: boolean; colorShow: boolean}
> {
  constructor(props: Object) {
    super(props);
    this.state = {
      iconShow: true,
      colorShow: true,
    };
    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({ colorShow: true })
    // });
  }

  _keyExtractor = (item, index) => {
    const key = item[0].name || index;
    return `${key}`;
  };

  render() {
    const {iconShow, colorShow} = this.state;

    const {icon, color, onChange} = this.props;

    return (
      <View>
        <StyledSubTitleView>
          <StyledSubTitle>挑选图标与颜色：</StyledSubTitle>

          {icon && color && (
            <StyledCell backgroundColor={color} style={{marginLeft: 0}}>
              <StyledCellImage
                resizeMode="contain"
                // style={{ position: 'absolute' }}
                size={35}
                height={35}
                source={svgs[icon]}
              />
            </StyledCell>
          )}
        </StyledSubTitleView>

        {iconShow && (
          <FlatList
            data={iconsCutThree}
            // delay={1000}
            // useNativeDriver
            // animation="fadeIn"
            horizontal
            removeClippedSubviews={Platform.OS !== 'ios'}
            // pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View key={`${item[0].name}11`}>
                {item.map((it) => (
                  <Cell
                    select={icon === it.name}
                    key={it.name}
                    onPress={(ot) => {
                      //   console.log('ot:', it.name);
                      onChange && onChange('icon', it.name);
                    }}
                    data={it}
                  />
                ))}
              </View>
            )}
            keyExtractor={(item, index) => item[0].name}
            ListHeaderComponent={this._renderHeader}
            ListEmptyComponent={() => this.__renderNoData(statu)}
          />
        )}

        {colorShow && (
          <FlatList
            // useNativeDriver
            // delay={1100}
            // animation="fadeInUp"
            data={colorsCutThree}
            horizontal
            removeClippedSubviews={Platform.OS !== 'ios'}
            // pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}: data) => (
              <View>
                {item.map((it) => (
                  <ColorCell
                    select={color === it}
                    onPress={(ot) => {
                      onChange('color', ot);
                    }}
                    key={it}
                    color={it}
                  />
                ))}
              </View>
            )}
            keyExtractor={(item, index) => item[0]}
            ListHeaderComponent={this._renderHeader}
            ListEmptyComponent={() => this.__renderNoData(statu)}
          />
        )}
      </View>
    );
  }
}
