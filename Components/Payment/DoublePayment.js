import React from 'react';
import {View, Text} from 'native-base';

import {observer} from 'mobx-react';
import Payment from './Payment'
@observer
class DoublePayment extends React.Component {

    render() {
        return (
            <View>
                { this
                    .props
                    .match
                    .teams
                    .filter(_team => _team.lost > 0)
                    .map((team, id) => (
                        <View key={id}>
                            {
                                team.players.map(__palyer => (
                                    <Payment key={__palyer.id} player={__palyer} match={this.props.match}/>
                                )
                            )
                            }
                            
                        </View>
                    ))}
            </View>
        )
    }
}

export default DoublePayment;