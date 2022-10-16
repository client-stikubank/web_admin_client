import React, { useState, useEffect } from 'react'
import { Container, Nav, NavItem, NavLink } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { map } from 'lodash'
import classnames from 'classnames'

import { getStocks } from '@/store/actions'

const Stock = () => {
  document.title = 'Stok Koin | Admin YouthCamp'
  const [activeTab, setActiveTab] = useState(0)
  const dispatch = useDispatch()

  const { stocks, currentParams, formStatus, isLoading } = useSelector(
    state => ({
      stocks: state.Stock.stocks,
      currentParams: state.Stock.currentParams,
      formStatus: state.Stock.formStatus,
      isLoading: state.Stock.isLoading
    })
  )

  useEffect(() => {
    dispatch(getStocks())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h4>Stok Koin</h4>
          </div>
          <Nav className='d-flex gap-2' pills>
            {stocks?.data &&
              stocks?.data.length > 0 &&
              map(stocks.data, (stock, key) => (
                <NavItem
                  className='media-body shadow bg-white rounded'
                  key={key}
                >
                  <NavLink
                    className={classnames({ active: activeTab === key })}
                    onClick={() => {
                      setActiveTab(key)
                    }}
                  >
                    <p className='font-weight-bold mb-2 d-flex align-items-center'>
                      <i className='bx bx-coin me-2'></i>
                      {stock.attributes?.coin_name}
                    </p>
                    <span>
                      Sisa Stok: {stock.attributes?.balance}/
                      {stock.attributes?.coin_max_supply}
                    </span>
                  </NavLink>
                </NavItem>
              ))}
          </Nav>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Stock
