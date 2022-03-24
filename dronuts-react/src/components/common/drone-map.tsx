// https://blog.logrocket.com/integrating-google-maps-react/
import React from 'react';
import GoogleMapReact from 'google-map-react';
import './drone-map.css';
import locationIcon from '../../assets/drone.svg';

function LocationPin({text}: any) {
  return (
    <div className='pin'>
      <img src={locationIcon} className='pin-icon' />
      <h1>{text}</h1>
    </div>
  );
}

function DroneMap({location, zoomLevel}: any) {
  return (
    <div className='map'>
      <div className='google-map'>
        <GoogleMapReact
          bootstrapURLKeys={{key: ''}}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin lat={location.lat} lng={location.lng} />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default DroneMap;
