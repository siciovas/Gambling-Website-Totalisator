import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import './Maps.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const Maps = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})

  const [latitude, setLatitude] = useState(54.9047)
  const [longitude, setLongitude] = useState(23.9568)

  const KaunasLat = 54.898521
  const KaunasLong = 23.903597

  const VilniusLat = 54.687157
  const VilniusLong = 25.279652

  const KlaipedaLat = 55.703297
  const KlaipedaLong = 21.144279

  const SiauliaiLat = 55.9349
  const SiauliaiLong = 23.3137

  const AlytusLat = 54.3963
  const AlytusLong = 24.0459

  const PanevezysLat = 55.7348
  const PanevezysLong = 24.3575

  const UtenaLat = 55.5000
  const UtenaLong = 25.6094

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      }
    }
  }

  const drawRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJson
      },
      paint: {
        'line-color': '#4a90e2',
        'line-width': 6
      }
    })
  }

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement('div')
    element.className = 'marker-delivery'
    new tt.Marker({
      element: element
    })
    .setLngLat(lngLat)
    .addTo(map)
  }

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude,
    }
    const destinations = []

    let map = tt.map({
      key: process.env.REACT_APP_API_KEY,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true
      },
      center: [longitude, latitude],
      zoom: 6.5
    })

    setMap(map)

    const addMarker = () => {
      const element = document.createElement('div')
      element.className = 'marker'

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map)
      
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setLongitude(lngLat.lng)
        setLatitude(lngLat.lat)
      })      
    }

    const addDeliveryCityMarker = (ltg, lat) => {
      const element = document.createElement('div')
      element.className = 'marker-city'
      new tt.Marker({
        element: element
      })
      .setLngLat([ltg, lat])
      .addTo(map)
    }

    addDeliveryCityMarker(KaunasLong, KaunasLat)
    addDeliveryCityMarker(VilniusLong, VilniusLat)
    addDeliveryCityMarker(KlaipedaLong, KlaipedaLat)
    addDeliveryCityMarker(SiauliaiLong, SiauliaiLat)
    addDeliveryCityMarker(PanevezysLong, PanevezysLat)
    addDeliveryCityMarker(AlytusLong, AlytusLat)
    addDeliveryCityMarker(UtenaLong, UtenaLat)

    addMarker()

    const sortedDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination)
      })
      const callParameters = {
        key: process.env.REACT_APP_API_KEY,
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      }

      return new Promise((resolve, reject) => {
        ttapi.services
        .matrixRouting(callParameters)
        .then((matrixAPIResults) => {
          const results = matrixAPIResults.matrix[0]
          const resultsArray = results.map((result, index) => {
            return {
              location: locations[index],
              drivingtime: result.response.routeSummary.travelTimeInSeconds,
            }
          })
          resultsArray.sort((a, b) => {
            return a.drivingtime - b.drivingtime
          })
          const sortedLocations = resultsArray.map((result) => {
            return result.location
          })
          resolve(sortedLocations)
        })
      })
    }

    const recalculateRoutes = () => {
      sortedDestinations(destinations).then((sorted) => {
        sorted.unshift(origin)

        ttapi.services
          .calculateRoute({
            key: process.env.REACT_APP_API_KEY,
            locations: sorted,
          })
        .then((routeData) => {
          const geoJSON = routeData.toGeoJson()
          drawRoute(geoJSON, map)
        })
      })
    }

    map.on('click', (e) => {
      destinations.push(e.lngLat)
      addDeliveryMarker(e.lngLat, map)
      recalculateRoutes()
    })

    return () => map.remove()
  }, [longitude, latitude])

  return (
    <>
      {map && (
        <div className="Maps">
          <div ref={mapElement} className="map" />
          <div className="search-bar" >
            <h1>Where to?</h1>
            <input
              type="text"
              id="longitude"
              className="longitude"
              placeholder="Put in Longitude"
              onChange={(e) => { setLongitude(e.target.value) }}
            />
            <input
              type="text"
              id="latitude"
              className="latitude"
              placeholder="Put in Latitude"
              onChange={(e) => { 
                setLatitude(e.target.value) 
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Maps