import _ from 'lodash'
import { Badge } from 'reactstrap'

export const columns = [
  {
    dataField: 'title',
    text: 'Judul',
    sort: true,
    formatter: (cell, row) => row.attributes.title
  },
  {
    dataField: 'description',
    text: 'Deskripsi',
    sort: true,
    formatter: (cell, row) => row.attributes.description
  },
  {
    dataField: 'level',
    text: 'Level',
    sort: true,
    formatter: (cell, row) => row.attributes.level
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true,
    formatter: (cell, row) => (
      <Badge
        className={` font-size-12 badge-soft-${
          row.attributes['active?'] ? 'success' : 'danger'
        }`}
        color={'red'}
        pill
      >
        {row.attributes['active?'] ? 'Aktif' : 'Tidak Aktif'}
      </Badge>
    )
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
