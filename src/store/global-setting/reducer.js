import {
  GET_GLOBAL_SETTINGS_FAIL,
  GET_GLOBAL_SETTINGS_SUCCESS,
  ADD_GLOBAL_SETTING_SUCCESS,
  ADD_GLOBAL_SETTING_FAIL,
  UPDATE_GLOBAL_SETTING_SUCCESS,
  UPDATE_GLOBAL_SETTING_FAIL,
  DELETE_GLOBAL_SETTING_SUCCESS,
  DELETE_GLOBAL_SETTING_FAIL,
  LOADING_GLOBAL_SETTING
} from './actionTypes'

const INIT_STATE = {
  globalSettings: {},
  currentParams: {
    page: 1,
    per_page: 10
  },
  globalSettingDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const globalSettings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GLOBAL_SETTINGS_SUCCESS:
      return {
        ...state,
        globalSettings: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_GLOBAL_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_GLOBAL_SETTING_SUCCESS:
      return {
        ...state,
        globalSettings: {
          data: [action.payload.data, ...state.globalSettings.data],
          pagination: state.globalSettings.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_GLOBAL_SETTING_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_GLOBAL_SETTING_SUCCESS:
      return {
        ...state,
        globalSettings: {
          data: state.globalSettings.data.map(globalSetting =>
            globalSetting.id.toString() === action.payload.id.toString()
              ? { globalSetting, ...action.payload }
              : globalSetting
          ),
          pagination: state.globalSettings.pagination
        },
        globalSettingDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_GLOBAL_SETTING_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_GLOBAL_SETTING_SUCCESS:
      return {
        ...state,
        globalSettings: {
          data: state.globalSettings.data.filter(
            globalSetting => globalSetting.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.globalSettings.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_GLOBAL_SETTING_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_GLOBAL_SETTING:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default globalSettings
