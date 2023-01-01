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
        className='btn btn-success'
        onClick={() => openModal('addGift')}
      >
        <i className='bx bx-add-to-queue font-size-16 align-middle me-2'></i>{' '}
        Tambah
      </button>
      <button
        type='button'
        disabled={!selectedRow}
        className={`btn btn-${selectedRow ? 'warning' : 'dark'}`}
        onClick={() => openModal('editGift')}
      >
        <i className='bx bx-edit font-size-16 align-middle me-2'></i> Edit
      </button>
      <button
        type='button'
        disabled={!selectedRow}
        className={`btn btn-${selectedRow ? 'danger' : 'dark'}`}
        onClick={() => openModal('deleteGift')}
      >
        <i className='bx bx-trash font-size-16 align-middle me-2'></i> Hapus
      </button>
    </React.Fragment>
  )
}

Actions.propTypes = {
  selectedRow: PropTypes.any,
  setToggleFilter: PropTypes.func
}

export default Actions
