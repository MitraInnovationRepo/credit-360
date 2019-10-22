import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Container, Input, Header, Grid, Segment, Button, Divider } from 'semantic-ui-react';
import { VictoryPie, VictoryChart, VictoryContainer, VictoryLabel } from 'victory';
import * as styles from './MainScore.less';

class MainScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { x: 1, y: 500 },
        { x: 2, y: 350 },
      ]
    };
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  render() {

    const { scoreColor = 'url("#gradient2")', textColor = 'white', scoreData: { minScore, maxScore, score }, style } = this.props;
    const data = [
      { x: 1, y: maxScore - score },
      { x: 2, y: score }];

    this.interval = setTimeout(() => {
      this.setState({
        data: data
      });
    }, 1000);

    return (
      <svg width='100%' height='auto' viewBox='0 0 450 450' style={style}>
        <defs>
          <linearGradient id="gradient1"
            x1="0%" y1="0%" x2="0%" y2="100%"
          >
            <stop offset="0%" stopColor="#fdc830" />
            <stop offset="100%" stopColor="#f37335" />
          </linearGradient>
          <linearGradient id="gradient2"
            x1="0%" y1="0%" x2="100%" y2="100%"
          >
            <stop offset="0%" stopColor="#B3FFAB" />
            <stop offset="100%" stopColor="#12FFF7" />
          </linearGradient>
        </defs>
        <VictoryLabel text={`${score}`} x={225} y={225} textAnchor='middle' style={{
          // fontFamily: 'Montserrat',
          fontSize: '100px',
          // fill: 'url("#gradient2")'
          fill: `${textColor}`
        }}></VictoryLabel>
        <VictoryLabel text={`of ${maxScore}`} x={225} y={300} textAnchor='middle' style={{
          // fontFamily: 'Montserrat',
          fontSize: '20px',
          // fill: 'url("#gradient2")'
          fill: `${textColor}`
        }}></VictoryLabel>
        <VictoryLabel text='Poor' x={75} y={375} textAnchor='end' style={{
          // fontFamily: 'Montserrat',
          fontSize: '20px',
          // fill: 'url("#gradient2")'
          fill: `${textColor}`
        }}></VictoryLabel>
        <VictoryLabel text='Excellent' x={375} y={375} textAnchor='start' style={{
          // fontFamily: 'Montserrat',
          fontSize: '20px',
          // fill: 'url("#gradient2")'
          fill: `${textColor}`
        }}></VictoryLabel>
        <g>
          <VictoryPie
            innerRadius={200}
            standalone={false}
            width={450} height={450}
            data={this.state.data}
            startAngle={135}
            endAngle={-135}
            labels={(d) => null}
            animate={{
              duration: 1000,
            }}
            colorScale={[
              "transparent",
              `${scoreColor}`
            ]}
            style={{
              data: {
                stroke: `${scoreColor}`,
                fillOpacity: 0.5,
                strokeWidth: 0.3
              }
            }}
          />
        </g>
      </svg>
    );
  }
}

export default MainScore;
