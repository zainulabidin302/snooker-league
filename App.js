import React from 'react';
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import AddPlayersForMatch from './Components/AddPlayersForMatch/AddPlayersForMatch'
import { StackNavigator } from 'react-navigation';


export default App = StackNavigator({

  HomePage: {
    screen: Home
  },
  LoginPage: {
    screen: Login, 
  },
  AddPlayersForMatchPage: {
    screen: AddPlayersForMatch
  }
});
