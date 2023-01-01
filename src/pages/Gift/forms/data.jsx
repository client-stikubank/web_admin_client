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
import { addNewGift, updateGift, closeModal } from '@/store/actions'

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
      name: currentData?.attributes.name,
      description: currentData?.attributes.description,
      reward_amount: currentData?.attributes.reward_amount?.join('')
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.Gift.isLoading
  }))

  const onSubmit = data => {
    if (data.image?.length > 0) {
      data.image = data.image[0]
    } else {
      delete data.image
    }
    data.reward_amount = data.reward_amount.split('').map(Number)

    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateGift({ gift: confirmation })
      : addNewGift({ gift: confirmation })
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
