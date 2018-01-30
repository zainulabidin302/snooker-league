import React from 'react';
import { Container, Content, Button, Text, Icon, Body, Left, Right} from 'native-base';

const SideBar = ({navigate}) => (
        <Container >
            <Content style={{backgroundColor: '#fff'}}>

                    <Button full iconLeft primary onPress={ () => navigate('HomePage', { replaceRoute: true }) }> 
                        <Icon style={{width: '20%', padding: 10}} name="home" />
                        <Text style={{width: '80%'}}>Home</Text>
                    </Button>

                    <Button full iconLeft primary onPress={ () => navigate('AddPlayerPage', { replaceRoute: true }) }> 
                            <Icon style={{width: '20%', padding: 10}} name="person" />
                            <Text style={{width: '80%'}}>Add Player</Text>
                    </Button>
                    
                    <Button full iconLeft primary onPress={ () => navigate('MatchHistoryPage', { replaceRoute: true }) }> 
                        <Icon style={{width: '20%', padding: 10}} name="calculator" />
                        <Text style={{width: '80%'}}>Matches History</Text>
                    </Button>

                    <Button full iconLeft primary onPress={ () => navigate('PlayerHistoryPage', { replaceRoute: true }) }> 
                        <Icon style={{width: '20%', padding: 10}} name="calculator" />
                        <Text style={{width: '80%'}}>Player History</Text>
                    </Button>

                    <Button full iconLeft primary onPress={ () => navigate('PlayerPaymentPage', { replaceRoute: true }) }> 
                        <Icon style={{width: '20%', padding: 10}} name="calculator" />
                        <Text style={{width: '80%'}}>Player Payment History</Text>
                    </Button>

            </Content>
        </Container>
    );  


export default SideBar;