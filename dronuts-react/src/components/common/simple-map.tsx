import React, { Component } from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';


class SimpleMap extends Component {
  render() {
      return(
          <Map
          google={this.props.google}
          style = {{width: "100%", height: "100%"}}
          zoom = {10}
          initialCenter = {{
            lat: 59.95,
            lng: 30.33
          }
          }
          />

       
      );
  }  
}

export default GoogleApiWrapper({
    apiKey: "key"
})(SimpleMap);

