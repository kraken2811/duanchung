import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Divider,
  Table,
  Statistic,
  Tag,
  Alert,
  notification,
} from "antd";
import { FiSend, FiFileText, FiList } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react"; 
import dayjs from "dayjs"; // Cần import dayjs để xử lý DatePicker
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getTrangThai, getMaIDB, submitIDB } from "@/page/IDB/api/idb.api"

// Kích hoạt plugin để parse định dạng DD/MM/YYYY
dayjs.extend(customParseFormat);

export default function IDBForm() {
  const [declarationList, setDeclarationList] = useState([]);
  const [goods, setGoods] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      declarationNumber: "",
      typeName: "",
      regDate: null,
      taxTotal: 0,
      goods: [],
    },
  });

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await getTrangThai();
        const rawList = res;

        if (!Array.isArray(rawList) || rawList.length === 0) {
          setDeclarationList([]);
          setSelectedRecord(null);
          return;
        }

        const mappedList = rawList.map((raw, index) => {
          const statusMap = {
            CHO_GUI: { status: "pending", text: "Chờ gửi IDB" },
          };

          const st = statusMap[raw.trang_thai_gui] || {
            status: "default",
            text: raw.trang_thai_gui,
          };

          return {
            key: String(raw.id_to_khai),
            stt: index + 1,
            no: raw.so_to_khai,
            tencongty: raw.cong_ty.ten_cong_ty,
            date: raw.ngay_tao
              ? dayjs(raw.ngay_tao).format("DD/MM/YYYY")
              : "",
            type: raw.loai_to_khai,
            ngt: raw.nguoi_dung.ho_ten,
            status: st.status,
            statusText: st.text,
            taxTotal: Number(raw.so_tien_thue || 0),
          };
        });

        setDeclarationList(mappedList);
        setSelectedRecord(null);
      } catch (err) {
        console.error("fetchList error:", err);
        notification.error("Không lấy được danh sách tờ khai IDB");
      }
    };

    fetchList();
  }, []);

  useEffect(() => {
    if (!selectedRecord) {
      reset();
      setGoods([]);
    }
  }, [selectedRecord]);

  const fetchIDBDetail = async (so_to_khai) => {
    try {
      const data = await getMaIDB(so_to_khai);
      console.log("IDB DETAIL:", data);

      reset({
        declarationNumber: data.so_to_khai,
        typeName: data.loai_to_khai,
        regDate: data.ngay_khai_bao
          ? dayjs(data.ngay_khai_bao).format("DD/MM/YYYY")
          : null,
        taxTotal: Number(data.so_tien_thue || 0),
      });

      setGoods(
        (data.chi_tiet_to_khai || []).map((item, index) => ({
          id: index + 1,
          code: item.ma_hs,
          desc: item.mo_ta_hang_hoa || "",
          qty: item.so_luong ?? "",
          tt: item.ma_ngoai_te,
          dv: item.don_vi_tinh,
          taxRate: Number(item.bieu_thue?.thue_suat || 0),
          taxVal: Number(item.tien_thue || 0)
        }))
      );
    } catch (err) {
      console.error("getMaIDB error:", err);
      notification.error("Không lấy được chi tiết IDB");
    }
  };

  const onSubmit = async () => {
    if (!selectedRecord?.no) {
      notification.warning("Vui lòng chọn tờ khai trước khi gửi IDB");
      return;
    }

    try {
      await submitIDB(selectedRecord.no);

      notification.success({
        message: "Gửi IDB thành công",
        description: `Tờ khai ${selectedRecord.no} đã được gửi`,
      });

      const res = await getTrangThai();

      const mappedList = res.map((raw, index) => ({
        key: String(raw.id_to_khai),
        stt: index + 1,
        no: raw.so_to_khai,
        tencongty: raw.cong_ty.ten_cong_ty,
        date: raw.ngay_tao
          ? dayjs(raw.ngay_tao).format("DD/MM/YYYY")
          : "",
        type: raw.loai_to_khai,
        ngt: raw.nguoi_dung.ho_ten,
        status: "pending",
        statusText: "CHO_GUI",
        taxTotal: Number(raw.so_tien_thue || 0),
      }));

      setDeclarationList(mappedList);
      setSelectedRecord(null);
      setGoods([]);
      reset();
    } catch (err) {
      notification.error({
        message: "Không thể gửi IDB",
        description:
          err?.response?.data?.message ||
          err?.message ||
          "Gửi IDB thất bại",
      });
    }
  };

  const paginationConfig = {
    defaultPageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20'],
    position: ["bottomRight"],
  };

  const listColumns = [
    { title: "STT", dataIndex: "stt", width: 60, align: "center" },
    { 
      title: "Số tờ khai", 
      dataIndex: "no", 
      width: 150, 
      render: (text) => <span style={{ fontWeight: "bold", color: "#1677ff", textAlign: "center" }}>{text}</span> 
    },
    {title: "Tên công ty", dataIndex: "tencongty", width: 300},
    { title: "Ngày đăng ký", dataIndex: "date", width: 120, align: "center"},
    { title: "Loại tờ khai", dataIndex: "type", align: "center"  },
    { title: "Tên người tạo", dataIndex: "ngt"},
    { 
      title: "Trạng thái", 
      dataIndex: "status", 
      align: "center",
      width: 150,
      render: (_, record) => {
        let color = "default";
        if (record.status === "success") color = "green";
        if (record.status === "pending") color = "orange";
        if (record.status === "error") color = "red";
        return <Tag color={color}>{record.statusText}</Tag>;
      }
    },
  ];

  const detailColumns = [
    { title: "Mã hàng", dataIndex: "code", width: 120 },
    { title: "Mô tả", dataIndex: "desc", width: 380},
    { title: "Số lượng", dataIndex: "qty", width: 130, align: "center" },
    { title: "Đơn vị tính", dataIndex: "dv", width: 180, align: "center" },
    { title: "Thuế suất (%)", dataIndex: "taxRate", width: 230, align: "center" },
    {
      title: `Tiền thuế (${goods?.[0]?.tt || ""})`,
      dataIndex: "taxVal",
      align: "right",
      render: (val) => <b style={{ color: "#cf1322" }}>{val.toLocaleString()}</b>,
    },
  ];

  const totalTaxFromTable = useMemo(() => {
    return goods.reduce((sum, item) => {
      return (
        sum +
        (item.taxVal || 0) +
        (item.vatVal || 0) +
        (item.extraTaxVal || 0)
      );
    }, 0);
  }, [goods]);

  const currency = goods?.[0]?.tt || "";

  return (
    <div style={{ padding: "0 12px" }}>
      <style>{`
        .btn-hover-white:hover {
          background-color: #003366 !important;
          color: white !important;
          border-color: #003366 !important;
        }
        .ant-btn-primary:hover {
          color: white !important;
          background-color: #4096ff !important;
        }
        .selected-row td {
          background-color: #e6f7ff !important;
        }
        .selected-row:hover td {
          background-color: #bae0ff !important;
        }
      `}</style>

      <h4 style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
        <FiList style={{ marginRight: 8 }} /> Danh sách tờ khai đã đăng ký
      </h4>
      
      <Table 
        rowKey="key"
        columns={listColumns}
        dataSource={declarationList} 
        pagination={paginationConfig} 
        size="small" 
        bordered
        style={{ marginBottom: 32, border: "1px solid #f0f0f0", borderRadius: 8 }}

        onRow={(record) => ({
          onClick: () => {
            setSelectedRecord(record);
            fetchIDBDetail(record.no);
          },
          style: { cursor: "pointer" },
        })}
        
        rowClassName={(record) => 
          record.no === selectedRecord?.no ? "selected-row" : ""
        }
      />
      
      <Divider style={{ borderColor: "#1677ff", borderWidth: 2 }}>
        <span style={{ color: "#1677ff", fontWeight: "bold" }}>
            CHI TIẾT TỜ KHAI
        </span>
      </Divider>
      
      {!selectedRecord ? (
        <Alert
          type="info"
          showIcon
          description="Vui lòng chọn một tờ khai trong danh sách để xem chi tiết IDB."
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 style={{ marginBottom: 16, marginTop: 0, display: 'flex', alignItems: 'center' }}>
            <FiFileText style={{ marginRight: 8 }} />
            Thông tin tờ khai
          </h4>

          <Row gutter={24}>
            <Col span={8}>
              <label style={{ display: 'block', marginBottom: 4 }}>Số tờ khai</label>
              <Input
                disabled
                value={selectedRecord?.no} 
                style={{ backgroundColor: '#f5f5f5', color: '#000', fontWeight: 'bold' }}
              />
            </Col>

            <Col span={8}>
              <label style={{ display: 'block', marginBottom: 4 }}>Ngày đăng ký</label>
              <DatePicker
                style={{ width: "100%", backgroundColor: '#f5f5f5' }}
                disabled
                format="DD/MM/YYYY"
                value={selectedRecord?.date ? dayjs(selectedRecord.date, "DD/MM/YYYY") : null}
              />
            </Col>

            <Col span={8}>
              <label style={{ display: 'block', marginBottom: 4 }}>Loại hình</label>
              <Input
                disabled
                value={selectedRecord?.type}
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </Col>
          </Row>

          <div style={{ marginTop: 24, padding: '16px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 8 }}>
            <Row gutter={24} align="middle">
              <Col span={12}>
                <span style={{ fontWeight: 500, color: '#389e0d' }}>
                  Thông tin thuế (Hệ thống tính toán từ IDA):
                </span>
                <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
                  Vui lòng kiểm tra kỹ số tiền thuế trước khi gửi khai báo chính thức.
                </div>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Statistic
                  title="Tổng thuế phải nộp"
                  valueRender={() => (
                    <span style={{ color: "#cf1322", fontWeight: "bold", fontSize: 24 }}>
                      {totalTaxFromTable.toLocaleString()} {currency}
                    </span>
                  )}
                  precision={0}
                />
              </Col>
            </Row>
          </div>

          <Divider />

          <h4 style={{ marginBottom: 16 }}>Danh sách hàng hóa & Thuế chi tiết</h4>
          <Table
            columns={detailColumns}
            dataSource={goods}
            rowKey="id"
            pagination={false}
            bordered
            size="middle"
          />

          <Divider />

          <div style={{ textAlign: "right", marginTop: 20, paddingBottom: 20 }}>
            <Button
              size="large"
              className="btn-hover-white"
              style={{ marginRight: 12 }}
              onClick={() => {
                setSelectedRecord(null);
                setGoods([]);
                reset();
              }}
            >
              Đóng
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<FiSend />}
            >
              Gửi IDB
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}