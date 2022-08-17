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
  SelectField,
  Confirmation
} from '@/components/Form'

// Actions
import { addNewCamp, updateCamp, closeModal } from '@/store/actions'

// Constants
import { LEVELS, CAMP_STATUSES } from '@/constants/select-options'

const FormData = ({ currentData }) => {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: currentData?.attributes.title,
      description: currentData?.attributes.description,
      level: _.find(LEVELS, {
        value: parseInt(currentData?.attributes.level || 1)
      }),
      status: _.find(CAMP_STATUSES, {
        value: parseInt(currentData?.attributes['active?'] ? 1 : 0)
      })
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.Camp.isLoading
  }))

  const onSubmit = data => {
    data.level = data.level.value
    data.status = data.status.value

    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateCamp({ camp: confirmation })
      : addNewCamp({ camp: confirmation })
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
          <Label>Judul</Label>
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
          <Label>Level</Label>
          <Controller
            name='level'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectField
                className={`${errors.level && 'is-invalid'}`}
                options={LEVELS}
                placeholder='Pilih Level'
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
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
                options={CAMP_STATUSES}
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
