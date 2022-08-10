import React from 'react'
import Editable from 'react-bootstrap-editable'

export const EditableText = props => {
  const confirmElement = (
    <button
      type='submit'
      className='btn btn-success editable-submit btn-sm me-1'
    >
      <i className='mdi mdi-check'></i>
    </button>
  )

  const cancelElement = (
    <button type='button' className='btn btn-danger editable-cancel btn-sm'>
      <i className='mdi mdi-close'></i>
    </button>
  )

  return (
    <Editable
      ajax={null}
      alwaysEditing={false}
      className={null}
      disabled={false}
      editText={null}
      isValueClickable={true}
      label={null}
      mode='inline'
      onValidated={validValue => {
        return validValue
      }}
      placement='top'
      showText
      type='textfield'
      renderConfirmElement={confirmElement}
      renderCancelElement={cancelElement}
      {...props}
    />
  )
}
