import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const TopBar = () => {
    return(
        <Navbar bg="dark" variant="dark" className="Topbar">
            <Container>
                <Navbar.Brand>
                    <h4>
                        <Link to="/" style={{marginRight: "1rem", textDecoration: "none", color: "#92E0FF", fontFamily: "consolas", fontWeight:"bold"}}> <AdminPanelSettingsIcon/>Admin</Link>{' | '}
                        <Link to="/" style={{marginLeft: "1rem", textDecoration: "none", color: "white", fontWeight: "400"}}>Admin Panel</Link>
                        <Link to="/Report/" style={{marginLeft: "1rem", textDecoration: "none", color: "white", fontWeight: "400"}}>Report</Link>
                    </h4>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default TopBar;