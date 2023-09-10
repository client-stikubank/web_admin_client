import { del, get, postFormData, put } from "../helpers/api_helper";
import * as url from "@/helpers/url_helper";
import * as storage from "@/helpers/storage";
import _ from "lodash";

export const getQuestionnaires = (params) => {
  return get(url.URL_QUESTIONNAIRES, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
    },
  });
};

export const getQuestionnairesDetails = (id) => {
  return get(`${url.URL_QUESTIONNAIRES}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
    },
  });
};

export const addNewQuestionnaire = (data) => {
  console.log(data);
  let formData = new FormData();
  _.forEach(data.questionnaire, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`questionnaire[${key}][${subKey}]`, subValue)
      );
    } else if (_.isArray(value)) {
      if (key === "reward_amount" || key === "answers") {
        _.forEach(value, (amount) =>
          formData.append(`questionnaire[${key}][]`, amount)
        );
      } else {
        formData.append(`questionnaire[${key}][]`, value);
      }
    } else {
      formData.append(`questionnaire[${key}]`, value);
    }
  });

  return postFormData(
    url.URL_QUESTIONNAIRES,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    "POST"
  );
};

export const updateQuestionnaire = (data) => {
  let formData = new FormData();
  _.forEach(data.questionnaire, (value, key, index) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`questionnaire[${key}][${subKey}]`, subValue)
      );
    } else if (_.isArray(value)) {
      if (key === "reward_amount" || key === "answers") {
        _.forEach(value, (amount) =>
          formData.append(`questionnaire[${key}][]`, amount)
        );
      } else {
        formData.append(`questionnaire[${key}][]`, value);
      }
    } else {
      formData.append(`questionnaire[${key}]`, value);
    }
  });

  return postFormData(
    url.URL_QUESTIONNAIRES + `/${data.questionnaire.id}`,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    "PUT"
  );
};

export const deleteQuestionnaire = (id) => {
  return del(`${url.URL_QUESTIONNAIRES}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
    },
  });
};
