import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Button, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import List from './List'

class Search extends Component {
    render() {
        const { items, title, search } = this.props;

        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> {title}
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="name">Search</Label>
                                        <Input type="text" name="searchText" placeholder="Enter search term" value={search} onChange={this.props.onHandleChange} />
                                    </FormGroup>
                                </Col>
                                <Col xs="12">
                                    {!items.loading && <Button type="submit" size="sm" color="primary" onClick={this.props.onSearch}><i className="fa fa-dot-circle-o"></i> Search</Button>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>&nbsp;</Col>
                            </Row>
                            <List items={items} onAdd={this.props.onAdd} onEdit={this.props.onEdit} onDelete={this.props.onDelete}></List>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Search;
