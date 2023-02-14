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
import { getGlobalSettings } from '@/store/actions'

// Components
import MasterContainer from '@/components/Container/Master'
import TableEmpty from '@/components/Common/TableEmpty'

// Partition
import { SIZE_PER_LIST } from '@/constants/options'
import { columns, selectRow } from './table/options'
import Actions from './table/actions'
import Filter from './table/filter'
import { ModalEdit } from './modals'

const GlobalSetting = () => {
  document.title = 'Pengaturan | Admin YouthCamp'
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(SIZE_PER_LIST[0].value)
  const [activeSortField, setActiveSortField] = useState()
  const [activeSortOrder, setActiveSortOrder] = useState()
  const [selectedRow, setSelectedRow] = useState()
  const [toggleFilter, setToggleFilter] = useState()

  const { globalSettings, globalSettingDetail, form, lastSubmitAt, currentParams, isLoading } =
    useSelector(state => ({
      globalSettings: state.GlobalSetting.globalSettings,
      globalSettingDetail: state.GlobalSetting.globalSettingDetail,
      form: state.GlobalSetting.form,
      lastSubmitAt: state.GlobalSetting.lastSubmitAt,
      currentParams: state.GlobalSetting.currentParams,
      isLoading: state.GlobalSetting.isLoading
    }))

  useEffect(() => {
    dispatch(getGlobalSettings({ page: 1, per_page: sizePerPage }))
  }, [dispatch])

  useEffect(() => {
    switch (form) {
      case 'addSuccess':
        const params = {
          page: 1,
          per_page: currentParams.per_page,
          direction: null,
          sort: null
        }
        dispatch(getGlobalSettings(params))
        setPage(1)
        break
      case 'updateSuccess':
        setSelectedRow(globalSettingDetail)
        break
      case 'deleteSuccess':
        setSelectedRow()
        break
      default:
        return
    }
  }, [form, lastSubmitAt])

  useEffect(() => {
    setPage(currentParams.page)
    setSizePerPage(currentParams.per_page)
  }, [currentParams])

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    switch (type) {
      case 'pagination':
        setPage(page)
        dispatch(getGlobalSettings({ ...currentParams, page, per_page: sizePerPage }))
        break
      case 'sort':
        setPage(1)
        setActiveSortField(sortField)
        setActiveSortOrder(sortOrder)
        dispatch(
          getGlobalSettings({
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
    totalSize: globalSettings?.pagination?.count,
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
              title='Pengaturan'
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
              info={`Total: ${globalSettings?.pagination?.count} Data`}
            >
              <Row>
                <Col>
                  <BootstrapTable
                    keyField='id'
                    remote
                    bordered={true}
                    striped={false}
                    selectRow={selectRow(setSelectedRow)}
                    data={globalSettings?.data || []}
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
      <ModalEdit data={selectedRow} />
    </React.Fragment>
  )
}

export default withRouter(GlobalSetting)
