import { del, get, postFormData, put } from "../helpers/api_helper";
import * as url from "@/helpers/url_helper";
import * as storage from "@/helpers/storage";
import _ from "lodash";

export const getQrclues = (params) => {
  return get(url.URL_QRCLUES, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
    },
  });
};

export const getQrcluesDetails = (id) => {
  return get(`${url.URL_QRCLUES}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
    },
  });
};

export const addNewQrclue = (data) => {
  let formData = new FormData();
  _.forEach(data.qrclue, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`qr_clue[${key}][${subKey}]`, subValue)
      );
    } else if (_.isArray(value)) {
      if (key === "reward_amount" || key === "answers") {
        _.forEach(value, (amount) =>
          formData.append(`qr_clue[${key}][]`, amount)
        );
      } else {
        formData.append(`qr_clue[${key}][]`, value);
      }
    } else {
      formData.append(`qr_clue[${key}]`, value);
    }
  });

  return postFormData(
    url.URL_QRCLUES,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    "POST"
  );
};

export const updateQrclue = (data) => {
  let formData = new FormData();
  _.forEach(data.qrclue, (value, key, index) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`qr_clue[${key}][${subKey}]`, subValue)
      );
    } else if (_.isArray(value)) {
      if (key === "reward_amount" || key === "answers") {
        _.forEach(value, (amount) =>
          formData.append(`qr_clue[${key}][]`, amount)
        );
      } else {
        formData.append(`qr_clue[${key}][]`, value);
      }
    } else {
      formData.append(`qr_clue[${key}]`, value);
    }
  });

  return postFormData(
    url.URL_QRCLUES + `/${data.qrclue.id}`,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    "PUT"
  );
};

export const deleteQrclue = (id) => {
  return del(`${url.URL_QRCLUES}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
    },
  });
};
