export const IDC_RULES = {
  // Số tờ khai gốc
  originalDeclarationNumber: {
    required: "Số tờ khai gốc bắt buộc",
    pattern: {
      value: /^\d{10,}$/,
      message: "Số tờ khai phải có ít nhất 10 số",
    },
  },

  // Mã phân loại sửa đổi (BẮT BUỘC)
  "modification.type": {
    required: "Mã phân loại sửa đổi bắt buộc",
  },

  // Ngày yêu cầu sửa đổi (BẮT BUỘC)
  "modification.requestDate": {
    required: "Ngày yêu cầu sửa đổi bắt buộc",
  },

  // Lý do sửa đổi (BẮT BUỘC và phải đủ dài)
  "modification.reason": {
    required: "Lý do sửa đổi bắt buộc",
    minLength: {
      value: 50,
      message: "Lý do sửa đổi phải có ít nhất 50 ký tự",
    },
    validate: (value) => {
      if (!value || value.trim().length < 20) {
        return "Lý do sửa đổi phải mô tả rõ ràng, chi tiết";
      }
      return true;
    },
  },

  // Phải có ít nhất 1 thay đổi
  modifiedGoods: {
    validate: (value, formValues) => {
      // Kiểm tra có ít nhất 1 trường bị thay đổi
      const hasChanges =
        value?.some((item) =>
          Object.values(item.flags || {}).some((flag) => flag === true)
        ) ||
        formValues.importer?.name ||
        formValues.invoice?.totalValue;

      if (!hasChanges) {
        return "Phải có ít nhất 1 thay đổi để gửi tờ khai IDC";
      }
      return true;
    },
  },
};

// Messages hướng dẫn
export const IDC_HELP_MESSAGES = {
  modificationReason:
    "Ví dụ: 'Sửa số lượng hàng hóa dòng 1 từ 100 PCE thành 120 PCE do khai thiếu theo thực tế nhập khẩu từ invoice số INV-2024-001'",

  modificationTypeA:
    "Sử dụng khi cần sửa thông tin về tên, địa chỉ, số điện thoại của người nhập khẩu",

  modificationTypeB:
    "Sử dụng khi cần sửa mô tả hàng hóa, mã HS, số lượng, đơn giá, xuất xứ",

  modificationTypeC:
    "Sử dụng khi cần điều chỉnh trị giá hải quan, phí vận chuyển, bảo hiểm",

  modificationTypeD:
    "Sử dụng khi cần sửa thuế suất hoặc số tiền thuế phải nộp",

  modificationTypeE:
    "Sử dụng khi cần bổ sung hoặc thay thế các chứng từ đính kèm",

  lockedFields:
    "Các trường có nền xám không thể chỉnh sửa vì đã bị khóa theo quy định VNACCS",

  highlightChanges:
    "Các ô có nền màu xanh nhạt là ô đã được thay đổi so với tờ khai gốc",
};

// Validation logic phức tạp
export const validateIDC = (data) => {
  const errors = [];

  // Kiểm tra có lý do sửa đổi
  if (!data.modification?.reason || data.modification.reason.length < 50) {
    errors.push({
      field: "modification.reason",
      message: "Lý do sửa đổi phải có ít nhất 50 ký tự và mô tả rõ ràng",
    });
  }

  // Kiểm tra phải có ít nhất 1 thay đổi
  const hasAnyChange = checkForChanges(data);
  if (!hasAnyChange) {
    errors.push({
      field: "general",
      message:
        "Tờ khai IDC phải có ít nhất 1 trường thông tin được thay đổi so với tờ khai gốc",
    });
  }

  // Kiểm tra nếu sửa hàng hóa thì phải có lý do cho từng dòng
  if (data.modification?.type === "B") {
    data.modifiedGoods?.forEach((item, index) => {
      if (!item.modificationReason || item.modificationReason.length < 20) {
        errors.push({
          field: `modifiedGoods[${index}].modificationReason`,
          message: `Dòng hàng ${index + 1} phải có lý do sửa đổi chi tiết`,
        });
      }
    });
  }

  return errors;
};

// Hàm kiểm tra có thay đổi hay không
const checkForChanges = (data) => {
  // Kiểm tra thông tin người nhập khẩu
  if (
    data.importer?.name ||
    data.importer?.address ||
    data.importer?.phone
  ) {
    return true;
  }

  // Kiểm tra invoice
  if (
    data.invoice?.number ||
    data.invoice?.date ||
    data.invoice?.totalValue
  ) {
    return true;
  }

  // Kiểm tra hàng hóa
  if (
    data.modifiedGoods?.some((item) =>
      Object.values(item.flags || {}).some((flag) => flag === true)
    )
  ) {
    return true;
  }

  return false;
};