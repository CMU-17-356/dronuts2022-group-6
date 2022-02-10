import React, { MouseEventHandler } from "react";
import { Button, Grid, Spacer } from '@geist-ui/react'
import { useNavigate } from 'react-router-dom'

function NavComponent() {

    const navigate = useNavigate();

    return (
        <div>
            <Spacer h={1}/>
            <Grid.Container gap={1.5}>
                <Grid><Button onClick={() => navigate('/')}>Home</Button></Grid>
                <Grid><Button onClick={() => navigate('/explore')}>Explore</Button></Grid>
                <Grid><Button onClick={() => navigate('/about')}>About</Button></Grid>
            </Grid.Container>
        </div>
    );
}

export default NavComponent;