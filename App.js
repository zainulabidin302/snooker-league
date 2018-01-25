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


// firebase.auth().createUserWithEmailAndPassword('zain302@hotmail.com', '123123123').catch((e) => {
//   console.log(e)
// })
let App = StackNavigator({
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

  }
}, {'headerMode': 'none'});


export default () => {
  return <Provider store={new RootStore()}>
    <App />
  </Provider>
}