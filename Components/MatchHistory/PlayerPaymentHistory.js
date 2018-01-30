import React from 'react';
import {DatePickerAndroid, ToastAndroid, StyleSheet} from 'react-native';

import {
    Content,
    ListItem,
    Button,
    Text,
    Left,
    Right,
    List,
    View
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
class PlayerPaymentHistory extends React.Component {

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
    getBalance() {
        return this.state.player ? this.state.player.balance_history.reduce(
            (a, b) => a + b.total_by_player(b.flat_players.find(player => player.id == this.state.player.id))
        , 0) : 0;
    }

    getPaid() {
                                                
        return this.state.player ? this.state.player.balance_history.reduce(
            (a, b) => a + b.flat_players.find(player => player.id == this.state.player.id).paid_amount
        , 0) : 0;
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
                header={'Player Payment History'}
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
                                newPlayersState.fetchBalance();
                                console.log('fetching balance now....')
                            }}>
                                <Text >{item.name}
                                    - {item.phone}</Text>
                            </ListItem>
                        )}/>

                    </ListItem>
                    <ListItem itemDivider>
                        <Text>
                            {this.state.player && this.state.player.name}
                        </Text>
                    </ListItem>

                    <List>
                        <ListItem>
                            <Text
                                style={{
                                width: '25%'
                            }}
                                note></Text>
                            <Text
                                style={{
                                width: '25%'
                            }}
                                note>To Pay</Text>
                            <Text
                                style={{
                                width: '25%'
                            }}
                                note>Paid</Text>
                            <Text
                                style={{
                                width: '25%'
                            }}
                                note>Balance</Text>
                        </ListItem>
                        {this.state.player && this
                            .state
                            .player
                            .balance_history
                            .map(match => {
                                return (
                                    <ListItem
                                        style={{ height: 10}}>

                                        <Text
                                            style={{
                                            width: '25%',
                                            fontSize: 8
                                        }}
                                            note>{match.getMatchInfo()}
                                        </Text>
                                        <Text
                                            style={{
                                            width: '25%'
                                        }}>{match.total_by_player(match.flat_players.find(player => player.id == this.state.player.id))
}</Text>
                                        <Text
                                            style={{
                                            width: '25%'
                                        }}>{match
                                                .flat_players
                                                .find(player => player.id == this.state.player.id)
                                                .paid_amount
}</Text>

                                        <Text
                                            style={{
                                            width: '25%'
                                        }}>{match.balance_by_player(match.flat_players.find(player => player.id == this.state.player.id))
}</Text>

                                    </ListItem>
                                )
                            })}
                    </List>
                    <ListItem >
                        <Text
                            style={{
                            width: '25%'
                        }}
                            note></Text>
                        <Text
                            style={{
                            width: '25%',
                        }}
                            note>{
                                    this.getBalance()
                                }</Text>
                        <Text
                            style={{
                            width: '25%'
                        }}
                            note>{
                                this.getPaid()
                            }</Text>
                        <Text
                            style={{
                            width: '25%'
                        }}
                            note>{
                                this.state.player && (-1) *this.state.player.balance
                            }</Text>
                    </ListItem>

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

export default PlayerPaymentHistory;