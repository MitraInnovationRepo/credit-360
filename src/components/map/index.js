import React, { Component } from "react";
import { Container, Header } from 'semantic-ui-react';
import { VictoryLabel } from 'victory';
import { get } from "axios"
import { feature } from "topojson-client"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps"
import { geoCentroid } from "d3-geo";
import _ from 'lodash';

const countryWideProperties = {
  "AUS": {
    zoom: 1000,
  },
  "GBR": {
    zoom: 1500,
    marginTop: '-35px'
  },
  "MYS": {
    zoom: 1000
  }
};

class SimpleMarkers extends Component {

  constructor() {
    super()
    this.state = {
      regionPaths: [],
      cityPaths: [],
      center: [0, 0],
    }
    this.loadPaths = this.loadPaths.bind(this)
  }
  componentDidMount() {
    this.loadPaths()
  }
  loadPaths() {
    get(`/countries/${this.props.country || 'GBR'}.json`)
      .then(res => {
        if (res.status !== 200) return
        const country = res.data
        // Transform your paths with topojson however you want...
        const regions = feature(country, country.objects.regions).features;
        const cities = feature(country, country.objects.cities).features;
        const center = geoCentroid(feature(country, country.objects.regions));
        this.setState({ regionPaths: regions, cityPaths: cities, center: center })
      })
  }
  render() {

    const { country = 'GBR', data = [] } = this.props;
    const zonesByCity = _.keyBy(data, 'title');

    return (
      <ComposableMap
        projection='mercator'
        projectionConfig={{
          scale: countryWideProperties[country].zoom
        }}
        width={800}
        height={800}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: '50vh',
          marginTop: countryWideProperties[country].marginTop || '-60px'
        }}
      >
        <ZoomableGroup center={this.state.center}>
          <Geographies geography={this.state.regionPaths} disableOptimization>
            {(geographies, projection) =>
              geographies.map((geography, i) =>
                <Geography
                  key={`${geography.properties.cities}-${i}`}
                  cacheId={`path-${geography.properties.cities}-${i}`}
                  round
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      fillOpacity: 0.3,
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#ECEFF1",
                      fillOpacity: 0.3,
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              )}
          </Geographies>
          {/* <Geographies geography={this.state.cityPaths} disableOptimization>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  <Geography
                    key={`${geography.properties.NAME_1}-${i}`}
                    cacheId={`path-${geography.properties.NAME_1}-${i}`}
                    round
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: "red",
                        stroke: "none",
                        strokeWidth: 0.75,
                        outline: "none",
                      }
                    }}
                  />
                )}
            </Geographies> */}
          <Markers>
            {this.state.cityPaths.filter((city) => {
              const cities = data.map((zone) => zone.title);
              console.log(city);
              return ~cities.indexOf(city.properties.cities);
            }).map((marker, i) => {
              const radius = Math.floor(zonesByCity[marker.properties.cities].numberOfDays * (40 / 365));
              return (
                <Marker
                  key={i}
                  marker={{ coordinates: marker.geometry.coordinates }}
                  style={{
                    // default: { fill: "#FF5722" },
                    // hover: { fill: "#FFFFFF" },
                    // pressed: { fill: "#FF5722" },
                  }}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={radius}
                    style={{
                      stroke: "none",
                      strokeWidth: 0,
                      fill: "#f5af19",
                      fillOpacity: 0.9
                    }}
                  />
                  <rect width="60" height="30" rx="5" ry="5" x={-30} y={(-1 * radius) - 30} style={{ fill: `#38ef7d`, fillOpacity: '0.3', stroke: 'gray', strokeWidth: 0.5 }} />
                  <VictoryLabel text={`${zonesByCity[marker.properties.cities].numberOfDays}  Days`} x={0} y={(-1 * radius) - 15} textAnchor='middle' style={{
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    // fill: 'url("#gradient2")'
                    fill: 'white'
                  }}></VictoryLabel>
                </Marker>
              )
            })}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    )
  }
}

export default SimpleMarkers
