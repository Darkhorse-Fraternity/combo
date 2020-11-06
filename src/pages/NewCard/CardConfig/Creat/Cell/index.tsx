/**
 * Created by lintong on 2018/10/14.
 * @flow
 */
'use strict';

import React, { Component } from 'react';

import { StyledCell, StyledCellBtn, StyledCellImage } from './style';

import svgs from '../../../../../../source/icons';

interface IconCellProps {
  select: boolean;
  data: { size: number; name: string };
  onPress: () => void;
}

export default class IconCell extends Component<IconCellProps> {
  constructor(props: IconCellProps) {
    super(props);

    // InteractionManager.runAfterInteractions(async () => {
    //   // ...耗时较长的同步的任务...
    //   this.setState({ iconShow: true })
    // });
    // this.timer = setTimeout(() =>
    //   this.setState({ iconShow: true }),
    //   2000);
  }

  // componentWillUnmount() {
  //   this.timer && clearTimeout(this.timer);
  // }

  shouldComponentUpdate(nextProps: IconCellProps) {
    return (
      nextProps.select !== this.props.select ||
      nextProps.data.name !== this.props.data.name
    );
  }

  render() {
    const { data, onPress, select } = this.props;
    const { size, name } = data;
    return [
      <StyledCell
        key={name}
        select={select}
        activeOpacity={1}
        onPress={onPress}>
        <StyledCellBtn pointerEvents="none">
          <StyledCellImage
            size={size}
            source={svgs[name]}
            resizeMode={'contain'}
            // style={{ position: 'absolute' }}
            // width={size}
            // height={size}
            // svgXmlData={svgs[name]}
          />
        </StyledCellBtn>
      </StyledCell>,
    ];
  }
}
