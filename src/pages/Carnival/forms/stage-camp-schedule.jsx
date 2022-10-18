import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Form, Label } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'

// Components
import {
  LoadingButton,
  InputField,
  DatepickerField,
  Confirmation
} from '@/components/Form'

// Actions
import {
  addNewStageCampSchedule,
  updateStageCampSchedule,
  setModal
} from '@/store/actions'

// Helpers
import {
  idDate,
  toTime,
  toFormattedDate,
  formatTime
} from '@/helpers/format/date'

const FormCampStageSchedule = ({ stageCamp, date, currentData }) => {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState()

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      started_at: currentData?.attributes.started_at || date,
      time_start: currentData
        ? [formatTime(currentData?.attributes.time_start)]
        : '00:00',
      time_end: currentData
        ? [formatTime(currentData?.attributes.time_end)]
        : '00:00',
      quota: currentData?.attributes.quota,
      link: currentData?.attributes.link
    }
  })

  useEffect(() => {
    if (watch('time_start')[0] > watch('time_end')[0]) {
      setValue('time_end', watch('time_start'))
    }
  }, [watch('time_start')])

  const { isLoading } = useSelector(state => ({
    isLoading: state.Stage.isLoading
  }))

  const onSubmit = data => {
    data.time_start = _.isArray(data.time_start)
      ? toTime(data.time_start[0])
      : data.time_start
    data.time_end = _.isArray(data.time_end)
      ? toTime(data.time_end[0])
      : data.time_end

    data.started_at = toFormattedDate(data.started_at)
    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateStageCampSchedule({
          stage_camp_schedule: confirmation
        })
      : addNewStageCampSchedule({
          stage_camp_schedule: confirmation
        })
    dispatch(submitDispatch)
    setConfirmation()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Confirmation
        data={confirmation}
        confirm={submitWithConfirmation}
        cancel={() => setConfirmation()}
      />
      {!currentData && stageCamp && (
        <input
          type='hidden'
          value={stageCamp?.id}
          {...register('stage_camp_id', { required: true })}
        />
      )}
      {currentData && (
        <input
          type='hidden'
          value={currentData?.id}
          {...register('id', { required: true })}
        />
      )}
      <div className='modal-body'>
        <div className='mb-2'>
          <Label>Tanggal Pelatihan</Label>
          <InputField
            readOnly={true}
            className='form-control'
            defaultValue={idDate(watch('started_at'))}
          />
        </div>

        <div className='mb-2'>
          <Label>Jam Mulai</Label>
          <Controller
            name='time_start'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                className={errors.time_start && 'is-invalid'}
                placeholder=''
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'HH:mm',
                  time_24hr: true
                }}
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
          </span>
        </div>

        <div className='mb-2'>
          <Label>Jam Selesai</Label>
          <Controller
            name='time_end'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                className={errors.time_end && 'is-invalid'}
                disabled={!watch('time_start')}
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'HH:mm',
                  time_24hr: true,
                  minDate: watch('time_start') && watch('time_start')[0]
                }}
                defaultValue='11:00'
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
          </span>
        </div>

        <div className='mb-2'>
          <Label>Kuota Max. Peserta</Label>
          <InputField
            type='number'
            className={`form-control ${errors.quota && 'is-invalid'}`}
            {...register('quota', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.quota?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Link Pelatihan (Zoom, Google Meet, Ms. Teams)</Label>
          <InputField
            className={`form-control ${errors.link && 'is-invalid'}`}
            {...register('link', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.link?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>
      </div>
      <div className='modal-footer d-flex justify-content-between'>
        <button
          type='button'
          className='btn btn-danger'
          onClick={() =>
            dispatch(setModal({ type: 'deleteStageCampSchedule', show: true }))
          }
          disabled={isLoading}
        >
          <i className='bx bx-trash' />
        </button>
        <div className='d-flex gap-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() =>
              dispatch(setModal({ type: 'calendarCampStage', show: true }))
            }
            disabled={isLoading}
          >
            Batalkan
          </button>
          {isLoading ? (
            <LoadingButton className='btn btn-primary' />
          ) : (
            <button type='submit' className='btn btn-primary'>
              Simpan
            </button>
          )}
        </div>
      </div>
    </Form>
  )
}

FormCampStageSchedule.propTypes = {
  stageCamp: PropTypes.object,
  date: PropTypes.any
}

export default FormCampStageSchedule
