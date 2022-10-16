import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Col, Container, Row, Button } from 'reactstrap'

// Actions
import { getCarnivalDetail, setModal } from '@/store/actions'

import CarnivalDetail from './carnivalDetail'
import TeamMembers from './teamMembers'
import Stages from './stages'
import AttachedFiles from './attachedFiles'
import Comments from './comments'
import { ModalActivate } from '../modals'

const CarnivalOverview = props => {
  document.title = 'Pratinjau Youthcamp | YouthCamp'

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
          <div className='d-flex justify-content-between align-items-start mb-3'>
            <h4 className='m-0'>
              <Link to='/youthcamp'>
                <i className='bx bx-chevron-left font-size-16 align-middle me-2' />
              </Link>
              Pratinjau Youthcamp
            </h4>
            {carnivalDetail?.attributes?.status !== 'active' && (
              <Button
                type='button'
                color='success'
                outline
                className='btn-rounded'
                onClick={() =>
                  dispatch(setModal({ type: 'activateCarnival', show: true }))
                }
              >
                <i className='mdi mdi-check me-1' />
                Aktifkan Youthcamp
              </Button>
            )}
          </div>

          {!isEmpty(carnivalDetail) && (
            <>
              <Row>
                <Col lg='6'>
                  <CarnivalDetail carnival={carnivalDetail} />
                  <Stages />
                </Col>

                <Col lg='6'>
                  <TeamMembers carnivalId={carnivalDetail?.id} />
                </Col>
              </Row>

              <Row>
                <Col lg='6'></Col>

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
      <ModalActivate data={carnivalDetail} />
    </React.Fragment>
  )
}

CarnivalOverview.propTypes = {
  match: PropTypes.object
}

export default withRouter(CarnivalOverview)
