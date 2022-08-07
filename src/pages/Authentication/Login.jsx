import React, { useEffect } from 'react'
import MetaTags from 'react-meta-tags'
import { Row, Col, CardBody, Card, Alert, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import PropTypes from 'prop-types'
import toast from '../../helpers/toast'
import * as message from '../../constants/message'

// Redux actions
import { loginUser } from '../../store/actions'

// Images
import profile from '../../assets/images/profile-img.png'
import logo from '../../assets/images/logo.svg'

const Login = props => {
  const dispatch = useDispatch()

  const { error } = useSelector(state => ({
    error: state.Login.error
  }))

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    dispatch(loginUser(values, props.history, props.t))
  }

  /**
   * If token is expired, we check "is-kicked" from localStorage, if it exist we show toast message
   * to explain user their session has been expired, if there is no "is-kicked" from localStorage, toast will not show
   *
   * We add "is-kicked" to localStorage code in "@helpers/api-helpers.js (axios interceptor)"
   */

  const isExpired = localStorage.getItem('is-kicked')
  const isDenied = localStorage.getItem('is-denied')
  const afterResetPassword = localStorage.getItem('reset-password-success')

  useEffect(() => {
    if (isExpired) {
      toast(message.TOKEN_EXPIRED, 'error')
    } else if (isDenied) {
      toast(message.ACCESS_DENIED, 'error')
    } else if (afterResetPassword) {
      toast(message.RESET_PASSWORD_SUCCESS, 'success')
    }
  }, [isExpired])

  /**
   * When this page is reloaded or unmount, we remove "is-kicked" from localStorage, to prevent
   * toast to show
   */

  useEffect(() => {
    // When reloading page
    window.onbeforeunload = function () {
      localStorage.removeItem('is-kicked')
      localStorage.removeItem('is-denied')
      localStorage.removeItem('reset-password-success')
      return
    }

    // When route change
    return () => {
      window.onbeforeunload = null
      localStorage.removeItem('is-kicked')
      localStorage.removeItem('is-denied')
      localStorage.removeItem('reset-password-success')
    }
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | YouthCamp Admin</title>
      </MetaTags>
      <div className='account-pages pt-md-5 pt-3'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <Card className='overflow-hidden'>
                <div className='bg-primary bg-soft'>
                  <Row>
                    <Col xs={7}>
                      <div className='text-primary p-4'>
                        <h5 className='text-primary'>{props.t('Welcome!')}</h5>
                        <p>{props.t('Sign in to Admin Portal')}</p>
                      </div>
                    </Col>
                    <Col className='col-5 align-self-end'>
                      <img src={profile} alt='' className='img-fluid' />
                    </Col>
                  </Row>
                </div>
                <CardBody className='pt-0'>
                  <div>
                    <Link to='/' className='auth-logo-light'>
                      <div className='avatar-md profile-user-wid mb-4'>
                        <span className='avatar-title rounded-circle bg-light'>
                          <img
                            src={logo}
                            alt=''
                            className='rounded-circle'
                            height='34'
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className='p-2'>
                    <AvForm
                      className='form-horizontal'
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {error ? <Alert color='danger'>{error}</Alert> : null}
                      <div className='mb-2'>
                        <AvField
                          name='email'
                          label='Email'
                          className='form-control'
                          placeholder='Enter email'
                          type='email'
                          required
                        />
                      </div>

                      <div className='mb-2'>
                        <AvField
                          name='password'
                          label='Password'
                          type='password'
                          required
                          placeholder='Enter Password'
                        />
                      </div>

                      <div className='mt-3 d-grid'>
                        <button
                          className='btn btn-primary btn-block'
                          type='submit'
                        >
                          Log In
                        </button>
                      </div>
                      <div className='mt-3 d-sm-flex align-items-center justify-content-center '>
                        <Link to='/forgot-password'>Lupa Password</Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className='mt-5 text-center'>
                <p>© {new Date().getFullYear()} YouthCamp</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Login.propTypes = {
  history: PropTypes.object,
  t: PropTypes.any
}

export default withRouter(withTranslation()(Login))
