import React from 'react';
import {View, List, Content} from 'native-base';
import { RefreshControl } from 'react-native'; 
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import TableRow from './TableRow';
import firebase from 'react-native-firebase'

@inject('store') @observer
class TableList extends React.Component {
  tables;
  constructor(props) {
    super(props)

    this
      .props
      .store
      .matchStore
      .fetch();
    this
      .props
      .store
      .tableStore
      .fetch();
    this.tables = this.props.store.tableStore.getTables
  }
  onRefresh() {
    this
    .props
    .store
    .matchStore
    .fetch();
  }

  render() {
    return (
      <Content refreshControl={ <RefreshControl refreshing={this.props.store.matchStore.fetching} onRefresh={this.onRefresh.bind(this)} /> }>
        <List >
          {this
            .props
            .store
            .tableStore
            .getTables
            .map((table, idx) => (<TableRow key={idx} table={table} />))
        }
        </List>
      </Content>
    )

  }
}

export default TableList;