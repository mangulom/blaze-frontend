import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import "../App.css";
import {useParams} from "react-router-dom";
import '../../node_modules/react-bootstrap-table-2/css/react-bootstrap-table.css'
import { Row, Col, Container } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Panel } from 'primereact/panel';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
const UpdateOrders = () => {
    const {_id} = useParams();
    const [order, setOrder] = React.useState([]);
    function toCurrency(mount) {
        if (mount!==undefined) {
            return mount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        } else {
            return "$0.00"
        }
    }

    useEffect(() => {
        obtaindata();
    },[]);

    function CellFormatter(cell, row) {
        return (<Link to={`/update-orders/${row._id}`}>Edit</Link>);
    }

    const obtaindata = async () => {
        const data = await fetch(`http://localhost:8080/api/update-orders?_id=${encodeURIComponent(_id)}`, {
            method: "GET"
        })
        const rec = await data.json()
        setOrder(rec)
    }

    function MsgEdit() {
        alert("I´m gonna edit the document");
    }

    function MsgDelete() {
        alert("I´m gonna delete the document");
    }

    function MsgComplete() {
        alert("Order Complete");
    }

    function MsgReject() {
        alert("Order Reject");
    }

    return (
        <Container>
            <br/>
            <Row>
                <Col xs="11"><h4>Order N° {order.nro}</h4></Col>
                <Col xs="1">
                    <Link to = "/orders">
                        <Button style = {{fontSize: "15px"}} variant="secondary" size="sm" active>Back</Button>{' '}
                    </Link>
                </Col>
            </Row>            
            <br />
            <Row  style={{padding: '10px'}}>
                <Col xs="2"><h6>Customer</h6></Col>
                <Col xs="10"><h6>{order.consumer}</h6></Col>
            </Row>
            <Row style={{padding: '10px'}}>
                <Col xs="2"><h6>Status</h6></Col>
                <Col xs="10"><h6>{order.status}</h6></Col>
            </Row>
            <Row style={{padding: '10px'}}>
                <Col xs="2"><h6>Date</h6></Col>
                <Col xs="10"><h6>{order.date}</h6></Col>
            </Row>
            <Panel  Header="Products">
                <BootstrapTable style={{margin: "0 auto"}} data={order.detail} striped={true} hover={true} >
                <TableHeaderColumn width={"80px"} isKey dataField='nro_product' dataSort={true} dataAlign="center">
                N°
                </TableHeaderColumn>
                <TableHeaderColumn width={"360px"} style={{textAlign: "left"}} dataField='name' dataSort={true} dataAlign="center">
                    
                Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField='quantity' dataSort={true} dataAlign="center">
                Quantity
                </TableHeaderColumn>
                <TableHeaderColumn dataField='unitprice' dataSort={true} dataAlign="center">
                Price
                </TableHeaderColumn>          
                <TableHeaderColumn dataField='cost' dataAlign="center">
                Cost
                </TableHeaderColumn>
                <TableHeaderColumn dataField='' dataAlign="center" 
                    dataFormat={cell => (
                        <>
                        <Button variant="primary" size="sm" onClick={ MsgEdit }> <FontAwesomeIcon icon={faPen} /></Button>
                        &nbsp;&nbsp;
                        <Button variant="danger" size="sm" onClick={ MsgDelete }> <FontAwesomeIcon icon={faTrash} /></Button>
                        </>
                    )}
                >
                Actions                               
                </TableHeaderColumn>          
            </BootstrapTable> 
            <Row style={{paddingTop: "15px", paddingBottom: "15px"}}>
                <Col xs="12" style={{textAlign: "right"}}>
                    <Button style={{fontSize: "15px"}} variant="primary" size="sm" active>Add Item+</Button>{' '}
                </Col>
            </Row>      
            <Row>
                <Col xs="8"></Col>
                <Col xs="2"><b>SubTotal</b></Col>
                <Col xs="2" style={{textAlign: "right"}}>{toCurrency(order.total)}</Col>
            </Row>
            <Row>
                <Col xs="8"></Col>
                <Col xs="2"><b>Taxes</b></Col>
                <Col xs="2"></Col>
            </Row>
            <Row>
                <Col xs="8"></Col>
                <Col xs="2" style={{fontSize: "13px", paddingLeft: "20px"}}><b>Total City Tax</b></Col>
                <Col xs="2" style={{fontSize: "13px", textAlign: "right"}}>{toCurrency(order.total*10/100)}</Col>
            </Row>
            <Row>
                <Col xs="8"></Col>
                <Col xs="2" style={{fontSize: "13px", paddingLeft: "20px"}}><b>Total County Tax</b></Col>
                <Col xs="2" style={{fontSize: "13px", textAlign: "right"}}>{toCurrency(order.total*5.5/100)}</Col>
            </Row>
            <Row>
                <Col xs="8"></Col>
                <Col xs="2" style={{fontSize: "13px", paddingLeft: "20px"}}><b>Total State Tax</b></Col>
                <Col xs="2" style={{fontSize: "13px", textAlign: "right"}}>{toCurrency(order.total*9.24/100)}</Col>
            </Row>
            <Row>
                <Col xs="8"></Col>
                <Col xs="2" style={{fontSize: "13px", paddingLeft: "20px"}}><b>Total Federal Tax</b></Col>
                <Col xs="2" style={{fontSize: "13px", textAlign: "right"}}>{toCurrency(order.total*2.49/100)}</Col>
            </Row>
            <Row>
                <Col xs="8"></Col>
                <Col xs="2"><b>Total Taxes</b></Col>
                <Col xs="2" style={{textAlign: "right"}}>{toCurrency(order.total * (10+5.5+9.24+2.49) /100)}</Col>
            </Row>                        
            <Row>
                <Col xs="8"></Col>
                <Col xs="2"><b>Total</b></Col>
                <Col xs="2" style={{textAlign: "right"}}>{toCurrency(order.total + (order.total * (10+5.5+9.24+2.49) /100))}</Col>
            </Row>   

            <Row style={{paddingTop: "15px"}}>
                <Col xs="12" style={{textAlign: "right"}}>
                    <Button onClick={ MsgComplete } style={{fontSize: "15px"}} variant="success" size="sm" active>Complete Order</Button>{' '}
                    <Button onClick={ MsgReject } style={{fontSize: "15px"}} variant="danger" size="sm" active>Reject Order</Button>{' '}
                </Col>
            </Row>                 
            </Panel>            
            </Container>
       
    );
}

export default UpdateOrders;