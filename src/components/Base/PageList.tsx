import React, { Component } from 'react';
import { ListLoadType } from './interface';
import List, { BaseListBaseProps } from './BaseSectionView';

export type PageListT<T> = Omit<BaseListBaseProps<T>, 'data'> & {
  loadPage?: (pageIndex: number, pageSize: number) => Promise<T[] | undefined>;
  pageSize?: number;
};

interface IState<T> {
  page: number;
  loadStatu: ListLoadType;
  data: T[];
}

export default class PageList<ItemT> extends Component<
  PageListT<ItemT>,
  IState<ItemT>
  > {
  constructor(props: any) {
    super(props);
    // default values of state and non-state variables
    this.state = {
      data: [] as any,
      page: 0,
      loadStatu:
        props.data > 0
          ? ListLoadType.LIST_NORMAL
          : ListLoadType.LIST_FIRST_JOIN,
    };
  }

  shouldComponentUpdate(nextProps: PageListT<ItemT>, nextState: IState<ItemT>) {
    return this.state.loadStatu !== nextState.loadStatu;
  }

  reload(page: number = 0) {
    const { pageSize = 20, loadPage } = this.props;
    if (loadPage) {
      this.setState({ loadStatu: ListLoadType.LIST_LOAD_DATA }, async () => {
        const res = await loadPage(page, pageSize);
        const count = res?.length || 0;
        const nextLoadStatu =
          count < pageSize
            ? ListLoadType.LIST_LOAD_NO_MORE
            : ListLoadType.LIST_NORMAL;
        this.setState({
          page,
          loadStatu: nextLoadStatu,
          data: res || [],
        });
        // if (!!data) {
        //   this.setState({page: 0, loadStatu: nextLoadStatu, data});
        // } else {
        //   this.setState({loadStatu: ListLoadType.LIST_NORMAL, data});
        // }
      });
    }
  }

  render() {
    const { page, loadStatu, data } = this.state;
    const { loadPage, pageSize = 40, ...otherProps } = this.props;

    // console.log('xxx', data?.length || 0);
    // console.log('www', (page + 1) * pageSize);

    return (
      <List<ItemT>
        {...otherProps}
        // ref={ref=>ref.}
        data={data}
        loadStatu={loadStatu}
        loadData={() => this.reload(0)}
        loadMore={async () => {
          if (loadPage) {
            this.setState({ loadStatu: ListLoadType.LIST_LOAD_MORE });
            const res = await loadPage(page + 1, pageSize);
            const count = res?.length || 0;
            const nextLoadStatu =
              count < pageSize
                ? ListLoadType.LIST_LOAD_NO_MORE
                : ListLoadType.LIST_NORMAL;
            this.setState({
              page: page + 1,
              loadStatu: nextLoadStatu,
              data: [...data, ...(res as ItemT[])],
            });
          }

          // if (!!data) {
          //   this.setState({page: page + 1, loadStatu: nextLoadStatu});
          // } else {
          //   this.setState({loadStatu: ListLoadType.LIST_NORMAL});
          // }
        }}
      />
    );
  }
}
