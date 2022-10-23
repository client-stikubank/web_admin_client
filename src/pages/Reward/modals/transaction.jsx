import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import PropTypes from 'prop-types'

// Actions
import { transactionReward, closeModal } from '@/store/actions'

export const ModalTransaction = ({ data }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  return (
    <Modal isOpen={type === 'transactionReward' && show} backdrop={'static'}>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Proses Transaksi
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() => dispatch(closeModal())}
          aria-label='Close'
        />
      </div>
      {data && (
        <div className='modal-body'>
          <p>
            Yakin akan mengirimkan{' '}
            <b>
              {data.attributes.amount}{' '}
              {data.attributes.coin.data.attributes.name}
            </b>{' '}
            ke akun <b>{data.attributes.user.data.attributes.email}</b> ?
          </p>
        </div>
      )}
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
          className='btn btn-warning'
          onClick={() => dispatch(transactionReward(data))}
        >
          Ya, Lanjutkan
        </button>
      </div>
    </Modal>
  )
}

ModalTransaction.propTypes = {
  data: PropTypes.object
}
