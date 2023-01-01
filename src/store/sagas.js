import { all, fork } from 'redux-saga/effects'

import AccountSaga from './auth/register/saga'
import AuthSaga from './auth/login/saga'
import ForgetSaga from './auth/forgetpwd/saga'
import ProfileSaga from './auth/profile/saga'
import LayoutSaga from './layout/saga'

import CarnivalSaga from './carnival/saga'
import StageSaga from './stage/saga'
import CampSaga from './camp/saga'
import StageCampScheduleSaga from './stage-camp-schedule/saga'
import CoinSaga from './coin/saga'
import StockSaga from './stock/saga'
import UserSaga from './user/saga'
import UserStageScheduleSaga from './user-stage-schedule/saga'
import RoleSaga from './role/saga'
import RewardSaga from './reward/saga'
import GiftSaga from './gift/saga'
import CarnivalGiftSaga from './carnival-gift/saga'
import AssessmentQuestionSaga from './assessment-question/saga'
import PersonalitySaga from './personality/saga'
import AssessmentSaga from './assessment/saga'

export default function* rootSaga() {
  yield all([
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(CarnivalSaga),
    fork(StageSaga),
    fork(CampSaga),
    fork(StageCampScheduleSaga),
    fork(CoinSaga),
    fork(StockSaga),
    fork(UserSaga),
    fork(UserStageScheduleSaga),
    fork(RoleSaga),
    fork(RewardSaga),
    fork(GiftSaga),
    fork(CarnivalGiftSaga),
    fork(AssessmentQuestionSaga),
    fork(PersonalitySaga),
    fork(AssessmentSaga)
  ])
}
