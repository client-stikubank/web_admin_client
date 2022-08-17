import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'

// Actions
import { deleteStageCamp, closeModal } from '@/store/actions'

export const ModalDeleteStageCamp = ({ stageCamp }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  return (
    <Modal isOpen={type === 'deleteCampStage' && show} backdrop={'static'}>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Menghapus Pelatihan pada Stage Level{' '}
          {stageCamp.attributes.stage.level}
          <br />
          <small>{stageCamp.attributes.stage.name}</small>
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
          Data yang sudah dihapus tidak dapat dikembalikan lagi. Apakah anda
          yakin ingin menghapus data ini?
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
          className='btn btn-danger'
          onClick={() => dispatch(deleteStageCamp(stageCamp))}
        >
          Ya, Hapus
        </button>
      </div>
    </Modal>
  )
}

ModalDeleteStageCamp.propTypes = {
  stageCamp: PropTypes.object
}
