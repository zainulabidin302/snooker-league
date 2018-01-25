import React from 'react';
import { TouchableOpacity } from 'react-native';


const Row = (props) => (
    <TouchableOpacity style={{
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
    </TouchableOpacity>)



export default Row;