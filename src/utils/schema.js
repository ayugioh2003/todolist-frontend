import * as yup from 'yup';

const errorMsg = {
  required: '此欄位不可為空',
  email: 'Email 格式無效',
  nickname: (num) => (`暱稱至少 ${num} 字`),
  password: (num) => (`密碼至少 ${num} 字`),
  confirmPassword: '密碼與再次輸入密碼不同'
}

// [註冊] 表單
export const RegisterSchema = yup.object().shape({
  email: yup.string()
    .required(errorMsg.required)
    .email(errorMsg.email),

  name: yup.string()
    .required(errorMsg.required)
    .min(2, errorMsg.nickname(2)),

  password: yup.string()
    .required(errorMsg.required)
    .min(6, errorMsg.nickname(6)),

  confirmPassword: yup.string()
    .required(errorMsg.required)
    .min(6, errorMsg.password(6))
    .oneOf([yup.ref('password')], errorMsg.confirmPassword)
});

// [登入] 表單
export const LoginSchema = yup.object({
  email: yup.string()
    .required(errorMsg.required)
    .email(errorMsg.email),
  password: yup.string()
    .required(errorMsg.required)
    .min(6, errorMsg.password(6)),
});