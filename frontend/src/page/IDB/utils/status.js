export const formatIDB = (data) => ({
  ...data,
  // Đảm bảo ngày tháng đúng định dạng khi gửi lên server
  regDate: data.regDate?.format ? data.regDate.format("YYYY-MM-DD") : data.regDate,
  // Các xử lý số học nếu cần
  taxTotal: Number(data.taxTotal),
});

export const parseIDBResponse = (res) => {
    // Hàm xử lý dữ liệu trả về từ API nếu cần
    return res;
};