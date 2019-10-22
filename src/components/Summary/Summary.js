import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Container, Input, Header, Grid, Segment, Button, Divider, Menu, Modal, Message, Transition } from 'semantic-ui-react';
import * as styles from './Summary.less';
import { MainScore } from '../MainScore';
import { Help } from '../Help';
import { Stats } from '../Stats';
import { DonutChart } from '../DonutChart';
import _ from 'lodash';

class Summary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleNavigation(state) {

  }

  componentDidMount() {
    this.setState({ visible: true });
  }

  getDonutCharts() {
    return this.props.statsData.map((data, index) => {
      return (
        <Grid.Column key={index} largeScreen={8} tablet={8} mobile={8} >
          <DonutChart data={data.topLevelScores} title={data.title.toUpperCase()} primaryColor='#2193b0' primaryColor='#2193b0' textColor='#ffffff' labelPosition='top' />
        </Grid.Column>
      );
    });
  }

  render() {

    const { mobile } = this.props;
    let props = {};
    if (mobile) {
      props = { textColor: 'url("#gradient2")', scoreColor: 'url("#gradient1")' };
    }

    return (
      <Container fluid>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={12}>
              <MainScore {...props} scoreData={this.props.scoreData} style={{ maxHeight: '500px' }} />
              <Help id='summary' subId='main' style={{ margin: '0 auto', display: 'flex', padding: 15, marginTop: '-100px' }} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={12}>
              <Stats stats={this.props.statsData} widths={mobile ? 'two' : 'two'} size={mobile ? 'tiny' : 'large'} onItemsClick={this.handleNavigation} />
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row centered>
            <Grid.Column width={10}>
              <Grid>
                <Grid.Row centered>
                  {this.getDonutCharts()}
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row> */}
          <Grid.Row centered>
            <Grid.Column width={12}>
              <Transition visible={this.state.visible} duration={{ show: 5000, hide: 5000 }} unmountOnHide={true} onComplete={() => { this.setState({ visible: false }) }}>
                <Message icon style={{ background: 'transparent', color: '#fff' }} compact>
                  <Message.Content>
                    <Message.Header>Tip</Message.Header>
                    You can use the navigation menu at the bottom of the screen to navigate between different views.
                </Message.Content>
                </Message>
              </Transition>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Summary;
