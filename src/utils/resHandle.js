import Swal from 'sweetalert2'

export const showSuccess = (
  { title = '成功', content = null }) => {

  Swal.fire({
    icon: 'success',
    title: `成功`,
    text: `${content}`
  })
}

