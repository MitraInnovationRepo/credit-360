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
  Menu,
  Transition
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
import { Credit } from "../Credit";
import { GeoMap } from "../GeoMap";
import { Help } from "../Help";
import * as styles from "./Details.less";
import _ from "lodash";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.statsData[0].title,
      helpVisible: false
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  getMenu() {
    const { activeItem } = this.state;
    return this.props.statsData.map(data => {
      return (
        <Menu.Item
          key={data.title}
          name={data.title}
          active={activeItem === data.title}
          onClick={this.handleItemClick}
        >
          <DonutChart
            data={data.topLevelScores}
            title={data.title.toUpperCase()}
            primaryColor="transparent"
            labelPosition="top"
          />
        </Menu.Item>
      );
    });
  }

  switchMenuContent() {
    const data = this.props.categoricalData
      .filter(category => category.title === this.state.activeItem)[0]
      .subCategories.map((subCategory, index) => {
        return {
          x: index + 1,
          y: subCategory.score,
          title: subCategory.title
        };
      })
      .slice(0, 5);
    const transposed = data.map(subcategory => {
      return { ...subcategory, y: 10 - subcategory.y };
    });
    const subCategoricalData = {
      data: data,
      transposed: transposed
    };
    switch (this.state.activeItem) {
      case "Location":
        const locationData = this.props.locationData;
        return (
          <Grid style={{ paddingTop: "0px", paddingBottom: "0px" }}>
            <Grid.Row centered>
              <Grid.Column mobile={16} widescreen={8} largeScreen={8}>
                <Credit data={subCategoricalData} />
              </Grid.Column>
              <Grid.Column
                mobile={16}
                widescreen={8}
                largeScreen={8}
                style={{}}
              >
                <div style={{ minHeight: 300 }}>
                  <GeoMap country={this.props.country} data={locationData} />
                </div>
                <Help
                  id="details"
                  subId="geomap"
                  style={{
                    margin: "0 auto",
                    display: "flex",
                    padding: 15,
                    marginTop: "-100px"
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        );
        break;
      default:
        return <Credit key={this.state.activeItem} data={subCategoricalData} />;
        break;
    }
  }

  render() {
    return (
      <Container fluid>
        <Grid style={{ paddingTop: "0px", paddingBottom: "0px" }}>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <Menu
                fluid
                widths={this.props.statsData.length}
                secondary
                pointing
                className={styles.navimenu}
              >
                {this.getMenu()}
              </Menu>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={16}>{this.switchMenuContent()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Details;
