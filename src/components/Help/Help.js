import React, { Component } from "react";
import { Button, Modal, Transition } from "semantic-ui-react";
import helpData from "../../help.json";
import * as styles from "./Help.less";

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDescription(description) {
    return description.map(line => {
      return <p dangerouslySetInnerHTML={{ __html: line }} />;
    });
  }

  render() {
    const { id, subId, style } = this.props;

    return (
      <Modal
        trigger={
          <Button
            className={styles.infoBtn}
            circular
            style={style}
            icon="info"
          />
        }
        closeIcon
      >
        <Modal.Header>{helpData[id][subId].title}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {this.getDescription(helpData[id][subId].description)}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Help;
