import React from 'react';
import {View, Text} from 'native-base';

import {observer} from 'mobx-react';
import Payment from './Payment'
@observer
class SinglePayment extends React.Component {

    render() {
        return (
            <View>
                {this.props.match.players && this
                    .props
                    .match
                    .players
                    .filter(_player => _player.lost > 0)
                    .map(_player => (
                        <View key={_player.id}>
                            <Payment player={_player} match={this.props.match}/>
                        </View>
                    ))}
            </View>
        )
    }
}

export default SinglePayment;