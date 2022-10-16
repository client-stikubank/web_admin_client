import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'

// Actions
import { activateCarnival, closeModal } from '@/store/actions'

export const ModalActivate = ({ data }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  return (
    <Modal isOpen={type === 'activateCarnival' && show} backdrop={'static'}>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Mengaktifkan Youthcamp
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() => dispatch(closeModal())}
          aria-label='Close'
        />
      </div>
      <div className='modal-body'>
        <p>
          Mengaktifkan Youthcamp akan membuat status Youthcamp yang lain tidak
          aktif. Yakin ingin mengkatifkan Youthcamp ini?
        </p>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => dispatch(closeModal())}
        >
          Batalkan
        </button>
        <button
          type='submit'
          className='btn btn-success'
          onClick={() => dispatch(activateCarnival(data))}
        >
          Ya, Aktifkan
        </button>
      </div>
    </Modal>
  )
}

ModalActivate.propTypes = {
  data: PropTypes.object
}
