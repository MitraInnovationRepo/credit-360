import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Icon,
  Container,
  Input,
  Header,
  Grid,
  Segment,
  Button,
  Divider,
  Menu
} from "semantic-ui-react";
import {
  VictoryPie,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryBar,
  VictoryTheme,
  VictoryStack
} from "victory";
import { DonutChart } from "../DonutChart";
import { HistoryChart } from "../HistoryChart";
import * as styles from "./History.less";

const dateRanges = [
  { title: "Last 3 months", id: "3months" },
  { title: "Last 6 months", id: "6months" },
  { title: "Last 12 months", id: "12months" },
  { title: "Last 24 months", id: "24months" }
];

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: dateRanges[0].id
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  getMenu() {
    const { activeItem } = this.state;
    return dateRanges.map(data => {
      return (
        <Menu.Item
          key={data.id}
          name={data.id}
          active={activeItem === data.id}
          onClick={this.handleItemClick}
        >
          {data.title}
        </Menu.Item>
      );
    });
  }

  getDonutCharts() {
    const { activeItem } = this.state;
    return this.props.categoricalData[activeItem].map((data, index) => {
      return (
        <Grid.Column key={index} largeScreen={4} tablet={4} mobile={4}>
          <DonutChart
            data={data.topLevelScores}
            title={data.title.toUpperCase()}
            /*primaryColor='#2193b0'*/ primaryColor="transparent"
            textColor="#ffffff"
            labelPosition="bottom"
          />
        </Grid.Column>
      );
    });
  }

  switchMenuContent() {
    switch (this.state.activeItem) {
      case "CREDIT MATURITY":
        return <Credit />;
        break;
      case "SIGNUPS":
        return <PolarChart data={signupData} />;
        break;
      case "LOCATION CONSISTENCY":
        return <Location />;
        break;
      default:
        return <div>Coming Up</div>;
        break;
    }
  }

  render() {
    const { data } = this.props;

    if (!data || !Object.keys(data).length) {
      return (
        <Container fluid>
          <Header
            textAlign="center"
            style={{
              fontFamily:
                '"Gill Sans", "Gill Sans MT", Ser­avek, "Trebuchet MS", sans-serif',
              color: "#fff",
              paddingTop: "50px"
            }}
          >
            No historical data available
          </Header>
        </Container>
      );
    }

    return (
      <Container fluid>
        <Grid style={{ paddingTop: "0px", paddingBottom: "0px" }}>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <Menu
                style={{ background: "transparent" }}
                inverted
                widths={dateRanges.length}
                size="large"
              >
                {this.getMenu()}
              </Menu>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column largeScreen={16} tablet={16} mobile={16}>
              <HistoryChart
                key={`history-chart-${this.state.activeItem}`}
                data={data[this.state.activeItem]}
                style={{ maxHeight: "750px" }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={16} tablet={16}>
              <Grid>
                <Grid.Row
                  centered
                  style={{ position: "fixed", bottom: "150px", left: "0px" }}
                >
                  {this.getDonutCharts()}
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default History;
