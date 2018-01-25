import React from 'react';
import { View, Text } from 'react-native';


const HeadingRow = ({children}) => (
    <View style={{
        width: '100%',
        height: 60,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        backgroundColor: '#ddd',
        display: 'flex',
        flexDirection: 'row',
    }}>
        <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center'
                    }}>
            {children}
        </Text>
    </View>)



export default HeadingRow;