import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Image, Alert, DrawerLayoutAndroid} from 'react-native';
import {observer, inject} from 'mobx-react';
import { observable } from 'mobx'
import TableList from '../Table/TableList';
import TouchableRow from '../DumbComponents/TouchableRow';
import HeadingRow from '../DumbComponents/HeadingRow'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

@inject('store') @observer
class Home extends React.Component {
  constructor(props) {
    super(props);
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

    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <HeadingRow><Text>Snooker Star</Text></HeadingRow>
        <TouchableRow onPress={ () => navigate('AddPlayerPage') }>
          <Text>Add Player</Text>
        </TouchableRow>
        <TouchableRow onPress={ () => navigate('MatchHistoryPage') }>
          <Text>Match History</Text>
        </TouchableRow>

        <TouchableRow onPress={ () => {
          firebase.auth().signOut().then(() => {
            navigate('LoginPage');
          });
          } }>
          <Text >Logout</Text>
        </TouchableRow>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={(ref) => this._drawer = ref}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
          <View style={styles.poolGrid}>
          
                <View style={{backgroundColor: '#ccc', display: 'flex', 
                    flexDirection: 'row', justifyContent: 'space-between',  height: 100}}>
                  <Button title="Settings" onPress={this.toggleSidebar.bind(this)} ></Button>
                  <Text style={{  padding: 10, fontSize: 20 }}>Snooker Star</Text>
                  <Text style={{  padding: 5}}>{user.displayName} </Text>
                  <Image source={{uri: user.photoURL}} style={{ width: 50, height: 50, margin: 5 }} />
                </View>
                <KeyboardAwareScrollView style={{height: 900}}>
                  <TableList  />
                </KeyboardAwareScrollView>
          </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    display: 'flex',
    justifyContent: 'center'
  },
  poolGrid: {

  },
  tableView: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    
    borderBottomWidth: 2,
    borderBottomColor: '#eee' 

  },
  tableText: {
    textAlign: 'center'
  },
});

export default Home;