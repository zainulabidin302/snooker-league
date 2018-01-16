import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class Login extends React.Component {
  
   doSomething() {
      console.log('hello world!')
  }
  static navigationOptions = {
      title: 'Login'
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.textFields} >Enter Username:</Text>

        <TextInput style={styles.textFields} />

        <Text style={styles.textFields}>Enter Password:</Text>
        <TextInput style={styles.textFields}  />

        <Button title="Login" onPress={() => navigate('HomePage') } ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: 'center',
  },

  textFields: {
      width: '80%',
  }
});
