import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, Badge } from 'reactstrap'

// Actions
import { updateStage } from '@/store/actions'

// Components
import { EditableText } from '@/components/Form'

const Stages = () => {
  const dispatch = useDispatch()

  const { stages } = useSelector(state => ({
    stages: state.Stage.stages
  }))

  const validateName = value => {
    if (!value) {
      return <small className='text-danger'>Nama tidak boleh kosong</small>
    }
  }

  const submitStage = (stage, value) => {
    dispatch(updateStage({ ...stage, name: value }))
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className='mb-4'>Daftar Stage</CardTitle>
        <div>
          <ul className='verti-timeline list-unstyled'>
            {stages.length > 0 &&
              stages.map(stage => (
                <li className='event-list' key={stage.id}>
                  <div className='event-timeline-dot mt-1'>
                    <i className='bx bx-right-arrow-circle' />
                  </div>
                  <div className='d-flex'>
                    <div className='me-3'>
                      <i className='bx bx-joystick h2 text-primary' />
                    </div>
                    <div className='flex-grow-1'>
                      <div>
                        <h5 className='display-inline mt-1 font-size-14'>
                          <EditableText
                            id={stage.id}
                            onSubmit={value => submitStage(stage, value)}
                            validate={validateName}
                            initialValue={stage.name}
                          />
                        </h5>
                        <Badge className='bg-info'>Level {stage.level}</Badge>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  )
}

export default Stages
