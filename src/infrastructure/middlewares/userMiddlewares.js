const Joi = require('joi')

const createUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là bắt buộc'
    }),
  phone: Joi.string()
    .required()
    .regex(/^\d{10,11}$/) // Kiểm tra số điện thoại có 10 hoặc 11 chữ số
    .messages({
      'string.empty': 'Số điện thoại không được để trống',
      'any.required': 'Số điện thoại là bắt buộc',
      'string.pattern.base': 'Số điện thoại không hợp lệ'
    }),
  full_name: Joi.string().required().messages({
    'string.empty': 'Họ và tên không được để trống',
    'any.required': 'Họ và tên là bắt buộc'
  }),
  age: Joi.number()
    .integer() // Kiểm tra tuổi là số nguyên
    .min(1) // Tuổi phải lớn hơn hoặc bằng 1
    .max(150) // Tuổi phải nhỏ hơn hoặc bằng 150
    .required()
    .messages({
      'number.base': 'Tuổi phải là số',
      'number.integer': 'Tuổi phải là số nguyên',
      'number.min': 'Tuổi phải lớn hơn hoặc bằng 1',
      'number.max': 'Tuổi phải nhỏ hơn hoặc bằng 150',
      'any.required': 'Tuổi là bắt buộc'
    }),
  gender: Joi.string()
    .valid('Nam', 'Nữ', 'Khác') // Kiểm tra giới tính hợp lệ
    .required()
    .messages({
      'any.only': 'Giới tính không hợp lệ',
      'any.required': 'Giới tính là bắt buộc'
    }),
  address: Joi.string().required().messages({
    'any.required': 'Địa chỉ là bắt buộc'
  }),
  date_of_birth: Joi.date().required().messages({
    'date.base': 'Ngày sinh phải là ngày hợp lệ',
    'any.required': 'Ngày sinh là bắt buộc'
  }),
  student_code: Joi.string()
    .required()
    .regex(/^(PH)\d{5}$/) // Kiểm tra mã sinh viên bắt đầu bằng "PH" và 5 chữ số
    .messages({
      'any.required': 'Mã sinh viên là bắt buộc',
      'string.pattern.base': 'Mã sinh viên không hợp lệ'
    }),
  id_card: Joi.string()
    .required()
    .regex(/^\d{9,12}$/) // Kiểm tra số chứng minh nhân dân có 12 chữ số
    .messages({
      'any.required': 'Số chứng minh nhân dân là bắt buộc',
      'string.pattern.base': 'Số chứng minh nhân dân không hợp lệ'
    }),
  role: Joi.string().required().messages({
    'any.required': 'Vai trò là bắt buộc'
  }),
  status: Joi.string()
    .valid('Pending', 'Active', 'Completed') // Kiểm tra trạng thái hợp lệ
    .required()
    .messages({
      'any.only': 'Trạng thái không hợp lệ',
      'any.required': 'Trạng thái là bắt buộc'
    }),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

const updateUserSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number()
  // Các trường khác...
})

module.exports = {
  validateCreateUser: (req, res, next) => {
    const { error } = createUserSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    next()
  },
  validateUpdateUser: (req, res, next) => {
    const { error } = updateUserSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    next()
  }
}
