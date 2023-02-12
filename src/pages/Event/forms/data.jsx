import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Form, Label } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'

// Components
import {
  LoadingButton,
  InputField,
  AsyncSelectField,
  SelectField,
  DatepickerField,
  Confirmation
} from '@/components/Form'

// API
import { getCities } from '@/api/city'

// Actions
import { addNewEvent, updateEvent, closeModal } from '@/store/actions'

// Constants
import { EVENT_STATUSES } from '@/constants/select-options'

// Helpers
import {
  toFormattedDatetime,
  toFormattedDate,
  todayFormat,
  toTime,
  toDate,
  formatTime
} from '@/helpers/format/date'

const FormData = ({ currentData }) => {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState()

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: currentData?.attributes.title,
      description: currentData?.attributes.description,
      address: currentData?.attributes.address,
      map_link: currentData?.attributes.map_link,
      reward_amount: currentData?.attributes.reward_amount?.join(''),
      city_id: currentData && {
        value: currentData?.attributes.city?.data.id,
        label: currentData?.attributes.city?.data?.attributes?.name
      },
      duration: currentData
        ? [formatTime(currentData?.attributes.duration)]
        : '00:00',
      event_at: currentData?.attributes?.event_at
        ? toDate(currentData?.attributes?.event_at)
        : null,
      start_date: currentData?.attributes?.start_date
        ? toDate(currentData?.attributes?.start_date)
        : null,
      end_date: currentData?.attributes?.end_date
        ? toDate(currentData?.attributes?.end_date)
        : null,
      status: _.find(EVENT_STATUSES, {
        value: currentData?.attributes?.status
      })
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.Event.isLoading
  }))

  const onSubmit = data => {
    if (data.image?.length > 0) {
      data.image = data.image[0]
    } else {
      delete data.image
    }
    data.status = data.status.value
    data.city_id = data.city_id.value
    data.duration = _.isArray(data.duration)
      ? toTime(data.duration[0])
      : data.duration
    data.event_at = data.event_at = toFormattedDatetime(
      _.isArray(data.event_at) ? data.event_at[0] : data.event_at
    )
    data.start_date = data.start_date = toFormattedDate(
      _.isArray(data.start_date) ? data.start_date[0] : data.start_date
    )
    data.end_date = data.end_date = toFormattedDate(
      _.isArray(data.end_date) ? data.end_date[0] : data.end_date
    )
    data.reward_amount = data.reward_amount.split('').map(Number)

    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateEvent({ event: confirmation })
      : addNewEvent({ event: confirmation })
    dispatch(submitDispatch)
    setConfirmation()
  }

  console.log(watch('event_at'))

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Confirmation
        data={confirmation}
        confirm={submitWithConfirmation}
        cancel={() => setConfirmation()}
      />
      {currentData && (
        <input
          type='hidden'
          value={currentData?.id}
          {...register('id', { required: true })}
        />
      )}
      <div className='modal-body'>
        <div className='mb-2'>
          <Label>Nama Acara</Label>
          <InputField
            className={`form-control ${errors.title && 'is-invalid'}`}
            {...register('title', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.title?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Deskripsi</Label>
          <InputField
            type='textarea'
            className='form-control'
            {...register('description')}
          />
        </div>

        <div className='mb-2'>
          <Label>Gambar</Label>
          <InputField
            type='file'
            className='form-control'
            {...register('image')}
          />
          {currentData?.attributes?.image.url && (
            <a
              href={currentData?.attributes?.image.url}
              target='_blank'
              className='d-block mt-2'
            >
              Klik untuk lihat gambar sebelumnya
            </a>
          )}
        </div>

        <div className='mb-2'>
          <Label>Tempat/Alamat</Label>
          <InputField className='form-control' {...register('address')} />
        </div>

        <div className='mb-2'>
          <Label>Map/Direction Link</Label>
          <InputField className='form-control' {...register('map_link')} />
        </div>

        <div className='mb-2'>
          <Label>Kota</Label>
          <Controller
            name='city_id'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <AsyncSelectField
                label='name'
                api={getCities}
                query='name_cont'
                placeholder='Pilih Kota'
                className={errors.city_id && 'is-invalid'}
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
          </span>
        </div>

        <div className='mb-2'>
          <Label>Durasi Acara (jam:menit)</Label>
          <Controller
            name='duration'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                className={errors.duration && 'is-invalid'}
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
          <Label>Tanggal Acara</Label>
          <Controller
            name='event_at'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                className={errors.event_at && 'is-invalid'}
                options={{
                  minDate: todayFormat(),
                  enableTime: true,
                  dateFormat: 'DD/MM/YYYY HH:mm'
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
          <Label>Tanggal Mulai Post</Label>
          <Controller
            name='start_date'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                disabled={!watch('event_at')}
                options={{
                  minDate: todayFormat(),
                  maxDate: watch('event_at') && watch('event_at')[0]
                }}
                className={errors.start_date && 'is-invalid'}
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
          </span>
        </div>

        <div className='mb-2'>
          <Label>Tanggal Selesai Post</Label>
          <Controller
            name='end_date'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                disabled={!watch('start_date')}
                options={{
                  minDate: watch('start_date') && watch('start_date')[0],
                  maxDate: watch('event_at') && watch('event_at')[0]
                }}
                className={errors.end_date && 'is-invalid'}
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
          </span>
        </div>

        <div className='mb-2'>
          <Label>Reward MONSTA</Label>
          <InputField
            type='number'
            className={`form-control ${errors.reward_amount && 'is-invalid'}`}
            {...register('reward_amount', {
              required: true,
              maxLength: 4,
              minLength: 4
            })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.reward_amount?.type === 'required' && 'Tidak boleh kosong!'}
            {['maxLength', 'minLength'].includes(errors.reward_amount?.type) &&
              'Harus 4 angka!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Status</Label>
          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectField
                className={`${errors.status && 'is-invalid'}`}
                options={EVENT_STATUSES}
                placeholder='Pilih Status'
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
          </span>
        </div>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => dispatch(closeModal())}
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
    </Form>
  )
}

FormData.propTypes = {
  currentData: PropTypes.object
}

export default FormData
