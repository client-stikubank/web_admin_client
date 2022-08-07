import React from "react"
import PropTypes from "prop-types"

export const RadioField = React.forwardRef((props, ref) => (
  <div className="form-check form-check-left">
    <input
      className="form-check-input"
      type="radio"
      ref={ref}
      {...props}
    />
    <label
      className="form-check-label"
      htmlFor={props.id}
    >
      {props.label}
    </label>
  </div>
))

RadioField.propTypes = {
  id: PropTypes.any,
  label: PropTypes.string,
}
