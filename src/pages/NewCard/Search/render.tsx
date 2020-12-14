import React, { FC, useEffect, useRef, useState } from 'react';
import { ListRenderItem } from 'react-native';

import { useDebouncedCallback } from 'use-debounce';
import { StyledContent, StyledLine, StyledSearchInput } from './style';

import CardCell from '../CardCell/CardCell2';
import { ICardType2 } from 'src/data/data-context/interface';
import { useNavigation } from '@react-navigation/native';
import PageList from '@components/Base/PageList';
import { getClassesICard } from 'src/hooks/interface';

const renderRow: ListRenderItem<ICardType2> = ({ item }) => {
  return <RenderRow {...item} />;
};

const RenderRow: FC<ICardType2> = (props) => {
  const { iconAndColor, title, notifyText, objectId } = props;

  const { color, name } = iconAndColor || { name: 'sun', color: '#b0d2ee' };
  const { navigate } = useNavigation();

  return (
    <CardCell
      title={title}
      name={name || ''}
      color={color || ''}
      des={notifyText}
      onPress={() => {
        navigate('cardInfo', { iCardId: objectId });
      }}
    />
  );
};

const Search = () => {
  const [text, setText] = useState('');
  const listRef = useRef<PageList<ICardType2>>(null);

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setText(value);
    },
    // delay in ms
    150,
    { leading: true, trailing: true },
  );

  const firstRef = useRef(true);
  useEffect(() => {
    if (text && !firstRef.current) {
      listRef.current?.reload();
    }
    firstRef.current = false;
  }, [text]);

  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      $or: [
        {
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
      state: 1,
    };

    return getClassesICard({
      limit: page_size + '',
      skip: page_index * page_size + '',
      where: JSON.stringify(where),
      order: '-createdAt',
    }).then((res) => res.results);
  };
  return (
    <StyledContent>
      <StyledSearchInput
        autoFocus
        placeholder="请输入查询内容"
        onChangeText={debounced.callback}
        clearButtonMode={'while-editing'}
      />
      <StyledLine />
      <PageList<ICardType2>
        ref={listRef}
        keyboardDismissMode="interactive"
        noDataPrompt="没有查到相关习惯"
        loadPage={loadPage}
        // footerStyle={{ paddingBottom: 60 }}
        renderItem={renderRow}
      />
    </StyledContent>
  );
};

export default Search;
