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
  DatepickerField,
  Confirmation
} from '@/components/Form'

// Actions
import { addNewCarnival, updateCarnival, closeModal } from '@/store/actions'

// Helpers
import {
  toDate,
  toFormattedDate,
  todayFormat,
  toOptionsFormat
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
      name: currentData?.name,
      finished_at: currentData?.finished_at
        ? toDate(currentData?.finished_at)
        : null
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.Carnival.isLoading
  }))

  const onSubmit = data => {
    data.finished_at = data.finished_at = toFormattedDate(
      _.isArray(data.finished_at) ? data.finished_at[0] : data.finished_at
    )
    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateCarnival({ carnival: confirmation, history })
      : addNewCarnival({ carnival: confirmation })
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
      {currentData && (
        <input
          type='hidden'
          value={currentData?.id}
          {...register('id', { required: true })}
        />
      )}
      <div className='modal-body'>
        <div className='mb-2'>
          <Label>Nama</Label>
          <InputField
            className={`form-control ${errors.name && 'is-invalid'}`}
            {...register('name', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.name?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>
        <div className='mb-2'>
          <Label>Tanggal Selesai</Label>
          <Controller
            name='finished_at'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                options={{ minDate: todayFormat() }}
                className={errors.finished_at && 'is-invalid'}
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
          Kembali
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
