import * as yup from 'yup';

const requiredText = '此欄位不可為空'
const emailFormat = 'Email 格式無效'
const minLengthName = (num) => (`暱稱至少 ${num} 字`)
const minLengthPassword = (num) => (`密碼至少 ${num} 字`)
const confirmPasswordText = '密碼與再次輸入密碼不同'

// [註冊] 表單
export const RegisterSchema = yup.object().shape({
  email: yup.string().required(requiredText).email(emailFormat),
  name: yup.string().required(requiredText).min(2, minLengthName(2)),
  password: yup.string().required(requiredText).min(6, minLengthPassword(6)),
  confirmPassword: yup.string().required(requiredText).min(6, minLengthPassword(6)).oneOf(
    [yup.ref('password')], confirmPasswordText)
});

// [登入] 表單
export const LoginSchema = yup.object({
  email: yup.string().required(requiredText).email(emailFormat),
  password: yup.string().required(requiredText).min(6, minLengthPassword(6)),
});