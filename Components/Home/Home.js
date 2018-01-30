import React from 'react';
// import { ScrollView, StyleSheet, Text, View, TextInput, Button, Image, Alert, DrawerLayoutAndroid} from 'react-native';
import { StyleSheet } from 'react-native';

import {observer, inject} from 'mobx-react';
import { observable } from 'mobx'
import TableList from '../Table/TableList';
//import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import Layout from '../DumbComponents/Layout';

@inject('store') @observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.store.fetchConfiguration();
  }

  static navigationOptions = {
    title: 'Home'
  }
  drawerStatus = false;

  toggleSidebar() {
    this._drawer.openDrawer();
  }

  render() {
    const { user } = this.props.store.currentUser;
    const { navigate } = this.props.navigation;
    
    return (
      <Layout header={this.props.store.config.title} navigate={navigate}  footer={"Powered by Appslab.io"}>
        <TableList  />
      </Layout>
    );
  }
}
export default Home;