/**
 * ===============================
 * LOGIN TYPES (JSDoc – JS thuần)
 * ===============================
 */

/**
 * Thông tin gửi lên khi đăng nhập
 *
 * @typedef {{
 *   username: string,
 *   password: string,
 *   taxCode: string
 * }} LoginPayload
 */

/**
 * Thông tin user trả về sau đăng nhập
 *
 * @typedef {{
 *   id_nguoi_dung: string,
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

/**
 * ===============================
 * EXPORT DUMMY (bắt buộc)
 * ===============================
 */
export {};
