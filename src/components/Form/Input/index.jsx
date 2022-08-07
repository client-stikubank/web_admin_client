import React from "react"
import { Input } from "reactstrap"

export const InputField = React.forwardRef((props, ref) => (
  <Input innerRef={ref} {...props} />
))