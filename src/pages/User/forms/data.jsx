import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Form, Label, Row, Col } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'

// Components
import {
  LoadingButton,
  InputField,
  SelectField,
  DatepickerField,
  Confirmation
} from '@/components/Form'

// Actions
import { addNewUser, updateUser, closeModal } from '@/store/actions'

// Constants
import { ROLES } from '@/constants/select-options'

// Helpers
import { toDate, toFormattedDate } from '@/helpers/format/date'
import { BACKEND_API_URL } from '@/helpers/environment'

const FormData = ({ currentData }) => {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState()

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: currentData?.attributes.email,
      role: _.find(ROLES, {
        label: currentData?.attributes.role
      }),
      user_profile_attributes: {
        first_name:
          currentData?.attributes?.user_profile?.data?.attributes?.first_name,
        last_name:
          currentData?.attributes?.user_profile?.data?.attributes?.last_name,
        phone_number:
          currentData?.attributes?.user_profile?.data?.attributes?.phone_number,
        birth_date: toDate(
          currentData?.attributes?.user_profile?.data?.attributes?.birth_date
        )
      }
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.User.isLoading
  }))

  const onSubmit = data => {
    data.user_profile_attributes.image = data.user_profile_attributes.image[0]
    data.user_profile_attributes.birth_date = toFormattedDate(
      _.isArray(data.user_profile_attributes.birth_date)
        ? data.user_profile_attributes.birth_date[0]
        : data.user_profile_attributes.birth_date
    )
    const roleTypes = {
      role_types: [data.role?.value]
    }
    delete data.role
    console.log(data)
    setConfirmation({ ...data, ...roleTypes })
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateUser({ user: confirmation })
      : addNewUser({ user: confirmation })
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
          <Label>Email</Label>
          <InputField
            className={`form-control ${errors.email && 'is-invalid'}`}
            {...register('email', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.email?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

        {!currentData && (
          <div className='mb-2'>
            <Label>Role</Label>
            <Controller
              name='role'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectField
                  className={`${errors.role && 'is-invalid'}`}
                  options={ROLES}
                  placeholder='Pilih Role'
                  {...field}
                />
              )}
            />
            <span className='text-danger invalid-feedback'>
              Tidak boleh kosong!
            </span>
          </div>
        )}

        <div className='mb-2'>
          <Label>Nama Depan</Label>
          <InputField
            className={`form-control ${
              errors.user_profile_attributes?.first_name && 'is-invalid'
            }`}
            {...register('user_profile_attributes.first_name', {
              required: true
            })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.user_profile_attributes?.first_name?.type === 'required' &&
              'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Nama Belakang</Label>
          <InputField
            className={`form-control ${
              errors.user_profile_attributes?.last_name && 'is-invalid'
            }`}
            {...register('user_profile_attributes.last_name', {
              required: true
            })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.user_profile_attributes?.last_name?.type === 'required' &&
              'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>No. Handpohne</Label>
          <InputField
            className={`form-control ${
              errors.user_profile_attributes?.phone_number && 'is-invalid'
            }`}
            {...register('user_profile_attributes.phone_number', {
              required: true
            })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.user_profile_attributes?.phone_number?.type ===
              'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Tanggal Lahir</Label>
          <Controller
            name='user_profile_attributes.birth_date'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatepickerField
                className={
                  errors.user_profile_attributes?.birth_date && 'is-invalid'
                }
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
          </span>
        </div>

        <div className='mb-2'>
          <Label>Foto</Label>
          <InputField
            type='file'
            className='form-control'
            {...register('user_profile_attributes.image')}
          />
          {currentData?.attributes?.user_profile?.data?.attributes?.image
            .url && (
            <a
              href={`${BACKEND_API_URL}${currentData?.attributes?.user_profile?.data?.attributes?.image.url}`}
              target='_blank'
              className='d-block mt-1'
            >
              Foto saat ini
            </a>
          )}
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
