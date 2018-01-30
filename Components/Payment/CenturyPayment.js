import React from 'react';
import {View, Text} from 'native-base';

import {observer} from 'mobx-react';
import Payment from './Payment'

@observer
class CenturyPayment extends React.Component {

    render() {
        return (
            <View>
                <Payment player={this.props.player} match={this.props.match}/>
            </View>
        )
    }
}

export default CenturyPayment;