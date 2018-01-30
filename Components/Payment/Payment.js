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
import CashPayment from './CashPayment';
import BalancePayment from './BalancePayment';
import FramePayment from './FramePayment';
import {observer} from 'mobx-react';

@observer
class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.props.player.selected_account = 'cash'
        

    }

    render() {
        let {player} = this.props

        return (
            <List>
                <ListItem
                    style={{
                    flexDirection: 'column'
                }}
                    itemDivider>
                    <Text>{player.name}'s Account
                    </Text>
                </ListItem>
                <ListItem>
                    <Header hasSegment>
                    <Segment primary>
                        <Button
                            first
                            active={player.selected_account == 'cash'}
                            onPress={() => {
                            player.selected_account = 'cash'
                        }}>
                            <Text>Cash</Text>
                        </Button>
                        <Button
                            active={player.selected_account == 'balance'}
                            onPress={() => {
                            player.selected_account = 'balance'
                        }}>
                            <Text>Balance</Text>
                        </Button>
                        <Button
                            last
                            active={player.selected_account == 'frame'}
                            onPress={() => {
                            //player.selected_account = 'frame'
                        }}>
                            <Text>Frame</Text>
                        </Button>
                    </Segment>
                    </Header>
                </ListItem>
                <ListItem>
                    <View>

                        {player.selected_account == 'cash'
                            ? <CashPayment player={player} match={this.props.match}/>
                            : null}
                        {player.selected_account == 'balance'
                            ? <BalancePayment player={player} match={this.props.match}/>
                            : null}
                        {player.selected_account == 'frame'
                            ? <FramePayment player={player} match={this.props.match}/>
                            : null}
                    </View>
                </ListItem>
            </List>
        );
    }
}

export default Payment;