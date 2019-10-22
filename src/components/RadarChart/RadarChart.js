import React, { Component } from 'react';
import { Container, Grid, Checkbox } from 'semantic-ui-react';
import { VictoryLine, VictoryAxis, VictoryTheme, VictoryClipContainer, VictoryLabel, VictoryTooltip, VictoryChart, VictoryPolarAxis, VictoryArea, VictoryBar } from 'victory';
import _ from 'lodash';
import * as styles from './RadarChart.less';

class RadarChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  toggle = () => this.setState(({ checked }) => ({ checked: !checked }))

  getTransposedData(data) {
    return _.sortBy(data, 'x').map(item => {
      console.log(item);
      return {
        title: item.title,
        x: item.x,
        y: 7.5
      };
    })
  }

  render() {
    const { data, style } = this.props;
    const { checked } = this.state;
    return (
      <Container fluid>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={16} textAlign='center'>
              <Checkbox toggle label='toggle reference' onChange={this.toggle} checked={checked} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div style={style}>
          <VictoryChart polar
            animate={{
              duration: 1000
            }}
          >
            <VictoryPolarAxis
              tickFormat={(t, index) => `${data[index].title.toUpperCase()}`}
              style={{
                axis: { stroke: "#fff", strokeOpacity: 0.3 },
                grid: { stroke: "#fff", strokeOpacity: 0.3 },
                tickLabels: { fontSize: 8, padding: 10, fill: 'white' }
              }}
              labelPlacement="vertical"
              standalone={false}
            />
            <VictoryPolarAxis dependentAxis
              style={{
                axis: { stroke: "none" },
                grid: { stroke: "#fff", strokeWidth: 0.3, strokeOpacity: 0.2, fill: 'transparent' },
                tickLabels: { fontSize: 8, padding: 10 }
              }}
              tickFormat={(t) => null}
              domain={[1, 10]}
              standalone={false}
            />
            <VictoryArea
              data={_.sortBy(data, 'x')}
              style={{
                data: { fill: "#B3FFAB", fillOpacity: 0.5, stroke: 'none' },
                labels: { fill: "#fff", fillOpacity: 0.7, stroke: 'none', fontSize: '8px' },
              }}
              labels={(datum) => datum.y}
              labelComponent={<VictoryLabel angle={0} />}
              minDomain={{ y: 1 }}
              maxDomain={{ y: 10 }}
              standalone={false}
            />
            {
              checked && <VictoryArea
                data={this.getTransposedData(data)}
                style={{
                  data: { fill: "transparent", fillOpacity: 0, stroke: 'white', strokeOpacity: 0.5, strokeDasharray: 5 }
                }}
                labels={(datum) => null}
                minDomain={{ y: 1 }}
                maxDomain={{ y: 10 }}
                standalone={false}
              />
            }
          </VictoryChart>
        </div>
      </Container>
    );
  }
}

export default RadarChart;