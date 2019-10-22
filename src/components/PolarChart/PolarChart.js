import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Container, Input, Header, Grid, Segment, Button, Divider } from 'semantic-ui-react';
import { VictoryPie, VictoryChart, VictoryContainer, VictoryLabel, VictoryPolarAxis, VictoryBar, VictoryTheme, VictoryStack } from 'victory';
import * as styles from './PolarChart.less';

class PolarChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sampleData: []
    };
  }

  render() {

    const { data, transposed } = this.props.data;

    return (
      <Container fluid>
        <Grid style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <svg width='100%' height='50vh'>
                <svg viewBox='0 0 1000 700'>
                  <defs>
                    <linearGradient id="gradient1"
                      x1="0%" y1="0%" x2="0%" y2="100%"
                    >
                      <stop offset="0%" stopColor="#fdc830" />
                      <stop offset="100%" stopColor="#f37335" />
                    </linearGradient>
                    <linearGradient id="gradient2"
                      x1="0%" y1="0%" x2="100%" y2="0%"
                    >
                      <stop offset="0%" stopColor="#5B86E5" />
                      <stop offset="100%" stopColor="#36D1DC" />
                    </linearGradient>
                  </defs>
                  <g>
                    <VictoryStack
                      width={1000}
                      height={650}
                      standalone={false}
                      labels={(datum) => [[datum.title] + '\n' + datum._y0.toFixed(1)]}
                      domainPadding={{ x: 20, y: 20 }}
                      labelComponent={<VictoryLabel dy={610} />}
                      animate={{
                        duration: 300
                      }}
                    >
                      <VictoryBar
                        data={data}
                        barWidth={50}
                        style={
                          {
                            data: {
                              // fill: (d) => d.y > 3.5 ? '#56ab2f' : '#FDC830',
                              fill: (d) => d.y > 3.5 ? '#2193b0' : '#2193b0',
                              stroke: (d) => d.y > 3.5 ? '#2193b0' : '#2193b0',
                              // stroke: (d) => d.y > 3.5 ? '#56ab2f' : '#FDC830',
                              strokeWidth: '1px'
                            },
                            labels: {
                              fill: '#708090',
                              fontSize: '25px'
                            }
                          }
                        }
                      />
                      <VictoryBar
                        barWidth={50}
                        data={transposed}
                        style={
                          {
                            data: {
                              stroke: '#fff',
                              fill: 'transparent',
                              strokeWidth: '1px',
                              strokeOpacity: '0.9'
                            },
                            labels: {
                              fill: '#708090',
                              fontSize: '25px'
                            }
                          }
                        }
                      />
                    </VictoryStack>
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

export default PolarChart;
