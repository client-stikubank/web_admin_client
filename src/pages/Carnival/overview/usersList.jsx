import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { getUserStageSchedules } from '@/store/actions'

// Pages
import UserStageSchedule from '@/pages/UserStageSchedule'

const usersList = ({ carnivalId }) => {
  const dispatch = useDispatch()

  const fetchSchedules = params => {
    dispatch(
      getUserStageSchedules({
        query: {
          carnival_id_eq: carnivalId
        },
        ...params
      })
    )
  }

  return (
    <UserStageSchedule
      customTitle='Daftar Peserta Pelatihan'
      defaultDispatch={fetchSchedules}
      shared
    />
  )
}

usersList.propTypes = {
  carnivalId: PropTypes.array
}

export default usersList
