import _ from 'lodash'
import { Badge } from 'reactstrap'
import { toDatetime24 } from '@/helpers/format/date'

export const columns = [
  {
    dataField: 'first_name',
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
    dataField: 'results',
    text: 'Hasil Tes',
    sort: false,
    formatter: (cell, row) => {
      const results = JSON.parse(row.attributes.results)

      return row.attributes.status === 'pending' ? null : (
        <div className='d-flex'>
          <div className='text-center'>
            <h5>{row.attributes.personality.data.attributes.name}</h5>
            <img
              src={row.attributes.personality.data.attributes.image.url}
              height='80'
            />
          </div>
          <table>
            <tr align='center'>
              <td style={{ padding: '4px 8px' }}>
                <b>Introvert(I)</b>
              </td>
              <td style={{ padding: '4px 8px' }}>
                <b>Extrovert(E)</b>
              </td>
              <td style={{ padding: '4px 8px' }}>
                <b>Intuition(N)</b>
              </td>
              <td style={{ padding: '4px 8px' }}>
                <b>Sensing(S)</b>
              </td>
            </tr>
            <tr align='center'>
              <td style={{ padding: '4px 8px' }}>
                {results['introvert'] || 0}
              </td>
              <td style={{ padding: '4px 8px' }}>
                {results['extrovert'] || 0}
              </td>
              <td style={{ padding: '4px 8px' }}>
                {results['intuition'] || 0}
              </td>
              <td style={{ padding: '4px 8px' }}>{results['sensing'] || 0}</td>
            </tr>
            <tr align='center'>
              <td style={{ padding: '4px 8px' }}>
                <b>Thinking(T)</b>
              </td>
              <td style={{ padding: '4px 8px' }}>
                <b>Feeling(F)</b>
              </td>
              <td style={{ padding: '4px 8px' }}>
                <b>Perceiving(P)</b>
              </td>
              <td style={{ padding: '4px 8px' }}>
                <b>Judging(J)</b>
              </td>
            </tr>
            <tr align='center'>
              <td style={{ padding: '4px 8px' }}>{results['thinking'] || 0}</td>
              <td style={{ padding: '4px 8px' }}>{results['feeling'] || 0}</td>
              <td style={{ padding: '4px 8px' }}>
                {results['perceiving'] || 0}
              </td>
              <td style={{ padding: '4px 8px' }}>{results['judging'] || 0}</td>
            </tr>
          </table>
        </div>
      )
    }
  },
  {
    dataField: 'completed_at',
    text: 'Tanggal Selesai',
    sort: true,
    formatter: (cell, row) =>
      row.attributes.status === 'pending'
        ? ''
        : toDatetime24(row.attributes.completed_at)
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
