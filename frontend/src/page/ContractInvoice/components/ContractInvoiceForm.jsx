import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Table,
  Tabs,
  Select,
  Space,
  Card,
  Divider,
  notification,
  Modal,
  InputNumber,
} from "antd";
import { FiSave, FiTrash2, FiPlus, FiPrinter } from "react-icons/fi";
import dayjs from "dayjs";
import { invoiceAPI, shipmentAPI, partnerAPI } from "../api/invoice.api";
import "@/page/ContractInvoice/css/invoice.css";

const { Option } = Select;
const { TextArea } = Input;

const getLoggedInUser = () => {
  try {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      return {
        id: user.id_nguoi_dung || user.id,
        name: user.ho_ten || user.ten_day_du || user.ten || user.name || "Người dùng",
      };
    }
  } catch (e) {
    console.warn("Không thể đọc user từ localStorage:", e);
  }
  return null;
};

export default function InvoiceForm() {
  const [mode, setMode] = useState("import"); // 'import' hoặc 'export'
  const [shipments, setShipments] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(false);
  const [loadingPartners, setLoadingPartners] = useState(false);

  // --- Thêm state cho danh sách hóa đơn và in ---
  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [isInvoiceListModalVisible, setIsInvoiceListModalVisible] = useState(false);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [invoiceToPrint, setInvoiceToPrint] = useState(null);

  // --- Thêm state map để tra cứu nhanh ---
  const [partnerMap, setPartnerMap] = useState({});
  const [shipmentMap, setShipmentMap] = useState({});

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      so_hoa_don: "",
      ngay_hoa_don: dayjs(),
      id_lo_hang: null,
      id_nguoi_ban: null,
      id_nguoi_mua: null,
      tong_tien: null,
      ma_ngoai_te: "USD",
      dieu_kien_giao_hang: "",
    },
  });

  const currentUser = useMemo(() => getLoggedInUser(), []);

  useEffect(() => {
    if (!currentUser) {
      const timer = setTimeout(() => {
        window.location.href = "/login";
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchLookups = async () => {
      setLoadingShipments(true);
      setLoadingPartners(true);
      try {
        const [shipmentRes, partnerRes] = await Promise.all([
          shipmentAPI.getAll(),
          partnerAPI.getAll(),
        ]);
        setShipments(shipmentRes.data || []);
        setPartners(partnerRes.data || []);

        // Tạo map để tra cứu nhanh
        const pMap = {};
        partnerRes.data?.forEach(p => {
          pMap[p.id_doi_tac] = p;
        });
        setPartnerMap(pMap);

        const sMap = {};
        shipmentRes.data?.forEach(s => {
          sMap[s.id_lo_hang] = s;
        });
        setShipmentMap(sMap);

      } catch (err) {
        notification.error({
          message: "Lỗi tải dữ liệu",
          description: "Không thể tải danh sách lô hàng/đối tác.",
        });
      } finally {
        setLoadingShipments(false);
        setLoadingPartners(false);
      }
    };
    fetchLookups();
  }, [currentUser]);

  // --- Fetch danh sách hóa đơn khi mở modal ---
  const fetchInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const res = await invoiceAPI.getAll();
      setInvoices(res.data || []);
    } catch (err) {
      notification.error({
        message: "Lỗi tải hóa đơn",
        description: "Không thể tải danh sách hóa đơn.",
      });
    } finally {
      setLoadingInvoices(false);
    }
  };

  const openInvoiceListModal = () => {
    fetchInvoices();
    setIsInvoiceListModalVisible(true);
  };

  if (!currentUser) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        Vui lòng đăng nhập...
      </div>
    );
  }

  const handleSaveInvoice = async (formData) => {
    try {
      let payload = {
        so_hoa_don: formData.so_hoa_don,
        ngay_hoa_don: formData.ngay_hoa_don ? formData.ngay_hoa_don.toISOString() : null,
        id_lo_hang: formData.id_lo_hang,
        tong_tien: Number(formData.tong_tien) || 0,
        ma_ngoai_te: formData.ma_ngoai_te,
        dieu_kien_giao_hang: formData.dieu_kien_giao_hang?.trim(),
        trang_thai: mode === "import" ? "NHAP" : "XUAT",
        ngay_tao: new Date().toISOString(),
      };

      if (mode === "import") {
        payload.id_nguoi_ban = formData.id_nguoi_ban;
        payload.id_nguoi_mua = null;
      } else {
        payload.id_nguoi_mua = formData.id_nguoi_mua;
        payload.id_nguoi_ban = null;
      }

      await invoiceAPI.create(payload);

      notification.success({
        message: "Thành công",
        description: `Đã tạo hóa đơn ${formData.so_hoa_don} thành công!`,
      });

      reset({
        so_hoa_don: "",
        ngay_hoa_don: dayjs(),
        id_lo_hang: null,
        id_nguoi_ban: null,
        id_nguoi_mua: null,
        tong_tien: null,
        ma_ngoai_te: "USD",
        dieu_kien_giao_hang: "",
      });
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || "Lỗi khi tạo hóa đơn";
      notification.error({
        message: "Thao tác thất bại",
        description: msg,
      });
    }
  };

  // --- Hàm xử lý chọn hóa đơn để in ---
  const handleSelectInvoiceToPrint = (record) => {
    setInvoiceToPrint(record);
    setIsInvoiceListModalVisible(false);
    setIsPrintModalVisible(true);
  };

  // --- Hàm thực hiện in ---
  const printInvoice = () => {
    const printContent = document.getElementById('printable-invoice-content');
    if (!printContent) return;

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    // window.location.reload(); // Bỏ reload để không làm mất dữ liệu form
  };

  const renderPartnerField = () => {
    if (mode === "import") {
      return (
        <Col span={8}>
          <label>Người bán <span style={{ color: "red" }}>*</span></label>
          <Controller
            name="id_nguoi_ban"
            control={control}
            render={({ field }) => (
              <Select {...field} loading={loadingPartners} placeholder="Chọn người bán" style={{width: "100%"}}>
                {partners.map(p => (
                  <Option key={p.id_doi_tac} value={p.id_doi_tac}>
                    {p.ten_doi_tac}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Col>
      );
    } else {
      return (
        <Col span={8}>
          <label>Người mua <span style={{ color: "red" }}>*</span></label>
          <Controller
            name="id_nguoi_mua"
            control={control}
            render={({ field }) => (
              <Select {...field} loading={loadingPartners} placeholder="Chọn người mua" style={{width: "100%"}}>
                {partners.map(p => (
                  <Option key={p.id_doi_tac} value={p.id_doi_tac}>
                    {p.ten_doi_tac}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Col>
      );
    }
  };

  // --- Cột cho bảng hóa đơn ---
  const invoiceColumns = [
    {
      title: "ID",
      dataIndex: "id_hoa_don",
      width: 80,
    },
    {
      title: "Số hóa đơn",
      dataIndex: "so_hoa_don",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      width: 120,
    },
    {
      title: "Ngày hóa đơn",
      dataIndex: "ngay_hoa_don",
      render: (v) => v ? dayjs(v).format('DD/MM/YYYY') : '',
      width: 120,
    },
    {
      title: "Tổng tiền",
      dataIndex: "tong_tien",
      render: (v) => Number(v || 0).toLocaleString('vi-VN'),
      width: 150,
    },
    {
      title: "Đối tác",
      render: (_, record) => {
        if (record.trang_thai === "NHAP") {
          return partnerMap[record.id_nguoi_ban]?.ten_doi_tac || 'N/A';
        } else {
          return partnerMap[record.id_nguoi_mua]?.ten_doi_tac || 'N/A';
        }
      },
      width: 200,
    },
    {
      title: "Tác vụ",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Button size="small" type="link" onClick={() => handleSelectInvoiceToPrint(record)}>
          Chọn
        </Button>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #d9d9d9" }}>
        <Space>
          <Button className="invoice-save-btn-sidebar" type="primary" icon={<FiSave />} onClick={handleSubmit(handleSaveInvoice)}>
            Ghi lại Hóa đơn
          </Button>
          {/* --- Nút in hóa đơn --- */}
          <Button className="invoice-btn-sidebar" icon={<FiPrinter />} onClick={openInvoiceListModal}>
            In Hóa đơn
          </Button>
        </Space>
      </div>

      <Tabs
        activeKey={mode}
        onChange={setMode}
        items={[
          { key: "import", label: "Hóa đơn Nhập", children: null },
          { key: "export", label: "Hóa đơn Xuất", children: null },
        ]}
        style={{ background: "#fff", padding: "0 16px" }}
      />

      <Card title={`Thông tin hóa đơn ${mode === "import" ? "Nhập" : "Xuất"}`} size="small" style={{ margin: "16px" }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>Số hóa đơn <span style={{ color: "red" }}>*</span></label>
            <Controller
              name="so_hoa_don"
              control={control}
              render={({ field }) => <Input {...field} placeholder="VD: INV-001" />}
            />
          </Col>
          <Col span={8}>
            <label>Ngày hóa đơn</label>
            <Controller
              name="ngay_hoa_don"
              control={control}
              render={({ field }) => <DatePicker {...field} style={{ width: "100%" }} format="DD/MM/YYYY" />}
            />
          </Col>
          <Col span={8}>
            <label>Lô hàng</label>
            <Controller
              name="id_lo_hang"
              control={control}
              render={({ field }) => (
                <Select {...field} loading={loadingShipments} placeholder="Chọn lô hàng" style={{width: "100%"}}>
                  {shipments.map(s => (
                    <Option key={s.id_lo_hang} value={s.id_lo_hang}>
                      {s.so_lo_hang}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Col>
          {renderPartnerField()}
          <Col span={8}>
            <label>Đồng tiền</label>
            <Controller
              name="ma_ngoai_te"
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: "100%" }}>
                  <Option value="USD">USD</Option>
                  <Option value="VND">VND</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="JPY">JPY</Option>
                </Select>
              )}
            />
          </Col>
          <Col span={8}>
            <label>Tổng tiền</label>
            <Controller
              name="tong_tien"
              control={control}
              render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} min={0} placeholder="VD: 1000" />}
            />
          </Col>
          <Col span={24}>
            <label>Điều kiện giao hàng</label>
            <Controller
              name="dieu_kien_giao_hang"
              control={control}
              render={({ field }) => <TextArea {...field} rows={2} />}
            />
          </Col>
        </Row>
      </Card>

      {/* --- Modal danh sách hóa đơn --- */}
      <Modal
        title="Danh sách hóa đơn"
        open={isInvoiceListModalVisible}
        onCancel={() => setIsInvoiceListModalVisible(false)}
        footer={null}
        width={1000}
      >
        <Table
          loading={loadingInvoices}
          dataSource={invoices}
          columns={invoiceColumns}
          rowKey="id_hoa_don"
          pagination={{ pageSize: 10 }}
        />
      </Modal>

      {/* --- Modal xem trước và in --- */}
      <Modal
        title="Xem trước hóa đơn"
        open={isPrintModalVisible}
        onOk={printInvoice}
        onCancel={() => setIsPrintModalVisible(false)}
        okText="In"
        cancelText="Đóng"
        width={900}
      >
        {invoiceToPrint && (
          <div id="printable-invoice-content" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{ textDecoration: 'underline', margin: '0' }}>HOÁ ĐƠN {invoiceToPrint.trang_thai === "NHAP" ? "NHẬP" : "XUẤT"}</h1>
            </div>
            
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>ID hóa đơn:</strong> {invoiceToPrint.id_hoa_don}</p>
                <p><strong>Số hóa đơn:</strong> {invoiceToPrint.so_hoa_don}</p>
                <p><strong>Ngày hóa đơn:</strong> {invoiceToPrint.ngay_hoa_don ? dayjs(invoiceToPrint.ngay_hoa_don).format('DD/MM/YYYY') : ''}</p>
              </Col>
              <Col span={12}>
                <p><strong>Đồng tiền:</strong> {invoiceToPrint.ma_ngoai_te}</p>
                <p><strong>Tổng tiền:</strong> {Number(invoiceToPrint.tong_tien || 0).toLocaleString('vi-VN')} {invoiceToPrint.ma_ngoai_te}</p>
                <p><strong>Mã lô hàng:</strong> {shipmentMap[invoiceToPrint.id_lo_hang]?.so_lo_hang || 'Chưa chọn'}</p>
              </Col>
            </Row>

            <Divider orientation="left">Thông tin đối tác</Divider>
            {invoiceToPrint.trang_thai === "NHAP" && (
              <p><strong>Người bán:</strong> {partnerMap[invoiceToPrint.id_nguoi_ban]?.ten_doi_tac || 'Chưa chọn'}</p>
            )}
            {invoiceToPrint.trang_thai === "XUAT" && (
              <p><strong>Người mua:</strong> {partnerMap[invoiceToPrint.id_nguoi_mua]?.ten_doi_tac || 'Chưa chọn'}</p>
            )}

            <Divider orientation="left">Thông tin giao dịch</Divider>
            <p><strong>Điều kiện giao hàng:</strong> {invoiceToPrint.dieu_kien_giao_hang || 'Không có'}</p>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center', width: '45%' }}>
                <p><strong>Bên bán</strong></p>
                <p>(Ký tên, đóng dấu)</p>
              </div>
              <div style={{ textAlign: 'center', width: '45%' }}>
                <p><strong>Bên mua</strong></p>
                <p>(Ký tên, đóng dấu)</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}