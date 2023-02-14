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
        disabled={!selectedRow}
        className={`btn btn-${selectedRow ? 'warning' : 'dark'}`}
        onClick={() => openModal('editGlobalSetting')}
      >
        <i className='bx bx-edit font-size-16 align-middle me-2'></i> Edit
      </button>
    </React.Fragment>
  )
}

Actions.propTypes = {
  selectedRow: PropTypes.any,
  setToggleFilter: PropTypes.func
}

export default Actions
