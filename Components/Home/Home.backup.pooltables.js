import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default class Home extends React.Component {
  
  static navigationOptions = {
      title: 'Home'
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.poolGrid}>
        
        <View style={styles.vPoolItem}>
          <Image source={require('./../../imgs/pool-table.png')} style={styles.vimage} />
          <Image source={require('./../../imgs/pool-table.png')} style={styles.vimage} />
          <Image source={require('./../../imgs/pool-table.png')} style={styles.vimage} />
        </View>

        <View style={styles.hPoolItem}>

          <Image source={require('./../../imgs/pool-table.png')} style={{width: 100, height: 45, margin: 5 }} />
          <Image source={require('./../../imgs/pool-table.png')} style={{width: 100, height: 45, margin: 5 }} />
          <Image source={require('./../../imgs/pool-table.png')} style={{width: 100, height: 45, margin: 5 }} />
          <Image source={require('./../../imgs/pool-table.png')} style={{width: 100, height: 45, margin: 5 }} />
          <Image source={require('./../../imgs/pool-table.png')} style={{width: 100, height: 45, margin: 5 }} />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  poolGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 600,
    padding: 2,
    backgroundColor: '#444',
  },
  vimage: {
    transform: [{rotateZ: '90deg'}],  width: 100, height: 45, margin: 5 
  },

  vPoolItem: {
    
    flexGrow: 1,
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: '#ddd',
  },

  hPoolItem: {
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#ddd',
    borderColor: 'yellow',
    borderWidth: 2,
    backgroundColor: '#eee',
  }
});
