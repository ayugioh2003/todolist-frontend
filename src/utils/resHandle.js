import Swal from 'sweetalert2'

export const showSuccess = (
  { title = '成功', content = null }) => {

  Swal.fire({
    icon: 'success',
    title: `成功`,
    text: `${content}`
  })
}

export const showError = (
  { title = '', content = '系統發生錯誤，請稍後再試' }) => {
  Swal.fire({
    icon: 'error',
    title: `Oppps..${title}`,
    html: content,
  })
}