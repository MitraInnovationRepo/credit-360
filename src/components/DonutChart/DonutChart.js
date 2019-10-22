import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Container, Input, Header, Grid, Segment, Button, Divider } from 'semantic-ui-react';
import { VictoryPie, VictoryChart, VictoryContainer, VictoryLabel, VictoryClipContainer } from 'victory';
import * as styles from './DonutChart.less';

class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleData: [
        { x: 1, y: 4 },
        { x: 2, y: 1 },
      ]
    };
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  render() {

    const { data = [], title = '', primaryColor = 'white', textColor = 'white', labelPosition = 'top', textColorScore = 'white' } = this.props;

    this.interval = setTimeout(() => {
      this.setState({
        sampleData: data
      });
    }, 1000);

    return (
      <svg width="100%">
        <svg viewBox='0 0 200 200' width="100%" height="auto">
          <defs>
            <linearGradient id="gradient1"
              x1="0%" y1="0%" x2="100%" y2="100%"
            >
              <stop offset="0%" stopColor="#667db6" />
              <stop offset="25%" stopColor="#0082c8" />
              <stop offset="50%" stopColor="#0082c8" />
              <stop offset="100%" stopColor="#667db6" />
            </linearGradient>
            <linearGradient id="gradient2"
              x1="0%" y1="0%" x2="100%" y2="100%"
            >
              <stop offset="0%" stopColor="#B3FFAB" />
              <stop offset="100%" stopColor="#12FFF7" />
            </linearGradient>
          </defs>
          {/* <circle cx={100} cy={100} style={{ fill: 'url("#gradient1")' }} r={55}></circle> */}
          <circle cx={100} cy={100} style={{ fill: `${primaryColor}` }} r={55}></circle>
          <VictoryLabel text={this.state.sampleData[1].y.toFixed(1)} x={100} y={100} textAnchor='middle' style={{
            fontSize: '22px',
            fill: `${textColorScore}`
          }} />
          <VictoryLabel text={title} x={100} y={labelPosition === 'bottom' ? 180 : 10} textAnchor='middle' style={{
            fontSize: '20px',
            fill: `${textColor}`
          }} />
          <VictoryPie
            innerRadius={40}
            standalone={false}
            width={200} height={200}
            data={this.state.sampleData}
            labels={(d) => null}
            animate={{
              onLoad: { duration: 1000 }
            }}
            cornerRadius={20}
            colorScale={[
              "transparent",
              `url("#gradient2")`
            ]}
            style={{
              data: {
                stroke: 'transparent'
              }
            }}
          />
        </svg>
      </svg>
    );
  }
}

export default DonutChart;
