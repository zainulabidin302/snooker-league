import React from 'react';
import {
    Segment,
    Button,
    Text,
    View,
    List,
    ListItem,
    CheckBox,
    Body,
    Header
} from 'native-base';

import {inject, observer} from 'mobx-react';

@inject('store') @observer
class BalancePayment extends React.Component {
    constructor(props) {
        super(props);
        this
            .props
            .player
            .fetchBalance()
            this.props.player.selected_account = this.props.player.selected_account ||  'balance'
            this.props.player.unconfirm_paid_amount = this.props.player.unconfirm_paid_amount ||  String(0);

        if (this.props.match.total_by_player(this.props.player) <= this.props.player.balance) {
            this.props.player.unconfirm_paid_amount = this
                .props
                .match
                .total_by_player(this.props.player);
        }
    }
    row(prop, val) {
        return (<ListItem style={{
            height: 20,
            width: '100%'
        }}>
            <Text style={{width: '80%'}}>{prop}</Text>
            <Text style={{width: '20%'}}>{val}</Text>
        </ListItem>)
    }
    render() {
        let {row} = this;
        return (
            <List>
                {row('Total frames played :', this.props.match.frames)}
                {row('Lost frames :', this.props.player.lost)}
                {row('Current Balance :', this.props.player.balance)}
                {row('To Pay : ', this
                            .props
                            .match
                            .total_by_player(this.props.player))}


                {this.props.player.balance >= this
                    .props
                    .match
                    .total_by_player(this.props.player)
                    ? <ListItem>
                            <Text></Text>
                            <Text>New Balance : {this.props.player.balance - this
                                    .props
                                    .match
                                    .total_by_player(this.props.player)}</Text>
                        </ListItem>
                    : <ListItem>
                        <Text>Insufficient balance.</Text>
                    </ListItem>
}

            </List>
        )
    }
}

export default BalancePayment;