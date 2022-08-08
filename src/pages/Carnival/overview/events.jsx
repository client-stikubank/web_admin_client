import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle } from 'reactstrap'

const Events = ({ carnival }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle className='mb-4'>Events</CardTitle>
        <div>
          <ul className='verti-timeline list-unstyled'>
            <li className='event-list'>
              <div className='event-timeline-dot'>
                <i className='bx bx-right-arrow-circle' />
              </div>
              <div className='d-flex'>
                <div className='me-3'>
                  <i className='bx bx-user-plus h2 text-primary' />
                </div>
                <div className='flex-grow-1'>
                  <div>
                    <h5 className='font-size-14'>Register account</h5>
                    <p className='text-muted'>
                      New common language will be more simple and regular than
                      the existing.
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className='event-list'>
              <div className='event-timeline-dot'>
                <i className='bx bx-right-arrow-circle' />
              </div>
              <div className='d-flex'>
                <div className='me-3'>
                  <i className='bx bx-copy-alt h2 text-primary' />
                </div>
                <div className='flex-grow-1'>
                  <div>
                    <h5 className='font-size-14'>Select Deposit</h5>
                    <p className='text-muted'>
                      To achieve this, it would be necessary to have uniform
                      grammar.
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li className='event-list'>
              <div className='event-timeline-dot'>
                <i className='bx bx-right-arrow-circle' />
              </div>
              <div className='d-flex'>
                <div className='me-3'>
                  <i className='bx bx-cloud-download h2 text-primary' />
                </div>
                <div className='flex-grow-1'>
                  <div>
                    <h5 className='font-size-14'>Get Earnings</h5>
                    <p className='text-muted'>
                      New common language will be more simple and regular than
                      the existing.
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  )
}

Events.propTypes = {
  carnival: PropTypes.object
}

export default Events
