import React from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import PropTypes from 'prop-types'
import _ from 'lodash'

export const AsyncSelectField = React.forwardRef((props, ref) => {
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    let params = {
      query: {
        [props.query]: searchQuery,
        ...props.defaultParams
      }
    }
    const response = await props.api({
      page,
      ...params
    })

    return {
      options: _.map(response.data, data => ({
        value: data.id,
        label: props.renderOptions
          ? props.renderOptions(data)
          : data['attributes'][`${props.label}`]
      })),
      hasMore: response.pagination.next_page > 1,
      additional: {
        page: searchQuery ? 2 : page + 1
      }
    }
  }

  const customStyles = {
    valueContainer: provided => ({
      ...provided,
      height: props.height || provided.height
    })
  }

  return (
    <AsyncPaginate
      value={props.value}
      styles={customStyles}
      loadOptions={loadOptions}
      additional={{
        page: 1
      }}
      key={props.parentId || 'noID'}
      {...props}
    />
  )
})

AsyncSelectField.propTypes = {
  value: PropTypes.object,
  defaultParams: PropTypes.object,
  height: PropTypes.any,
  api: PropTypes.func,
  label: PropTypes.string,
  renderOptions: PropTypes.any,
  query: PropTypes.string,
  parentId: PropTypes.any
}
