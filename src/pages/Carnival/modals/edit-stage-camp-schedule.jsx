import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'

// Actions
import { setModal } from '@/store/actions'

// Helpers
import { idDate } from '@/helpers/format/date'

// Form
import FormCampStageSchedule from '../forms/stage-camp-schedule'

export const ModalEditStageCampSchedule = ({ stageCamp, schedule }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  console.log(schedule)

  return (
    <Modal
      isOpen={type === 'editStageCampSchedule' && show}
      backdrop={'static'}
    >
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Jadwal Pelatihan pada Stage Level {stageCamp.attributes.stage.level}
          <br />
          <small>
            {stageCamp.attributes.stage.name} -{' '}
            {stageCamp.attributes.camp.data.attributes.title}
          </small>
          <br />
          <small>
            Mengubah Jadwal pada Tanggal{' '}
            {idDate(schedule.attributes.started_at)}
          </small>
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() =>
            dispatch(
              dispatch(setModal({ type: 'calendarCampStage', show: true }))
            )
          }
          aria-label='Close'
        />
      </div>
      <FormCampStageSchedule stageCamp={stageCamp} currentData={schedule} />
    </Modal>
  )
}

ModalEditStageCampSchedule.propTypes = {
  stageCamp: PropTypes.object,
  schedule: PropTypes.any
}
