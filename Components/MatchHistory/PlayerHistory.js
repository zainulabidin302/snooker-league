import React from 'react';
import {DatePickerAndroid, ToastAndroid, StyleSheet} from 'react-native';

import {
    Content,
    ListItem,
    Button,
    Text,
    Left,
    Right,
    List
} from 'native-base';
import _ from 'lodash';
import {inject, observer} from 'mobx-react'
import {observable} from 'mobx'
import Row from '../DumbComponents/Row'
import TouchableRow from '../DumbComponents/TouchableRow'
import HeadingRow from '../DumbComponents/HeadingRow'
import Match from '../../Store/Match'
import Layout from './../DumbComponents/Layout'
import MatchHistoryRow from './MatchHistoryRow'
import moment from 'moment';
import Fuse from 'fuse.js';

import Autocomplete from 'react-native-autocomplete-input';

@inject('store')@observer
class PlayerHistory extends React.Component {

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
            player: null,
            query: ''
        }
        this
            .props
            .store
            .playerStore
            .fetch()

    }
    render() {

        const {players} = this.props.store.playerStore;
        this.fuse = new Fuse(players, this.options);
        let result = this
            .fuse
            .search(this.state.query);

        const {user} = this.props.store.currentUser;
        const {navigate} = this.props.navigation;

        return (
            <Layout
                header={'Player History'}
                navigate={navigate}
                footer={"Powered by Appslab.io"}>
                <Content>
                    <ListItem itemDivider>

                        <Autocomplete
                            placeholder="Select Player"
                            data={result}
                            defaultValue={this.state.query}
                            onChangeText={text => this.setState({query: text})}
                            renderItem={item => (
                            <ListItem
                                onPress={() => {
                                newPlayersState = item;
                                this.setState({player: newPlayersState, query: ''});
                                newPlayersState.fetchBalance()
                                console.log('fetching balance now....')
                            }}>
                                <Text>{item.name}
                                    - {item.phone}</Text>
                            </ListItem>
                        )}/>

                    </ListItem>

                    <List>
                        {this
                            .state
                            .player && 
                            this
                            .state
                            .player.balance_history
                            .map(match => {
                                return (<MatchHistoryRow key={match.id} match={match}/>)
                            })}
                    </List>

                </Content>
            </Layout>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    }
})

export default PlayerHistory;