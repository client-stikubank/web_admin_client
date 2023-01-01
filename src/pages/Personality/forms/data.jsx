import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Form, Label } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'

// Components
import { LoadingButton, InputField, Confirmation } from '@/components/Form'

// Actions
import {
  addNewPersonality,
  updatePersonality,
  closeModal
} from '@/store/actions'

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
      code: currentData?.attributes.code,
      name: currentData?.attributes.name,
      description: currentData?.attributes?.description || ''
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.Personality.isLoading
  }))

  const onSubmit = data => {
    if (data.image?.length > 0) {
      data.image = data.image[0]
    } else {
      delete data.image
    }
    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updatePersonality({ personality: confirmation })
      : addNewPersonality({ personality: confirmation })
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
          <Label>Kode</Label>
          <InputField
            readOnly
            className={`form-control ${errors.code && 'is-invalid'}`}
            {...register('code', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.code?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

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
