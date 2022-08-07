import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
// import ModalChangePassword from './ModalChangePassword'
import { setModal } from '@/store/actions'

// Helpers
import * as storage from '@/helpers/storage'

// Image
// import avatarImage from 'assets/images/users/placeholder.png'

const ProfileMenu = () => {
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)

  const openModal = type => {
    dispatch(setModal({ type, show: true }))
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className='d-inline-block'
      >
        <DropdownToggle
          className='btn header-item '
          id='page-header-user-dropdown'
          tag='button'
        >
          <span className='d-none d-xl-inline-block ms-2 me-1'>
            {storage.CURRENT_USER?.email}
          </span>
          <i className='mdi mdi-chevron-down d-none d-xl-inline-block' />
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-end'>
          <DropdownItem onClick={() => openModal('changePassword')}>
            <i className='bx bx-lock-open font-size-16 align-middle me-1 text-danger' />
            <span>Ganti Password</span>
          </DropdownItem>
          <Link to='/logout' className='dropdown-item'>
            <i className='bx bx-power-off font-size-16 align-middle me-1 text-danger' />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
      {/* <ModalChangePassword /> */}
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any
}

export default withRouter(ProfileMenu)
