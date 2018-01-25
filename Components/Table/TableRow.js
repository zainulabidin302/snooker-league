import React from 'react';
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react';
import Row from '../DumbComponents/Row';

@observer
class TableRow extends React.Component {
    
render() {
    let {table, tableAction} = this.props;
    let match_info = null;
    if (table.status == 'PLAYING') {
        match_info = <Text style={{flexGrow: 2}}>{table.Match.getMatchInfo()}</Text>;
    }   
    return (<Row>
        <Text style={{flexGrow: 2}}>{table.title}</Text>
        {match_info}
        <Button onPress={() => tableAction(table)} style={{flexGrow: 1}} title={table.status}></Button>
    </Row>)
    }
}
export default TableRow;