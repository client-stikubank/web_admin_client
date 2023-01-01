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
  SelectField,
  Confirmation
} from '@/components/Form'

// Actions
import {
  addNewAssessmentQuestion,
  updateAssessmentQuestion,
  closeModal
} from '@/store/actions'

// Constants
import {
  CARNIVAL_GIFT_STATUSES,
  CHOICE_TYPES
} from '@/constants/select-options'

const FormData = ({ currentData }) => {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      question: currentData?.attributes.question,
      choice_1_text: currentData?.attributes.choice_1_text,
      choice_2_text: currentData?.attributes.choice_2_text,
      choice_1_type: _.find(CHOICE_TYPES, {
        value: currentData?.attributes.choice_1_type || 'introvert'
      }),
      status: _.find(CARNIVAL_GIFT_STATUSES, {
        value: currentData?.attributes.status || 'inactive'
      })
    }
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.AssessmentQuestion.isLoading
  }))

  const onSubmit = data => {
    // if (data.image?.length > 0) {
    //   data.image = data.image[0]
    // } else {
    //   delete data.image
    // }
    data.choice_1_type = data.choice_1_type.value
    data.choice_2_type = data.choice_2_type.value
    data.status = data.status.value
    setConfirmation(data)
  }

  useEffect(() => {
    if (watch('choice_1_type')) {
      setValue(
        'choice_2_type',
        _.find(CHOICE_TYPES, { invert_of: watch('choice_1_type')?.value })
      )
    }
  }, [watch('choice_1_type')])

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateAssessmentQuestion({ assessment_question: confirmation })
      : addNewAssessmentQuestion({ assessment_question: confirmation })
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
          <Label>Pertanyaan</Label>
          <InputField
            className={`form-control ${errors.question && 'is-invalid'}`}
            {...register('question', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.question?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Text Pilihan 1</Label>
          <InputField
            className={`form-control ${errors.choice_1_text && 'is-invalid'}`}
            {...register('choice_1_text', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.choice_1_text?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Tipe Pilihan 1</Label>
          <Controller
            name='choice_1_type'
            control={control}
            render={({ field }) => (
              <SelectField
                options={CHOICE_TYPES}
                placeholder='Pilih Tipe'
                isDisabled={currentData}
                {...field}
              />
            )}
          />
        </div>

        <div className='mb-2'>
          <Label>Text Pilihan 2</Label>
          <InputField
            className={`form-control ${errors.choice_2_text && 'is-invalid'}`}
            {...register('choice_2_text', { required: true })}
          />
          <span className='text-danger invalid-feedback'>
            {errors.choice_2_text?.type === 'required' && 'Tidak boleh kosong!'}
          </span>
        </div>

        <div className='mb-2'>
          <Label>Tipe Pilihan 2</Label>
          <Controller
            name='choice_2_type'
            control={control}
            render={({ field }) => (
              <SelectField
                options={CHOICE_TYPES}
                placeholder='Pilih Tipe'
                isDisabled={true}
                {...field}
              />
            )}
          />
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
                options={CARNIVAL_GIFT_STATUSES}
                placeholder='Pilih Status'
                {...field}
              />
            )}
          />
          <span className='text-danger invalid-feedback'>
            Tidak boleh kosong!
          </span>
        </div>

        {/* <div className='mb-2'>
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
        </div> */}
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
