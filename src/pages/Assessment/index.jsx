import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator'
import _ from 'lodash'

// Actions
import { getAssessments } from '@/store/actions'

// Components
import MasterContainer from '@/components/Container/Master'
import TableEmpty from '@/components/Common/TableEmpty'

// Partition
import { SIZE_PER_LIST } from '@/constants/options'
import { columns, selectRow } from './table/options'
import Actions from './table/actions'
import Filter from './table/filter'

const Assessment = () => {
  document.title = 'Tes Kepribadian | Admin Youthcamp'
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(SIZE_PER_LIST[0].value)
  const [activeSortField, setActiveSortField] = useState()
  const [activeSortOrder, setActiveSortOrder] = useState()
  const [selectedRow, setSelectedRow] = useState()
  const [toggleFilter, setToggleFilter] = useState()

  const { assessments, form, lastSubmitAt, currentParams, isLoading } =
    useSelector(state => ({
      assessments: state.Assessment.assessments,
      form: state.Assessment.form,
      lastSubmitAt: state.Assessment.lastSubmitAt,
      currentParams: state.Assessment.currentParams,
      isLoading: state.Assessment.isLoading
    }))

  useEffect(() => {
    dispatch(getAssessments({ page: 1, per_page: sizePerPage }))
  }, [dispatch])

  useEffect(() => {
    setPage(currentParams.page)
    setSizePerPage(currentParams.per_page)
  }, [currentParams])

  useEffect(() => {
    switch (form) {
      case 'transactionSuccess':
        setSelectedRow()
        break
      default:
        return
    }
  }, [form, lastSubmitAt])

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    switch (type) {
      case 'pagination':
        setPage(page)
        dispatch(
          getAssessments({ ...currentParams, page, per_page: sizePerPage })
        )
        break
      case 'sort':
        setPage(1)
        setActiveSortField(sortField)
        setActiveSortOrder(sortOrder)
        dispatch(
          getAssessments({
            ...currentParams,
            page: 1,
            sort_order: _.upperCase(sortOrder),
            sort_field: sortField
          })
        )
        break
      default:
        return
    }
  }

  const paginationOptions = {
    custom: true,
    page,
    totalSize: assessments?.pagination?.count,
    sizePerPageList: SIZE_PER_LIST
  }

  const currentSort = {
    dataField: activeSortField,
    order: activeSortOrder
  }

  return (
    <React.Fragment>
      <div className='page-content'>
        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
          {({ paginationProps, paginationTableProps }) => (
            <MasterContainer
              title='Assessment'
              actions={
                <Actions
                  selectedRow={selectedRow}
                  setToggleFilter={setToggleFilter}
                />
              }
              pagination={<PaginationListStandalone {...paginationProps} />}
              filter={
                <React.Fragment>
                  <button
                    type='button'
                    className='btn btn-info'
                    onClick={() => setToggleFilter(!toggleFilter)}
                  >
                    <i className='bx bx-filter font-size-16 align-middle me-2'></i>{' '}
                    Filter
                  </button>
                  <SizePerPageDropdownStandalone {...paginationProps} />
                </React.Fragment>
              }
              info={`Total: ${assessments?.pagination?.count} Data`}
            >
              <Row>
                <Col>
                  <BootstrapTable
                    keyField='id'
                    remote
                    bordered={true}
                    striped={false}
                    selectRow={selectRow(setSelectedRow)}
                    data={assessments?.data || []}
                    columns={columns}
                    onTableChange={handleTableChange}
                    sort={currentSort}
                    classes={'table table-fixed'}
                    headerWrapperClasses={'thead-light'}
                    noDataIndication={<TableEmpty isLoading={isLoading} />}
                    {...paginationTableProps}
                  />
                </Col>
              </Row>
            </MasterContainer>
          )}
        </PaginationProvider>
      </div>
      <Filter isOpen={toggleFilter} toggle={setToggleFilter} />
    </React.Fragment>
  )
}

export default withRouter(Assessment)
