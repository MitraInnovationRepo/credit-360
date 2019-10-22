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
import _ from "lodash";
import * as styles from "./Footer.less";

const menuItems = [
  { icon: "chart pie", title: "Details", order: 1 },
  { icon: "chart line", title: "History", order: 2 },
  { icon: "user", title: "Summary", order: 3 },
  { icon: "idea", title: "Insights", order: 4 },
  { icon: "settings", title: "Settings", order: 5 }
];

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "summary"
    };
  }

  getMenu() {
    const { activeItem } = this.state;
    return _.sortBy(menuItems, "order").map((item, index) => {
      return (
        <Menu.Item
          className={
            activeItem === item.title.toLowerCase()
              ? styles.active
              : styles.footerItem
          }
          name={item.title.toLowerCase()}
          active={this.state.activeItem === `${item.title.toLowerCase()}`}
          onClick={this.handleItemClick}
          key={index}
        >
          <Icon name={item.icon} />
          {item.title}
        </Menu.Item>
      );
    });
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.handleStateChange(name);
  };

  render() {
    return (
      <Menu
        icon="labeled"
        fluid
        widths={7}
        className={styles.footer}
        size="large"
        borderless
      >
        {this.getMenu()}
      </Menu>
    );
  }
}

export default Footer;
