export const statusColor = status => {
  switch (status) {
    case 'active':
      return 'success'
    case 'finish':
      return 'warning'
    case 'inactive':
    default:
      return 'secondary'
  }
}
