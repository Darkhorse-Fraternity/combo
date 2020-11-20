import React, { Component } from 'react';
import { ListLoadType } from './interface';
import List, { BaseListBaseProps } from './BaseSectionView';

export type PageListT<T> = Omit<BaseListBaseProps<T>, 'data'> & {
  loadPage?: (
    pageIndex: number,
    pageSize: number,
  ) => Promise<T[] | { data: T[]; hasMore: boolean } | undefined>;
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
  constructor(props: PageListT<ItemT>) {
    super(props);
    // default values of state and non-state variables
    this.state = {
      data: [],
      page: 0,
      loadStatu: ListLoadType.LIST_NORMAL,
    };
  }

  // shouldComponentUpdate(nextProps: PageListT<ItemT>, nextState: IState<ItemT>) {
  //   return this.state.loadStatu !== nextState.loadStatu;
  // }

  //让外部直接对date 进行操作

  getData() {
    return this.state.data;
  }

  mutate(data: ItemT[]) {
    this.setState({ data });
  }

  reload(page: number = 0) {
    const { pageSize = 20, loadPage } = this.props;
    const { data } = this.state;
    if (loadPage) {
      this.setState(
        {
          loadStatu:
            page === 0
              ? ListLoadType.LIST_LOAD_DATA
              : ListLoadType.LIST_LOAD_MORE,
        },
        async () => {
          const res = await loadPage(page, pageSize);

          if (!res) {
            this.setState({
              loadStatu: ListLoadType.LIST_NORMAL,
            });
          }

          let newRes = [] as ItemT[];
          let nextLoadStatu = ListLoadType.LIST_NORMAL;
          if (Array.isArray(res)) {
            newRes = res;
            const count = res.length || 0;
            nextLoadStatu =
              count < pageSize
                ? ListLoadType.LIST_LOAD_NO_MORE
                : ListLoadType.LIST_NORMAL;
          } else {
            newRes = res!.data;
            nextLoadStatu = !res!.hasMore
              ? ListLoadType.LIST_LOAD_NO_MORE
              : ListLoadType.LIST_NORMAL;
          }

          this.setState({
            page,
            loadStatu: nextLoadStatu,
            data: page === 0 ? newRes : [...data, ...newRes],
          });
        },
      );
    }
  }

  render() {
    const { loadStatu, data, page } = this.state;
    const { ...otherProps } = this.props;

    return (
      <List<ItemT>
        {...otherProps}
        // ref={ref=>ref.}
        data={data}
        loadStatu={loadStatu}
        loadData={this.reload.bind(this, 0)}
        loadMore={this.reload.bind(this, page + 1)}
      />
    );
  }
}
