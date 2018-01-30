import React from 'react';
import {DatePickerAndroid, ToastAndroid, StyleSheet} from 'react-native';

import {Content, ListItem, Button, Text, Left, Right, List} from 'native-base';
import _ from 'lodash';
import {inject, observer} from 'mobx-react'
import {observable} from 'mobx'
import Row from '../DumbComponents/Row'
import TouchableRow from '../DumbComponents/TouchableRow'
import HeadingRow from '../DumbComponents/HeadingRow'
import Match from '../../Store/Match'
import Layout from './../DumbComponents/Layout'
import MatchHistoryRow from './MatchHistoryRow'
import moment from 'moment';

@inject('store') @observer
class MatchHistory extends React.Component {
  @observable date;
  once = false;
  constructor(props) {
    super(props);
  }

  async datePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date. May 25 2020. Month 0 is January.
        date: new Date(Date.now()),
        onDateChange: (date) => {
          console.log(date)
        }
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        let data = await this
          .props
          .store
          .matchStore
          .loadHistory(new Date(year, month, day, 0, 0, 0));
        this.date = `${year}-${month}-${day}`
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }

  }

  render() {
    if (!this.once) {
      this.datePicker();
      this.once = true;
    }
    const {user} = this.props.store.currentUser;
    const {navigate} = this.props.navigation;

    return (
      <Layout
        header={'Match History'}
        navigate={navigate}
        footer={"Powered by Appslab.io"}>
        <Content>
        <ListItem itemDivider>
          <Left>
          <Button onPress={() => this.datePicker()}>
            <Text>Select date:
            </Text>
          </Button>
          </Left>
          <Right>
          <Text>{this.date}</Text>
          </Right>
        </ListItem>
        <ListItem>
          <List>
        {this
          .props
          .store
          .matchStore
          .history
          .map(match => {
            return (
             <MatchHistoryRow key={match.id} match={match} />
            )
          })}
            </List>
           
          </ListItem>
          {this.props.store.matchStore.history.length < 1
          ? <Text> Nothing here yet.</Text>
          : null}
    </Content>
      </Layout>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  }
})

export default MatchHistory;