import _ from 'lodash'
import { Badge } from 'reactstrap'
import { monsta } from '@/helpers/render/text'

export const columns = [
  {
    dataField: 'name',
    text: 'Nama',
    sort: true,
    formatter: (cell, row) => row.attributes.name
  },
  {
    dataField: 'code',
    text: 'Kode',
    sort: false,
    formatter: (cell, row) => row.attributes.code
  },
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
