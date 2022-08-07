import React from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import PropTypes from "prop-types"

export const Confirmation = React.forwardRef((props) => props.data ? (
  <SweetAlert
    title="Konfirmasi"
    info
    showCancel
    confirmBtnBsStyle="success"
    cancelBtnBsStyle="danger"
    onConfirm={props.confirm}
    onCancel={props.cancel}>
    {props.message || "Anda yakin sudah mengecek semua data?"}
  </SweetAlert>
) : null)

Confirmation.propTypes = {
  message: PropTypes.string,
  data: PropTypes.any,
  confirm: PropTypes.any,
  cancel: PropTypes.any,
}
