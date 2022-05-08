import React from 'react';
import {useHistory } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import './Header.css';


const SideBarItem = (props) => {

    const history = useHistory();

    const handleClick = () => {
        history.push(props.item.link);
    }

    return(
        <div className="SidebarItem">
            <Container fluid>
                <Row style={{padding:"1.4rem"}}>                                  
                    <Container>
                        <button onClick={handleClick}>
                            {props.item.label}
                        </button>
                    </Container>                
                </Row>
            </Container>
        </div>
    );
}

export default SideBarItem;