import _ from 'lodash'
import { Badge } from 'reactstrap'
import { monsta } from '@/helpers/render/text'
import { BACKEND_API_URL } from '@/helpers/environment'
import imagePlaceholder from '@/assets/images/mamo.webp'

export const columns = [
  {
    dataField: 'title',
    text: 'Judul',
    sort: true,
    formatter: (cell, row) => row.attributes.title
  },
  {
    dataField: 'level',
    text: 'Level',
    sort: true,
    formatter: (cell, row) => row.attributes.level
  },
  {
    dataField: 'speaker',
    text: 'Speaker',
    sort: true,
    formatter: (cell, row) => {
      const { attributes } = row.attributes.speaker.data
      return (
        <div className='d-flex align-items-center'>
          <img
            src={
              attributes.user_profile.data.attributes?.image.url
                ? attributes.user_profile.data.attributes?.image.url
                : imagePlaceholder
            }
            alt=''
            className='avatar-sm rounded-circle img-thumbnail me-2'
          />
          <span>{attributes.email}</span>
        </div>
      )
    }
  },
  {
    dataField: 'reward_amount',
    text: 'Reward MONSTA',
    sort: true,
    formatter: (cell, row) => monsta(row.attributes?.reward_amount)
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
