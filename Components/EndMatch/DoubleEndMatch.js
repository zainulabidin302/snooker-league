import React from 'react';
import {
    View,
    Text,
    ListItem,
    Left,
    Body,
    Right,
    Button,
    Toast,
    Content
} from 'native-base';
import {observer, inject} from 'mobx-react';
import {computed} from 'mobx'

import FrameSlider from './FrameSlider';
import DoublePayment from '../Payment/DoublePayment';
import DoubleWinnerSlider from './DoubleWinnerSlider';

@inject('store')@observer
class DoubleEndMatch extends React.Component {

    super(props) {
        //'DEFAULTS'
        this.props.match.frames = 2;

        this.props.match.teams[0].players.forEach(player => {player.lost = 2})
        this.props.match.teams[(0 + 1) % 2].players.forEach(player => {player.lost = 0})

    }

    validate() {
        let {match} = this.props;

        let validate_balance = match
            .flat_players
            .map(player => {
                if (player.lost > 0) {
                    if (player.selected_account == 'cash') {
                        return match.balance_by_player(player) <= 0;
                    } else if (player.selected_account == 'balance') {
                        return match.balance_by_player(player) == 0;
                    } else if (player.selected_account == 'frame') {

                    }
                } else {
                    return true;
                }
            })
            .every(a => a)

        return (match.teams &&
        // check if loser is decided
        (match.flat_players.map(player => player.lost).reduce((a, b) => a + b, 0) / 2) == match.frames 
        // check if all payment is done
    //    validate_balance
    )

    }

    @computed get overpaying() {
        let {match} = this.props;
        return 0 > match
            .flat_players
            .map(player => match.balance_by_player(player))
            .reduce((a, b) => a + b, 0)
    }

    @computed get overpaying_list() {
        let {match} = this.props;
        if (!this.overpaying) {
            return []
        }
        return match
            .flat_players
            .map(player => {
                return {
                    balance: match.balance_by_player(player),
                    'player': player
                }
            })
            .filter(item => item.balance < 0);
    }

    endMatch() {
        let amount = this.props.match.unconfirm_paid_amount;

        this
            .props
            .match
            .teams
            .forEach(team => team.players.forEach(player => {

                player.paid_amount = Number(player.unconfirm_paid_amount);

                if (player.selected_account == 'cash') {
                    player.single_match_net_balance = this
                        .props
                        .match
                        .balance_by_player(player)

                } else if (player.selected_account == 'balance') {
                    player.single_match_net_balance = player.balance - this
                        .props
                        .match
                        .total_by_player(player);
                } else if (player.selected_account == 'frame') {}

            }));

        this
            .props
            .store
            .matchStore
            .endMatch(this.props.match, (err) => {
                if (err == null) 
                    return;
                console.log(err)
                console.log('Something went wrong when ending match.')
            });

        this
            .props
            .onChange();
    }

    render() {
        return (
            <View>
                <ListItem>
                    <Text>
                        {this
                            .props
                            .match
                            .getMatchInfo()}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        Match Type: {this.props.match.match_type.type}
                    </Text>
                </ListItem>

                <FrameSlider match={this.props.match}/>
                <DoubleWinnerSlider match={this.props.match}/>
                <DoublePayment match={this.props.match}/>
                <ListItem>
                    {!this.overpaying
                        ? <Left>
                                <Button disabled={!this.validate()} onPress={() => this.endMatch()}>
                                    <Text>End Match Now</Text>
                                </Button>
                            </Left>
                        : <Left>
                            <Button disabled={!this.validate()} onPress={() => this.endMatch()}>
                                <Text>End and Overpay</Text>
                            </Button>
                        </Left>
}

                    <Body>
                        <Button onPress={() => this.props.onChange()}>
                            <Text>Cancel</Text>
                        </Button>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>{this
                            .overpaying_list
                            .map(item => {
                                return <Text note>{item.player.name}
                                    is overpaying {item.balance}</Text>
                            })
}</Body>
                </ListItem>

            </View>
        );
    }
}
export default DoubleEndMatch;