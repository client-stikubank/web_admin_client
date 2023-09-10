import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Form, Label } from "reactstrap";
import _ from "lodash";
import { QRCode } from "react-qrcode-logo";
import PropTypes from "prop-types";

import qrIcon from "@/assets/brand/icon.png";

// Components
import {
  LoadingButton,
  InputField,
  AsyncSelectField,
  SelectField,
  DatepickerField,
  Confirmation,
} from "@/components/Form";

// API
import { getCities } from "@/api/city";

// Actions
import { addNewQrclue, updateQrclue, closeModal } from "@/store/actions";

// Constants
import { EVENT_STATUSES } from "@/constants/select-options";

// Helpers
import {
  toFormattedDatetime,
  toFormattedDate,
  todayFormat,
  toTime,
  toDate,
  formatTime,
} from "@/helpers/format/date";

const FormData = ({ currentData }) => {
  const dispatch = useDispatch();
  const [confirmation, setConfirmation] = useState();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      clue: currentData?.attributes.clue,
      answers: currentData?.attributes?.answers?.join("\n"),
      reward_amount: currentData?.attributes.reward_amount?.join(""),
      start_date: currentData?.attributes?.start_date
        ? toDate(currentData?.attributes?.start_date)
        : null,
      end_date: currentData?.attributes?.end_date
        ? toDate(currentData?.attributes?.end_date)
        : null,
      status: _.find(EVENT_STATUSES, {
        value: currentData?.attributes?.status,
      }),
    },
  });

  const { isLoading } = useSelector((state) => ({
    isLoading: state.Qrclue.isLoading,
  }));

  const onSubmit = (data) => {
    if (data.image?.length > 0) {
      data.image = data.image[0];
    } else {
      delete data.image;
    }

    setConfirmation(data);
  };

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateQrclue({ qrclue: confirmation })
      : addNewQrclue({ qrclue: confirmation });
    dispatch(submitDispatch);
    setConfirmation();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Confirmation
        data={confirmation}
        confirm={submitWithConfirmation}
        cancel={() => setConfirmation()}
      />
      {currentData && (
        <input
          type="hidden"
          value={currentData?.id}
          {...register("id", { required: true })}
        />
      )}
      <div className="modal-body">
        <div className="mb-2">
          <Label>Petunjuk</Label>
          <InputField
            type="text"
            className={`form-control ${errors.clue && "is-invalid"}`}
            {...register("clue", { required: true })}
          />
          <span className="text-danger invalid-feedback">
            {errors.clue?.type === "required" && "Tidak boleh kosong!"}
          </span>
        </div>

        <div className="mb-2">
          <Label>Gambar</Label>
          <InputField
            type="file"
            className="form-control"
            {...register("image")}
          />
          {currentData?.attributes?.image.url && (
            <a
              href={currentData?.attributes?.image.url}
              target="_blank"
              className="d-block mt-2"
            >
              Klik untuk lihat gambar sebelumnya
            </a>
          )}
        </div>

        {currentData?.id && (
          <QRCode
            value={currentData?.id}
            logoImage={qrIcon}
            logoWidth={300}
            logoOpacity={0.2}
            qrStyle="dots"
            bgColor="#FFC40C"
            fgColor="#EE157F"
            quietZone={20}
            size={300}
            eyeColor={["#EE157F", "#96519B", "#2EB4AC"]}
            eyeRadius={[
              {
                outer: [16, 16, 0, 16],
                inner: [1, 1, 1, 1],
              },
              {
                outer: [16, 16, 16, 0],
                inner: [1, 1, 1, 1],
              },
              {
                outer: [16, 0, 16, 16],
                inner: [1, 1, 1, 1],
              },
            ]}
          />
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => dispatch(closeModal())}
          disabled={isLoading}
        >
          Batalkan
        </button>
        {isLoading ? (
          <LoadingButton className="btn btn-primary" />
        ) : (
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        )}
      </div>
    </Form>
  );
};

FormData.propTypes = {
  currentData: PropTypes.object,
};

export default FormData;
