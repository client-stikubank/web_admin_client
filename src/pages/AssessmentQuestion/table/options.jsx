import _ from 'lodash'
import { Badge } from 'reactstrap'
import { monsta } from '@/helpers/render/text'
import { CHOICE_TYPES } from '@/constants/select-options'

export const columns = [
  // {
  //   dataField: 'image',
  //   text: 'Gambar',
  //   sort: false,
  //   formatter: (cell, row) => (
  //     <div className='d-flex justify-content-center align-items-start'>
  //       <img style={{ width: '80px' }} src={row.attributes?.image.url} />
  //     </div>
  //   ),
  //   headerStyle: (colum, colIndex) => {
  //     return { width: '100px', textAlign: 'center' }
  //   }
  // },
  {
    dataField: 'question',
    text: 'Pertanyaan',
    sort: true,
    formatter: (cell, row) => row.attributes.question
  },
  {
    dataField: 'choice_1_text',
    text: 'Pilihan 1',
    sort: false,
    formatter: (cell, row) => (
      <>
        <h6>{row.attributes.choice_1_text}</h6>
        <p>
          {_.find(CHOICE_TYPES, { value: row.attributes.choice_1_type }).label}
        </p>
      </>
    )
  },
  {
    dataField: 'choice_2_text',
    text: 'Pilihan 2',
    sort: false,
    formatter: (cell, row) => (
      <>
        <h6>{row.attributes.choice_2_text}</h6>
        <p>
          {_.find(CHOICE_TYPES, { value: row.attributes.choice_2_type }).label}
        </p>
      </>
    )
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true,
    formatter: (cell, row) => (
      <h4>
        <Badge
          className={`badge badge-soft-${
            row.attributes.status === 'active' ? 'success' : 'danger'
          }`}
          color={'red'}
          pill
        >
          {row.attributes.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
        </Badge>
      </h4>
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
