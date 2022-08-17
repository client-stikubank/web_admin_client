import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import PropTypes from 'prop-types'

// Actions
import { deleteStageCampSchedule, setModal } from '@/store/actions'

// Helpers
import { idDate } from '@/helpers/format/date'

export const ModalDeleteStageCampSchedule = ({ stageCamp, schedule }) => {
  const dispatch = useDispatch()

  const { type, show } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show
  }))

  return (
    <Modal
      isOpen={type === 'deleteStageCampSchedule' && show}
      backdrop={'static'}
    >
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Jadwal Pelatihan pada Stage Level {stageCamp.attributes.stage.level}
          <br />
          <small>
            {stageCamp.attributes.stage.name} -{' '}
            {stageCamp.attributes.camp.title}
          </small>
          <br />
          <small>
            Menghapus Jadwal pada Tanggal{' '}
            {idDate(schedule.attributes.started_at)}
          </small>
          <br />
          <small>
            <i className='bx bxs-time' />
            &nbsp;
            {`${schedule.attributes.time_start} - ${schedule.attributes.time_end}`}
          </small>
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() =>
            dispatch(setModal({ type: 'editStageCampSchedule', show: true }))
          }
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
          onClick={() =>
            dispatch(setModal({ type: 'editStageCampSchedule', show: true }))
          }
        >
          Batalkan
        </button>
        <button
          type='submit'
          className='btn btn-danger'
          onClick={() => dispatch(deleteStageCampSchedule(schedule))}
        >
          Ya, Hapus
        </button>
      </div>
    </Modal>
  )
}

ModalDeleteStageCampSchedule.propTypes = {
  stageCamp: PropTypes.object,
  schedule: PropTypes.any
}
