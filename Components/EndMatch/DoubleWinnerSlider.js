import React from 'react';
import {ListItem, List, Body, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import Slider from 'react-native-slider';
import {observer} from 'mobx-react';

@observer
class DoubleWinnerSlider extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View>
                
                {this
                    .props
                    .match
                    .teams
                    .map((team, id) => (
                        <View key={id}>
                            <ListItem itemDivider>
                                <Text>{team.getName} lost {team.lost }</Text>
                            </ListItem>
                            <View style={styles.container}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={this.props.match.frames}
                                    step={1}
                                    value={team.lost}
                                    onValueChange={(frames) => {

                                        let {teams} = this.props.match;
                                        teams[id].players.forEach(player => player.lost = frames)
                                        teams[(id + 1) % 2].players.forEach(player => player.lost = this.props.match.frames - frames)
                                
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
export default DoubleWinnerSlider;
