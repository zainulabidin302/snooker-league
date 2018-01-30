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
class MatchHistoryRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: false,
        }
    }

    toggleView() {
        this.setState({view: !this.state.view})
    }

    render() {
        let {table, match} = this.props;
        let output = null;
        
        if (this.state.view) {
            output = 
               <EndMatch
                match={match}
                onChange={() => this.toggleView()}/>
        } else {
            output = (
                <ListItem>
                    {this.state.view}
                   <Text style={{'width': '40%'}} note>{match.getMatchInfo()}</Text>
                   <Text style={{'width': '40%'}} >{match.match_type.type}</Text>
                   <Button  onPress={() => this.toggleView()} small>
                     <Text>View</Text>
                   </Button>
                </ListItem>
            )
        }
        return output;
    }
}
export default MatchHistoryRow;