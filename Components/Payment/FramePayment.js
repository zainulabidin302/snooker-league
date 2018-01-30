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

class FramePayment extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <List>
                <ListItem>
                    <Left>
                        Total frames played:
                    </Left>
                    <Body>
                        {this.props.match.frames}
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        Total frames played:
                    </Left>
                    <Body>
                        {this.props.player.lost}
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        To Pay:
                    </Left>
                    <Body>
                        {this
                            .props
                            .match
                            .getUserTotal(this.props.player.id)}
                    </Body>
                </ListItem>
            </List>
        )
    }
}

export default FramePayment;