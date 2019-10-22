import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { VictoryLine, VictoryAxis, VictoryTheme, VictoryClipContainer, VictoryLabel, VictoryTooltip } from 'victory';
import _ from 'lodash';
import * as styles from './HistoryChart.less';

class CustomLabel extends Component {
  render() {
    const min = _.minBy(this.props.data, 'y').y;
    const max = _.maxBy(this.props.data, 'y').y;
    const current = this.props.data[this.props.index].y;
    if (current === min || current === max) {
      const fillColor = current === max ? '#45B649' : '#f12711';
      return (
        <g>
          <defs>
            <linearGradient id="gradient2"
              x1="0%" y1="0%" x2="100%" y2="100%"
            >
              <stop offset="0%" stopColor="#B3FFAB" />
              <stop offset="100%" stopColor="#12FFF7" />
            </linearGradient>
          </defs>
          {/* <rect width="20" height="15" rx="2" ry="2" x={this.props.x - 10} y={this.props.y - 10} style={{ fill: `${fillColor}`, fillOpacity: '0.5' }} /> */}
          <circle r={6} cx={this.props.x} cy={this.props.y + 12} style={{ fill: 'url(#gradient2)', stroke: 'transparent', strokeWidth: 2 }} />
          <VictoryLabel text={[current.toFixed(0)]} x={this.props.x} y={this.props.y - (current == max ? 3 : -25)} textAnchor='middle' style={{
            fontSize: 8,
            fill: 'white'
          }}></VictoryLabel>
        </g>
      );
    } else {
      return <g>
      </g>;
    }

  }
}

class HistoryChart extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, style } = this.props;
    const min = _.minBy(data, 'y').y;
    const max = _.maxBy(data, 'y').y;
    return (
      <svg viewBox="0 0 500 500" width='100%' height="auto" style={style}>
        <VictoryLine
          standalone={false}
          height={500}
          width={500}
          maxDomain={{ y: _.maxBy(data, 'y').y + 10 }}
          minDomain={{ y: _.minBy(data, 'y').y - 30 }}
          data={data}
          animate={{
            duration: 300
          }}
          style={{
            data: {
              stroke: '#ffffff',
              strokeWidth: 0.7,
              strokeOpacity: 0.5
            },
            labels: {
              fill: '#ffffff',
              fontSize: '10px'
            }
          }}
          interpolation='monotoneX'
          labels={(datum) => {
            const value = Math.round(datum.y).toFixed(0);
            if (value == min || value == max) {
              return value;
            }
            return null;
          }}
          groupComponent={<VictoryClipContainer clipPadding={{ right: 30, left: 30, top: 30 }} />}
          labelComponent={<CustomLabel />}
          padding={{ top: 20, bottom: 0, right: 20, left: 20 }}
        />
      </svg>
    );
  }
}

export default HistoryChart;
