import React  from 'react';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import AddPlayersForMatch from './Components/AddPlayersForMatch/AddPlayersForMatch';
import { StackNavigator , StackNavigatorConfig} from 'react-navigation';
import RootStore from './Store/RootStore';
import { Provider } from 'mobx-react';
import firebase from 'react-native-firebase';
import AddPlayer from './Components/AddPlayer/AddPlayer'
import MatchHistory from './Components/MatchHistory/MatchHistory'
import {Root, Toast} from 'native-base';
import PlayerHistory from './Components/MatchHistory/PlayerHistory'
import PlayerPaymentHistory from './Components/MatchHistory/PlayerPaymentHistory'

// firebase.auth().createUserWithEmailAndPassword('zain302@hotmail.com', '123123123').catch((e) => {
//   console.log(e)
// })
let AppStackNavigator = StackNavigator({
  LoginPage: {
    screen: Login, 
  },
  
  HomePage: {
    screen: Home
  },
  
  AddPlayerPage: {
    screen: AddPlayer
  },

  MatchHistoryPage: {
    screen: MatchHistory
  },

  PlayerHistoryPage: {
    screen: PlayerHistory
  },


  PlayerPaymentPage: {
    screen: PlayerPaymentHistory
  },
  
}, {'headerMode': 'none'});


export default class App extends React.Component {
  componentWillUnmount() {
    Toast.toastInstance = null;
  }
  render() {
    return (
      <Provider store={new RootStore()}>
      <Root>
        <AppStackNavigator />
      </Root>
      </Provider>)
  }

}
