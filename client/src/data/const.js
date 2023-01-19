export const REGEX = {
  username: /^[a-zA-Z0-9]{4,24}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,24}$/,
}

export const ROLES = [
  {
    id: 1,
    role: 'Admin',
  },
  {
    id: 2,
    role: 'Staff',
  },
]
