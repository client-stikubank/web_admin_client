import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

import NoDataImg from '@/assets/images/data-empty.jpg'
import DataLoadImg from '@/assets/images/data-loading.gif'

const NoData = ({ isLoading }) => {
  return (
    <Container>
      <Row>
        <Col lg='12'>
          <div className='text-center'>
            <Row className='justify-content-center mt-5'>
              <Col sm='4'>
                <div className='maintenance-img'>
                  <img
                    src={isLoading ? DataLoadImg : NoDataImg}
                    height='100'
                    alt='data-placeholder-image'
                    className='img-fluid mx-auto d-block'
                  />
                </div>
              </Col>
            </Row>
            <h4 className='mt-5'>{isLoading ? 'Loading' : 'Data Tidak Ada'}</h4>
            <p className='text-muted'>
              {isLoading
                ? 'Tunggu, data sedang dimuat...'
                : 'Maaf, data yang Anda cari tidak ditemukan atau kosong.'}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

NoData.propTypes = {
  isLoading: PropTypes.any
}

export default NoData
