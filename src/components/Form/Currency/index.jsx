import React from "react"
import PropType from "prop-types"
import NumberFormat from 'react-number-format'

export const CurrencyField = React.forwardRef((props) => {
  return (
    <NumberFormat thousandSeparator="." decimalSeparator={false} decimalScale={0} {...props} />
  )
})

CurrencyField.propTypes = {
  className: PropType.string,
  options: PropType.object
}