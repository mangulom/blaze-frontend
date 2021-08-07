import React from "react";
import "../App.css";
import { Row, Col } from 'reactstrap';
import ordershelper from '../components/orders-helper';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default class Orders extends React.Component {

constructor(props) {
  super(props);
  this.state = {
      orders: [],
      first1: 0,
      rows1: 10,
      first2: 0,
      rows2: 10,
      currentPage: 1,
      pageInputTooltip: 'Press \'Enter\' key to go to this page.'
  };
  this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
}

priceBodyTemplate(rowData) {
  return this.formatCurrency(rowData.total);
}

onCustomPage1(event) {
  this.setState({
      first1: event.first,
      rows1: event.rows,
      currentPage: event.page + 1
  });
}

onCustomPage2(event) {
    this.setState({
        first2: event.first,
        rows2: event.rows
    });
}

onPageInputKeyDown(event, options) {
    if (event.key === 'Enter') {
        const page = parseInt(this.state.currentPage);
        if (page < 0 || page > options.totalPages) {
            this.setState({ pageInputTooltip: `Value must be between 1 and ${options.totalPages}.`})
        }
        else {
            const first = this.state.currentPage ? options.rows * (page - 1) : 0;

            this.setState({ first1: first, pageInputTooltip: 'Press \'Enter\' key to go to this page.' });
        }
    }
}

onPageInputChange(event) {
    this.setState({ currentPage: event.target.value });
}

CellFormatter(cell, row) {
  return (<Link to={`/update-orders/${row._id}`}>Edit</Link>);
}

formatCurrency(total) {
  return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

componentDidMount = () => {
  ordershelper.orders()
  .then((data) => {
    this.setState({orders: data});
  })
}

render() {

  const pagination = paginationFactory({
    page: 2,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,

    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

    return (
      <div className="container">
      <br />
        <Row className = "d-flex justify-content-sm-end">
          <Col  sm={2}>
            <Link to = {`/create-orders`}>
              <Button variant="primary" size="sm" active>Create Order</Button>{' '}
            </Link>
          </Col>
        </Row>      
        <br />
        <div>

        <Panel header="Orders">

          {/*
        <DataTable style={{fontSize: "12px"}} value={this.state.orders} paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column sortable={true} style={{width: "80px", textAlign:"center"}} field="_id" header="N°"></Column>
                        <Column sortable={true} style={{width: "360px"}} field="consumer" header="Customer"></Column>
                        <Column sortable={true} style = {{width: "120px", textAlign:"center"}} field="status" header="Status"></Column>
                        <Column sortable={true} style = {{width: "120px", textAlign:"center"}} field="date" header="Date"></Column>
                        <Column sortable={true} style = {{width: "120px", textAlign:"right"}} field="total" header="Total" body={this.priceBodyTemplate}></Column>
                        <Column style = {{width: "80px", textAlign:"center"}} dataField='' header="Actions" body={this.CellFormatter}></Column>
        </DataTable>
          */}
          <BootstrapTable pagination={pagination} striped={true} hover={true} data={this.state.orders}>
            <TableHeaderColumn isKey dataField='nro' dataSort={true} dataAlign="center">
              N°
            </TableHeaderColumn>
            <TableHeaderColumn dataField='consumer' dataSort={true} dataAlign="center">
              Consumer
            </TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataSort={true} dataAlign="center">
              Status
            </TableHeaderColumn>
            <TableHeaderColumn dataField='date' dataSort={true} dataAlign="center">
              Date
            </TableHeaderColumn>          
            <TableHeaderColumn dataField='total' dataAlign="center">
              Total
            </TableHeaderColumn>
            <TableHeaderColumn dataField='' dataFormat={this.CellFormatter}>
              Actions
            </TableHeaderColumn>          
          </BootstrapTable> 
        </Panel>
      </div>
      </div>
    );
  }
}
  