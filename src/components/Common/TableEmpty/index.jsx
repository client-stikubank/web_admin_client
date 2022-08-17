import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

import TableEmptyImg from '@/assets/images/data-empty.jpg'
import TableLoadingImg from '@/assets/images/data-loading.gif'

const TableEmpty = ({ isLoading }) => {
  return (
    <Container>
      <Row>
        <Col lg='12'>
          <div className='text-center'>
            <Row className='justify-content-center mt-5'>
              <Col sm='4'>
                <div className='maintenance-img'>
                  <img
                    src={isLoading ? TableLoadingImg : TableEmptyImg}
                    alt=''
                    className='img-fluid mx-auto d-block'
                  />
                </div>
              </Col>
            </Row>
            <h4 className='mt-5'>
              {isLoading ? 'Mencari Data' : 'Data Tidak Ada'}
            </h4>
            <p className='text-muted'>
              {isLoading
                ? 'Mohon tunggu, data sedang dimuat.'
                : 'Maaf, data yang Anda cari tidak ditemukan atau kosong.'}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

TableEmpty.propTypes = {
  isLoading: PropTypes.any
}

export default TableEmpty
