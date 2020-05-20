/**
 * Created by lintong on 2019/1/24.
 * @flow
 */


import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import LCList from '../../../components/Base/LCList';
import { ICARD, FLAGRECORD, FLAG } from '../../../redux/reqKeys';
import {
  StyledContent,
  StyledItem,
  StyledHeader,
  StyledHeaderTitle,
  StyledRanking,
  StyledInner,
  StyledCellDiscrib,
  StyledCellName
} from './style';
import { Flag } from '../../../request/LCModle';
import Avatar from '../../../components/Avatar/Avatar2';


@connect(
  (state, props) => ({
    flag: state.normalizr.get(FLAG).get(props.route.params.flagId),
  }),
  dispatch => ({})
)


export default class FRDetail extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = // const {navigation} = props;
                             // const {state} = navigation;
                             // const {params} = state;
                             props => ({
                               title: '',
                             })
  ;


  _renderHeader = () => {
    const startDate = this.props.flag.get('startDate');
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          第
          {moment(startDate.get('iso')).format('YYYYMMDD')}
          期
        </StyledHeaderTitle>
      </StyledHeader>
    );
  }


  __renderItem = ({ item, index }) => {
    const { user, doneDate } = item;
    // console.log('user:', user);

    let size = 40;
    if (index + 1 >= 10) {
      size = 27;
    } else if (index + 1 >= 100) {
      size = 20;
    }
    return (
      <StyledItem onPress={() => {
      }}
      >
        <StyledInner>
          <StyledRanking size={size}>
            {index + 1}
          </StyledRanking>
          <Avatar user={user} />
          <StyledCellName>
            {user.nickname || '路人甲'}
          </StyledCellName>
        </StyledInner>
        <StyledCellDiscrib done={!!doneDate}>
          {doneDate ? moment(doneDate.iso).format('MM-DD HH:mm') : '未完成'}
        </StyledCellDiscrib>
      </StyledItem>
    );
  }


  render(): ReactElement<any> {
    const param = {
      where: {
        ...Flag(this.props.route.params.flagId),
      },
      order: '-doneState,doneDate',
      include: 'user',
    };


    return (
      <StyledContent forceInset={{ top: 'never' }}>
        <LCList
          style={{ flex: 1 }}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          reqKey={FLAGRECORD}
          sKey={FLAGRECORD + this.props.route.params.flagId}
          // dataMap={(data)=>{
          //   return {[OPENHISTORYLIST]:data.list}
          // }}
          reqParam={param}
          renderItem={this.__renderItem}
          ListHeaderComponent={this._renderHeader}
          // ListFooterComponent={data.length > 0 && <View style={{ height: 100 }}/>}
        />
      </StyledContent>
    );
  }
}
