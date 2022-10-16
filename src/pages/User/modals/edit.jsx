import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import PropTypes from 'prop-types'

// Actions
import { closeModal } from '@/store/actions'

// Form
import FormData from '../forms/data'

export const ModalEdit = ({ data }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  return (
    <Modal isOpen={type === 'editUser' && show} backdrop={'static'} size='xl'>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Mengedit User
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() => dispatch(closeModal())}
          aria-label='Close'
        />
      </div>
      <FormData currentData={data} />
    </Modal>
  )
}

ModalEdit.propTypes = {
  data: PropTypes.object
}
