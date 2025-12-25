/**
 * ===============================
 * LOGIN TYPES (JSDoc – JS thuần)
 * ===============================
 */

/**
 * Payload gửi lên API login
 *
 * @typedef {{
 *   ten_dang_nhap: string,
 *   mat_khau: string,
 *   tax_code?: string
 * }} LoginPayload
 */

/**
 * Thông tin user trả về sau đăng nhập
 *
 * @typedef {{
 *   id_nguoi_dung: number,
 *   ho_ten: string,
 *   vai_tro: string,
 *   cong_ty?: string
 * }} LoginUser
 */

/**
 * Response trả về từ API login
 *
 * @typedef {{
 *   accessToken: string,
 *   user: LoginUser
 * }} LoginResponse
 */

export {};
