import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Container, Input, Header, Grid, Segment, Button, Divider } from 'semantic-ui-react';
import { VictoryPie, VictoryChart, VictoryContainer, VictoryLabel, VictoryPolarAxis, VictoryBar, VictoryTheme, VictoryStack, VictoryScatter, VictoryAxis } from 'victory';
import * as styles from './Location.less';

class Location extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sampleData: []
    };
  }

  render() {

    const labels = {
      a: 'CREDIT MATURITY A fsdf',
      b: 'CREDIT MATURITY B',
      c: 'CREDIT MATURITY Csfsf',
      d: 'CREDIT MATURITY Dfsf sdfsd',
      e: 'CREDIT MATURITY E',
    };


    const sampleData = [
      { x: 3, y: 10, zone: 'Zone 01' },
      { x: 2, y: 5, zone: 'Zone 02' },
      { x: 1, y: 5, zone: 'Zone 03' },
      { x: 15, y: 15, zone: 'Zone 04' },
    ];

    return (
      <Container fluid>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <svg width='100%' height='35vh' style={{ marginTop: '-18px' }}>
                <defs>
                  <linearGradient id="gradient1"
                    x1="0%" y1="0%" x2="100%" y2="0%"
                  >
                    <stop offset="100%" stopColor="#FDC830" />
                    <stop offset="0%" stopColor="#F37335" />
                  </linearGradient>
                  <linearGradient id="gradient2"
                    x1="0%" y1="0%" x2="100%" y2="0%"
                  >
                    <stop offset="100%" stopColor="#373B44" />
                    <stop offset="0%" stopColor="#4286f4" />
                  </linearGradient>
                </defs>
                <svg viewBox='0 0 700 300'>
                  <g>
                    <VictoryAxis crossAxis
                      width={700}
                      height={300}
                      domain={[0, 15]}
                      theme={VictoryTheme.material}
                      standalone={false}
                      label="Days Spent"
                      orientation='bottom'
                      style={{
                        // axis: { stroke: 'url(#gradient2)' },
                        axis: { stroke: '#D3D3D3' },
                        axisLabel: { fontSize: 15, padding: 20, fill: 'url(#gradient2)' },
                        grid: { stroke: 'none' },
                        ticks: { stroke: "none" },
                        tickLabels: { fill: 'none' }
                      }}
                    />
                    <VictoryAxis dependentAxis crossAxis
                      width={700}
                      height={300}
                      domain={[0, 15]}
                      theme={VictoryTheme.material}
                      standalone={false}
                      label="Credit Spent"
                      style={{
                        // axis: { stroke: 'url(#gradient2)' },
                        axis: { stroke: '#D3D3D3' },
                        axisLabel: { fontSize: 15, padding: 20, fill: 'url(#gradient2)' },
                        grid: { stroke: 'none' },
                        ticks: { stroke: "none" },
                        tickLabels: { fill: 'none' }
                      }}
                    />
                    <VictoryScatter
                      standalone={false}
                      data={sampleData}
                      width={700}
                      height={300}
                      labels={(datum) => datum.zone}
                      size={(datum) => Math.sqrt(datum.x * datum.y)}
                      style={
                        {
                          data: {
                            fill: 'url("#gradient1")'
                          }
                        }
                      }
                    />
                  </g>
                </svg>
              </svg>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    );
  }
}

export default Location;