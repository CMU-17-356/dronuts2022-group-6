import {Page, Spacer, Text} from '@geist-ui/react';
import React from 'react';
// import NavComponent from '../common/nav';
import landingLogo from '../../assets/DronutsLogo.png';
import './home.css';

function HomeComponent() {
  return (
    <div>
      <div className='cover'>
        <div className="landing-info">
          <img className='landing-logo'
            src={landingLogo} alt="logo" />
          <Spacer h={2}/>
          <h1 className='landing-text'>Order today!</h1>
        </div>
      </div>
      {/* <NavComponent /> */}
      <div className='page'>
        <Page>
          <Page.Content>
            <h1>Welcome to the future!</h1>
            <h3>Order Donuts to your home, without having to move.</h3>
            <Text blockquote>
              "The best and easiest method
                I have ever had for getting food" - User
            </Text>
            <Spacer h={3}/>

          </Page.Content>
        </Page>

      </div>
    </div>

  );
}

export default HomeComponent;
