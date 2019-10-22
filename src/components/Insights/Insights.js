import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import { RadarChart } from '../RadarChart';
import * as styles from './Insights.less';


class Insights extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {

    const { data } = this.props;


    if (!data || !data.length) {
      return (
        <Container fluid>
          <Header textAlign='center' style={{ fontFamily: 'Montserrat', color: '#fff', paddingTop: '50px' }}>No insights available</Header>
        </Container>
      );
    }

    const radarChartData = data.map((category, index) => {
      return {
        title: category.title,
        x: index,
        y: category.score
      };
    });

    return (
      <Container fluid>
        <Grid style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <RadarChart data={radarChartData}
                style={{ maxHeight: "350px" }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    );
  }
}

export default Insights;
