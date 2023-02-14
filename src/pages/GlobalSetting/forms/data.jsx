import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Form, Label } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'

// Components
import {
  LoadingButton,
  InputField,
  Confirmation
} from '@/components/Form'

// Actions
import { addNewGlobalSetting, updateGlobalSetting, closeModal } from '@/store/actions'

const FormData = ({ currentData }) => {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: currentData?.attributes.name,
      code: currentData?.attributes.code,
      value: currentData?.attributes.value,
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.GlobalSetting.isLoading
  }))

  const onSubmit = data => {
    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateGlobalSetting({ global_setting: confirmation })
      : addNewGlobalSetting({ global_setting: confirmation })
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
          <Label>Kode</Label>
          <InputField
            className={`form-control ${errors.code && 'is-invalid'}`}
            readOnly
            {...register('code', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.code?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Value</Label>
          <InputField
            type='textarea'
            className='form-control'
            {...register('value')}
          />
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
