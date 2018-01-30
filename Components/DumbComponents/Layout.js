import React from 'react';
import { Toast, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer } from 'native-base';
import { RefreshControl } from 'react-native';
import SideBar from './Sidebar'

class Layout extends React.Component {


  closeDrawer (){
    this.drawer._root.close()
  }
  openDrawer () {
    this.drawer._root.open()
  }  

  render () {
    let {children, header, footer, navigate} = this.props;

    return (
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<SideBar navigate={navigate} />}
      onClose={() => this.closeDrawer()} >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>{header}</Title>
            </Body>
            {/* <Right /> */}
          </Header>
              {children}
          <Footer>
            <FooterTab>
              <Button full>
                <Text>{footer}</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    </Drawer>);
  }
}

export default Layout;