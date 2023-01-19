export const CHANGE_PASSWORD_FORM = [
  {
    id: 'oldPassword',
    label: 'Old Password',
    type: 'password',
    placeholder: 'old password',
  },
  {
    id: 'newPassword',
    label: 'New password',
    type: 'password',
    placeholder: 'new password',
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
