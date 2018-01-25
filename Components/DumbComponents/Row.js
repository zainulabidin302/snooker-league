import React from 'react';
import { View } from 'react-native';


const Row = (props) => (
    <View style={{
        width: '100%',
        height: 60,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
    }} {...props} >
    {props.children}
    </View>)



export default Row;