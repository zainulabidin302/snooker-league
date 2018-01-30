import React from 'react';
import {
    Left,
    Body,
    Right,
    Button,
    ListItem,
    Text
} from 'native-base';
import {observer, inject} from 'mobx-react';
import AddPlayersForMatch from './../AddPlayersForMatch/AddPlayersForMatch'
import EndMatch from './../EndMatch/EndMatch'

@inject('store') @observer
class TableRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            start: false,
            end: false
        }
    }
    createOrEndMatch(table) {
        if (table.status == 'FREE') 
            this.setState({start: true, end: false})
        else if (table.status == 'PLAYING') 
            this.setState({start: false, end: true})
    }

   

    render() {
        let {table} = this.props;
        let output = null;

        if (this.state.start && !this.props.store.matchStore.fetching) {
            output = <ListItem><AddPlayersForMatch
                onChange={() => this.setState({start: false, end: false})}
                table={table}/></ListItem>
        } else if (this.state.end && !this.props.store.matchStore.fetching) {
            output = <ListItem><EndMatch
                match={table.Match}
                onChange={() => this.setState({start: false, end: false})}/></ListItem>
        } else {
            output = (
                <ListItem>
                    <Left>
                        <Text>{table.title}</Text>
                        <Text note>{(table.Match && table.Match.getMatchInfo()) || null}</Text>
                    </Left>
                    <Right>
                        <Button onPress={() => this.createOrEndMatch(table)}>
                            <Text
                                style={{
                                padding: 0,
                                fontSize: 8,
                                color: "#fff",
                                lineHeight: 15
                            }}>{table.status}</Text>
                        </Button>
                    </Right>
                </ListItem>
            )
        }
        return output;
    }
}
export default TableRow;