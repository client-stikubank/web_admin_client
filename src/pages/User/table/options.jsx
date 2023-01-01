import _ from 'lodash'
import imagePlaceholder from '@/assets/images/mamo.webp'

export const columns = [
  {
    dataField: 'email',
    text: 'Email',
    sort: false,
    formatter: (cell, row) => (
      <div className='d-flex align-items-center'>
        <img
          src={
            row.attributes.user_profile.data.attributes?.image?.url ||
            imagePlaceholder
          }
          alt=''
          className='avatar-sm rounded-circle img-thumbnail me-2'
        />
        <span>{row.attributes.email}</span>
      </div>
    )
  },
  {
    dataField: 'name',
    text: 'Nama',
    sort: false,
    formatter: (cell, row) =>
      `${row.attributes.user_profile.data.attributes.first_name} ${row.attributes.user_profile.data.attributes.last_name}`
  },
  {
    dataField: 'phone_number',
    text: 'No. Handphone',
    sort: false,
    formatter: (cell, row) =>
      `${row.attributes.user_profile.data.attributes.phone_number}`
  },
  {
    dataField: 'role',
    text: 'Role',
    sort: false,
    formatter: (cell, row) => row.attributes.role
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
