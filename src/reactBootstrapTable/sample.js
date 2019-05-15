import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import { userActions } from '../_actions';

// const products = [{
//     id: 1,
//     name: 'test1',
//     price: 1000
// }, {
//     id: 2,
//     name: 'test2',
//     price: 500
// }];
// const columns = [{
//     dataField: 'id',
//     text: 'Product ID'
// }, {
//     dataField: 'name',
//     text: 'Product Name'
// }, {
//     dataField: 'price',
//     text: 'Product Price'
// }];

const columns = [{
    dataField: 'id',
    text: 'User ID'
}, {
    dataField: 'firstName',
    text: 'First Name'
}, {
    dataField: 'lastName',
    text: 'Last Name'
}, {
    dataField: 'username',
    text: 'User Name'
}];

const RemotePagination = ({ loading, data, page, sizePerPage, onTableChange, totalSize }) => (
    <div>
        <BootstrapTable
            remote
            loading={ loading }
            keyField="id"
            data={data}
            columns={columns}
            pagination={paginationFactory({ page, sizePerPage, totalSize })}
            onTableChange={onTableChange}
            overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
        />
    </div>
);

class SampleReactBootstrapTable extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            loading: false,
            data: [], //products.slice(0, 10),
            sizePerPage: 10
        };
    }

    handleTableChange = (type, { page, sizePerPage }) => {
        const currentIndex = (page - 1) * sizePerPage;
        setTimeout(() => {
            this.setState(() => ({
                page,
                loading: true,
                data: [],//products.slice(currentIndex, currentIndex + sizePerPage),
                sizePerPage
            }));
        }, 2000);
        this.setState(() => ({ loading: true }));
    }

    render() {
        const { user, users } = this.props;
        const { data, sizePerPage, page, loading } = this.state;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader></CardHeader>
                            <CardBody>
                                <RemotePagination
                                    data={data}
                                    page={page}
                                    loading={ loading }
                                    sizePerPage={sizePerPage}
                                    totalSize={50}
                                    onTableChange={this.handleTableChange}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default connect(mapStateToProps)(SampleReactBootstrapTable);