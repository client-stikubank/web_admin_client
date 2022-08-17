import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'

// Actions
import { closeModal } from '@/store/actions'

// Form
import FormCampStage from '../forms/stage-camp'

export const ModalAddStageCamp = ({ stage }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  return (
    <Modal isOpen={type === 'addCampStage' && show} backdrop={'static'}>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Menambahkan Pelatihan pada Stage Level {stage.attributes.level}
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() => dispatch(closeModal())}
          aria-label='Close'
        />
      </div>
      <FormCampStage currentData={stage} />
    </Modal>
  )
}

ModalAddStageCamp.propTypes = {
  stage: PropTypes.object
}
