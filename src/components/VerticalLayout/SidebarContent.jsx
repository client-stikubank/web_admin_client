import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

// //Import Scrollbar
import SimpleBar from 'simplebar-react'

// MetisMenu
import MetisMenu from 'metismenujs'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

//i18n
import { withTranslation } from 'react-i18next'

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu('#side-menu')
      let matchingMenuItem = null
      const ul = document.getElementById('side-menu')
      const items = ul.getElementsByTagName('a')
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add('active')
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show')
    }

    if (parent) {
      parent.classList.add('mm-active')
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add('mm-show') // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add('mm-active') // li
          parent3.childNodes[0].classList.add('mm-active') //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add('mm-show') // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add('mm-show') // li
              parent5.childNodes[0].classList.add('mm-active') // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className='h-100' ref={ref}>
        <div id='sidebar-menu'>
          <ul className='metismenu list-unstyled' id='side-menu'>
            <li>
              <Link to='/#'>
                <i className='bx bx-home-circle'></i>
                <span>{props.t('Dashboards')}</span>
              </Link>
            </li>

            <li className='menu-title'>{props.t('Master Data')}</li>

            <li>
              <Link to='/carnival'>
                <i className='bx bx-right-arrow'></i>
                <span>{props.t('Carnival')}</span>
              </Link>
            </li>

            <li>
              <Link to='/#'>
                <i className='bx bx-chat'></i>
                <span>{props.t('Chat')}</span>
              </Link>
            </li>
            <li>
              <Link to='/#'>
                <i className='bx bx-file'></i>
                <span className='badge rounded-pill bg-success float-end'>
                  {props.t('New')}
                </span>
                <span>{props.t('File Manager')}</span>
              </Link>
            </li>

            <li>
              <Link to='/#' className='has-arrow'>
                <i className='bx bx-store'></i>
                <span>{props.t('Ecommerce')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/#'>{props.t('Products')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Product Detail')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Orders')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Customers')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Cart')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Checkout')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Shops')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Add Product')}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to='/#' className='has-arrow '>
                <i className='bx bx-bitcoin'></i>
                <span>{props.t('Crypto')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/#'>{props.t('Wallet')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Buy/Sell')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Exchange')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Lending')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Orders')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('KYC Application')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('ICO Landing')}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to='/#' className='has-arrow '>
                <i className='bx bx-envelope'></i>
                <span>{props.t('Email')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/#'>{props.t('Inbox')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Read Email')} </Link>
                </li>
                <li>
                  <Link to='/#'>
                    <span
                      className='badge rounded-pill badge-soft-success float-end'
                      key='t-new'
                    >
                      {props.t('New')}
                    </span>
                    <span key='t-email-templates'>{props.t('Templates')}</span>
                  </Link>
                  <ul className='sub-menu'>
                    <li>
                      <Link to='/#'>{props.t('Basic Action')}</Link>
                    </li>
                    <li>
                      <Link to='/#'>{props.t('Alert Email')} </Link>
                    </li>
                    <li>
                      <Link to='/#'>{props.t('Billing Email')} </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to='/#' className='has-arrow '>
                <i className='bx bx-receipt'></i>
                <span>{props.t('Invoices')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/#'>{props.t('Invoice List')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Invoice Detail')}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to='/#' className='has-arrow '>
                <i className='bx bx-briefcase-alt-2'></i>
                <span>{props.t('Projects')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/#'>{props.t('Projects Grid')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Projects List')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Project Overview')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Create New')}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to='/#' className='has-arrow '>
                <i className='bx bx-task'></i>
                <span>{props.t('Tasks')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/#'>{props.t('Task List')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Kanban Board')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Create Task')}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to='/#' className='has-arrow '>
                <i className='bx bxs-user-detail'></i>
                <span>{props.t('Contacts')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/#'>{props.t('User Grid')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('User List')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Profile')}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to='/#'>
                <span className='badge rounded-pill bg-success float-end'>
                  {props.t('New')}
                </span>
                <i className='bx bxs-detail' />

                <span>{props.t('Blog')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/#'>{props.t('Blog List')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Blog Grid')}</Link>
                </li>
                <li>
                  <Link to='/#'>{props.t('Blog Details')}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
}

export default withRouter(withTranslation()(SidebarContent))
