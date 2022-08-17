import React from 'react'
import _ from 'lodash'

export const campOptions = data => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `
        ${data.attributes.title || ''}<br />
        ${
          data.attributes.description
            ? _.truncate(data.attributes.description)
            : '—'
        }
      `
      }}
    />
  )
}
