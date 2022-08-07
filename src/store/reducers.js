import { combineReducers } from 'redux'

// Front
import Layout from './layout/reducer'
import Modal from './modal/reducer'

// Authentication
import Login from './auth/login/reducer'
import Account from './auth/register/reducer'
import ForgetPassword from './auth/forgetpwd/reducer'
import Profile from './auth/profile/reducer'

import Carnival from './carnival/reducer'

const rootReducer = combineReducers({
  // public
  Layout,
  Modal,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Carnival
})

export default rootReducer
