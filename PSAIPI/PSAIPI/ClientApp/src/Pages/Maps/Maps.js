import GoogleMapReact from 'google-map-react';
import './Maps.css'

const Map = ({center, zoom}) => {
    return (
      <div className='map'>
        <GoogleMapReact
                    bootstrapURLKeys = {{key: 'AIzaSyBPKqQGFDjSSJiaV812sBZejD7lCId16Ps'}}
                    defaultCenter = {center}
                    defaultZoom = {zoom}
        >
        </GoogleMapReact>
      </div>
    )
}

Map.defaultProps = {
    center:{
      lat: 55.169437,
      lng: 23.881275
    },
    zoom: 7
}

export default Map;