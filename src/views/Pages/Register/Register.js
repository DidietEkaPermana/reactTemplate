import React from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import agent from '../../../agent';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_LOADED,
  REGISTER_PAGE_UNLOADED
} from '../../../constants/actionTypes';
import ListErrors from '../../ListErrors'

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangeRepeatpassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'repeatpassword', value }),
  onChangePasswordState: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'isPasswordSame', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onLoad: () =>
    dispatch({ type: REGISTER_PAGE_LOADED }),
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changeRepeatpassword = ev => {
      if(this.props.password) {
        let temp = this.props.password.substring(0, ev.target.value.length);
        if(temp !== ev.target.value)
          this.props.onChangePasswordState(false);
        else
          this.props.onChangePasswordState(true);
      }
      this.props.onChangeRepeatpassword(ev.target.value);
    };
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      if(!this.props.isPasswordSame){
        alert('Your input password not the same');
        return;
      }
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <ListErrors errors={this.props.errors} />
                  <Form onSubmit={this.submitForm(username, email, password)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" invalid={!this.props.username} placeholder="Username" autoComplete="username" value={this.props.username}
                        onChange={this.changeUsername} required/>
                      <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="Email" autoComplete="email" value={this.props.email}
                        onChange={this.changeEmail} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" value={this.props.password}
                        onChange={this.changePassword} required/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" invalid={!this.props.isPasswordSame} placeholder="Repeat password" autoComplete="new-password"  value={this.props.repeatpassword}
                        onChange={this.changeRepeatpassword}/>
                      <FormFeedback className="help-block">Your repeat password not the same with your input password</FormFeedback>
                    </InputGroup>
                    <Button disabled={this.props.inProgress} color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
