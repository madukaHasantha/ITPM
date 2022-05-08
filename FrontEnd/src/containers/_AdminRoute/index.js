import React from 'react';
import {Route} from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const AdminRoute = ({ component: Component, ...rest}) => {
    return (
        <Container>
            
                
        
            <Row>
            <TopBar/>
                <Col xs={4}>
                    <SideBar/>
                </Col>
                <Col xs={8}>
                    <Route                 
                        {...rest}
                        render={(props) => (
                            <Component {...props} />
                        )}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default AdminRoute;