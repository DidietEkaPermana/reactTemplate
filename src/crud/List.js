import React, { Component } from 'react';
import { Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class List extends Component {

    render() {
        const { items } = this.props;

        const handleEdit = (id) => ev => {
            ev.preventDefault();
            this.props.onEdit(id)
        }

        const handleDelete = (id) => ev => {
            ev.preventDefault();
            this.props.onDelete(id)
        }

        return (
            <Row>
                <Col xs="12">
                    {items.loading && <em>Loading data...</em>}
                    {items.error && <span className="text-danger">ERROR: {items.error}</span>}
                    {items.items &&
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>User Name</th>
                                    <th>
                                        <Button size="sm" color="primary" onClick={this.props.onAdd}>Add</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.items.map((data, index) =>
                                    <tr key={data.id}>
                                        <td>{index + 1}</td>
                                        <td>{data.firstName}</td>
                                        <td>{data.lastName}</td>
                                        <td>{data.username}</td>
                                        <td>
                                            <Button size="sm" color="primary" onClick={handleEdit(data.id)} >Edit</Button>&nbsp;
                                                        <Button size="sm" color="danger" onClick={handleDelete(data.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    }
                    {items.items &&
                        <nav>
                            <Pagination>
                                <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                <PaginationItem active>
                                    <PaginationLink tag="button">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                            </Pagination>
                        </nav>
                    }
                </Col>
            </Row>
        );
    }
}

export default List;
