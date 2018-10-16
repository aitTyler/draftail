import React, { Component } from "react";
import PropTypes from "prop-types";

import { RichUtils } from "draft-js";
import { ChromePicker } from "react-color";

import Modal from "../components/Modal";

class ColorSource extends Component {
  constructor(props) {
    super(props);

    const { entity } = this.props;
    const state = {
      color: "#fff",
    };

    if (entity) {
      const data = entity.getData();
      state.color = data.color;
    }

    this.state = state;

    this.onRequestClose = this.onRequestClose.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm() {
    const { color } = this.state;
    const { editorState, entityType, onComplete } = this.props;

    const contentState = editorState.getCurrentContent();
    const data = { color };
    const contentStateWithEntity = contentState.createEntity(
      entityType.type,
      "MUTABLE",
      data,
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const nextState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey,
    );
    onComplete(nextState);
  }

  onRequestClose(e) {
    const { onClose } = this.props;
    e.preventDefault();

    onClose();
  }

  onChangeColor(color) {
    this.setState({ color: color.hex });
  }

  render() {
    const { color } = this.state;
    return (
      <Modal
        onRequestClose={this.onRequestClose}
        isOpen
        contentLabel="Pick a color"
      >
        <div className="ColorSource">
          <ChromePicker onChangeComplete={this.onChangeColor} color={color} />
          <button type="button" onClick={this.onConfirm}>
            Save
          </button>
        </div>
      </Modal>
    );
  }
}

ColorSource.propTypes = {
  editorState: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  entityType: PropTypes.object.isRequired,
  entity: PropTypes.object,
};

ColorSource.defaultProps = {
  entity: null,
};

export default ColorSource;
