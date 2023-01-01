import _ from 'lodash'
import { Badge } from 'reactstrap'
import { monsta } from '@/helpers/render/text'

export const columns = [
  {
    dataField: 'image',
    text: 'Gambar',
    sort: false,
    formatter: (cell, row) => (
      <div className='d-flex justify-content-center align-items-start'>
        <img style={{ width: '80px' }} src={row.attributes?.image.url} />
      </div>
    ),
    headerStyle: (colum, colIndex) => {
      return { width: '100px', textAlign: 'center' }
    }
  },
  {
    dataField: 'name',
    text: 'Nama',
    sort: true,
    formatter: (cell, row) => (
      <div>
        <b>{row.attributes.name}</b>
        <br />
        <small>Kode: {row.attributes.code}</small>
      </div>
    )
  },
  {
    dataField: 'description',
    text: 'Deskripsi',
    sort: false,
    formatter: (cell, row) => row.attributes.description
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
