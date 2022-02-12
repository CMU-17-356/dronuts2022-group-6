import React from "react";
import { Button, Grid, Spacer } from '@geist-ui/react'
import { useNavigate } from 'react-router-dom'
import './nav.css';

function NavComponent() {
    const navigate = useNavigate();

    return (
        <div className="navbar sticky" id="nav">
            <Spacer h={1}/>
            <Grid.Container gap={1.5}>
                <Grid><img className='logo-img' src={require('../../assets/DronutsLogo.png')} alt='logo' onClick={() => navigate('/')} /></Grid>
                <Grid><Button onClick={() => navigate('/explore')}>Explore</Button></Grid>
                <Grid><Button onClick={() => navigate('/about')}>About</Button></Grid>
            </Grid.Container>
            <Spacer h={1}/>
        </div>
    );
}

export default NavComponent;