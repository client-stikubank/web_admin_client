import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Form, Label } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'

// Components
import {
  LoadingButton,
  AsyncSelectField,
  Confirmation
} from '@/components/Form'

// API
import { getCamps } from '@/api/camp'

// Actions
import { addStageCamp, closeModal } from '@/store/actions'

// Helpers
import { campOptions } from '@/helpers/render/options'

const FormStageCamp = ({ currentData }) => {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })

  const { isLoading } = useSelector(state => ({
    isLoading: state.Stage.isLoading
  }))

  const onSubmit = data => {
    data.camp_id = data.camp_id?.value

    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = addStageCamp({ stage_camp: confirmation })
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
          {...register('stage_id', { required: true })}
        />
      )}
      <div className='modal-body'>
        <div className='mb-2'>
          <Label>Pelatihan</Label>
          <Controller
            name='camp_id'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <AsyncSelectField
                api={getCamps}
                defaultParams={{
                  status_eq: 1,
                  level_eq: currentData?.attributes.level,
                  id_not_in: _.map(
                    currentData?.attributes.stage_camps.data,
                    'attributes.camp.id'
                  )
                }}
                query='title_cont'
                placeholder='Pilih Pelatihan'
                renderOptions={campOptions}
                height={50}
                className={errors.camp_id && 'is-invalid'}
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

FormStageCamp.propTypes = {
  currentData: PropTypes.object
}

export default FormStageCamp
