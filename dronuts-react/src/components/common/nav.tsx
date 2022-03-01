import React from 'react';
import {Avatar, Button, Drawer, Spacer} from '@geist-ui/react';
import {ArrowRightCircle, ShoppingCart} from '@geist-ui/icons';
import './nav.css';
import CartComponent from './cart';
import landingLogo from '../../assets/DronutsLogo.png';
import tempDonut from '../../assets/donut-temp.png';

function NavComponent() {
  const [state, setState] = React.useState(false);

  return (
    <div className="navbar">
      <div className='left-content'>
        <div>
          <a href='/'>
            <img className='logo-img'
              src={ landingLogo } alt='logo'/>
          </a>
        </div>
        <div>
          <a href='/explore'><Button>Explore</Button></a>
        </div>
        <div>
          <a href='/about'><Button>About</Button></a>
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
              <a href='/checkout'>
                <Button className='checkout-button' auto
                  ghost iconRight={ <ArrowRightCircle /> }>Checkout
                </Button>
              </a>
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
