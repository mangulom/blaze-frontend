import React from "react";
import "../App.css";
import { Row, Col } from 'reactstrap';
import productshelper from '../components/products-helper';
import {Link} from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Products extends React.Component {

constructor(props) {
  super(props);
  this.state = {
      products: [],
      first1: 0,
      rows1: 10,
      first2: 0,
      rows2: 10,
      currentPage: 1,
      pageInputTooltip: 'Press \'Enter\' key to go to this page.'
  };
  this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
}

ActionComponent = ({  row, onClick  }) => {
  const clickHandler = () => onClick(row);   
  return <Button onClick={clickHandler}>Action</Button>;
}


mensaje() {
  alert("Caga0")
}

formatCurrency(price) {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

priceBodyTemplate(rowData) {
  return this.formatCurrency(rowData.price);
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
  return (<Link to={`/update-products/${row._id}`}>Edit</Link>);
}

  componentDidMount = () => {
    productshelper.orders()
    .then((data) => {
      this.setState({products: data});
    })
  }

  onRowClick = (state, rowInfo, column, instance) => {
    return {
        onClick: e => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)
        }
    }
}

  render() {
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    return (
      <div className="container">
      <br />
        <Row className = "d-flex justify-content-sm-end">
          <Col  sm={2}>
            <Link to = {`/create-orders`}>
              <Button variant="primary" size="sm" active>Create Product</Button>{' '}
            </Link>
          </Col>
        </Row>      
        <br />
        <div>

        <Panel header="Products">
          <DataTable  style={{fontSize: "12px"}} value={this.state.products} paginator
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                      paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
            <Column sortable={true} style={{width: "80px", textAlign:"center"}} field="nro" header="N°"></Column>
            <Column sortable={true} style={{width: "360px"}} field="name" header="Name"></Column>
            <Column sortable={true} style = {{width: "120px", textAlign:"center"}} field="category" header="Category"></Column>
            <Column sortable={true} style = {{width: "120px", textAlign:"right"}} field="price" header="Price" body={this.priceBodyTemplate}></Column>
            <Column sortable={true} style = {{width: "120px", textAlign:"center"}} field="status" header="Status"></Column>
            <Column style = {{width: "80px", textAlign:"center"}} dataField='' header="Actions" ></Column>
          </DataTable>
        </Panel>


        
 {/* <BootstrapTable paginator paginatorTemplate={template1} striped={true} hover={true} data={this.state.orders}>
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
</BootstrapTable> */} 
      </div>
      </div>
    );
  }
}
  