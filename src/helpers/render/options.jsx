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

export const speakerOptions = data => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `
        ${data.attributes.user_profile?.data?.attributes?.first_name}
        ${data.attributes.user_profile?.data?.attributes?.last_name}<br />
        ${data.attributes.email}
      `
      }}
    />
  )
}
