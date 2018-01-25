import React from 'react';
import { ScrollView,  ToastAndroid, ActivityIndicator, AsyncStorage, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { inject, observer } from 'mobx-react';
import User from '../../Store/User'
import HeadingRow from '../DumbComponents/HeadingRow';
import { observable } from 'mobx';
// Calling the following function will open the FB login dialogue:





@inject('store') @observer
export default class Login extends React.Component {
  @observable loginingIn = false;
  
  @observable user = {
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;

    if (user) {
      this.props.store.currentUser = new User(user);
      this.props.navigation.navigate('HomePage');

    } else {
      console.log('not already loged in user', user)
    }

    this.state = {
      email: 'zain302@hotmail.com',
      password: '123123123'
    }

  }
  // async login() {
  //   let user = await this.loggedIn();
  //   this.loginingIn = false;

  //   if (user) {
  //     this.props.store.currentUser = new User(user);
  //     this.props.navigation.navigate('HomePage');
  //   } else {
  //     console.log('could not login ')
  //   }
  // }



  // async loggedIn() {

  //   return AccessToken.getCurrentAccessToken()
  //   .then((data) => {
  //     if (data) {
  //       return firebase.auth().signInWithCredential(
  //         firebase.auth.FacebookAuthProvider.credential(data.accessToken)
  //       )
  //     } else  {
  //       throw new Error('access token invalid');
  //     }
  //   }).then((currentUser) => {
  //     if(currentUser) {
  //       return currentUser;
  //     } else  { 
  //       throw new Error('something went wrong');
  //     }
  //   }).catch((error) => {
  //     console.log(`Login fail with error: ${error}`);
  //     return false;
  //   })
  // }

  async loginWithEmail() {
    this.loginingIn = true;
    if (this.state.email.length < 1 || this.state.password.length < 1 ) {
      ToastAndroid.showWithGravity(
        'Wrong username or password',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      this.loginingIn = false;

      return ;
    }
    
    let cred = firebase.auth.EmailAuthProvider.credential(this.state.email, this.state.password);
    
    firebase.auth().signInWithCredential(cred).then((user) => {
      this.loginingIn = false;
      this.props.store.currentUser = new User(user);
      this.props.navigation.navigate('HomePage');
      console.log('navigating')

    }).catch(e => {
      ToastAndroid.showWithGravity(
        'Wrong username or password',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      this.loginingIn = false;
    })
    
  }

  // async  facebookLogin() {
  //   this.loginingIn = true;
  //   return LoginManager
  //     .logInWithReadPermissions(['public_profile', 'email'])
  //     .then((result) => {
  //       if (!result.isCancelled) {
  //         this.login()
  //       }
  //     }).catch((error) => {
  //       console.log(error)
  //       this.loginingIn = false;
  //     });
      
  // }
 
  // async  facebookLogin() {
  //   this.loginingIn = true;
  //   return LoginManager
  //     .logInWithReadPermissions(['public_profile', 'email'])
  //     .then((result) => {
  //       if (!result.isCancelled) {
  //         this.login()
  //       }
  //     }).catch((error) => {
  //       console.log(error)
  //       this.loginingIn = false;
  //     });
      
  // }

  render() {
    
    let loading = null;
    console.log('in render', this.loginingIn)
    if (this.loginingIn == true) {
      loading =  <ActivityIndicator size="small" />
    }
     
    return (
      <ScrollView style={{width: '100%', height: 800, }}>

          <View style={{margin: 30, marginTop: 100}}>
            <Text style={{textAlign: 'center', fontSize: 64}}>Snooker Star</Text>
          </View>
        {loading}
        <View style={{margin: 30}}>
            <View style={{margin: 10}}>
              <TextInput placeholder="Enter email"  value={this.state.email}  
              placeholderTextColor="gray" onChangeText={(text) => this.setState({email: text}) } />
            </View>
            <View style={{margin: 10}}>
              <TextInput placeholder="Enter password" value={this.state.password}  
                placeholderTextColor="gray"  onChangeText={(text) => this.setState({password: text}) } />
            </View>
          
          <Button onPress={this.loginWithEmail.bind(this) } title="Login Email" ></Button>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
});
