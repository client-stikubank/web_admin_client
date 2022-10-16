import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Form, Label } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'

// Components
import { LoadingButton, InputField, Confirmation } from '@/components/Form'

// Actions
import { updateCoin, closeModal } from '@/store/actions'

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
      max_supply: currentData?.attributes.max_supply,
      description: currentData?.attributes.description
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.Coin.isLoading
  }))

  const onSubmit = data => {
    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = updateCoin({ coin: confirmation })
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
            className='form-control'
            value={currentData?.attributes.name}
            disabled={true}
          />
        </div>

        <div className='mb-2'>
          <Label>Pasokan/Supplay</Label>
          <InputField
            type='number'
            className={`form-control ${errors.max_supply && 'is-invalid'}`}
            {...register('max_supply', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.max_supply?.type === 'required' && 'Tidak boleh kosong!'}
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
