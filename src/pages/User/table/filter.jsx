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
import { getUsers } from '@/store/actions'

// Api
import { getRoles } from '@/api/role'

// Components
import {
  LoadingButton,
  InputField,
  SelectField,
  AsyncSelectField
} from '@/components/Form'

// Constants
import { LEVELS } from '@/constants/select-options'

const Filter = ({ isOpen, toggle }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, control } = useForm()

  const { currentParams, isLoading } = useSelector(state => ({
    currentParams: state.User.currentParams,
    isLoading: state.User.isLoading
  }))

  const onSubmit = data => {
    console.log(data)
    let params = {
      query: {
        email_cont: data.email,
        user_profile_first_name_or_user_profile_last_name_cont: data.name,
        user_profile_phone_number_cont: data.phone_number,
        roles_id_eq: data.role_id?.value
      },
      page: 1
    }
    dispatch(getUsers({ ...currentParams, ...params }))
    toggle(!isOpen)
  }

  const onReset = () => {
    reset({
      email: '',
      name: '',
      phone_number: '',
      role: '',
      status: '',
      role_id: ''
    })
    dispatch(
      getUsers({
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
              <Label>Email</Label>
              <InputField className='form-control' {...register('email')} />
            </div>

            <div className='mb-2'>
              <Label>Nama</Label>
              <InputField className='form-control' {...register('name')} />
            </div>

            <div className='mb-2'>
              <Label>No. Handphone</Label>
              <InputField
                className='form-control'
                {...register('phone_number')}
              />
            </div>

            <div className='mb-2'>
              <Label>Role</Label>
              <Controller
                name='role_id'
                control={control}
                render={({ field }) => (
                  <AsyncSelectField
                    api={getRoles}
                    label='name'
                    query='name_cont'
                    placeholder='Pilih Pelatihan'
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
