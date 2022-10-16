import _ from 'lodash'
import { Badge } from 'reactstrap'

export const columns = [
  {
    dataField: 'name',
    text: 'Nama',
    sort: true,
    formatter: (cell, row) => _.startCase(row.attributes.name)
  }
]

export const selectRow = setSelectedId => ({
  mode: 'radio',
  clickToSelect: true,
  hideSelectColumn: false,
  bgColor: 'rgba(239, 242, 247, 0.5)',
  onSelect: row => {
    setSelectedId(row)
  }
})
