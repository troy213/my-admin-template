export const REGISTER_FORM = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'username',
    helperText: '4 to 24 alphanumeric no space (a-z A-Z 0-9).',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'password',
    helperText:
      '5 to 24 characters. Must include uppercase ,lowercase letters and a number.',
  },
  {
    id: 'rePassword',
    label: 'Re-type password',
    type: 'password',
    placeholder: 'retype password',
    helperText: 'Must match with new password field',
  },
]
