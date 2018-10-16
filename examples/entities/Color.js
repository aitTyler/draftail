import PropTypes from "prop-types";
import React from "react";

export const COLOR_ICON =
  "M322.018 832l57.6-192h264.764l57.6 192h113.632l-191.996-640h-223.236l-192 640h113.636zM475.618 320h72.764l57.6 192h-187.964l57.6-192z";

const Color = (props) => {
  const { entityKey, contentState, children } = props;
  const { color } = contentState.getEntity(entityKey).getData();
  return <span style={{ color }}>{children}</span>;
};

Color.propTypes = {
  entityKey: PropTypes.string.isRequired,
  contentState: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Color;
