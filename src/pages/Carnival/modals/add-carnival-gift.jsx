import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'

// Actions
import { closeModal } from '@/store/actions'

// Form
import FormCarnivalGift from '../forms/carnival-gift'

export const ModalAddCarnivalGift = ({ gifts }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  return (
    <Modal isOpen={type === 'addCarnivalGift' && show} backdrop={'static'}>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Menambahkan Hadiah
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() => dispatch(closeModal())}
          aria-label='Close'
        />
      </div>
      <FormCarnivalGift gifts={gifts} />
    </Modal>
  )
}

ModalAddCarnivalGift.propTypes = {
  stage: PropTypes.object
}
