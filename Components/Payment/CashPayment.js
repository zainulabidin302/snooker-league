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
    Left,
    Header,
    Item,
    Icon,
    Input,
    Right
} from 'native-base';
import {observer} from 'mobx-react';

@observer
class CashPayment extends React.Component {
    constructor(props) {
        super(props)
        this.props.player.selected_account = this.props.player.selected_account || 'cash'
        this.props.player.unconfirm_paid_amount = this.props.player.unconfirm_paid_amount ||  String(0);
        this
            .props
            .player
            .fetchBalance()

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
        let { row } = this; 
        return (
            <List>
                {row('Total Frames Played', this.props.match.frames)}
                {row('Lost frames:', this.props.player.lost)}
                {row('To Pay:', this
                                .props
                                .match
                                .total_by_player(this.props.player))}

                <ListItem style={{height: 20}}>
                    <Text style={{width: '80%'}}>Enter amount: {this.props.player.unconfirm_paid_amount}</Text>

                    <Input  style={{backgroundColor: '#fff', width: '20%'}}
                        placeholder="e.g 80"
                        value={String(this.props.player.unconfirm_paid_amount)}
                        onChangeText={(text) => this.props.player.unconfirm_paid_amount = text}/>
                </ListItem>
                {row('Balance:', this
                            .props
                            .match
                            .balance_by_player(this.props.player))}
            

            </List>
        )
    }
}

export default CashPayment;