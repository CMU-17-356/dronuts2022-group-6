import React from 'react';
import {Avatar, Button, Drawer, Spacer} from '@geist-ui/react';
import {useNavigate} from 'react-router-dom';
import {ShoppingCart} from '@geist-ui/icons';
import './nav.css';
import CartComponent from './cart';
import landingLogo from '../../assets/DronutsLogo.png';
import tempDonut from '../../assets/donut-temp.png';

function NavComponent() {
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);

  return (
    <div className="navbar">
      <div className='left-content'>
        <div>
          <img className='logo-img'
            src={ landingLogo } alt='logo'
            onClick={ () => navigate('/') } />
        </div>
        <div>
          <Button onClick={ () => navigate('/explore') }>Explore</Button>
        </div>
        <div>
          <Button onClick={ () => navigate('/about') }>About</Button>
        </div>
        <div>
          <Button onClick={ () => navigate('/checkout') }>Checkout</Button>
        </div>
      </div>
      <div className='right-content'>
        <div>
          <Button iconRight={ <ShoppingCart /> } auto
            onClick={ () => setState(true) } />
          <Drawer visible={ state }
            onClose={ () => setState(false) } placement="right">
            <Drawer.Title>Cart</Drawer.Title>
            <Drawer.Subtitle>Donuts!</Drawer.Subtitle>
            <Drawer.Content>
              <CartComponent />
            </Drawer.Content>
          </Drawer>
        </div>
        <div>
          <Button iconRight={ <Avatar
            src={ tempDonut } /> } auto />
        </div>
        <Spacer w={ 5 } />
      </div>
    </div>
  );
}

export default NavComponent;
