import {
  GET_STAGES_SUCCESS,
  GET_STAGES_FAIL,
  UPDATE_STAGE_SUCCESS,
  UPDATE_STAGE_FAIL,
  ADD_STAGE_CAMP_SUCCESS,
  ADD_STAGE_CAMP_FAIL,
  DELETE_STAGE_CAMP_SUCCESS,
  DELETE_STAGE_CAMP_FAIL,
  LOADING_STAGE
} from './actionTypes'

const INIT_STATE = {
  stages: [],
  error: {},
  isLoading: false
}

const stages = (state = INIT_STATE, action) => {
  const data = action.payload?.data

  switch (action.type) {
    case GET_STAGES_SUCCESS:
      return {
        ...state,
        stages: data
      }

    case GET_STAGES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_STAGE_SUCCESS:
      return {
        ...state,
        stages: state.stages.map(stage => {
          if (stage.id.toString() === data.id.toString()) {
            stage.name = data.attributes.name
          }
          return stage
        })
      }

    case UPDATE_STAGE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_STAGE_CAMP_SUCCESS:
      return {
        ...state,
        stages: state.stages.map(stage => {
          if (stage.id.toString() === data.attributes.stage.id.toString()) {
            stage.attributes.stage_camps.data = [
              ...stage.attributes.stage_camps.data,
              data
            ]
          }
          return stage
        })
      }

    case ADD_STAGE_CAMP_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_STAGE_CAMP_SUCCESS:
      return {
        ...state,
        stages: state.stages.map(stage => {
          if (stage.id.toString() === data.attributes.stage.id.toString()) {
            stage.attributes.stage_camps.data =
              stage.attributes.stage_camps.data.filter(
                stage_camp => stage_camp.id !== data.id
              )
          }
          return stage
        })
      }

    case DELETE_STAGE_CAMP_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_STAGE:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default stages
