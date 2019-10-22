import PropTypes from "prop-types";
import React, { Component } from "react";
import * as styles from "./LinksPage.less";
import {
  Dropdown,
  Icon,
  Container,
  Input,
  Header,
  Card,
  Image,
  Button,
  Modal,
  Select,
  List,
  Label
} from "semantic-ui-react";
import dataModel from "./dataModel - Links.json";

const segmentOptions = [
  {
    key: "cb",
    label: "CB",
    text: "credit bureau",
    value: "credit bureau",
    icon: "linkify"
  },
  {
    key: "ex",
    label: "CR",
    text: "Experian",
    value: "Experian",
    icon: "linkify"
  },
  {
    key: "eq",
    label: "CR",
    text: "Equifax",
    value: "Equifax",
    icon: "linkify"
  },
  {
    key: "re",
    label: "FI",
    text: "Bank - Retail",
    value: "Bank - Retail",
    icon: "linkify"
  },
  {
    key: "co",
    label: "FI",
    text: "Bank - Corporate",
    value: "Bank - Corporate",
    icon: "linkify"
  },
  {
    key: "wa",
    label: "FI",
    text: "Bank - Wealth",
    value: "Bank - Wealth",
    icon: "linkify"
  },
  {
    key: "fi",
    label: "FI",
    text: "Fintech",
    value: "Fintech",
    icon: "linkify"
  },
  {
    key: "so",
    label: "OS",
    text: "Social networks",
    value: "Social networks",
    icon: "linkify"
  },
  {
    key: "td",
    label: "OS",
    text: "E-commerce Transaction data",
    value: "E-commerce Transaction data",
    icon: "linkify"
  }
];

class LinksPage extends Component {
  state = {
    links: dataModel["Links"],
    segmentOp: segmentOptions,
    open: false,
    value: { key: "sm", text: "Social Media", value: "social media" },
    disabled: true
  };

  close = () => this.setState({ open: false });

  showHandler = () => {
    this.setState({
      links: this.state.links,
      segmentOp: segmentOptions,
      open: true,
      value: { key: "sm", text: "Social Media", value: "social media" }
    });
  };

  segmentOnclick = value => {
    this.setState({
      value: value,
      disabled: false
    });
    console.log("this value", value);
  };

  okHandler = () => {
    this.setState({
      links: [
        ...this.state.links,
        {
          APIDescription: "Give call usage score",
          APILink: "https://my.tel.com/services/api/v1/usage",
          Icon: "linkify",
          IconColor: "green",
          Name: this.state.value,
          notification: 2,
          status: "active",
          version: "v-1.0.0"
        }
      ],
      segmentOp: segmentOptions,
      open: false,
      value: this.state.value
    });
  };

  render() {
    return (
      <div>
        <Container>
          {/* <Header as="h3" block className={styles.mainHeader}>
            Links
          </Header> */}
          <Card.Group className={styles.cardGroup} itemsPerRow={4}>
            {Object.keys(this.state.links).map((v, i) => (
              <Card className={styles.cards} link>
                <Card.Content className={styles.cardContent} textAlign="center">
                  <Icon
                    size="big"
                    name={this.state.links[i].Icon}
                    circular
                    color={this.state.links[i].IconColor}
                    className={styles.segmentIcon}
                  />
                  <Card.Description
                    className={styles.cardHearderContent}
                    content={this.state.links[i].Name}
                  />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Container>
        <Container textAlign="center" style={{ paddingTop: "1em" }}>
          <Button
            primary
            circular
            centered
            color="teal"
            icon="plus"
            onClick={this.showHandler}
          />
        </Container>

        {/* For add new segments => select new segment Modal */}
        <Modal open={this.state.open} centered onClose={this.close}>
          <Modal.Header>
            <Header.Content style={{ marginBottom: "1em" }}>
              Select New Segment
            </Header.Content>

            <List size="mini">
              <List.Item>
                <List.Content className={styles.ledgendDes}>
                  CR - Credit Repositories
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content className={styles.ledgendDes}>
                  FI - Financial Institutions
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content className={styles.ledgendDes}>
                  OS - Other Sources
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content className={styles.ledgendDes}>
                  AF - Additional Form Data
                </List.Content>
              </List.Item>
            </List>
          </Modal.Header>

          <Modal.Content>
            <Modal.Description className={styles.modalDes}>
              <Card.Group className={styles.cardGroup} itemsPerRow={4}>
                {Object.keys(this.state.segmentOp).map((v, i) => (
                  <Card
                    className={styles.modalCards}
                    link
                    onClick={() =>
                      this.segmentOnclick(this.state.segmentOp[i].text)
                    }
                  >
                    <Card.Content
                      className={styles.cardContent}
                      textAlign="center"
                    >
                      <Icon
                        size="big"
                        name={this.state.segmentOp[i].icon}
                        circular
                        className={styles.newItemIcon}
                      />
                      <Label attached="top right">
                        {this.state.segmentOp[i].label}
                      </Label>
                      <Card.Description
                        className={styles.newItemContent}
                        content={this.state.segmentOp[i].text}
                      />
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              size="mini"
              primary
              onClick={this.okHandler}
              disabled={this.state.disabled}
            >
              OK
            </Button>
          </Modal.Actions>
        </Modal>
        {/* //For add new segments => select new segment Modal */}
      </div>
    );
  }
}

export default LinksPage;
