import React from "react"

export const LoadingButton = props => {
  return (
    <button disabled {...props}>
      <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
      Loading
    </button>
  )
}