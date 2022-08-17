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
import { getCamps } from '@/store/actions'

// Components
import { LoadingButton, InputField, SelectField } from '@/components/Form'

// Constants
import { LEVELS, CAMP_STATUSES } from '@/constants/select-options'

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
        title_cont: data.title,
        level_eq: data.level?.value,
        status_eq: data.status?.value
      },
      page: 1
    }
    dispatch(getCamps({ ...currentParams, ...params }))
    toggle(!isOpen)
  }

  const onReset = () => {
    reset({ title: '', level: '', status: '' })
    dispatch(
      getCamps({
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
              <Label>Judul</Label>
              <InputField className='form-control' {...register('title')} />
            </div>

            <div className='mb-2'>
              <Label>Level</Label>
              <Controller
                name='level'
                control={control}
                render={({ field }) => (
                  <SelectField
                    options={LEVELS}
                    placeholder='Pilih Level'
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
