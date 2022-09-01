import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Col, Container, Row } from 'reactstrap'

// Actions
import { getCarnivalDetail } from '@/store/actions'

import CarnivalDetail from './carnivalDetail'
import TeamMembers from './teamMembers'
import Stages from './stages'
import AttachedFiles from './attachedFiles'
import Comments from './comments'

const CarnivalOverview = props => {
  document.title = 'Pratinjau Karnaval | YouthCamp'

  const dispatch = useDispatch()

  const { carnivalDetail } = useSelector(state => ({
    carnivalDetail: state.Carnival.carnivalDetail
  }))

  const {
    match: { params }
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(getCarnivalDetail(params.id))
    }
  }, [getCarnivalDetail])

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h4>Pratinjau Karnaval</h4>
          </div>

          {!isEmpty(carnivalDetail) && (
            <>
              <Row>
                <Col lg='6'>
                  <CarnivalDetail carnival={carnivalDetail} />
                </Col>

                {/* <Col lg='4'>
                  <TeamMembers team={carnivalDetail?.team} />
                </Col> */}
              </Row>

              <Row>
                <Col lg='6'>
                  <Stages />
                </Col>

                {/* <Col lg='4'>
                  <AttachedFiles files={carnivalDetail?.files} />
                </Col>

                <Col lg='4'>
                  <Comments comments={carnivalDetail?.comments} />
                </Col> */}
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

CarnivalOverview.propTypes = {
  match: PropTypes.object
}

export default withRouter(CarnivalOverview)
