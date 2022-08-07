import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { map, capitalize } from 'lodash'
import { Badge, Card, CardBody, Col, UncontrolledTooltip } from 'reactstrap'

// Format
import { idDate } from '@/helpers/format/date'

import carnivalPlaceholder from '@/assets/images/carnival-placeholder.png'

const CardProject = ({ carnivals }) => {
  const statusColor = status => {
    switch (status) {
      case 'active':
        return 'success'
      case 'finish':
        return 'warning'
      case 'inactive':
      default:
        return 'secondary'
    }
  }
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
                      width='100%'
                    />
                  </span>
                </div>

                <div className='flex-grow-1 overflow-hidden'>
                  <h5 className='text-truncate font-size-15'>
                    <Link
                      to={`/carnivals-overview/${carnival?.id}`}
                      className='text-dark'
                    >
                      {carnival?.name}
                    </Link>
                  </h5>
                  <p className='text-muted mb-4'>
                    {carnival?.description || 'Description'}
                  </p>
                </div>
              </div>
            </CardBody>
            <div className='px-4 py-3 border-top'>
              <ul className='list-inline mb-0'>
                <li className='list-inline-item me-3'>
                  <Badge className={'bg-' + statusColor(carnival?.status)}>
                    {capitalize(carnival?.status)}
                  </Badge>
                </li>
                <li className='list-inline-item me-3' id='dueDate'>
                  <i className='bx bx-calendar me-1' />{' '}
                  {idDate(carnival?.finished_at)}
                  <UncontrolledTooltip placement='top' target='dueDate'>
                    Waktu selesai
                  </UncontrolledTooltip>
                </li>
                <li className='list-inline-item me-3' id='comments'>
                  <i className='bx bx-user me-1' />{' '}
                  {carnival?.commentsCount || 0}
                  <UncontrolledTooltip placement='top' target='comments'>
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
