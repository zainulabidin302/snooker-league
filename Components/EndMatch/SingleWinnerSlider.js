import React from 'react';
import {ListItem, List, Body, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import Slider from 'react-native-slider';
import {observer} from 'mobx-react';

@observer
class SingleWinnerSlider extends React.Component {
    constructor(props) {
        super(props)
        
    }
    
    render() {

        return (
            <View>
                {this.props.match && this.props.match.players && this
                    .props
                    .match
                    .players
                    .map((player, id) => (
                        <View key={player.id}>
                            <ListItem itemDivider>
                                <Text>{player.name} Lost {player.lost} frames</Text>
                            </ListItem>
                            <View style={styles.container} key={player.id}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={this.props.match.frames}
                                    step={1}
                                    value={player.lost}
                                    onValueChange={(frames) => {
                                    let {players} = this.props.match;
                                    players[id].lost = frames;
                                    players[(id + 1) % 2].lost = this.props.match.frames - frames;
                                }}/>
                            </View>
                        </View>
                    ))}
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});
export default SingleWinnerSlider;
