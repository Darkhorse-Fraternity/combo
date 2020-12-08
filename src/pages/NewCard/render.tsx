/**
 * Created by lintong on 2017/9/26.
 * @flow
 */

import React, { Fragment, FC } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ListRenderItem,
} from 'react-native';
import CardCell from './CardCell';
import {
  StyledTitleView,
  StyledTitleText,
  StyledTop,
  StyledHerderButton,
  StyledHeaderText,
  StyledContent,
} from './style';
import CardTemplate from './CardTemplate';
import { habits } from '../../configure/habit';
import { useNavigation } from '@react-navigation/native';
import { ICardType } from 'src/data/data-context/interface';
import PageList from '@components/Base/PageList';
import { postCallCardList } from 'src/hooks/interface';
import { RouteKey } from '@pages/interface';

const ListHeaderComponet = () => {
  const { navigate } = useNavigation();

  const habitTemplate = Object.keys(habits).map((name) => (
    <Fragment key={name}>
      <StyledTitleView>
        <StyledTitleText>{name}</StyledTitleText>
      </StyledTitleView>
      <CardTemplate
        key={`template ${name}`}
        data={habits[name]}
        onPress={(habit) => {
          navigate(RouteKey.creat, { habit });
        }}
      />
    </Fragment>
  ));

  //适配安卓
  const style = Platform.OS === 'ios' ? {} : { height: 1062 };

  return (
    <StyledTop style={style}>
      <StyledHeaderText>
        「 种一棵树最好的时间是十年前，其次是现在。 」
      </StyledHeaderText>
      <View style={{ paddingHorizontal: 20 }}>
        <StyledHerderButton
          // style={styles.headerBtn}
          title="自建习惯卡片"
          onPress={() => {
            navigate(RouteKey.creat);
          }}
        />
      </View>

      {habitTemplate}

      <StyledTitleView key="bottom">
        <StyledTitleText>圈子推荐</StyledTitleText>
      </StyledTitleView>
    </StyledTop>
  );
};

const renderRow: ListRenderItem<ICardType> = ({ item }) => {
  return <RenderRow {...item} />;
};

const RenderRow: FC<ICardType> = (props) => {
  const { iconAndColor, title, notifyText, objectId } = props;

  const { name } = iconAndColor || { name: 'sun', color: '#b0d2ee' };
  const { navigate } = useNavigation();

  return (
    <CardCell
      key={title}
      title={title}
      name={name || ''}
      color={'white'}
      des={notifyText}
      onPress={() => {
        navigate(RouteKey.cardInfo, { iCardId: objectId });
      }}
    />
  );
};

const NewCard: FC<{}> = () => {
  const loadPage = (page_index: number, page_size: number) => {
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
    };
    return postCallCardList(param).then((res) => res.result);
  };

  return (
    <StyledContent>
      <PageList<ICardType>
        ListHeaderComponent={ListHeaderComponet}
        loadPage={loadPage}
        style={styles.list}
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={4}
        // footerStyle={{ paddingBottom: 60 }}
        renderItem={renderRow}
      />
    </StyledContent>
  );
};

export default NewCard;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  list: {
    flex: 1,
    overflow: 'hidden',
  },
  columnWrapperStyle: {
    padding: 0,
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
