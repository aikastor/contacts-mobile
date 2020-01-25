import React, {Component, Fragment} from 'react';
import {fetchContacts} from "../store/actions/contactsActions";
import {connect} from "react-redux";
import {Image, Modal, View, } from 'react-native';

import { Container,Title, Header, Content, H1,Thumbnail, Card, CardItem, Footer,FooterTab, Spinner, Text, Button, Icon, Left, Body, Right,List, ListItem, Form, Item, Input, Label,} from 'native-base';
class Contacts extends Component {
  state = {
    modal: false,
    currentContact: null,
  };
  componentDidMount() {
    this.props.loadContacts();
  }

  seeContact = (data)=> {
    this.setState({currentContact: data});
    this.setModalVisible();

  };

  setModalVisible =()=> {
    this.setState({modal: !this.state.modal})
  };
  hideModal = () => {
    this.setState({modal: !this.state.modal})
  };
  render() {
    return (
        <Container>
          <Header>
            <Body>
              <Title>Menu</Title>
            </Body>
          </Header>
          <Content>
            <List>
              { Object.keys(this.props.contacts).map(item => (
                  <ListItem thumbnail key={item}>
                    <Left>
                      <Thumbnail square source={{ uri: this.props.contacts[item].photo}} />
                    </Left>
                    <Body>
                      <Text>{this.props.contacts[item].name}</Text>
                    </Body>
                    <Right>
                      <Button transparent onPress={()=>this.seeContact(this.props.contacts[item])}>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                ))}
            </List>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modal}
                onRequestClose={this.hideModal}>
              <Content>
                <View style={{paddingTop: 20}}>
                  { this.state.currentContact &&
                      <Content>
                        <H1>
                          {this.state.currentContact.name}
                        </H1>
                        <Image style={{width: 400, height: 200}}
                               source={{uri: this.state.currentContact.photo}}
                        />
                        <Text>{this.state.currentContact.phone}</Text>
                        <Text>{this.state.currentContact.email}</Text>
                      </Content>
                  }
                  <Button block onPress={this.hideModal}>
                    <Text>BACK TO LIST </Text>
                  </Button>
                </View>
              </Content>
            </Modal>
          </Content>
        </Container>
    );
  }
}
const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
  loading: state.contacts.loading,
  errors: state.contacts.errors
});

const mapDispatchToProps = dispatch => ({
  loadContacts : () => dispatch(fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);