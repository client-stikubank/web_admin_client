import React from "react"
import Flatpickr from "react-flatpickr"
import PropType from "prop-types"
import moment from "moment"
import "moment-timezone"
import "flatpickr/dist/themes/material_blue.css"

export const DatepickerField = React.forwardRef(({ className, options, ...props }, ref) => {
  const timeZone = "Asia/Jakarta"

  const parseDate = (dateString, format) => {
    let timezonedDate = timeZone
      ? new moment.tz(dateString, format, timeZone)
      : new moment(dateString, format)
    return timezonedDate.toDate()
  }

  const formatDate = (date, format) => {
    let dt = moment(date)
    if (timeZone) {
      dt = dt.tz(timeZone)
    }
    return dt.format(format)
  }

  return (
    <Flatpickr
      className={`form-control d-block ${className}`}
      autoComplete="off"
      placeholder="dd/mm/yyyy"
      options={{
        dateFormat: "DD/MM/YYYY",
        parseDate: parseDate,
        formatDate: formatDate,
        allowInput: true,
        ...options
      }}
      {...props}
    />
  )
})

DatepickerField.propTypes = {
  className: PropType.string,
  options: PropType.object
}