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

export const giftOptions = data => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `
        <div style='display: flex;'>
          <img src=${
            data.attributes.image.url
          } width='40' style='margin-right: 16px' />
          <div>
            <b>${data.attributes.name || ''}</b><br />
            Reward: ${data.attributes.reward_amount.join('')}
          </div>
        </div>
      `
      }}
    />
  )
}
