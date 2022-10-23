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
import Stage from './stage/reducer'
import Camp from './camp/reducer'
import StageCampSchedule from './stage-camp-schedule/reducer'
import Coin from './coin/reducer'
import Stock from './stock/reducer'
import User from './user/reducer'
import UserStageSchedule from './user-stage-schedule/reducer'
import Role from './role/reducer'
import Reward from './reward/reducer'

const rootReducer = combineReducers({
  // public
  Layout,
  Modal,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Carnival,
  Stage,
  Camp,
  StageCampSchedule,
  Coin,
  Stock,
  User,
  UserStageSchedule,
  Role,
  Reward
})

export default rootReducer
