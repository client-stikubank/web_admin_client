import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Badge
} from 'reactstrap'

// Actions
import {
  getStages,
  updateStage,
  getStageCampSchedules,
  setModal
} from '@/store/actions'

// Components
import { EditableText } from '@/components/Form'
import NoData from '@/components/Common/NoData'

// Modal
import {
  ModalAddStageCamp,
  ModalDeleteStageCamp,
  ModalCalendarCampStage,
  ModalAddStageCampSchedule,
  ModalEditStageCampSchedule,
  ModalDeleteStageCampSchedule
} from '../modals'
import { useEffect } from 'react'

const Stages = () => {
  const dispatch = useDispatch()
  const [selectedStage, setSelectedStage] = useState()
  const [selectedStageCamp, setSelectedStageCamp] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [selectedSchedule, setSelectedSchedule] = useState()

  const { stages, isLoading, carnivalDetail } = useSelector(state => ({
    stages: state.Stage.stages,
    isLoading: state.Stage.isLoading,
    carnivalDetail: state.Carnival.carnivalDetail
  }))

  useEffect(() => {
    dispatch(
      getStages({
        query: {
          carnival_id_eq: carnivalDetail.id
        }
      })
    )
  }, [carnivalDetail])

  const validateName = value => {
    if (!value) {
      return <small className='text-danger'>Nama tidak boleh kosong</small>
    }
  }

  const submitStage = (stage, value) => {
    dispatch(updateStage({ ...stage, name: value }))
  }

  const assignCamp = stage => {
    setSelectedStage(stage)
    dispatch(setModal({ type: 'addCampStage', show: true }))
  }

  const deleteCamp = stageCamp => {
    setSelectedStageCamp(stageCamp)
    dispatch(setModal({ type: 'deleteCampStage', show: true }))
  }

  const calendarCamp = stageCamp => {
    setSelectedStageCamp(stageCamp)
    dispatch(
      getStageCampSchedules({
        query: {
          stage_camp_id_eq: stageCamp.id
        },
        sort_order: 'ASC',
        sort_field: 'time_start'
      })
    )

    dispatch(setModal({ type: 'calendarCampStage', show: true }))
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className='mb-4'>Daftar Stage</CardTitle>
        <div>
          <ul className='verti-timeline list-unstyled'>
            {stages.length > 0 ? (
              stages.map(stage => (
                <li className='event-list' key={stage.id}>
                  <div className='event-timeline-dot mt-1'>
                    <i className='bx bx-right-arrow-circle' />
                  </div>
                  <div className='d-flex'>
                    <div className='me-3'>
                      <i className='bx bx-joystick h2 text-primary' />
                    </div>
                    <div className='flex-grow-1'>
                      <div>
                        <h5 className='display-inline mt-1 font-size-14'>
                          <EditableText
                            id={stage.id}
                            onSubmit={value => submitStage(stage, value)}
                            validate={validateName}
                            initialValue={stage.attributes.name}
                          />
                        </h5>
                        <Badge className='bg-info'>
                          Level {stage.attributes.level}
                        </Badge>
                        <Row className='mt-3'>
                          {stage.attributes.stage_camps.data.length > 0 &&
                            stage.attributes.stage_camps.data.map(
                              stage_camp => (
                                <Col md='6' key={stage_camp.id}>
                                  <Card
                                    className='border'
                                    style={{ height: 120 }}
                                  >
                                    <CardHeader className='p-2 d-flex justify-content-between text-center'>
                                      <h6 className='mb-0'>
                                        {stage_camp.attributes.camp.title}
                                      </h6>
                                      <div className='d-flex gap-2'>
                                        <span
                                          className='cursor-pointer text-info hoverable'
                                          onClick={() =>
                                            calendarCamp(stage_camp)
                                          }
                                        >
                                          <i className='bx bx-calendar' />
                                        </span>
                                        <span
                                          className='cursor-pointer text-danger hoverable'
                                          onClick={() => deleteCamp(stage_camp)}
                                        >
                                          <i className='bx bx-trash' />
                                        </span>
                                      </div>
                                    </CardHeader>
                                    <CardBody></CardBody>
                                  </Card>
                                </Col>
                              )
                            )}
                          <Col md='6'>
                            <Card
                              className='border cursor-pointer hoverable-reverse'
                              style={{ height: 120 }}
                              onClick={() => assignCamp(stage)}
                            >
                              <CardBody className='d-flex flex-column align-items-center justify-content-center'>
                                <i className='bx bx-plus h1 m-0' />
                                Tambah Pelatihan
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <NoData isLoading={isLoading} />
            )}
          </ul>
        </div>
      </CardBody>
      {selectedStage && <ModalAddStageCamp stage={selectedStage} />}
      {selectedStageCamp && (
        <React.Fragment>
          <ModalDeleteStageCamp stageCamp={selectedStageCamp} />
          <ModalCalendarCampStage
            stageCamp={selectedStageCamp}
            setSelectedDate={setSelectedDate}
            setSelectedSchedule={setSelectedSchedule}
          />
          {selectedDate && (
            <ModalAddStageCampSchedule
              stageCamp={selectedStageCamp}
              date={selectedDate}
            />
          )}
          {selectedSchedule && (
            <React.Fragment>
              <ModalEditStageCampSchedule
                stageCamp={selectedStageCamp}
                schedule={selectedSchedule}
              />
              <ModalDeleteStageCampSchedule
                stageCamp={selectedStageCamp}
                schedule={selectedSchedule}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </Card>
  )
}

export default Stages
