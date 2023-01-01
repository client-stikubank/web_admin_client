import React, { useState, useEffect } from 'react'
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
import _ from 'lodash'

// Actions
import {
  getCarnivalGifts,
  getStages,
  updateStage,
  getStageCampSchedules,
  setModal
} from '@/store/actions'

// Components
import { EditableText } from '@/components/Form'
import NoData from '@/components/Common/NoData'

// Helpers
import { monsta } from '@/helpers/render/text'

// Modal
import {
  ModalAddStageCamp,
  ModalDeleteStageCamp,
  ModalCalendarCampStage,
  ModalAddStageCampSchedule,
  ModalEditStageCampSchedule,
  ModalDeleteStageCampSchedule,
  ModalAddCarnivalGift,
  ModalEditCarnivalGift
} from '../modals'

const Gifts = () => {
  const dispatch = useDispatch()
  const [selectedCarnivalGift, setSelectedCarnivalGift] = useState()
  const [selectedStage, setSelectedStage] = useState()
  const [selectedStageCamp, setSelectedStageCamp] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [selectedSchedule, setSelectedSchedule] = useState()

  const { carnivalDetail, carnivalGifts } = useSelector(state => ({
    carnivalDetail: state.Carnival.carnivalDetail,
    carnivalGifts: state.CarnivalGift.carnivalGifts
  }))

  useEffect(() => {
    dispatch(
      getCarnivalGifts({
        query: {
          carnival_id_eq: carnivalDetail.id
        },
        sort_order: 'DESC',
        sort_field: 'status'
      })
    )
  }, [carnivalDetail])

  const assignGift = () => {
    dispatch(setModal({ type: 'addCarnivalGift', show: true }))
  }

  const editGift = carnivalGift => {
    setSelectedCarnivalGift(carnivalGift)
    dispatch(setModal({ type: 'editCarnivalGift', show: true }))
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className='mb-4'>Daftar Hadiah</CardTitle>
        <div className='d-flex'>
          <div className='flex-grow-1'>
            <Row>
              {!_.isEmpty(carnivalGifts) &&
                carnivalGifts.data.map(carnivalGift => (
                  <Col md='4' key={carnivalGift.id}>
                    <Card className='border' style={{ height: 220 }}>
                      <CardHeader className='p-2 d-flex justify-content-between text-center'>
                        <h6 className='mb-0'>
                          {_.truncate(carnivalGift.attributes.gift.name, {
                            length: 24
                          })}
                        </h6>
                        <div className='d-flex gap-2'>
                          <span
                            className='cursor-pointer text-info hoverable d-flex align-items-center'
                            onClick={() => editGift(carnivalGift)}
                          >
                            <i className='bx bx-edit me-1' />
                          </span>
                        </div>
                      </CardHeader>
                      <CardBody className='relative'>
                        {carnivalGift.attributes.status === 'inactive' && (
                          <div
                            className='text-danger font-size-24 position-absolute translate-middle top-50 start-50 w-100 text-center'
                            style={{ zIndex: 1 }}
                          >
                            <Badge
                              className='font-size-14 bg-danger'
                              color='red'
                            >
                              <i className='bx bx-unlink me-1' />
                              Tidak Aktif
                            </Badge>
                          </div>
                        )}
                        <div
                          className={`d-flex flex-column gap-2 justify-content-center align-items-center ${
                            carnivalGift.attributes.status === 'inactive' &&
                            'opacity-25'
                          }`}
                        >
                          {carnivalGift.attributes.gift.image?.url && (
                            <img
                              src={carnivalGift.attributes.gift.image?.url}
                              height='80'
                            />
                          )}
                          {monsta(carnivalGift.attributes.gift.reward_amount)}
                          <div className='d-flex gap-4'>
                            <span className='text-center'>
                              <b>Stok</b>
                              <br />
                              {Number(carnivalGift.attributes.quantity)}
                            </span>
                            <span className='text-center'>
                              <b>Klaim</b>
                              <br />
                              {Number(carnivalGift.attributes.redeemed_count)}
                            </span>
                            <span className='text-center'>
                              <b>Batal</b>
                              <br />
                              {Number(carnivalGift.attributes.cancelled_count)}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              <Col md='4'>
                <Card
                  className='border cursor-pointer hoverable-reverse'
                  style={{ height: 220 }}
                  onClick={assignGift}
                >
                  <CardBody className='d-flex flex-column align-items-center justify-content-center'>
                    <i className='bx bx-plus h1 m-0' />
                    Tambah Hadiah
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </CardBody>
      <ModalAddCarnivalGift gifts={carnivalGifts} />
      {selectedCarnivalGift && (
        <ModalEditCarnivalGift
          gifts={carnivalGifts}
          carnivalGift={selectedCarnivalGift}
        />
      )}
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

export default Gifts
