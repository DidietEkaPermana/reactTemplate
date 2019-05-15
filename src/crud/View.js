import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Col, Row, FormGroup, Label, Input } from 'reactstrap';

class View extends Component {
    render() {
        const { data, title } = this.props;
        
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={6}>
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>{title}</strong>
                            </CardHeader>
                            <CardBody>
                                {data && data.loading && <em>Loading data...</em>}
                                {data && data.error && <span className="text-danger">ERROR: {data.error}</span>}
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">First Name</Label>
                                            <Input type="text" name="firstName" value={data && data.item && data.item.firstName} onChange={this.props.onHandleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="name">Last Name</Label>
                                            <Input type="text" name="lastName" value={data && data.item && data.item.lastName} onChange={this.props.onHandleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="name">User Name</Label>
                                            <Input type="email" name="username" value={data && data.item && data.item.username} onChange={this.props.onHandleChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button size="sm" color="primary" onClick={this.props.onSubmit} >Submit</Button>&nbsp;
                                <Button size="sm" color="danger" onClick={this.props.onClose}>Close</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default View;
