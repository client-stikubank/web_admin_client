import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import _ from 'lodash'

import '@fullcalendar/bootstrap/main.css'
import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import idLocale from '@fullcalendar/core/locales/id'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import BootstrapTheme from '@fullcalendar/bootstrap'

// Actions
import { setModal, closeModal } from '@/store/actions'

export const ModalCalendarCampStage = ({
  stageCamp,
  setSelectedDate,
  setSelectedSchedule
}) => {
  const dispatch = useDispatch()

  const { type, show, stageCampSchedules } = useSelector(state => ({
    type: state.Modal.type,
    show: state.Modal.show,
    stageCampSchedules: state.StageCampSchedule.stageCampSchedules
  }))

  const handleDateClick = event => {
    const date = event['date']
    setSelectedDate(date)
    dispatch(setModal({ type: 'addStageCampSchedule', show: true }))
  }

  const handleEventClick = eventData => {
    const eventId = eventData.event.id
    setSelectedSchedule(_.find(stageCampSchedules, { id: eventId }))
    dispatch(setModal({ type: 'editStageCampSchedule', show: true }))
  }

  const renderEventContent = eventInfo => {
    const eventData = eventInfo.event.title.split(', ')
    return (
      <React.Fragment>
        <i className='bx bxs-time' />
        &nbsp;
        {eventData[0]}
        <br />
        <i className='bx bxs-user' />
        &nbsp;
        {eventData[1]}
      </React.Fragment>
    )
  }

  return (
    <Modal
      isOpen={type === 'calendarCampStage' && show}
      backdrop={'static'}
      size='xl'
    >
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>
          Jadwal Pelatihan pada Stage Level {stageCamp.attributes.stage.level}
          <br />
          <small>
            {stageCamp.attributes.stage.name} -{' '}
            {stageCamp.attributes.camp.title}
          </small>
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={() => dispatch(closeModal())}
          aria-label='Close'
        />
      </div>
      <div className='modal-body'>
        <FullCalendar
          plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
          handleWindowResize={true}
          themeSystem='bootstrap'
          eventDisplay='block'
          slotDuration='02:00'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          buttonText={{
            today: 'Hari ini',
            month: 'Bulan',
            week: 'Minggu'
          }}
          events={_.map(stageCampSchedules, 'attributes')}
          eventContent={renderEventContent}
          editable={false}
          droppable={false}
          selectable={false}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          drop={null}
          locale={idLocale}
        />
      </div>
    </Modal>
  )
}

ModalCalendarCampStage.propTypes = {
  stageCamp: PropTypes.object,
  setSelectedDate: PropTypes.func,
  setSelectedSchedule: PropTypes.func
}
