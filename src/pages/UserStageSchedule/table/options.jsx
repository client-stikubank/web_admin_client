import _ from 'lodash'
import { Badge } from 'reactstrap'
import { toDatetime24, fullDate } from '@/helpers/format/date'

export const columns = [
  {
    dataField: 'user',
    text: 'Peserta',
    sort: false,
    formatter: (cell, row) => {
      const user = row.attributes.user.data.attributes
      const userProfile = user.user_profile.data.attributes

      const statusOptions = () => {
        switch (row.attributes.status) {
          case 'pending':
            return { class: 'warning', text: 'Pending' }
          case 'confirmed':
            return { class: 'info', text: 'Hadir' }
          case 'finish':
            return { class: 'success', text: 'Selesai' }
          case 'rejected':
            return { class: 'danger', text: 'Dibatalkan' }
          case 'absent':
            return { class: 'danger', text: 'Tidak Hadir' }
          default:
            return { class: 'warning', text: 'Pending' }
        }
      }

      return (
        <>
          <h6>
            {userProfile.first_name} {userProfile.last_name}
          </h6>
          <p>{row.attributes.user.data.attributes.email}</p>
          <p>{row.id}</p>
          <Badge
            className={` font-size-14 badge-soft-${statusOptions().class}`}
            color={'red'}
          >
            {statusOptions().text}
          </Badge>
        </>
      )
    }
  },
  {
    dataField: 'camp',
    text: 'Pelatihan',
    sort: false,
    formatter: (cell, row) => {
      const stageCamp = row.attributes.stage_camp.data.attributes
      const schedule = row.attributes.stage_camp_schedule
      const camp = stageCamp.camp.data.attributes
      const stage = stageCamp.stage

      return (
        <>
          <h6>
            Level {stage.level} - {stage.name}
          </h6>
          <p>{camp.title}</p>
          <i className='bx bx-calendar me-1' />
          {fullDate(schedule.started_at)}
          <br />
          <p>
            <i className='bx bx-time me-1' />
            {schedule.time_start} - {schedule.time_end}
          </p>
          <Badge className={`font-size-14 badge-soft-info`} color={'red'}>
            {_.upperCase(schedule.status)}
          </Badge>
        </>
      )
    }
  },
  {
    dataField: 'created_at',
    text: 'Tanggal Gabung',
    sort: true,
    formatter: (cell, row) => toDatetime24(row.attributes.created_at)
  }
]

export const selectRow = setSelectedId => ({
  mode: 'radio',
  clickToSelect: false,
  hideSelectColumn: true,
  bgColor: 'rgba(239, 242, 247, 0.5)',
  onSelect: row => {
    setSelectedId(row)
  }
})
