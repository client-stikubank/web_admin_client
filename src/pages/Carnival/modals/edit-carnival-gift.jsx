import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'

// Actions
import { closeModal } from '@/store/actions'

// Form
import FormCarnivalGift from '../forms/carnival-gift'

export const ModalEditCarnivalGift = ({ gifts, carnivalGift }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  return (
    <Modal isOpen={type === 'editCarnivalGift' && show} backdrop={'static'}>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Update Hadiah
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() => dispatch(closeModal())}
          aria-label='Close'
        />
      </div>
      <FormCarnivalGift gifts={gifts} currentData={carnivalGift} />
    </Modal>
  )
}

ModalEditCarnivalGift.propTypes = {
  stage: PropTypes.object
}
