import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Col, Container, Row } from 'reactstrap'

// Actions
import { getCarnivalDetail } from '@/store/actions'

import CarnivalDetail from './carnivalDetail'
import TeamMembers from './teamMembers'
import Events from './events'
import { options, series } from '/src/common/data/projects'
import AttachedFiles from './attachedFiles'
import Comments from './comments'

//redux
import { useSelector, useDispatch } from 'react-redux'

const ProjectsOverview = props => {
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
  }, [params, getCarnivalDetail])

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <div>
              <h2>Pratinjau Karnaval</h2>
            </div>
          </div>

          {!isEmpty(carnivalDetail) && (
            <>
              <Row>
                <Col lg='8'>
                  <CarnivalDetail carnival={carnivalDetail} />
                </Col>

                <Col lg='4'>
                  <TeamMembers team={carnivalDetail?.team} />
                </Col>
              </Row>

              <Row>
                <Col lg='4'>
                  <Events carnival={carnivalDetail} />
                </Col>

                <Col lg='4'>
                  <AttachedFiles files={carnivalDetail?.files} />
                </Col>

                <Col lg='4'>
                  <Comments comments={carnivalDetail?.comments} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

ProjectsOverview.propTypes = {
  match: PropTypes.object
}

export default withRouter(ProjectsOverview)
