import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Container, Input, Header, Grid, Segment, Button, Divider, Menu, Statistic } from 'semantic-ui-react';
import * as styles from './Stats.less';

class Stats extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getStatistics(size, data) {
    return data.map((data, index) => {
      return (
        <Statistic key={index} floated={index % 2 ? 'right' : 'left'} size={size}>
          <Statistic.Value>{data.topLevelScores[1].y.toFixed(1)}</Statistic.Value>
          <Statistic.Label>{data.title.toUpperCase()}</Statistic.Label>
        </Statistic>
      );
    });
  }

  render() {

    const { size, widths = 'two', stats = [] } = this.props;

    return (
      <Statistic.Group widths={widths} size={size}>
        {this.getStatistics(size, stats)}
      </Statistic.Group>
    );
  }
}

export default Stats;
