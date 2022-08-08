import React, { useEffect, useState } from 'react'
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Button
} from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { map } from 'lodash'

// Actions
import { getCarnivals, setModal, closeModal } from '@/store/actions'

// Components
import NoData from '@/components/Common/NoData'

// Child
import CarnivalCard from './card'
import { ModalCreate } from './modals'

const Carnival = props => {
  document.title = 'Karnaval | Master Data'
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  const { carnivals, currentParams, formStatus, isLoading } = useSelector(
    state => ({
      carnivals: state.Carnival.carnivals,
      currentParams: state.Carnival.currentParams,
      formStatus: state.Carnival.formStatus,
      isLoading: state.Carnival.isLoading
    })
  )

  useEffect(() => {
    dispatch(getCarnivals({ page: 1, per_page: currentParams.per_page }))
  }, [dispatch])

  useEffect(() => {
    setPage(currentParams.page)
  }, [currentParams])

  useEffect(() => {
    switch (formStatus) {
      case 'createSuccess':
        const params = {
          page: 1,
          per_page: currentParams.per_page,
          direction: null,
          sort: null
        }
        dispatch(closeModal())
        dispatch(getCarnivals(params))
        setPage(1)
        break
      default:
        return
    }
  }, [formStatus])

  const handlePageClick = page => {
    setPage(page)
    dispatch(getCarnivals({ ...currentParams, page }))
  }

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <div>
              <h2>Karnaval</h2>
            </div>
            <div className='d-flex align-items-center'>
              <form className='app-search d-none d-lg-block mx-3'>
                <div className='position-relative'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Cari...'
                  />
                  <span className='bx bx-search-alt' />
                </div>
              </form>
              <Button
                type='button'
                color='success'
                className='btn-rounded'
                onClick={() =>
                  dispatch(setModal({ type: 'createCarnival', show: true }))
                }
              >
                <i className='mdi mdi-plus me-1' />
                Tambah Karnaval
              </Button>
            </div>
          </div>

          {carnivals?.data && carnivals?.data.length > 0 ? (
            <React.Fragment>
              <Row>
                <CarnivalCard carnivals={carnivals?.data} />
              </Row>
              <Row>
                <Col lg='12'>
                  <Pagination className='pagination pagination-rounded justify-content-center mb-2'>
                    <PaginationItem disabled={!carnivals?.pagination?.previous}>
                      <PaginationLink
                        previous
                        href='#'
                        onClick={() => handlePageClick(page - 1)}
                      />
                    </PaginationItem>
                    {map(Array(carnivals?.pagination?.pages), (item, i) => (
                      <PaginationItem active={i + 1 === page} key={i}>
                        <PaginationLink
                          onClick={() => handlePageClick(i + 1)}
                          href='#'
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={!carnivals?.pagination?.next}>
                      <PaginationLink
                        next
                        href='#'
                        onClick={() => handlePageClick(page + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            <NoData isLoading={isLoading} />
          )}
        </Container>
      </div>
      <ModalCreate />
    </React.Fragment>
  )
}

export default withRouter(Carnival)
