import React from 'react'
import { Card, CardBody, Col, Row, Badge } from 'reactstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { map, capitalize } from 'lodash'

// Actions
import { setModal, closeModal } from '@/store/actions'

// Helpers
import { statusColor } from '@/helpers/format/color'
import { idDate } from '@/helpers/format/date'

// Images
import carnivalPlaceholder from '@/assets/images/carnival-placeholder.png'

import { ModalEdit } from '../modals'

const Carnival = ({ carnival }) => {
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className='d-flex justify-content-start'>
            <div className='avatar-md me-4'>
              <span className='avatar-title rounded-circle bg-light text-danger font-size-16'>
                <img src={carnivalPlaceholder} alt='' width='80' />
              </span>
            </div>

            <div className='overflow-hidden me-4'>
              <h5 className='text-truncate font-size-15'>
                {carnival.attributes.name}
              </h5>
              <p className='text-muted'>{carnival.attributes.description}</p>
            </div>

            <div className='flex-grow-1 d-flex justify-content-end align-items-start'>
              <button
                type='button'
                className='btn btn-warning text-nowrap'
                onClick={() =>
                  dispatch(setModal({ type: 'editCarnival', show: true }))
                }
              >
                <i className='bx bx-edit font-size-16 align-middle me-2'></i>{' '}
                Edit
              </button>
            </div>
          </div>

          <div className='text-muted mt-4'>
            {carnival.carnivalDetails &&
              map(carnival.carnivalDetails.points, (point, index) => (
                <p key={index}>
                  <i className='mdi mdi-chevron-right text-primary me-1' />{' '}
                  {point}
                </p>
              ))}
          </div>

          <Row className='task-dates'>
            <Col sm='4' xs='6'>
              <div className='mt-4'>
                <h5 className='font-size-14'>
                  <i className='bx bx-calendar-check me-1 text-primary' />{' '}
                  Status
                </h5>
                <Badge
                  className={
                    'font-size-12 bg-' +
                    statusColor(carnival?.attributes.status)
                  }
                >
                  {capitalize(carnival?.attributes.status)}
                </Badge>
              </div>
            </Col>
            <Col sm='4' xs='6'>
              <div className='mt-4'>
                <h5 className='font-size-14'>
                  <i className='bx bx-calendar-check me-1 text-primary' />{' '}
                  Tanggal Selesai
                </h5>
                <p className='text-muted mb-0'>
                  {idDate(carnival.attributes.finished_at)}
                </p>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <ModalEdit data={carnival} />
    </React.Fragment>
  )
}

Carnival.propTypes = {
  carnival: PropTypes.object
}

export default Carnival
