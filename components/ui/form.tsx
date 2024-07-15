'use client'

import { Form as FormPrimitive, FormProps } from 'react-aria-components'

function Form(props: FormProps) {
  return <FormPrimitive {...props} />
}

export { Form, type FormProps }
