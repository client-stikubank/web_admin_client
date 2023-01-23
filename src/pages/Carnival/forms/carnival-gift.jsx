import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Form, Label } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { QRCode } from 'react-qrcode-logo'

// Components
import {
  LoadingButton,
  InputField,
  AsyncSelectField,
  SelectField,
  Confirmation
} from '@/components/Form'

import qrIcon from '@/assets/brand/icon.png'

// API
import { getGifts } from '@/api/gift'

// Actions
import {
  addNewCarnivalGift,
  updateCarnivalGift,
  closeModal
} from '@/store/actions'

// Constants
import { CARNIVAL_GIFT_STATUSES } from '@/constants/select-options'

// Helpers
import { giftOptions } from '@/helpers/render/options'

const FormCarnivalGift = ({ gifts, currentData }) => {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      quantity: currentData?.attributes.quantity,
      status: _.find(CARNIVAL_GIFT_STATUSES, {
        value: currentData?.attributes.status
      })
    }
  })

  const { isLoading, carnivalDetail } = useSelector(state => ({
    isLoading: state.CarnivalGift.isLoading,
    carnivalDetail: state.Carnival.carnivalDetail
  }))

  const onSubmit = data => {
    data.status = data.status?.value
    if (!currentData) {
      data.gift_id = data.gift_id?.value
      data.carnival_id = carnivalDetail.id
    }

    setConfirmation(data)
  }

  const submitWithConfirmation = () => {
    const submitDispatch = currentData
      ? updateCarnivalGift({ carnival_gift: confirmation })
      : addNewCarnivalGift({ carnival_gift: confirmation })
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
        {!currentData && (
          <div className='mb-2'>
            <Label>Pelatihan</Label>
            <Controller
              name='gift_id'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AsyncSelectField
                  api={getGifts}
                  defaultParams={{
                    id_not_in: _.map(
                      gifts.data,
                      carnivalGift => carnivalGift.attributes.gift.id
                    )
                  }}
                  query='name_cont'
                  placeholder='Pilih Kado'
                  renderOptions={giftOptions}
                  height={80}
                  className={errors.gift_id && 'is-invalid'}
                  {...field}
                />
              )}
            />
            <span className='text-danger invalid-feedback'>
              Tidak boleh kosong!
            </span>
          </div>
        )}

        <div className='mb-2'>
          <Label>Stok</Label>
          <div className='d-flex align-items-center gap-1 flex-wrap justift-align-center'>
            <span className='font-size-16 mt-1' style={{ width: 20 }}>
              {currentData?.attributes?.redeemed_count}/
            </span>
            <InputField
              style={{ width: 'calc(100% - 24px)' }}
              type='number'
              className={`form-control ${errors.quantity && 'is-invalid'}`}
              {...register('quantity', { required: true })}
            />
            <span className='text-danger invalid-feedback'>
              {errors.quantity?.type === 'required' && 'Tidak boleh kosong!'}
            </span>
          </div>
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
        <QRCode
          value={currentData?.id}
          logoImage={qrIcon}
          logoWidth={300}
          logoOpacity={0.2}
          qrStyle='dots'
          bgColor='#FFC40C'
          fgColor='#EE157F'
          quietZone={20}
          size={300}
          eyeColor={['#EE157F', '#96519B', '#2EB4AC']}
          eyeRadius={[
            {
              outer: [16, 16, 0, 16],
              inner: [1, 1, 1, 1]
            },
            {
              outer: [16, 16, 16, 0],
              inner: [1, 1, 1, 1]
            },
            {
              outer: [16, 0, 16, 16],
              inner: [1, 1, 1, 1]
            }
          ]}
        />
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

FormCarnivalGift.propTypes = {
  currentData: PropTypes.object
}

export default FormCarnivalGift
