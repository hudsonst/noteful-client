import React from 'react'
import PropTypes from 'prop-types'
import './CircleButton.css'

export default function NavCircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props
  return( React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
  )
}

NavCircleButton.propTypes = {
  tag: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
  to: PropTypes.string,
  type: PropTypes.string,
  role: PropTypes.string
}

NavCircleButton.defaultProps ={
  tag: 'a',
}
