export const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'operator', label: 'Operator' },
  { value: 'speaker', label: 'Speaker' }
]

export const LEVELS = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 }
]

export const CAMP_STATUSES = [
  { value: 0, label: 'Tidak Aktif' },
  { value: 1, label: 'Aktif' }
]

export const CARNIVAL_GIFT_STATUSES = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Tidak Aktif' }
]

export const EVENT_STATUSES = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Tidak Aktif' }
]

export const COIN_NAMES = [
  { value: 0, label: 'Mamo' },
  { value: 1, label: 'Beryl' },
  { value: 2, label: 'Ale' },
  { value: 3, label: 'Jenny' }
]

export const CHOICE_TYPES = [
  { value: 'introvert', label: 'Introvert (I)', invert_of: 'extrovert' },
  { value: 'extrovert', label: 'Extrovert (E)', invert_of: 'introvert' },
  { value: 'sensing', label: 'Sensing (S)', invert_of: 'intuition' },
  { value: 'intuition', label: 'Intuition (N)', invert_of: 'sensing' },
  { value: 'thinking', label: 'Thinking (T)', invert_of: 'feeling' },
  { value: 'feeling', label: 'Feeling (F)', invert_of: 'thinking' },
  { value: 'judging', label: 'Judging (J)', invert_of: 'perceiving' },
  { value: 'perceiving', label: 'Perceiving (P)', invert_of: 'judging' }
]
