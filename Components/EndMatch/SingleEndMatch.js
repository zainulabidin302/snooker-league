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
import SinglePayment from '../Payment/SinglePayment';
import SingleWinnerSlider from './WinnerSlider';

@inject('store')@observer
class SingleEndMatch extends React.Component {
    constructor(props) {
        super(props);
        this.props.match.frames = this.props.match.frames || 1;
        this.props.match.players[0].lost = this.props.match.players[0].lost || 1;
        this.props.match.players[1].lost = this.props.match.players[1].lost || 0;
        
    }

    validate() {
        let {match} = this.props;

        let validate_balance = match
            .players
            .map(player => {

                if (player.lost > 0) {
                    if (player.selected_account == 'cash') {
                        return match.balance_by_player(player) <= 0;

                    } else if (player.selected_account == 'balance') {

                        return match.balance_by_player(player) == 0;

                    } else if (player.selected_account == 'frame') {}
                } else 
                    return true;

                }
            )
            .every(a => a)

        return (match.players &&
        // check if loser is decided
        match.players.map(player => player.lost).reduce((a, b) => a + b, 0) == match.frames 
        // check if all payment is done
        /*validate_balance*/
        )

    }

    @computed get overpaying() {
        let {match} = this.props;
        return 0 > match
            .players
            .map(player => match.balance_by_player(player))
            .reduce((a, b) => a + b, 0)
    }

    @computed get overpaying_list() {
        let {match} = this.props;
        if (!this.overpaying) {
            return []
        }
        return match
            .players
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
            .players
            .forEach((player) => {
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
                } else if (player.selected_account == 'frame') {

                }
            });
        

        this
            .props
            .store
            .matchStore
            .endMatch(this.props.match, (err) => {
            if (err == null) {
                    Toast.show({text: 'Check your internet connection.', position: 'top', buttonText: 'Ok'});
            }

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
                <SingleWinnerSlider match={this.props.match}/>
                <SinglePayment match={this.props.match}/>
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
                                return <Text note key={item.player.id}>{item.player.name}
                                    is overpaying {item.balance}</Text>
                            })
}</Body>
                </ListItem>

            </View>
        );
    }
}
export default SingleEndMatch;