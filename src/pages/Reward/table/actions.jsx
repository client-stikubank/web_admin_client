import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Actions
import { setModal } from '@/store/actions'

const Actions = ({ selectedRow, setToggleFilter }) => {
  const dispatch = useDispatch()

  const openModal = type => {
    setToggleFilter(false)
    dispatch(setModal({ type, show: true }))
  }

  return (
    <React.Fragment>
      <button
        type='button'
        disabled={!selectedRow || selectedRow?.attributes.status !== 'pending'}
        className={`btn btn-${
          selectedRow && selectedRow?.attributes.status == 'pending'
            ? 'warning'
            : 'dark'
        }`}
        onClick={() => openModal('transactionReward')}
      >
        <i className='bx bx-play font-size-16 align-middle me-2'></i> Proses
        Transaksi
      </button>
    </React.Fragment>
  )
}

Actions.propTypes = {
  selectedRow: PropTypes.any,
  setToggleFilter: PropTypes.func
}

export default Actions
