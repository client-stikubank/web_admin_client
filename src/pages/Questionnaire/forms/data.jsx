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
import {
  addNewQuestionnaire,
  updateQuestionnaire,
  closeModal,
} from "@/store/actions";

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
      question: currentData?.attributes.question,
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
    isLoading: state.Questionnaire.isLoading,
  }));

  const onSubmit = (data) => {
    data.answers = data.answers.replace(/\r\n/g, "\n").split("\n");
    data.status = data.status.value;
    data.start_date = data.start_date = toFormattedDate(
      _.isArray(data.start_date) ? data.start_date[0] : data.start_date
    );
    data.end_date = data.end_date = toFormattedDate(
      _.isArray(data.end_date) ? data.end_date[0] : data.end_date
    );
    data.reward_amount = data.reward_amount.split("").map(Number);

    setConfirmation(data);
  };

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateQuestionnaire({ questionnaire: confirmation })
      : addNewQuestionnaire({ questionnaire: confirmation });
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
          <Label>Pertayaan</Label>
          <InputField
            className={`form-control ${errors.question && "is-invalid"}`}
            {...register("question", { required: true })}
          />
          <span className="text-danger invalid-feedback">
            {errors.question?.type === "required" && "Tidak boleh kosong!"}
          </span>
        </div>

        <div className="mb-2">
          <Label>Jawaban (pisahkan dengan enter)</Label>
          <InputField
            type="textarea"
            rows={4}
            className={`form-control ${errors.answers && "is-invalid"} h-`}
            {...register("answers", { required: true })}
          />
          <span className="text-danger invalid-feedback">
            {errors.answers?.type === "required" && "Tidak boleh kosong!"}
          </span>
        </div>

        <div className="mb-2">
          <Label>Tanggal Mulai</Label>
          <Controller
            name="start_date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                className={errors.start_date && "is-invalid"}
                {...field}
              />
            )}
          />
          <span className="text-danger invalid-feedback">
            Tidak boleh kosong!
          </span>
        </div>

        <div className="mb-2">
          <Label>Tanggal Selesai</Label>
          <Controller
            name="end_date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                disabled={!watch("start_date")}
                options={{
                  minDate: watch("start_date") && watch("start_date")[0],
                }}
                className={errors.end_date && "is-invalid"}
                {...field}
              />
            )}
          />
          <span className="text-danger invalid-feedback">
            Tidak boleh kosong!
          </span>
        </div>

        <div className="mb-2">
          <Label>Reward MONSTA</Label>
          <InputField
            type="number"
            className={`form-control ${errors.reward_amount && "is-invalid"}`}
            {...register("reward_amount", {
              required: true,
              maxLength: 4,
              minLength: 4,
            })}
          />
          <span className="text-danger invalid-feedback">
            {errors.reward_amount?.type === "required" && "Tidak boleh kosong!"}
            {["maxLength", "minLength"].includes(errors.reward_amount?.type) &&
              "Harus 4 angka!"}
          </span>
        </div>

        <div className="mb-2">
          <Label>Status</Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectField
                className={`${errors.status && "is-invalid"}`}
                options={EVENT_STATUSES}
                placeholder="Pilih Status"
                {...field}
              />
            )}
          />
          <span className="text-danger invalid-feedback">
            Tidak boleh kosong!
          </span>
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
