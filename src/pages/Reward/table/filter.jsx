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
import { getCoins } from '@/store/actions'

// Constants
import { COIN_NAMES } from '@/constants/select-options'

// Components
import { LoadingButton, InputField, SelectField } from '@/components/Form'

const Filter = ({ isOpen, toggle }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, control } = useForm()

  const { currentParams, isLoading } = useSelector(state => ({
    currentParams: state.Coin.currentParams,
    isLoading: state.Coin.isLoading
  }))

  const onSubmit = data => {
    let params = {
      query: {
        name_eq: data.name?.value
      },
      page: 1
    }
    dispatch(getCoins({ ...currentParams, ...params }))
    toggle(!isOpen)
  }

  const onReset = () => {
    reset({ name: '' })
    dispatch(
      getCoins({
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
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <SelectField
                    options={COIN_NAMES}
                    placeholder='Pilih Koin'
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
