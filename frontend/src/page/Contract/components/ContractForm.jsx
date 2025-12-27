import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
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
  Modal,
  InputNumber,
  notification,
} from "antd";
import {
  FiSave,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiPrinter,
  FiFileText,
  FiLayers,
  FiPackage,
} from "react-icons/fi";
import dayjs from "dayjs";
import {
  contractAPI,
  appendixAPI,
  companyAPI,
  partnerAPI,
  materialAPI, // Import API mới
  productAPI,   // Import API mới
} from "../api/contract.api";
import "../css/contract.css";

const { Option } = Select;
const { TextArea } = Input;

const ACCESSORY_TYPES_LIST = [
  { code: "803", content: "Bổ sung nguyên phụ liệu" },
  { code: "802", content: "Bổ sung sản phẩm" },
  { code: "804", content: "Bổ sung thiết bị" },
  { code: "805", content: "Bổ sung hàng mẫu" },
  { code: "503", content: "Sửa nguyên phụ liệu" },
  { code: "502", content: "Sửa sản phẩm" },
  { code: "504", content: "Sửa thiết bị" },
  { code: "102", content: "Hủy sản phẩm" },
  { code: "103", content: "Hủy nguyên phụ liệu" },
  { code: "201", content: "Gia hạn hợp đồng" },
];

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

export default function ContractForm() {
  // ✅ BƯỚC 1: GỌI TẤT CẢ HOOK Ở ĐẦU — KHÔNG CÓ ĐIỀU KIỆN
  const [mode, setMode] = useState("contract");
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [detailsTab, setDetailsTab] = useState("1");

  const [selectedAccessoryTypes, setSelectedAccessoryTypes] = useState([]);
  const [tempSelectedTypes, setTempSelectedTypes] = useState([]);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [partners, setPartners] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [loadingContracts, setLoadingContracts] = useState(false);

  // ✅ Thêm state cho việc in hóa đơn
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [loadingInvoiceDetails, setLoadingInvoiceDetails] = useState(false);

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      id_hop_dong: "",
      so_hop_dong: "",
      loai_hop_dong: "GIA_CONG",
      id_cong_ty: null,
      id_doi_tac: null,
      ma_ngoai_te: "USD",
      ma_cuc_hai_quan: "",
      dieu_kien_thanh_toan: "",
      phi_gia_cong: null,
      ngay_ky: dayjs(),
      ngay_het_han: null,
      hieu_luc_tu: null,
      hieu_luc_den: null,
      ghi_chu: "",
      id_hop_dong_phu_luc: null,
      so_phu_luc: "",
      ngay_phu_luc: dayjs(),
      mo_ta: "",
    },
  });

  const dataCache = useRef({
    contract: { form: {}, materials: [], products: [], equipments: [] },
    accessory: { form: {}, materials: [], products: [], equipments: [] },
  });

  // ✅ BƯỚC 2: LẤY currentUser — NHƯNG KHÔNG RETURN SỚM
  const currentUser = useMemo(() => getLoggedInUser(), []);

  // ✅ Theo dõi đồng tiền hiện tại
  const currencyCode = useWatch({ control, name: "ma_ngoai_te" }) || "USD";

  // ✅ Tính tổng giá trị
  const totalValue = useMemo(() => {
    return materials.reduce((sum, m) => sum + (m.so_luong || 0) * (m.don_gia || 0), 0) +
           products.reduce((sum, p) => sum + (p.so_luong || 0) * (p.don_gia || 0), 0);
  }, [materials, products]);

  // ✅ BƯỚC 3: useEffect redirect — nhưng KHÔNG DÙNG useState trong điều kiện
  useEffect(() => {
    if (!currentUser) {
      // Dùng timeout nhỏ để tránh "render rồi redirect" gây cảnh báo
      const timer = setTimeout(() => {
        window.location.href = "/login";
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  // ✅ BƯỚC 4: useEffect fetch dữ liệu
  useEffect(() => {
    if (!currentUser) return;

    const fetchLookups = async () => {
      setLoadingCompanies(true);
      setLoadingPartners(true);
      setLoadingContracts(true);
      try {
        const [compRes, partRes, contractRes] = await Promise.all([
          companyAPI.getAll(),
          partnerAPI.getAll(),
          contractAPI.getAll(),
        ]);
        setCompanies(compRes.data || []);
        setPartners(partRes.data || []);
        setContracts(contractRes.data || []);
        setFilteredContracts(contractRes.data || []); // Initialize filtered contracts
      } catch (err) {
        notification.error({
          message: "Lỗi tải dữ liệu",
          description: "Không thể tải danh sách công ty/đối tác. Vui lòng thử lại.",
        });
      } finally {
        setLoadingCompanies(false);
        setLoadingPartners(false);
        setLoadingContracts(false);
      }
    };
    fetchLookups();
  }, [currentUser]);

  // ✅ Hàm xử lý tìm kiếm hóa đơn
  const handleSearchInvoice = (value) => {
    if (!value) {
      setFilteredContracts(contracts);
    } else {
      const filtered = contracts.filter(
        (contract) =>
          contract.so_hop_dong.toLowerCase().includes(value.toLowerCase()) ||
          contract.id_hop_dong.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContracts(filtered);
    }
  };

  // ✅ Hàm xử lý chọn hóa đơn
  const handleSelectInvoice = async (contractId) => {
    setLoadingInvoiceDetails(true);
    try {
      // Gọi API để lấy chi tiết hợp đồng theo id_hop_dong
      const [contractRes, materialsRes, productsRes] = await Promise.all([
        contractAPI.getById(contractId),
        materialAPI.getByContractId(contractId),
        productAPI.getByContractId(contractId),
      ]);

      // Kết hợp dữ liệu từ các API
      const contractDetail = {
        ...contractRes.data,
        vat_lieus: materialsRes.data || [],
        san_phams: productsRes.data || [],
      };

      setSelectedContract(contractDetail);
      setIsInvoiceModalVisible(false);
      setIsPrintModalVisible(true);
    } catch (err) {
      notification.error({
        message: "Lỗi tải chi tiết hóa đơn",
        description: "Không thể tải chi tiết hợp đồng hoặc danh sách vật liệu/sản phẩm. Vui lòng thử lại.",
      });
    } finally {
      setLoadingInvoiceDetails(false);
    }
  };

  // ✅ Hàm xử lý in hóa đơn
  const handlePrintInvoice = () => {
    if (!selectedContract) {
      notification.warning({
        message: "Chưa chọn hóa đơn",
        description: "Vui lòng chọn một hóa đơn để in.",
      });
      return;
    }
    setIsPrintModalVisible(true);
  };

  // ✅ Hàm xử lý in
  const printInvoice = () => {
    const printContent = document.getElementById('printable-invoice-content');
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Quay lại trạng thái ban đầu
  };

  // ✅ PHẦN CÒN LẠI: currentUser ĐÃ TỒN TẠI → DÙNG TỰ DO
  if (!currentUser) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        Vui lòng đăng nhập...
      </div>
    );
  }

  const handleModeChange = (newMode) => {
    if (newMode === mode) return;

    const currentValues = getValues();
    dataCache.current[mode] = {
      form: currentValues,
      materials: [...materials],
      products: [...products],
      equipments: [...equipments],
    };

    const cached = dataCache.current[newMode];
    setMode(newMode);
    reset(cached.form || {});
    setMaterials(cached.materials || []);
    setProducts(cached.products || []);
    setEquipments(cached.equipments || []);
  };

  const addItem = (type) => {
    const newItem = {
      key: Date.now(),
      ma_vat_lieu: "",
      ten_vat_lieu: "",
      don_vi_tinh: "",
      so_luong: 0,
      ma_hs: "",
      nguon_goc: "",
      don_gia: 0,
    };
    if (type === "material") setMaterials([...materials, newItem]);
    if (type === "product") setProducts([...products, { ...newItem, ma_san_pham: "", ten_san_pham: "" }]);
    if (type === "equipment") setEquipments([...equipments, newItem]);
  };

  const removeItem = (key, type) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa dòng này?",
      onOk: () => {
        if (type === "material") setMaterials(materials.filter((i) => i.key !== key));
        if (type === "product") setProducts(products.filter((i) => i.key !== key));
        if (type === "equipment") setEquipments(equipments.filter((i) => i.key !== key));
      },
    });
  };

  const renderTableInput = (value, record, field, setter, list) => (
    <Input
      size="small"
      value={value}
      onChange={(e) => {
        const newList = list.map((item) =>
          item.key === record.key ? { ...item, [field]: e.target.value } : item
        );
        setter(newList);
      }}
    />
  );

  const renderTableNumber = (value, record, field, setter, list) => (
    <InputNumber
      size="small"
      min={0}
      style={{ width: "100%" }}
      value={value}
      formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(v) => v.replace(/\$\s?|(,*)/g, "")}
      onChange={(val) => {
        const newList = list.map((item) =>
          item.key === record.key ? { ...item, [field]: val || 0 } : item
        );
        setter(newList);
      }}
    />
  );

  const materialColumns = [
    { title: "STT", width: 60, align: "center", render: (_, __, idx) => idx + 1 },
    { title: "Mã vật liệu", dataIndex: "ma_vat_lieu", width: 150, render: (v, r) => renderTableInput(v, r, "ma_vat_lieu", setMaterials, materials) },
    { title: "Tên vật liệu", dataIndex: "ten_vat_lieu", width: 250, render: (v, r) => renderTableInput(v, r, "ten_vat_lieu", setMaterials, materials) },
    { title: "ĐVT", width: 100, align: "center", dataIndex: "don_vi_tinh", render: (v, r) => renderTableInput(v, r, "don_vi_tinh", setMaterials, materials) },
    { title: "Mã HS", width: 130, dataIndex: "ma_hs", render: (v, r) => renderTableInput(v, r, "ma_hs", setMaterials, materials) },
    { title: "Số lượng", width: 130, align: "left", dataIndex: "so_luong", render: (v, r) => renderTableNumber(v, r, "so_luong", setMaterials, materials) },
    { title: "Nguồn gốc", width: 150, dataIndex: "nguon_goc", render: (v, r) => renderTableInput(v, r, "nguon_goc", setMaterials, materials) },
    { title: "Đơn giá", width: 140, align: "left", dataIndex: "don_gia", render: (v, r) => renderTableNumber(v, r, "don_gia", setMaterials, materials) },
    { title: "Thành tiền", width: 150, align: "left", render: (_, r) => ((r.so_luong || 0) * (r.don_gia || 0)).toLocaleString("vi-VN") },
    { title: "Tác vụ", width: 80, align: "center", render: (_, r) => <FiTrash2 className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => removeItem(r.key, "material")} /> },
  ];

  const productColumns = [
    { title: "STT", width: 60, align: "center", render: (_, __, idx) => idx + 1 },
    { title: "Mã sản phẩm", dataIndex: "ma_san_pham", render: (v, r) => renderTableInput(v, r, "ma_san_pham", setProducts, products) },
    { title: "Tên sản phẩm", dataIndex: "ten_san_pham", render: (v, r) => renderTableInput(v, r, "ten_san_pham", setProducts, products) },
    { title: "ĐVT", width: 100, dataIndex: "don_vi_tinh", render: (v, r) => renderTableInput(v, r, "don_vi_tinh", setProducts, products) },
    { title: "Mã HS", width: 120, dataIndex: "ma_hs", render: (v, r) => renderTableInput(v, r, "ma_hs", setProducts, products) },
    { title: "Số lượng", width: 120, align: "left", dataIndex: "so_luong", render: (v, r) => renderTableNumber(v, r, "so_luong", setProducts, products) },
    { title: "Đơn giá", width: 140, align: "left", dataIndex: "don_gia", render: (v, r) => renderTableNumber(v, r, "don_gia", setProducts, products) },
    { title: "Thành tiền", width: 140, align: "left", render: (_, r) => ((r.so_luong || 0) * (r.don_gia || 0)).toLocaleString() },
    { title: "Tác vụ", width: 80, align: "center", render: (_, r) => <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeItem(r.key, "product")} /> },
  ];

  const renderDetailsTabs = () => {
    const items = [
      {
        key: "1",
        label: <span><FiLayers style={{ marginRight: 8 }} />Nguyên phụ liệu</span>,
        children: (
          <>
            <Button type="dashed" icon={<FiPlus />} onClick={() => addItem("material")} style={{ marginBottom: 12 }}>
              Thêm nguyên phụ liệu
            </Button>
            <Table columns={materialColumns} dataSource={materials} rowKey="key" pagination={{ pageSize: 8 }} />
          </>
        ),
      },
      {
        key: "2",
        label: <span><FiPackage style={{ marginRight: 8 }} />Sản phẩm</span>,
        children: (
          <>
            <Button type="dashed" icon={<FiPlus />} onClick={() => addItem("product")} style={{ marginBottom: 12 }}>
              Thêm sản phẩm
            </Button>
            <Table columns={productColumns} dataSource={products} rowKey="key" pagination={{ pageSize: 8 }} />
          </>
        ),
      },
    ];

    return (
      <Card size="small" style={{ marginTop: 16 }}>
        <Tabs activeKey={detailsTab} onChange={setDetailsTab} items={items} />
      </Card>
    );
  };

  const handleOpenTypeModal = () => {
    setTempSelectedTypes(selectedAccessoryTypes.map((t) => t.code));
    setIsTypeModalVisible(true);
  };

  const handleConfirmTypes = () => {
    const selected = ACCESSORY_TYPES_LIST.filter((item) =>
      tempSelectedTypes.includes(item.code)
    );
    setSelectedAccessoryTypes(selected);
    setIsTypeModalVisible(false);
  };

  const renderContractFields = () => {
    return (
      <Card title="Thông tin hợp đồng" size="small">
        <Row gutter={[16, 24]}>
          <Col span={8}>
            <label>ID Hợp đồng (System ID) <span style={{ color: "red" }}>*</span></label>
            <Controller
              name="id_hop_dong"
              control={control}
              rules={{ required: "Bắt buộc nhập ID hệ thống" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="VD: HD-2025-001"
                  status={field.value ? "" : "warning"}
                  style={{ fontWeight: "bold" }}
                />
              )}
            />
          </Col>
          <Col span={8}>
            <label>Số hợp đồng (Số chứng từ) <span style={{ color: "red" }}>*</span></label>
            <Controller
              name="so_hop_dong"
              control={control}
              rules={{ required: "Bắt buộc nhập số hợp đồng" }}
              render={({ field }) => <Input {...field} placeholder="VD: HD-ECUS-001" />}
            />
          </Col>
          <Col span={8}>
            <label>Loại hợp đồng <span style={{ color: "red" }}>*</span></label>
            <Controller
              name="loai_hop_dong"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn loại" style={{ width: "100%" }}>
                  <Option value="NHAP_KHAU">Nhập khẩu</Option>
                  <Option value="XUAT_KHAU">Xuất khẩu</Option>
                  <Option value="GIA_CONG">Gia công</Option>
                </Select>
              )}
            />
          </Col>
          <Col span={8}>
            <label>Công ty <span style={{ color: "red" }}>*</span></label>
            <Controller
              name="id_cong_ty"
              control={control}
              rules={{ required: "Chọn công ty" }}
              render={({ field }) => (
                <Select {...field} loading={loadingCompanies} placeholder="Chọn công ty" style={{ width: "100%" }}>
                  {companies.map(c => <Option key={c.id_cong_ty} value={c.id_cong_ty}>{c.ten_cong_ty}</Option>)}
                </Select>
              )}
            />
          </Col>
          <Col span={8}>
            <label>Đối tác <span style={{ color: "red" }}>*</span></label>
            <Controller
              name="id_doi_tac"
              control={control}
              rules={{ required: "Chọn đối tác" }}
              render={({ field }) => (
                <Select {...field} loading={loadingPartners} placeholder="Chọn đối tác" style={{ width: "100%" }}>
                  {partners.map(p => <Option key={p.id_doi_tac} value={p.id_doi_tac}>{p.ten_doi_tac}</Option>)}
                </Select>
              )}
            />
          </Col>
          <Col span={8}>
            <label>Mã cục hải quan</label>
            <Controller name="ma_cuc_hai_quan" control={control} render={({ field }) => <Input {...field} placeholder="VD: 01NU" />} />
          </Col>
          <Col span={6}>
            <label>Đồng tiền</label>
            <Controller name="ma_ngoai_te" control={control} render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Option value="USD">USD (Đô la Mỹ)</Option>
                <Option value="VND">VND (Việt Nam Đồng)</Option>
                <Option value="EUR">EUR (Euro)</Option>
                <Option value="GBP">GBP (Bảng Anh)</Option>
                <Option value="JPY">JPY (Yên Nhật)</Option>
                <Option value="KRW">KRW (Won Hàn Quốc)</Option>
                <Option value="CNY">CNY (Nhân dân tệ Trung Quốc)</Option>
                <Option value="AUD">AUD (Đô la Úc)</Option>
              </Select>
            )} />
          </Col>
          <Col span={6}><label>Điều kiện thanh toán</label><Controller name="dieu_kien_thanh_toan" control={control} render={({ field }) => <Input {...field} />} /></Col>
          <Col span={6}><label>Phí gia công</label><Controller name="phi_gia_cong" control={control} render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} min={0} />} /></Col>
          <Col span={6}>
            <label>Tổng giá trị (Tạm tính)</label>
            <Input 
              value={totalValue.toLocaleString()} 
              readOnly 
              style={{ background: "#f5f5f5", fontWeight: "bold", color: "#1677ff" }} 
              addonAfter={currencyCode} 
            />
          </Col>
          <Col span={6}><label>Ngày ký</label><Controller name="ngay_ky" control={control} render={({ field }) => <DatePicker {...field} style={{ width: "100%" }} format="DD/MM/YYYY" />} /></Col>
          <Col span={6}><label>Ngày hết hạn</label><Controller name="ngay_het_han" control={control} render={({ field }) => <DatePicker {...field} style={{ width: "100%" }} format="DD/MM/YYYY" />} /></Col>
          <Col span={6}><label>Hiệu lực từ</label><Controller name="hieu_luc_tu" control={control} render={({ field }) => <DatePicker {...field} style={{ width: "100%" }} format="DD/MM/YYYY" />} /></Col>
          <Col span={6}><label>Hiệu lực đến</label><Controller name="hieu_luc_den" control={control} render={({ field }) => <DatePicker {...field} style={{ width: "100%" }} format="DD/MM/YYYY" />} /></Col>
        </Row>
        <Divider orientation="left" style={{ fontSize: 12, color: '#999' }}>Thông tin hệ thống</Divider>
        <Row gutter={16}>
          {/* ✅ SỬA: Hiển thị cả id và tên người tạo */}
          <Col span={8}>
            <label style={{ color: '#888' }}>Người tạo:</label> 
            <span style={{ marginLeft: 8, fontWeight: 500 }}>
              {currentUser.name} (ID: {currentUser.id})
            </span>
          </Col>
          <Col span={8}>
            <label style={{ color: '#888' }}>Ngày tạo:</label> 
            <span style={{ marginLeft: 8 }}>{dayjs().format('DD/MM/YYYY HH:mm')}</span>
          </Col>
        </Row>
        {renderDetailsTabs()}
      </Card>
    );
  };

  const renderAppendixFields = () => (
    <Card title="Thông tin phụ lục hợp đồng">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <label>Hợp đồng gốc <span style={{ color: "red" }}>*</span></label>
          <Controller
            name="id_hop_dong_phu_luc"
            control={control}
            render={({ field }) => (
              <Select {...field} loading={loadingContracts} placeholder="Chọn hợp đồng gốc" style={{ width: "100%" }}>
                {contracts.map((c) => (
                  <Option key={c.id_hop_dong} value={c.id_hop_dong}>
                    {c.so_hop_dong} - {c.id_hop_dong}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Col>
        <Col span={12}>
          <label>Số phụ lục <span style={{ color: "red" }}>*</span></label>
          <Controller name="so_phu_luc" control={control} render={({ field }) => <Input {...field} placeholder="VD: PL-01/2025" />} />
        </Col>
        <Col span={12}>
          <label>Ngày phụ lục</label>
          <Controller
            name="ngay_phu_luc"
            control={control}
            render={({ field }) => <DatePicker {...field} style={{ width: "100%" }} format="DD/MM/YYYY" />}
          />
        </Col>
        <Col span={12}>
          <Button block onClick={handleOpenTypeModal} style={{ marginTop: 22 }}>
            Chọn loại thay đổi ({selectedAccessoryTypes.length})
          </Button>
        </Col>
        <Col span={24}>
          <label>Mô tả thay đổi</label>
          <Controller name="mo_ta" control={control} render={({ field }) => <TextArea {...field} rows={4} />} />
        </Col>
      </Row>
      {selectedAccessoryTypes.length > 0 && (
        <Table
          style={{ marginTop: 16 }}
          dataSource={selectedAccessoryTypes}
          rowKey="code"
          pagination={false}
          columns={[
            { title: "Mã", dataIndex: "code", width: 100 },
            { title: "Nội dung", dataIndex: "content" },
          ]}
        />
      )}
    </Card>
  );

  // ✅ Hàm xử lý in hóa đơn
  const handleOpenInvoiceModal = () => {
    setIsInvoiceModalVisible(true);
  };

  const invoiceColumns = [
    { title: "ID Hợp đồng", dataIndex: "id_hop_dong", width: 150 },
    { title: "Số hợp đồng", dataIndex: "so_hop_dong", width: 200 },
    { title: "Loại hợp đồng", dataIndex: "loai_hop_dong", width: 150 },
    { title: "Công ty", width: 200, render: (text, record) => companies.find(c => c.id_cong_ty === record.id_cong_ty)?.ten_cong_ty },
    { title: "Đối tác", width: 200, render: (text, record) => partners.find(p => p.id_doi_tac === record.id_doi_tac)?.ten_doi_tac },
    { title: "Ngày ký", dataIndex: "ngay_ky", width: 120, render: (text) => text ? dayjs(text).format('DD/MM/YYYY') : '' },
    { title: "Tổng giá trị", width: 150, render: (text, record) => (record.tong_gia_tri || 0).toLocaleString() }, // ✅ SỬA: Hiển thị tong_gia_tri
  ];

  const onSaveContract = async (formData) => {
    try {
      const payload = {
        id_hop_dong: formData.id_hop_dong,
        so_hop_dong: formData.so_hop_dong,
        loai_hop_dong: formData.loai_hop_dong,
        id_cong_ty: formData.id_cong_ty,
        id_doi_tac: formData.id_doi_tac,
        ma_ngoai_te: formData.ma_ngoai_te,
        dieu_kien_thanh_toan: formData.dieu_kien_thanh_toan,
        ma_cuc_hai_quan: formData.ma_cuc_hai_quan,
        phi_gia_cong: Number(formData.phi_gia_cong) || 0,
        nguoi_tao: currentUser.id,
        ngay_ky: formData.ngay_ky ? formData.ngay_ky.toISOString() : null,
        ngay_het_han: formData.ngay_het_han ? formData.ngay_het_han.toISOString() : null,
        hieu_luc_tu: formData.hieu_luc_tu ? formData.hieu_luc_tu.toISOString() : null,
        hieu_luc_den: formData.hieu_luc_den ? formData.hieu_luc_den.toISOString() : null,
        vat_lieus: materials.map((m) => ({
          ma_vat_lieu: m.ma_vat_lieu,
          ten_vat_lieu: m.ten_vat_lieu,
          don_vi_tinh: m.don_vi_tinh,
          ma_hs: m.ma_hs,
          nguon_goc: m.nguon_goc,
          so_luong: Number(m.so_luong) || 0,
          don_gia: Number(m.don_gia) || 0,
        })),
        san_phams: products.map((p) => ({
          ma_san_pham: p.ma_san_pham,
          ten_san_pham: p.ten_san_pham,
          don_vi_tinh: p.don_vi_tinh,
          ma_hs: p.ma_hs,
          so_luong: Number(p.so_luong) || 0,
          don_gia: Number(p.don_gia) || 0,
        })),
      };

      await contractAPI.createFull(payload);
      
      notification.success({
        message: "Thành công",
        description: `Đã tạo mới hợp đồng ${formData.so_hop_dong} thành công!`,
      });

      // ✅ RESET FORM
      reset({
        id_hop_dong: "",
        so_hop_dong: "",
        loai_hop_dong: "GIA_CONG",
        id_cong_ty: null,
        id_doi_tac: null,
        ma_ngoai_te: "USD",
        ngay_ky: dayjs(),
      });
      setMaterials([]);
      setProducts([]);

      // ✅ 🟢 QUAN TRỌNG: Tải lại danh sách hợp đồng để cập nhật trong phụ lục
      try {
        const contractRes = await contractAPI.getAll();
        const newContracts = contractRes.data || [];
        setContracts(newContracts);
        setFilteredContracts(newContracts); // Cập nhật cả danh sách lọc
      } catch (err) {
        console.warn("Không thể tải lại danh sách hợp đồng sau khi tạo:", err);
        // Không cần thông báo lỗi vì không ảnh hưởng chính, chỉ thiếu cập nhật UI
      }

    } catch (err) {
      let errorMessage = "Lỗi không xác định";
      if (err?.response?.data) {
        errorMessage = err.response.data.details || err.response.data.error || err.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }

      notification.error({
        message: "Thao tác thất bại",
        description: errorMessage,
        duration: 5,
      });
    }
  };

  const onSaveAppendix = async (formData) => {
    try {
      const randomNum = Math.floor(1000 + Math.random() * 9000);

      const payload = {
        id_phu_luc: randomNum,
        id_hop_dong: formData.id_hop_dong_phu_luc,
        so_phu_luc: formData.so_phu_luc,
        ngay_phu_luc: formData.ngay_phu_luc ? formData.ngay_phu_luc.toISOString() : null,
        mo_ta: formData.mo_ta || "",
        loai_thay_doi: selectedAccessoryTypes.map(t => t.code),
        trang_thai: "NHAP",
        nguoi_tao: currentUser.id, // ✅ SỬA: Dùng id từ currentUser (chính là id_nguoi_dung)
        ngay_tao: new Date().toISOString(),
      };

      if (!payload.id_hop_dong) {
        notification.warning({
          message: "Thiếu thông tin",
          description: "Vui lòng chọn hợp đồng gốc!",
        });
        return;
      }
      if (!payload.so_phu_luc) {
        notification.warning({
          message: "Thiếu thông tin",
          description: "Vui lòng nhập số phụ lục!",
        });
        return;
      }
      if (selectedAccessoryTypes.length === 0) {
        notification.warning({
          message: "Thiếu thông tin",
          description: "Vui lòng chọn ít nhất một loại thay đổi!",
        });
        return;
      }

      await appendixAPI.create(payload);

      notification.success({
        message: "Thành công",
        description: `Đã tạo phụ lục ${formData.so_phu_luc} thành công!`,
      });

      reset({
        id_hop_dong_phu_luc: null,
        so_phu_luc: "",
        ngay_phu_luc: dayjs(),
        mo_ta: "",
      });
      setSelectedAccessoryTypes([]);
      setTempSelectedTypes([]);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.response?.data?.message || "Lỗi khi tạo phụ lục";
      notification.error({
        message: "Thao tác thất bại",
        description: msg,
        duration: 6,
      });
    }
  };

  const handleSaveContract = async () => {
    const formData = getValues();
    // Nếu chưa có ID hệ thống, không cho in
    if (!formData.id_hop_dong) {
      notification.warning({
        message: "Thiếu thông tin",
        description: "Vui lòng nhập ID Hợp đồng trước khi lưu.",
      });
      return;
    }
    handleSubmit(onSaveContract)();
  };

  const handleSaveAppendix = () => {
    const formData = getValues();
    onSaveAppendix(formData);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #d9d9d9" }}>
        <Space>
          {mode === "contract" && (
            <Button className="contract-save-btn-sidebar" type="primary" icon={<FiSave />} onClick={handleSaveContract}>
              Ghi lại Hợp đồng
            </Button>
          )}
          {mode === "accessory" && (
            <Button className="contract-save-btn-sidebar" type="primary" icon={<FiSave />} onClick={handleSaveAppendix}>
              Ghi lại Phụ lục
            </Button>
          )}
          {/* ✅ Thêm nút in hóa đơn */}
          <Button className="contract-btn-sidebar" icon={<FiPrinter />} onClick={handleOpenInvoiceModal}>
            In Hóa đơn
          </Button>
        </Space>
      </div>

      <Tabs
        activeKey={mode}
        onChange={handleModeChange}
        items={[
          { key: "contract", label: "Hợp đồng gia công", children: renderContractFields() },
          { key: "accessory", label: "Phụ lục hợp đồng", children: renderAppendixFields() },
        ]}
        style={{ background: "#fff", padding: "0 16px" }}
      />

      <Modal
        title="Chọn loại thay đổi phụ lục"
        open={isTypeModalVisible}
        onOk={handleConfirmTypes}
        onCancel={() => setIsTypeModalVisible(false)}
        width={600}
      >
        <Table
          dataSource={ACCESSORY_TYPES_LIST}
          rowKey="code"
          pagination={false}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: tempSelectedTypes,
            onChange: setTempSelectedTypes,
          }}
          columns={[{ title: "Mã", dataIndex: "code", width: 100 }, { title: "Nội dung", dataIndex: "content" }]}
        />
      </Modal>

      {/* ✅ Modal chọn hóa đơn */}
      <Modal
        title="Chọn hóa đơn để in"
        open={isInvoiceModalVisible}
        onCancel={() => setIsInvoiceModalVisible(false)}
        width={1000}
        footer={null}
      >
        <Input
          placeholder="Tìm kiếm theo ID hoặc số hợp đồng..."
          onChange={(e) => handleSearchInvoice(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table
          dataSource={filteredContracts}
          columns={invoiceColumns}
          rowKey="id_hop_dong"
          pagination={{ pageSize: 8 }}
          loading={loadingContracts}
          onRow={(record) => ({
            onClick: () => handleSelectInvoice(record.id_hop_dong),
            style: { cursor: 'pointer' }
          })}
        />
      </Modal>

      {/* ✅ Modal xem trước hóa đơn */}
      <Modal
        title="Xem trước hóa đơn"
        open={isPrintModalVisible}
        onOk={printInvoice}
        onCancel={() => setIsPrintModalVisible(false)}
        okText="In"
        cancelText="Đóng"
        width={1000}
        loading={loadingInvoiceDetails}
      >
        {selectedContract && (
          <div id="printable-invoice-content" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>HÓA ĐƠN HỢP ĐỒNG</h1>
            
            {/* Thông tin chung chia 2 cột */}
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>ID Hợp đồng:</strong> {selectedContract.id_hop_dong}</p>
                <p><strong>Số hợp đồng:</strong> {selectedContract.so_hop_dong}</p>
                <p><strong>Loại hợp đồng:</strong> {selectedContract.loai_hop_dong}</p>
                <p><strong>Ngày ký:</strong> {selectedContract.ngay_ky ? dayjs(selectedContract.ngay_ky).format('DD/MM/YYYY') : ''}</p>
                <p><strong>Hiệu lực từ:</strong> {selectedContract.hieu_luc_tu ? dayjs(selectedContract.hieu_luc_tu).format('DD/MM/YYYY') : ''}</p>
                <p><strong>Hiệu lực đến:</strong> {selectedContract.hieu_luc_den ? dayjs(selectedContract.hieu_luc_den).format('DD/MM/YYYY') : ''}</p>
              </Col>
              <Col span={12}>
                <p><strong>Đồng tiền:</strong> {selectedContract.ma_ngoai_te}</p>
                <p><strong>Điều kiện thanh toán:</strong> {selectedContract.dieu_kien_thanh_toan}</p>
                <p><strong>Phí gia công:</strong> {(selectedContract.phi_gia_cong || 0).toLocaleString()}</p>
                <p><strong>Tổng giá trị:</strong> {(selectedContract.tong_gia_tri || 0).toLocaleString()}</p> {/* ✅ HIỂN THỊ TỔNG GIÁ TRỊ */}
                <p><strong>Công ty:</strong> {companies.find(c => c.id_cong_ty === selectedContract.id_cong_ty)?.ten_cong_ty}</p>
                <p><strong>Đối tác:</strong> {partners.find(p => p.id_doi_tac === selectedContract.id_doi_tac)?.ten_doi_tac}</p>
                <p><strong>Mã cục hải quan:</strong> {selectedContract.ma_cuc_hai_quan}</p>
              </Col>
            </Row>
            
            <Divider orientation="left">Nguyên phụ liệu</Divider>
            <Table 
              dataSource={selectedContract.vat_lieus || []} 
              columns={[
                { title: 'Mã', dataIndex: 'ma_vat_lieu' },
                { title: 'Tên', dataIndex: 'ten_vat_lieu' },
                { title: 'ĐVT', dataIndex: 'don_vi_tinh' },
                { title: 'Mã HS', dataIndex: 'ma_hs' },
                { title: 'Số lượng', dataIndex: 'so_luong' },
                { title: 'Đơn giá', dataIndex: 'don_gia' },
                { title: 'Thành tiền', render: (_, r) => (r.so_luong * r.don_gia).toLocaleString() },
              ]}
              pagination={false}
              size="small"
            />

            <Divider orientation="left">Sản phẩm</Divider>
            <Table 
              dataSource={selectedContract.san_phams || []} 
              columns={[
                { title: 'Mã', dataIndex: 'ma_san_pham' },
                { title: 'Tên', dataIndex: 'ten_san_pham' },
                { title: 'ĐVT', dataIndex: 'don_vi_tinh' },
                { title: 'Mã HS', dataIndex: 'ma_hs' },
                { title: 'Số lượng', dataIndex: 'so_luong' },
                { title: 'Đơn giá', dataIndex: 'don_gia' },
                { title: 'Thành tiền', render: (_, r) => (r.so_luong * r.don_gia).toLocaleString() },
              ]}
              pagination={false}
              size="small"
            />

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center' }}>
                <p><strong>Bên Công ty</strong></p>
                <p>(Ký tên, đóng dấu)</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p><strong>Bên Đối tác</strong></p>
                <p>(Ký tên, đóng dấu)</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}