import { css } from '#/styled-system/css'

export const formSelectStyles = css({
  _focusNotTouched: {
    borderColor: '#1862b5',
    boxShadow: '0 0 0 4px hsla(0, 0%, 100%, .7), 0 0 0 4px #005bed',
    outline: 'none',
  },
  _focusTouchedValid: {
    borderColor: '#1862b5',
    boxShadow: '0 0 0 4px hsla(0, 0%, 100%, .7), 0 0 0 4px #005bed',
    outline: 'none',
  },
  _touchedInvalid: {
    borderColor: 'red',
  },
  _focusTouchedInvalid: {
    boxShadow: '0 0 0 4px hsla(0,0%,100%,.7),0 0 0 4px red',
    outline: 'none',
  },
})
