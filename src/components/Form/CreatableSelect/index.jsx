import React from "react"
import CreatableSelect from "react-select/creatable"

export const CreatableSelectField = React.forwardRef((props, ref) => (
  <CreatableSelect
    classNamePrefix="select2-selection"
    {...props}
  />
))