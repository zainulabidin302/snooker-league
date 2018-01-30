import React from 'react';
import {
    Text,
    ListItem,
    Container,
    Content,
    Toast,
    Button,
    Right,
    Body,
    List,
    View
} from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';


import Fuse from 'fuse.js';
import {inject, observer} from 'mobx-react';
@inject('store')@observer
class DoubleSelection extends React.Component {
    fuse;
    options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["name", "phone", "username"]
    };

    constructor(props) {
        super(props)
        this.state = {
            teams: [
                {
                    query: '',
                    players: [],
                    placeholder: 'Select Team A Players'
                }, {
                    query: '',
                    players: [],
                    placeholder: 'Select Team B Players'
                }
            ]
        }
        this
            .props
            .store
            .playerStore
            .fetch()

    }
    onTextChange(val, index) {
        this.setState(prevState => {
            let newState = Object.assign({}, prevState);
            newState.teams[index].query = val;
            return newState;
        });
    }

    onPlayerAdd(index, item) {
        let { onChange } = this.props;
        let { players } = this.state.teams[index];
        if (players.length == 2) {
            Toast.show({text: 'Only two players can be added to a Single team.', position: 'top', buttonText: 'Ok'})
        } else {
            let newState = Object.assign({}, this.state)
            newState.teams[index].players = players.concat(item)
            newState.teams[index].query = ''
            this.setState(newState);
            onChange(this.state.teams);
        }
    }

    onPlayerRemove(item, index) {
        let { onChange } = this.props;
        let { players } = this.state.teams[index];
        let newState = Object.assign({}, this.state)
        newState.teams[index].players = newState.teams[index].players.filter((_player) => _player.id != item.id );
        newState.teams[index].query = ''
        this.setState(newState);
        onChange(this.state.teams);
    
    }

    renderAutoCompleteRow(item, index) {
        return (
            <ListItem onPress={() => this.onPlayerAdd(index, item)}>
                <Text>{item.name}
                    - {item.phone}</Text>
            </ListItem>
        )
    }

    renderSinglePlayerRow(_player, _index) {
        return (
            <ListItem key={_player.id}>

            <Text  style={{width: '85%'}}>{_player.name}
                    - {_player.phone}</Text>
                    <Button style={{width: '15%'}}
                        danger
                        onPress={() => this.onPlayerRemove(_player, _index)} >
                        <Text>x</Text>
                    </Button>
            </ListItem>
        )
    }

    render() {
        const {players} = this.props.store.playerStore;

        let fuse = new Fuse(players, this.options);
        
        return (
            <View >
                {this
                    .state
                    .teams
                    .map((team, index) => {
                        return (
                            <List key={index} style={{padding: 10}}>
                                <Autocomplete
                                    placeholder={team.placeholder}
                                    data={fuse.search(team.query).filter(player => this.state.teams.every(team => team.players.every(_player => _player.id != player.id )))}
                                    defaultValue={team.query}
                                    onChangeText={text => this.onTextChange(text, index)}
                                    renderItem={item => this.renderAutoCompleteRow(item, index)}/> 
                                    
                                    {team
                                    .players
                                    .map((_player, _index) => this.renderSinglePlayerRow(_player, _index))}

                            </List>
                        )
                    })
                }
            </View>
        );
    }
}

export default DoubleSelection;