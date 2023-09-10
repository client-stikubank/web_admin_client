import {
  GET_QUESTIONNAIRES,
  GET_QUESTIONNAIRES_FAIL,
  GET_QUESTIONNAIRES_SUCCESS,
  ADD_NEW_QUESTIONNAIRE,
  ADD_QUESTIONNAIRE_SUCCESS,
  ADD_QUESTIONNAIRE_FAIL,
  UPDATE_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE_SUCCESS,
  UPDATE_QUESTIONNAIRE_FAIL,
  DELETE_QUESTIONNAIRE,
  DELETE_QUESTIONNAIRE_SUCCESS,
  DELETE_QUESTIONNAIRE_FAIL,
  LOADING_QUESTIONNAIRE,
} from "./actionTypes";

export const getQuestionnaires = (params) => ({
  type: GET_QUESTIONNAIRES,
  payload: params,
});

export const getQuestionnairesSuccess = (questionnaires, params) => ({
  type: GET_QUESTIONNAIRES_SUCCESS,
  payload: questionnaires,
  params,
});

export const getQuestionnairesFail = (error) => ({
  type: GET_QUESTIONNAIRES_FAIL,
  payload: error,
});

export const addNewQuestionnaire = (questionnaire) => ({
  type: ADD_NEW_QUESTIONNAIRE,
  payload: questionnaire,
});

export const addQuestionnaireSuccess = (questionnaire) => ({
  type: ADD_QUESTIONNAIRE_SUCCESS,
  payload: questionnaire,
});

export const addQuestionnaireFail = (error) => ({
  type: ADD_QUESTIONNAIRE_FAIL,
  payload: error,
});

export const updateQuestionnaire = (questionnaire) => ({
  type: UPDATE_QUESTIONNAIRE,
  payload: questionnaire,
});

export const updateQuestionnaireSuccess = (questionnaire) => ({
  type: UPDATE_QUESTIONNAIRE_SUCCESS,
  payload: questionnaire,
});

export const updateQuestionnaireFail = (error) => ({
  type: UPDATE_QUESTIONNAIRE_FAIL,
  payload: error,
});

export const deleteQuestionnaire = (questionnaire) => ({
  type: DELETE_QUESTIONNAIRE,
  payload: questionnaire,
});

export const deleteQuestionnaireSuccess = (questionnaire) => ({
  type: DELETE_QUESTIONNAIRE_SUCCESS,
  payload: questionnaire,
});

export const deleteQuestionnaireFail = (error) => ({
  type: DELETE_QUESTIONNAIRE_FAIL,
  payload: error,
});

export const loadingQuestionnaire = (status) => ({
  type: LOADING_QUESTIONNAIRE,
  payload: status,
});
