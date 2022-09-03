import _ from 'lodash'
import { Badge } from 'reactstrap'

export const columns = [
  {
    dataField: 'title',
    text: 'Nama',
    sort: true,
    formatter: (cell, row) => row.attributes.name
  },
  {
    dataField: 'description',
    text: 'Deskripsi',
    sort: true,
    formatter: (cell, row) => row.attributes.description
  },
  {
    dataField: 'max_supply',
    text: 'Pasokan/Suplay',
    sort: true,
    formatter: (cell, row) => row.attributes.max_supply
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
