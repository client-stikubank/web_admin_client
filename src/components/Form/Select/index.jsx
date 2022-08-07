import React from "react"
import Select from "react-select"

export const SelectField = React.forwardRef((props, ref) => (
  <Select
    classNamePrefix="select2-selection"
    {...props}
  />
))