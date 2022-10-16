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
  Confirmation
} from '@/components/Form'

// API
import { getUsers } from '@/api/user'

// Actions
import { addNewCamp, updateCamp, closeModal } from '@/store/actions'

// Constants
import { LEVELS, CAMP_STATUSES } from '@/constants/select-options'

// Helpers
import { speakerOptions } from '@/helpers/render/options'

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
      reward_amount: currentData?.attributes.reward_amount?.join(''),
      status: _.find(CAMP_STATUSES, {
        value: parseInt(currentData?.attributes['active?'] ? 1 : 0)
      }),
      speaker_id: currentData && {
        value: currentData?.attributes.speaker?.data.id,
        label: speakerOptions(currentData?.attributes.speaker?.data)
      }
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.Camp.isLoading
  }))

  const onSubmit = data => {
    data.level = data.level.value
    data.status = data.status.value
    data.speaker_id = data.speaker_id.value
    data.reward_amount = data.reward_amount.split('').map(Number)

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
          <Label>Speaker</Label>
          <Controller
            name='speaker_id'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <AsyncSelectField
                api={getUsers}
                defaultParams={{
                  roles_name_eq: 'speaker'
                }}
                query='email_or_user_profile_first_name_or_user_profile_last_name_cont'
                placeholder='Pilih Speaker'
                renderOptions={speakerOptions}
                height={50}
                className={errors.speaker_id && 'is-invalid'}
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
