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

import { StyledSubTitleView, StyledSubTitle } from './style';
import { StyledCell, StyledCellImage } from './Cell/style';
import Cell from './Cell';
import ColorCell from './Cell/ColorCell';
import svgs from '../../../../../source/icons';
import { colorsCutThree, iconsCutThree } from './IconAndColorData';

interface IconAndColorType {
  icon: string;
  color: string;
  onChange?: (data: { name: string; color: string }) => void;
}

const IconAndColor: FC<IconAndColorType> = (props) => {
  const { icon = 'sun', color, onChange } = props;

  const [state, setstate] = useState({ name: icon, color });

  const firstRef = useRef(true);
  useEffect(() => {
    if (state && !firstRef.current && onChange) {
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
