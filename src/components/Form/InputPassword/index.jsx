import React, { useState } from "react"
import { InputField } from "../Input"
import PropTypes from "prop-types"

export const InputPassword = React.forwardRef(({
  errorMessage = "",
  ...props
}, ref) => {
  const [showText, setShowText] = useState(false)
  return (
    <div className="input-field-wrapper">
      <InputField
        type={showText ? "text" : "password"}
        innerRef={ref}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShowText((old) => !old)}
      >
        <i className={`fas fa-eye${showText ? "" : "-slash"} font-size-16 align-middle me-1`} />
      </button>
      <span className="text-danger invalid-feedback">{errorMessage}</span>
    </div>
  )
})

InputPassword.propTypes = {
  type: PropTypes.string,
  errorMessage: PropTypes.string,
}