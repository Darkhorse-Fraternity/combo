import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash'; // 4.0.8
import {
  StyledContent,
  StyledLine,
  StyledSearchInput
} from './style';
import { ICARD } from '../../../redux/reqKeys';
import LCList from '../../../components/Base/LCList';
import CardCell from '../CardCell/CardCell2';

const listKey = ICARD;


export default class Search extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = () => ({
    // header: null,
    title:''
  });


  constructor(props: Object) {
    super(props);
    this.state = {
      text: '',
    };
  }

  search = (text) => {
    this.setState({ text });
  }

  // eslint-disable-next-line react/destructuring-assignment
  debounceSearch = debounce(this.search, 500, { leading: true, trailing: true })

  renderRow = ({ item }) => {
    // console.log('test:', item);
    const {
      iconAndColor,
      title,
      user,
      notifyText
    } = item;

    const { color, name } = iconAndColor || { name: 'sun', color: '#b0d2ee' };
    const { navigation } = this.props;
    return (
      <CardCell
        title={title}
        name={name}
        color={color}
        des={notifyText}
        userId={user}
        onPress={() => {
          navigation.navigate('cardInfo', { iCardId: item.objectId });
        }}
      />
    );
  }

  render() {
    const { text } = this.state;

    const param = {
      where: {
        $or: [{
          title: {
            $regex: `(${text})`,
          },
        },
        {
          notifyText: {
            $regex: `(${text})`,
          },
        },
        ],
        state: 1
      },
      include: 'user',
    };
    return (
      <>
        <StyledSearchInput
          autoFocus
          placeholder="请输入查询内容"
          onChangeText={this.debounceSearch}
        />
        <StyledLine />
        <View style={{ height: 20 }} />
        {text.length > 0 && (
        <LCList
          keyboardDismissMode="interactive"
          noDataPrompt="没有查到相关习惯"
          reqKey={listKey} // 在normalizr 中的位置
          renderItem={this.renderRow}
          reqParam={param}
        />
        )}
      </>
    );
  }
}
