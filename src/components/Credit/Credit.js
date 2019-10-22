import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Container, Input, Header, Grid, Segment, Button, Divider } from 'semantic-ui-react';
import { VictoryPie, VictoryChart, VictoryContainer, VictoryLabel, VictoryBar, VictoryTheme, VictoryStack } from 'victory';
import * as styles from './Credit.less';

class Credit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { data, transposed } = this.props.data;
    return (
      <svg viewBox={`0 0 600 ${data.length * 40 * 1.5}`} width='100%' height={`${data.length * 40 * 1.5}`}>
        <defs>
          <linearGradient id="gradient-linear"
            x1="0%" y1="0%" x2="100%" y2="0%"
          >
            <stop offset="0%" stopColor="#12FFF7" />
            <stop offset="100%" stopColor="#B3FFAB" />
          </linearGradient>
        </defs>
        <VictoryStack
          height={(data.length) * 40 * 1.5}
          width={600}
          standalone={false}
          labels={(datum) => `${datum.title.toUpperCase()} | ${10 - datum.y}/10`}
          labelComponent={<VictoryLabel dy={-14} dx={-507} textAnchor='start' />}
          padding={{ top: 20, bottom: 10, left: 50, right: 50 }}
        >
          <VictoryBar
            data={data}
            horizontal
            barWidth={11}
            style={
              {
                data: {
                  fill: 'url("#gradient-linear")',
                  // stroke: 'tranparent',
                  stroke: 'white',
                  strokeWidth: 0.3,
                  fillOpacity: 0.5
                },
                labels: {
                  fill: '#fff',
                  fontSize: '12px'
                }
              }
            }
            animate={{
              duration: 1000,
            }}
          />

          <VictoryBar
            horizontal
            barWidth={11}
            data={transposed}
            style={
              {
                data: {
                  stroke: 'white',
                  fill: 'transparent',
                  strokeWidth: 0.3,
                  strokeOpacity: 0.9
                },
                labels: {
                  fill: '#fff',
                  fontSize: '12px'
                }
              }
            }
            animate={{
              onLoad: {
                duration: 2000,
                before: (datum) => {
                  return { _y0: 0 }
                }
              }
            }}
          />
        </VictoryStack>
      </svg >
    );
  }
}

export default Credit;
