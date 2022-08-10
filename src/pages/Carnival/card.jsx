import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { map, capitalize } from 'lodash'
import { Badge, Card, CardBody, Col, UncontrolledTooltip } from 'reactstrap'

// Helpers
import { statusColor } from '@/helpers/format/color'
import { idDate } from '@/helpers/format/date'

// Images
import carnivalPlaceholder from '@/assets/images/carnival-placeholder.png'

const CardProject = ({ carnivals }) => {
  return (
    <React.Fragment>
      {map(carnivals, (carnival, key) => (
        <Col xl='4' sm='6' key={key}>
          <Card>
            <CardBody>
              <div className='d-flex'>
                <div className='avatar-md me-4'>
                  <span className='avatar-title rounded-circle bg-light text-danger font-size-16'>
                    <img
                      src={carnival?.image || carnivalPlaceholder}
                      alt=''
                      width='80'
                    />
                  </span>
                </div>

                <div className='flex-grow-1 overflow-hidden'>
                  <h5 className='text-truncate font-size-15'>
                    <Link
                      to={`/carnival/${carnival?.id}`}
                      className='text-dark'
                    >
                      {carnival?.attributes.name}
                    </Link>
                  </h5>
                  <p className='text-muted mb-4 text-truncate'>
                    {carnival?.attributes.description}
                  </p>
                </div>
              </div>
            </CardBody>
            <div className='px-4 py-3 border-top'>
              <ul className='list-inline mb-0'>
                <li className='list-inline-item me-3'>
                  <Badge
                    className={
                      'font-size-12 bg-' +
                      statusColor(carnival?.attributes.status)
                    }
                  >
                    {capitalize(carnival?.attributes.status)}
                  </Badge>
                </li>
                <li className='list-inline-item me-3' id='finishDate'>
                  <i className='bx bx-calendar-check me-1' />{' '}
                  {idDate(carnival?.attributes.finished_at)}
                  <UncontrolledTooltip placement='top' target='finishDate'>
                    Waktu selesai
                  </UncontrolledTooltip>
                </li>
                <li className='list-inline-item me-3' id='users'>
                  <i className='bx bx-user me-1' />{' '}
                  {carnival?.commentsCount || 0}
                  <UncontrolledTooltip placement='top' target='users'>
                    Peserta
                  </UncontrolledTooltip>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

CardProject.propTypes = {
  carnivals: PropTypes.array
}

export default CardProject
