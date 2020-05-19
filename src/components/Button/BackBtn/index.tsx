/**
 * Created by lintong on 2018/6/26.
 * @flow
 */

import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {StyledContent, StyledText} from './style';
import {useNavigation} from '@react-navigation/native';

// export default class BackBtn extends PureComponent {
//   constructor(props: Object) {
//     super(props);
//   }

//     static propTypes = {
//       onBackPress: PropTypes.func
//     };

//     static defaultProps = {};

//     render(): ReactElement<any> {
//       return (
//           <StyledContent onPress={() => {
//               this.props.onBackPress ?
//                 this.props.onBackPress(this.props.navigation.goBack)
//                     :this.props.navigation.goBack();
//             }}
//             >
//               <StyledText>返回</StyledText>
//             </StyledContent>
//       );
//     }
// }

const BackBtn = props => {
  const navigation = useNavigation();
  return (
    <StyledContent
      onPress={() => {
        props.onBackPress
          ? props.onBackPress(navigation.goBack)
          : navigation.goBack();
      }}>
      <StyledText>返回</StyledText>
    </StyledContent>
  );
};

export default BackBtn;
