import React from 'react';
import {ListItem, List, Body, Text, View} from 'native-base';
import { StyleSheet } from 'react-native';
import Slider from 'react-native-slider';
import { observer } from 'mobx-react';

@observer
class FrameSlider extends React.Component {
    render() {

        return (
            <View>
                <ListItem itemDivider>
                    <Text>
                        Frames Played: {this.props.match.frames}
                    </Text >
                </ListItem>
                <ListItem >
                    <View style={styles.container}>
                        <Slider
                            minimumValue={1}
                            maximumValue={20}
                            step={1}
                            value={this.props.match.frames}
                            onValueChange={(frames) => {
                            this.props.match.frames = frames;
                        }}/>
                    </View>
                </ListItem>
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
export default FrameSlider;
