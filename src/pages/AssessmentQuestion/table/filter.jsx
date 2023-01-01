import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  Form,
  Label,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody
} from 'reactstrap'
import PropTypes from 'prop-types'

// Actions
import { getAssessmentQuestions } from '@/store/actions'

// Components
import { LoadingButton, InputField, SelectField } from '@/components/Form'

// Constants
import { CHOICE_TYPES, CAMP_STATUSES } from '@/constants/select-options'

const Filter = ({ isOpen, toggle }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, control } = useForm()

  const { currentParams, isLoading } = useSelector(state => ({
    currentParams: state.Camp.currentParams,
    isLoading: state.Camp.isLoading
  }))

  const onSubmit = data => {
    let params = {
      query: {
        choice_1_type_or_choice_2_type_eq: data.type?.value,
        status_eq: data.status?.value
      },
      page: 1
    }
    dispatch(getAssessmentQuestions({ ...currentParams, ...params }))
    toggle(!isOpen)
  }

  const onReset = () => {
    reset({ type: '', status: '' })
    dispatch(
      getAssessmentQuestions({
        page: currentParams.page,
        per_page: currentParams.per_page
      })
    )
    toggle(!isOpen)
  }

  return (
    <Offcanvas
      isOpen={isOpen}
      scrollable
      backdrop={false}
      toggle={() => toggle(!isOpen)}
    >
      <OffcanvasHeader toggle={() => toggle(!isOpen)}>Filter</OffcanvasHeader>
      <OffcanvasBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='modal-body'>
            <div className='mb-2'>
              <Label>Tipe</Label>
              <Controller
                name='type'
                control={control}
                render={({ field }) => (
                  <SelectField
                    options={CHOICE_TYPES}
                    placeholder='Pilih Tipe'
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
                render={({ field }) => (
                  <SelectField
                    options={CAMP_STATUSES}
                    placeholder='Pilih Status'
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='reset'
              className='btn btn-light'
              onClick={() => onReset()}
              disabled={isLoading}
            >
              Reset
            </button>
            {isLoading ? (
              <LoadingButton className='btn btn-primary' />
            ) : (
              <button type='submit' className='btn btn-primary'>
                Filter
              </button>
            )}
          </div>
        </Form>
      </OffcanvasBody>
    </Offcanvas>
  )
}

Filter.propTypes = {
  isOpen: PropTypes.any,
  toggle: PropTypes.any
}

export default Filter
