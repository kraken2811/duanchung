import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Divider,
  Table,
  Tabs,
  Select,
  InputNumber,
  Space,
  Alert,
  Badge,
  Tooltip,
  notification,
} from "antd";
import {
  FiSave,
  FiSend,
  FiPrinter,
  FiEdit3,
  FiAlertCircle,
  FiSearch,
} from "react-icons/fi";
import { useState } from "react";
import "../css/IDC.css";
import {
  getToKhai,
  updateIDCChiTiet,
  saveIDCForm,
  guiIDC,
  phanHoiHaiQuanIDC,
} from "@/page/IDC/api/idc.api";
import dayjs from "dayjs";
import { MODIFICATION_TYPES } from "../types";
import { type } from "@testing-library/user-event/dist/type";

const { TextArea } = Input;

export default function IDCForm() {
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const [activeTab, setActiveTab] = useState("1");
  const [originalDeclaration, setOriginalDeclaration] = useState(null);
  const [modifiedGoods, setModifiedGoods] = useState([]);
  const [changedFields, setChangedFields] = useState(new Set());
  const [editingGoods, setEditingGoods] = useState(null);
  const [maPhanLoaiSua, setMaPhanLoaiSua] = useState(null);
  const [tableKey, setTableKey] = useState(0);

  // Load tờ khai gốc
  const loadOriginalDeclaration = async (so_to_khai) => {
    try {
      const data = await getToKhai(so_to_khai);

      const tk = data.to_khai;
      const goods = data.hang_hoa || [];

      const mapped = {
        id_to_khai: tk.id_to_khai,
        declarationNumber: tk.so_to_khai,
        type: tk.loai_to_khai,
        regDate: tk.ngay_khai_bao,

        importer: {
          taxCode: tk.cong_ty?.ma_so_thue || "",
          name: tk.cong_ty?.ten_cong_ty || "",
          address: tk.cong_ty?.dia_chi || "",
          phone: tk.cong_ty?.dien_thoai || "",
        },

        invoice: {
          number: tk.hop_dong?.so_hop_dong || "",
          totalValue: Number(tk.hop_dong?.tong_gia_tri || 0),
          currency: "VND",
        },
        
        goods: goods.map((g, idx) => ({
          id: g.id_chi_tiet,
          index: g.so_dong ?? idx + 1,
          description: g.mo_ta_hang_hoa,
          hsCode: g.ma_hs,
          quantity: Number(g.so_luong || 0),
          unit: g.don_vi_tinh,
          unitPrice: Number(g.don_gia || 0),
          totalValue: Number(g.tong_gia_tri || 0),
          modified: false,
        })),
      };

      setOriginalDeclaration(mapped);
      setModifiedGoods(mapped.goods);

      notification.success({
        message: "Thành công",
        description: "Đã tải tờ khai gốc",
      });
    } catch (err) {
      console.error("LOAD IDC ERROR:", err);
      notification.warning({
        message: "Không hợp lệ",
        description: "Tờ khai không tồn tại hoặc hiện không ở trạng thái cho phép sửa đổi",
      });
    }
  };


  // Đánh dấu trường đã thay đổi
  const markFieldChanged = (fieldName) => {
    setChangedFields((prev) => new Set([...prev, fieldName]));
  };

  // Kiểm tra trường có bị thay đổi không
  const isFieldChanged = (fieldName) => {
    return changedFields.has(fieldName);
  };

  // Columns cho bảng hàng hóa
  const goodsColumns = [
    {
      title: "STT",
      dataIndex: "index",
      width: 50,
      align: "center", // Căn giữa STT
      render: (text) => <span style={{ color: "#9ca3af" }}>{text}</span>,
    },
    {
      title: "MÔ TẢ HÀNG HÓA", // In hoa tiêu đề (CSS đã xử lý, nhưng nên viết hoa cho đồng bộ code)
      dataIndex: "description",
      // Bỏ width cố định hoặc để lớn để nó tự co giãn
      render: (text, record) => (
        // Dùng class text-modified thay vì style inline
        <span className={record.modified ? "text-modified" : ""}>
          {text}
        </span>
      ),
    },
    {
      title: "MÃ HS",
      dataIndex: "hsCode",
      width: 120,
      align: "center", // HS Code căn giữa
      render: (text, record) => (
        // Dùng font-mono cho mã số
        <span className={`font-mono ${record.hsCodeModified ? "text-modified" : ""}`}>
          {text}
        </span>
      ),
    },
    {
      title: "SỐ LƯỢNG",
      dataIndex: "quantity",
      width: 110,
      align: "right", // SỐ LIỆU BẮT BUỘC CĂN PHẢI
      render: (text, record) => (
        <span className={record.quantityModified ? "text-modified" : ""}>
          {/* Format số có dấu phẩy ngăn cách */}
          {Number(text).toLocaleString()}
        </span>
      ),
    },
    {
      title: "ĐƠN GIÁ",
      dataIndex: "unitPrice",
      width: 130,
      align: "right", // CĂN PHẢI
      render: (text, record) => (
        <span className={record.priceModified ? "text-modified" : ""}>
          {Number(text).toLocaleString()}
        </span>
      ),
    },
    {
      title: "TRỊ GIÁ",
      dataIndex: "totalValue",
      width: 150,
      align: "right", // CĂN PHẢI
      render: (text, record) => (
        <span className={record.valueModified ? "text-modified" : ""}>
          {Number(text).toLocaleString()}
        </span>
      ),
    },
    {
      title: "", // Cột tác vụ
      width: 60,
      align: "center",
      render: (_, record) => (
          <Tooltip title="Sửa đổi dòng này">
            <Button 
              type="text" 
              size="small" 
              icon={<FiEdit3 />} 
              className={record.modified ? "text-blue-500" : "text-gray-400"}
              onClick={() => editGoodsItem(record)}
            />
          </Tooltip>
      ),
    },
  ];

  const editGoodsItem = (record) => {
    setEditingGoods({
      ...record,
      reason: "",
    });
  };

  const onSave = async (formData) => {
    try {
      const duLieuSuaDoi = {
        thong_tin_chung: {
          importer: {
            address: formData.importer?.address,
            phone: formData.importer?.phone,
          },
          contract: {
            so_hop_dong: formData.contract?.so_hop_dong,
            tong_tri_gia: formData.contract?.tong_tri_gia,
          },
        },
        hang_hoa_sua_doi: modifiedGoods,
      };

      await saveIDCForm({
        id_to_khai: originalDeclaration.id_to_khai,
        ma_phan_loai_sua: maPhanLoaiSua,
        ly_do_sua: formData.modification.reason,
        du_lieu_sua_doi: duLieuSuaDoi,
      });

      notification.success({
        message: "Thành công",
        description: "Đã lưu sửa đổi IDC",
      });

      reset();
      setModifiedGoods([]);
    } catch (err) {
      notification.error({
        message: "Lỗi",
        description: err.message || "Lưu sửa đổi thất bại",
      });
    }
  };

  const onDeclare = async () => {
    try {
      await guiIDC(originalDeclaration.id_to_khai);
      notification.success({
        message: "Thành công",
        description: "Đã gửi tờ khai lên hải quan",
      });

      reset();
    } catch {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi khi gửi tờ khai",
      });
    }
  };

  const handleGetResponse = async () => {
    try {
      const res = await phanHoiHaiQuanIDC(
        originalDeclaration.id_to_khai,
        {}
      );

      console.log("Phản hồi HQ:", res);
      notification.success({
        message: "Thành công",
        description: "Đã nhận phản hồi hải quan",
      });
    } catch {
      notification.error({
        message: "Lỗi",
        description: "Chưa có phản hồi",
      });
    }
  };

  // --- TAB RENDER FUNCTIONS ---
  const renderSearchOriginal = () => (
    <div>
      <Alert
        message="Tìm kiếm tờ khai gốc cần sửa đổi"
        description="Nhập số tờ khai gốc để load thông tin và thực hiện sửa đổi bổ sung"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Row gutter={16}>
        <Col span={12}>
          <label>
            Số tờ khai gốc <span style={{ color: "red" }}>*</span>
          </label>
          <Input.Search
            size="large"
            placeholder="Nhập số tờ khai gốc"
            enterButton={
              <Button type="primary" icon={<FiSearch />}>
                Tìm kiếm
              </Button>
            }
            onSearch={loadOriginalDeclaration}
          />
        </Col>
      </Row>
      {originalDeclaration && (
        <>
          <Divider />
          <Alert
            message="Đã tải thông tin tờ khai gốc"
            description={
              <div>
                <div>
                  <strong>Số tờ khai:</strong>{" "}
                  {originalDeclaration.declarationNumber}
                </div>
                <div>
                  <strong>Loại hình:</strong> {originalDeclaration.type}
                </div>
                <div>
                  <strong>Người xuất/nhập khẩu:</strong>{" "}
                  {originalDeclaration.importer.name}
                </div>
                <div>
                  <strong>Ngày đăng ký:</strong> {originalDeclaration.regDate}
                </div>
              </div>
            }
            type="success"
            showIcon
          />
          <Divider />
          <h3>Thông tin tờ khai gốc (Chỉ xem - Không thể chỉnh sửa)</h3>
          <Row gutter={16}>
            <Col span={6}>
              <label>Số tờ khai gốc</label>
              <Input
                disabled
                value={originalDeclaration.declarationNumber}
                style={{ background: "#f5f5f5", color: "#999" }}
              />
            </Col>
            <Col span={6}>
              <label>Mã loại hình</label>
              <Input
                disabled
                value={originalDeclaration.type}
                style={{ background: "#f5f5f5", color: "#999" }}
              />
            </Col>
            <Col span={6}>
              <label>Cơ quan hải quan</label>
              <Input
                disabled
                value={originalDeclaration.customsOffice}
                style={{ background: "#f5f5f5", color: "#999" }}
              />
            </Col>
            <Col span={6}>
              <label>Ngày  gốc</label>
              <Input
                disabled
                value={
                  originalDeclaration?.regDate
                    ? dayjs(originalDeclaration.regDate).format("DD-MM-YYYY")
                    : ""
                }
                style={{ background: "#f5f5f5", color: "#999" }}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );

  const invoice = watch("invoice");
  const goods = watch("goods");  
  const renderDiff = (label, oldValue, newValue) => {
    if (newValue === undefined || newValue === oldValue) return null;

    return (
      <div>
        <strong>{label}:</strong>{" "}
        <span style={{ color: "#999" }}>{oldValue ?? "-"}</span>{" "}
        →{" "}
        <span style={{ color: "#52c41a", fontWeight: 600 }}>
          {newValue}
        </span>
      </div>
    );
  };

  const renderModificationInfo = () => (
    <div>
      <Alert
        message="Khu vực thông tin sửa đổi bổ sung"
        description="Đây là phần quan trọng nhất của tờ khai IDC - Vui lòng điền đầy đủ thông tin sửa đổi và lý do"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <div
        style={{
          border: "2px solid #dcdbdaff",
          borderRadius: 4,
          padding: 16,
        }}
      >
        <h3>Thông tin sửa đổi bổ sung</h3>
        <Row gutter={16}>
          <Col span={8}>
            <label>
              Mã phân loại sửa đổi <span style={{ color: "red" }}>*</span>
            </label>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Chọn loại sửa đổi"
              onChange={(v) => {
                setMaPhanLoaiSua(v);
                setValue("modification.type", v);
                markFieldChanged("modification.type");
              }}
            >
              <Select.Option value="A">
                A - Sửa đổi thông tin người khai
              </Select.Option>
              <Select.Option value="B">
                B - Sửa đổi thông tin hàng hóa
              </Select.Option>
              <Select.Option value="C">
                C - Sửa đổi trị giá hải quan
              </Select.Option>
              <Select.Option value="D">
                D - Sửa đổi thuế suất/số tiền thuế
              </Select.Option>
              <Select.Option value="E">
                E - Sửa đổi chứng từ đính kèm
              </Select.Option>
            </Select>
          </Col>
          <Col span={8}>
            <label>
              Ngày yêu cầu sửa đổi <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              onChange={(d) => {
                setValue(
                  "modification.requestDate",
                  d ? d.toISOString() : null
                );
                markFieldChanged("modification.requestDate");
              }}
            />
          </Col>
          <Col span={8}>
            <label>Phân loại kiểm tra</label>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Chọn"
              onChange={(v) => setValue("modification.inspectionType", v)}
            >
              <Select.Option value="1">Trước thông quan</Select.Option>
              <Select.Option value="2">Sau thông quan</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <label>
              Lý do sửa đổi / Giải trình{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <TextArea
              rows={4}
              placeholder="Nhập chi tiết lý do yêu cầu sửa đổi tờ khai (Tối thiểu 50 ký tự)"
              onChange={(e) => {
                setValue("modification.reason", e.target.value);
                markFieldChanged("modification.reason");
              }}
            />
            <div style={{ color: "#999", fontSize: 12, marginTop: 4 }}>
              Ví dụ: "Sửa số lượng hàng hóa dòng 1 từ 100 PCE thành 120 PCE do
              khai thiếu theo thực tế nhập khẩu"
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={12}>
            <label>Văn bản xin sửa đổi số</label>
            <Input
              placeholder="Số văn bản (nếu có)"
              {...register("modification.documentNumber")}
            />
          </Col>
          <Col span={12}>
            <label>Ngày văn bản</label>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(d) => setValue("modification.documentDate", d)}
            />
          </Col>
        </Row>
      </div>
      <Divider />
      <h3>So sánh thông tin thay đổi</h3>
      <Row gutter={16}>
        <Col span={12}>
          <div
            style={{
              background: "#f0f0f0",
              padding: 12,
              borderRadius: 4,
              minHeight: 200,
            }}
          >
            <h4>Thông tin GỐC</h4>
            {originalDeclaration && (
              <div style={{ fontSize: 13 }}>
                <div>
                  <strong>Hợp đồng:</strong> {originalDeclaration.invoice.number}
                </div>
                <div>
                  <strong>Tổng trị giá:</strong> $
                  {originalDeclaration.invoice.totalValue}
                </div>
                <div>
                  <strong>Số lượng hàng:</strong>{" "}
                  {originalDeclaration.goods.length} dòng
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              background: "#e6f7ff",
              padding: 12,
              borderRadius: 4,
              border: "1px solid #91d5ff",
              minHeight: 200,
            }}
          >
            <h4 style={{ color: "#1890ff" }}>Thông tin SAU SỬA ĐỔI</h4>

            <div style={{ fontSize: 13 }}>
              {renderDiff(
                "Hợp đồng",
                originalDeclaration?.invoice?.number,
                invoice?.number
              )}

              {renderDiff(
                "Tổng trị giá",
                originalDeclaration?.invoice?.totalValue,
                invoice?.totalValue
              )}

              {goods && goods.length !== originalDeclaration?.goods?.length &&
                renderDiff(
                  "Số lượng dòng hàng",
                  originalDeclaration?.goods?.length,
                  goods.length
                )}

              {/* Trường hợp CHƯA có thay đổi */}
              {!invoice?.number &&
                !invoice?.totalValue &&
                (!goods || goods.length === originalDeclaration?.goods?.length) && (
                  <div style={{ color: "#999" }}>
                    Chưa có thông tin thay đổi
                  </div>
                )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );

  const renderGeneralInfo1 = () => (
    <div>
      <Alert
        message="Chú ý: Chỉ một số trường được phép sửa đổi"
        description="Các trường có nền trắng có thể chỉnh sửa. Các trường có nền xám đã bị khóa theo quy định của VNACCS."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <h3>Người xuất/nhập khẩu</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Mã số thuế</label>
          <Input
            disabled
            value={originalDeclaration?.importer.taxCode}
            style={{ background: "#f5f5f5", color: "#999" }}
          />
        </Col>
        <Col span={16}>
          <label>Tên doanh nghiệp (Có thể sửa)</label>
          <Input
            placeholder="Tên công ty"
            defaultValue={originalDeclaration?.importer.name}
            style={{
              background: isFieldChanged("importer.name")
                ? "#e6f7ff"
                : "#fff",
              borderColor: isFieldChanged("importer.name")
                ? "#1890ff"
                : "#d9d9d9",
            }}
            onChange={(e) => {
              setValue("importer.name", e.target.value);
              markFieldChanged("importer.name");
            }}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={18}>
          <label>Địa chỉ (Có thể sửa)</label>
          <Input
            placeholder="Địa chỉ"
            defaultValue={originalDeclaration?.importer.address}
            style={{
              background: isFieldChanged("importer.address")
                ? "#e6f7ff"
                : "#fff",
              borderColor: isFieldChanged("importer.address")
                ? "#1890ff"
                : "#d9d9d9",
            }}
            onChange={(e) => {
              setValue("importer.address", e.target.value);
              markFieldChanged("importer.address");
            }}
          />
        </Col>
        <Col span={6}>
          <label>Điện thoại (Có thể sửa)</label>
          <Input
            placeholder="SĐT"
            onChange={(e) => {
              setValue("importer.phone", e.target.value);
              markFieldChanged("importer.phone");
            }}
          />
        </Col>
      </Row>
      <Divider />
      <h3>Thông tin hợp đồng (Các trường quan trọng)</h3>
      <Row gutter={16}>
        <Col span={12}>
          <label>Số hợp đồng (Có thể sửa)</label>
          <Input
            placeholder="Số hóa đơn"
            defaultValue={originalDeclaration?.invoice.number}
            style={{
              background: isFieldChanged("invoice.number") ? "#e6f7ff" : "#fff",
              borderColor: isFieldChanged("invoice.number")
                ? "#1890ff"
                : "#d9d9d9",
            }}
            onChange={(e) => {
              setValue("invoice.number", e.target.value);
              markFieldChanged("invoice.number");
            }}
          />
        </Col>
        <Col span={12}>
          <label>Tổng trị giá (Có thể sửa)</label>
          <InputNumber
            style={{
              width: "100%",
              background: isFieldChanged("invoice.totalValue")
                ? "#e6f7ff"
                : "#fff",
              borderColor: isFieldChanged("invoice.totalValue")
                ? "#1890ff"
                : "#d9d9d9",
            }}
            placeholder="0.00"
            defaultValue={originalDeclaration?.invoice.totalValue}
            onChange={(v) => {
              setValue("invoice.totalValue", v);
              markFieldChanged("invoice.totalValue");
            }}
          />
        </Col>
      </Row>
    </div>
  );

  const handleUpdateGoods = async () => {
    const soLuong = Number(editingGoods.quantity) || 0;
    const donGia = Number(editingGoods.unitPrice) || 0;

    const tong_gia_tri = soLuong * donGia;

    const payload = {
      id_chi_tiet: editingGoods.id,
      ma_hs: editingGoods.hsCode,
      so_luong: soLuong,
      don_gia: donGia,
      tong_gia_tri,
      ly_do: editingGoods.reason,
    };

    try {
      const res = await updateIDCChiTiet(payload);

      setModifiedGoods((prev) =>
        prev.map((g) =>
          g.id === editingGoods.id
            ? {
                ...g,
                so_luong: soLuong,
                don_gia: donGia,
                tong_gia_tri,
                modified: true,
              }
            : g
        )
      );

      notification.success({
        message: "Thành công",
        description: "Đã cập nhật dòng hàng",
      });

      setEditingGoods(null);
      setTableKey((k) => k + 1);
    } catch (err) {
      console.error("UPDATE IDC ERROR:", err);

      notification.error({
        message: "Lỗi",
        description: "Cập nhật thất bại",
      });
    }
  };

  const renderGoodsList = () => (
    <div>
      <Alert
        message="Chỉnh sửa danh sách hàng hóa"
        description="Click vào biểu tượng bút chì để sửa từng dòng hàng. Các dòng có thay đổi sẽ được highlight màu xanh."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Table
        key={tableKey}
        className="custom-table"
        columns={goodsColumns}
        dataSource={modifiedGoods}
        rowKey="id"
        pagination={false}
        bordered={false}
        size="middle"
        rowClassName={(record) =>
          record.modified ? "row-modified" : ""
        }
      />
      <style>{`
        .row-modified {
          background-color: #e6f7ff !important;
        }
      `}</style>
      <Divider />
      <div
        style={{
          background: "#f0f5ff",
          padding: 16,
          borderRadius: 4,
          border: "1px solid #adc6ff",
        }}
      >
        <h4>Chi tiết sửa đổi dòng hàng</h4>
        <Row gutter={16}>
          <Col span={12}>
            <label>Mã HS Code (Có thể sửa)</label>
            <Input
              placeholder="Nhập mã HS mới"
              value={editingGoods?.hsCode}
              disabled={!editingGoods}
              onChange={(e) =>
                setEditingGoods((prev) => ({
                  ...prev,
                  hsCode: e.target.value,
                }))
              }
            />
          </Col>
          <Col span={6}>
            <label>Số lượng (Có thể sửa)</label>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="0"
              value={editingGoods?.quantity}
              disabled={!editingGoods}
              onChange={(v) =>
                setEditingGoods((prev) => ({
                  ...prev,
                  quantity: v,
                }))
              }
            />
          </Col>
          <Col span={6}>
            <label>Đơn giá (Có thể sửa)</label>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="0.00"
              value={editingGoods?.unitPrice}
              disabled={!editingGoods}
              onChange={(v) =>
                setEditingGoods((prev) => ({
                  ...prev,
                  unitPrice: v,
                }))
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 12 }}>
          <Col span={24}>
            <label>Lý do sửa dòng hàng này</label>
            <TextArea
              rows={2}
              placeholder="Nhập lý do sửa đổi cho dòng hàng này"
              value={editingGoods?.reason}
              disabled={!editingGoods}
              onChange={(e) =>
                setEditingGoods((prev) => ({
                  ...prev,
                  reason: e.target.value,
                }))
              }
            />
          </Col>
        </Row>
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <Space>
            <Button
              disabled={!editingGoods}
              onClick={() => setEditingGoods(null)}
            >
              Đóng
            </Button>

            <Button
              type="primary"
              disabled={!editingGoods}
              onClick={handleUpdateGoods}
            >
              Cập nhật thay đổi
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );

  const renderResponse = () => (
    <div>
      <h3>Kết quả xử lý từ VNACCS</h3>
      <Alert
        message="Chưa có kết quả phản hồi"
        description="Sau khi gửi tờ khai sửa đổi, kết quả xử lý từ Hải quan sẽ hiển thị tại đây"
        type="info"
        showIcon
      />
      <Divider />
      <div style={{ color: "#999", fontSize: 13 }}>
        <div>• Chấp nhận: Tờ khai sửa đổi được duyệt</div>
        <div>• Từ chối: Tờ khai sửa đổi bị từ chối (có lý do kèm theo)</div>
        <div>• Yêu cầu bổ sung: Cần bổ sung thêm chứng từ hoặc giải trình</div>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: "1",
      label: "Tìm kiếm TK gốc",
      children: renderSearchOriginal(),
    },
    {
      key: "2",
      label: "Thông tin chung 1",
      children: renderGeneralInfo1(),
      disabled: !originalDeclaration,
    },
    {
      key: "3",
      // SỬA ĐỔI: Nếu chưa có tờ khai (disabled) thì chỉ hiện chữ thường
      // Nếu đã có tờ khai thì mới bọc trong Badge
      label: !originalDeclaration ? (
        "Danh sách hàng"
      ) : (
        <Badge count={modifiedGoods.filter((g) => g.modified).length}>
          Danh sách hàng
        </Badge>
      ),
      children: renderGoodsList(),
      disabled: !originalDeclaration,
    },
    {
      key: "4",
      // SỬA ĐỔI: Tương tự, nếu disabled thì hiện chữ thường để đồng bộ màu xám
      label: !originalDeclaration ? (
        "Thông tin sửa đổi"
      ) : (
        <Badge dot={changedFields.size > 0} offset={[5, 0]}>
          Thông tin sửa đổi
        </Badge>
      ),
      children: renderModificationInfo(),
      disabled: !originalDeclaration,
    },
    {
      key: "5",
      label: "Kết quả phản hồi",
      children: renderResponse(),
      disabled: !originalDeclaration,
    },
  ];

  return (
    <div>
      {/* Thanh công cụ đặc thù cho IDC */}
      <div
        style={{
          background: "#fff1f0",
          padding: "12px 16px",
          borderBottom: "2px solid #ffa39e",
          marginBottom: 16,
        }}
      >
        <Space>
          <Button
            icon={<FiSave />}
            onClick={handleSubmit(onSave)}
            disabled={!originalDeclaration}
          >
            Ghi
          </Button>
          <Button
            type="primary"
            danger
            icon={<FiSend />}
            onClick={handleSubmit(onDeclare)}
            disabled={!originalDeclaration}
          >
            Khai báo IDC
          </Button>
          <Button icon={<FiPrinter />} disabled={!originalDeclaration}>
            In TK sửa đổi
          </Button>
          <Divider type="vertical" />
          <Button onClick={handleGetResponse} disabled={!originalDeclaration}>
            Lấy phản hồi
          </Button>
        </Space>

        <div style={{ marginTop: 8, fontSize: 12, color: "#cf1322" }}>
          <FiAlertCircle style={{ marginRight: 4 }} />
          <strong>Lưu ý:</strong> Tờ khai IDC chỉ được phép sửa đổi một số
          trường thông tin nhất định theo quy định của VNACCS
        </div>
      </div>

      {/* Nội dung các tab */}
      <Tabs
        activeKey={activeTab}
        items={tabItems}
        onChange={setActiveTab}
        tabBarStyle={{ background: "#fafafa", padding: "0 16px" }}
      />
    </div>
  );
}