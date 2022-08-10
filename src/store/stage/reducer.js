import {
  GET_STAGES_SUCCESS,
  UPDATE_STAGE_SUCCESS,
  UPDATE_STAGE_FAIL
} from './actionTypes'

const INIT_STATE = {
  stages: [],
  error: {}
}

const stages = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STAGES_SUCCESS:
      return {
        ...state,
        stages: action.payload
      }

    case UPDATE_STAGE_SUCCESS:
      return {
        ...state,
        stages: state.stages.map(stage => {
          if (stage.id.toString() === action.payload.id.toString()) {
            stage.name = action.payload.attributes.name
          }
          return stage
        })
      }

    case UPDATE_STAGE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default stages
