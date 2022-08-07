import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

import NoDataImg from '@/assets/images/no-data.png'
import DataLoadImg from '@/assets/images/data-load.png'

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
                    alt=''
                    className='img-fluid rounded shadow-sm mx-auto d-block'
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
