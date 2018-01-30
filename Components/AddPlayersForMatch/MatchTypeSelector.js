import React from 'react';
import {ListItem, Text, Body, Radio, Right} from 'native-base';

class MatchTypeSelector extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {selected: 0} 
    }

    render() {
        return (
            this.props.types.map((type, idx) => (
                <ListItem key={type}>
                <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                <Body />
                <Right><Radio selected={idx == this.state.selected} onPress={() => {
                    this.props.onChange(idx);
                    this.setState({'selected': idx});
                     
                    }
                }  /></Right>
                </ListItem>
            ))
        )
    }
}

export default MatchTypeSelector;
