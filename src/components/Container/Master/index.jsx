/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardTitle, CardBody, Container } from 'reactstrap'
import PropTypes from 'prop-types'

const Master = props => {
  return (
    <Container fluid className={props.shared && 'p-0'}>
      <Card className='w-100 card-content page-card-content single-table'>
        <CardTitle className='px-3 pt-3 m-0 d-flex justify-content-between align-items-center'>
          {props.shared ? <div>{props.title}</div> : <h2>{props.title}</h2>}
          <div className='d-flex flex-wrap gap-2 justify-content-end'>
            {props.filter}
            {props.actions}
          </div>
        </CardTitle>
        <CardBody className='p-3'>
          {props.children}
          <div className='page-toolbar-footer'>
            <div className='d-flex justify-content-between align-items-center w-100'>
              <div className='d-flex flex-wrap justify-content-start'>
                {props.pagination}
              </div>
              <div className='d-flex flex-wrap justify-content-end'>
                <p className='m-0'>{props.info}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  )
}

Master.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  actions: PropTypes.any,
  pagination: PropTypes.any,
  info: PropTypes.string,
  filter: PropTypes.any
}

export default withRouter(Master)
