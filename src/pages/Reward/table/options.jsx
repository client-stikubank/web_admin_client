import _ from 'lodash'
import { Badge } from 'reactstrap'
import { toDatetime24 } from '@/helpers/format/date'

export const columns = [
  {
    dataField: 'title',
    text: 'User',
    sort: false,
    formatter: (cell, row) => {
      const user = row.attributes.user.data.attributes
      const userProfile = user.user_profile.data.attributes

      return (
        <>
          <h6>
            {userProfile.first_name} {userProfile.last_name}
          </h6>
          <p>{row.attributes.user.data.attributes.email}</p>
        </>
      )
    }
  },
  {
    dataField: 'amount',
    text: 'Reward',
    sort: true,
    formatter: (cell, row) =>
      `${row.attributes.amount} ${row.attributes.coin.data.attributes.name}`
  },
  {
    dataField: 'updated_at',
    text: 'Tanggal',
    sort: true,
    formatter: (cell, row) => toDatetime24(row.attributes.updated_at)
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true,
    formatter: (cell, row) => {
      const statusOptions = () => {
        switch (row.attributes.status) {
          case 'pending':
            return { class: 'warning', text: 'Pending' }
          case 'processed':
            return { class: 'info', text: 'Sedang Diproses' }
          case 'completed':
            return { class: 'success', text: 'Selesai' }
          default:
            return { class: 'warning', text: 'Pending' }
        }
      }

      return (
        <Badge
          className={` font-size-14 badge-soft-${statusOptions().class}`}
          color={'red'}
        >
          {statusOptions().text}
        </Badge>
      )
    }
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
