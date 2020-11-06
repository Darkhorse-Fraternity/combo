/**
 * Created by lintong on 2018/10/15.
 * @flow
 */

import React, { FC, PureComponent, useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  InteractionManager,
  Platform,
  FlatList,
} from 'react-native';
// import { connect } from 'react-redux';

// import { formValueSelector, change } from 'redux-form/immutable'; // <-- same as form name
import { StyledSubTitleView, StyledSubTitle } from './style';
import { StyledCell, StyledCellImage } from './Cell/style';
import Cell from './Cell';
import ColorCell from './Cell/ColorCell';
import svgs from '../../../../../source/icons';
// import colors from '../../../../../source/colors'
import { colorsCutThree, iconsCutThree } from './IconAndColorData';

// export const FormID = 'CreatCardForm';
// const selector = formValueSelector(FormID);

interface IconAndColorType {
  icon: string;
  color: string;
  onChange?: (data: { name: string; color: string }) => void;
}

// @connect(
//   (state) => ({
//     // iconAndColor: selector(state, 'iconAndColor'),
//     icon: selector(state, 'icon'),
//     color: selector(state, 'color'),
//   }),
//   (dispatch) => ({
//     onChange: (field: string, value: string | object) => {
//       dispatch(change('CreatCardForm', field, value));
//     },
//   }),
// )
// export default class IconAndColor extends PureComponent<IconAndColorType> {
// _keyExtractor = (item: { name: string }[], index) => {
//   const key = item[0].name || index;
//   return `${key}`;
// };
const IconAndColor: FC<IconAndColorType> = (props) => {
  const { icon, color, onChange } = props;

  const [state, setstate] = useState({ name: icon, color });

  const firstRef = useRef(true);
  useEffect(() => {
    if (state && !firstRef.current && onChange) {
      console.log('state', state);

      onChange(state);
    }
    firstRef.current = false;
  }, [state]);

  return (
    <View>
      <StyledSubTitleView>
        <StyledSubTitle>挑选图标与颜色：</StyledSubTitle>

        <StyledCell backgroundColor={color} style={{ marginLeft: 0 }}>
          <StyledCellImage
            resizeMode="contain"
            // style={{ position: 'absolute' }}
            size={35}
            height={35}
            source={svgs[icon]}
          />
        </StyledCell>
      </StyledSubTitleView>

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
        renderItem={({ item }) => (
          <View key={`${item[0].name}11`}>
            {item.map((it) => (
              <Cell
                select={icon === it.name}
                key={it.name}
                onPress={() => {
                  //   console.log('ot:', it.name);
                  // onChange && onChange('icon', it.name);
                  setstate((res) => ({ ...res, name: it.name }));
                }}
                data={it}
              />
            ))}
          </View>
        )}
        keyExtractor={(item, index) => item[0].name}
        // ListHeaderComponent={this._renderHeader}
        // ListEmptyComponent={() => this.__renderNoData(statu)}
      />

      <FlatList<string[]>
        // useNativeDriver
        // delay={1100}
        // animation="fadeInUp"
        data={colorsCutThree}
        horizontal
        removeClippedSubviews={Platform.OS !== 'ios'}
        // pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            {item.map((it) => (
              <ColorCell
                select={color === it}
                onPress={(color) => {
                  // onChange('color', ot);
                  console.log('???');

                  setstate((res) => ({ ...res, color }));
                }}
                key={it}
                color={it}
              />
            ))}
          </View>
        )}
        keyExtractor={(item, index) => item[0]}
        // ListHeaderComponent={this._renderHeader}
        // ListEmptyComponent={() => this.__renderNoData(statu)}
      />
    </View>
  );
};

export default IconAndColor;
