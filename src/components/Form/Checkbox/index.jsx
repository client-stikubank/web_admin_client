import React from "react"
import PropTypes from "prop-types"

export const CheckboxField = React.forwardRef((props, ref) => (
  <div className={`form-check form-check-${props.direction || "right"}`}>
    <input
      className="form-check-input"
      type="checkbox"
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

CheckboxField.propTypes = {
  id: PropTypes.any,
  label: PropTypes.string,
  direction: PropTypes.string
}
