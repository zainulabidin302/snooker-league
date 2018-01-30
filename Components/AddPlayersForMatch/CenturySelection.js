import React from 'react';
import { Text, ListItem, Container, Content, Toast, Button, Right, Body, View } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';


import Fuse from 'fuse.js';
import { inject, observer } from 'mobx-react'; 
@inject('store') @observer 
class CenturySelection extends React.Component {
    fuse;
    options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name",
        "phone",
        "username"
      ]
    };

    constructor(props) {
        super(props)
        this.state = {
            players: [],
            query: ''
        }
        this.props.store.playerStore.fetch()

    }
    render() {
    const { players } = this.props.store.playerStore;
    this.fuse = new Fuse(players, this.options);
    let result = this.fuse.search(this.state.query);
    let {onChange} = this.props;
      return (
            <View style={{padding: 10}} >
                <Autocomplete
                       
                        placeholder="Select Many Players"
                        data={result}
                        defaultValue={this.state.query}
                        onChangeText={text => this.setState({query: text}) }
                        renderItem={item => (
                        <ListItem onPress={() => {
                            newPlayersState = this.state.players.concat(item)
                            this.setState({players: newPlayersState, query: ''});
                            onChange(newPlayersState);
                            }}>
                            <Text>{item.name} - {item.phone}</Text>
                        </ListItem>
                        )}
                    />

                    {this.state.players.map((_player, index) => (<ListItem key={_player.id}>
                        <Text style={{width: '80%'}}>{_player.name} - {_player.phone}</Text>
                        
                            <Button style={{width: '15%'}} danger onPress={() => this.setState({players: this.state.players.filter((__player) => __player.id != _player.id )})} >
                            <Text style={{textAlign: 'center'}}>x</Text></Button>
                    </ListItem>))}  


            </View>
        );
    }
}
export default CenturySelection;