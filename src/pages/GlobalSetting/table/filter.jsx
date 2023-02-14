import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  Form,
  Label,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody
} from 'reactstrap'
import PropTypes from 'prop-types'

// Actions
import { getGlobalSettings } from '@/store/actions'

// Components
import { LoadingButton, InputField } from '@/components/Form'

const Filter = ({ isOpen, toggle }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  const { currentParams, isLoading } = useSelector(state => ({
    currentParams: state.GlobalSetting.currentParams,
    isLoading: state.GlobalSetting.isLoading
  }))

  const onSubmit = data => {
    let params = {
      query: {
        name_cont: data.name
      },
      page: 1
    }
    dispatch(getGlobalSettings({ ...currentParams, ...params }))
    toggle(!isOpen)
  }

  const onReset = () => {
    reset({ name: '' })
    dispatch(
      getGlobalSettings({
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
              <Label>Nama</Label>
              <InputField className='form-control' {...register('name')} />
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
