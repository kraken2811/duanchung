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
} from "antd";
import { FiSend, FiFileText, FiList } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react"; 
import dayjs from "dayjs"; // Cần import dayjs để xử lý DatePicker
import customParseFormat from "dayjs/plugin/customParseFormat";
import useNotify from "@/components/notification/useNotify";
<<<<<<< HEAD

// Kích hoạt plugin để parse định dạng DD/MM/YYYY
dayjs.extend(customParseFormat);
=======
import { IDB_DEFAULT } from "../types";
import "../css/IDB.css";
<<<<<<< HEAD
=======
>>>>>>> 9c85ef33442b0295486bafafeb41df96be558f9b
>>>>>>> 4aabc03211034d5d05ec78cb1ad486315c90a84d

export default function IDBForm() {
  const notify = useNotify();

  // --- 1. DỮ LIỆU GIẢ LẬP ---
  // Dùng useMemo để giữ danh sách cố định, tránh tạo lại mỗi lần render
  const declarationList = useMemo(() => {
    return Array.from({ length: 18 }).map((_, index) => {
      const i = index + 1;
      const statusTypes = ["success", "pending", "error"];
      const statusTexts = ["Đã thông quan", "Chờ khai IDB", "Bị từ chối"];
      const rand = i % 3;

      return {
        key: i,
        stt: i,
        no: `102742${8000 + i}`,
        // Giả lập ngày khác nhau để thấy sự thay đổi
        date: `${10 + (i % 15)}/11/2025`, 
        type: i % 2 === 0 ? "A11 - Nhập kinh doanh" : "A12 - Nhập SXXK",
        status: statusTypes[rand],
        statusText: statusTexts[rand],
        // Giả lập tiền thuế thay đổi theo từng tờ khai
        taxTotal: 154000000 + (i * 1000000), 
      };
    });
  }, []);

  // --- 2. STATE QUẢN LÝ DÒNG ĐANG CHỌN ---
  // Mặc định chọn dòng đầu tiên của danh sách
  const [selectedRecord, setSelectedRecord] = useState(declarationList[0]);

  // --- 3. CONFIG FORM ---
  // Khởi tạo form
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
        declarationNumber: selectedRecord.no,
        typeName: selectedRecord.type,
        regDate: selectedRecord.date,
        taxTotal: selectedRecord.taxTotal,
        goods: [] // Giữ nguyên mảng hàng hóa giả định
    },
  });

  // --- 4. HIỆU ỨNG TỰ ĐỘNG CẬP NHẬT FORM KHI CHỌN DÒNG MỚI ---
  useEffect(() => {
    if (selectedRecord) {
      // Hàm reset sẽ cập nhật lại toàn bộ giá trị của form khớp với dòng đã chọn
      // Giúp việc submit sau này lấy đúng dữ liệu mới
      reset({
        declarationNumber: selectedRecord.no,
        typeName: selectedRecord.type,
        regDate: selectedRecord.date, // Lưu dạng string hoặc dayjs object tùy logic submit
        taxTotal: selectedRecord.taxTotal,
        goods: [
           // Giả lập hàng hóa thay đổi chút ít theo ID để demo
           { id: 1, code: 'HS-001', desc: `Linh kiện điện tử (Lô ${selectedRecord.stt})`, qty: 1000, taxRate: 10, taxVal: 5000000 },
           { id: 2, code: 'HS-002', desc: 'Vỏ nhựa cao cấp', qty: 500, taxRate: 8, taxVal: 2000000 },
        ] 
      });
    }
  }, [selectedRecord, reset]);

  const onSubmit = (data) => {
    console.log("IDB SUBMIT DATA:", data);
    notify.success(`Đã gửi tờ khai IDB: ${data.declarationNumber} thành công!`);
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
      render: (text) => <span style={{ fontWeight: "bold", color: "#1677ff" }}>{text}</span> 
    },
    { title: "Ngày đăng ký", dataIndex: "date", width: 120 },
    { title: "Loại hình", dataIndex: "type" },
    { 
      title: "Trạng thái", 
      dataIndex: "status", 
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
    { title: "Mô tả", dataIndex: "desc" },
    { title: "Số lượng", dataIndex: "qty", width: 100, align: "right" },
    { title: "Thuế suất (%)", dataIndex: "taxRate", width: 120, align: "center" },
    {
      title: "Tiền thuế (VND)",
      dataIndex: "taxVal",
      align: "right",
      render: (val) => <b style={{ color: "#cf1322" }}>{val.toLocaleString()}</b>,
    },
  ];

  // Lấy danh sách hàng hóa hiện tại từ form để render bảng chi tiết
  // (Do dùng reset() nên cần watch hoặc lấy từ state local, ở đây lấy cứng từ biến render để đơn giản hóa display, 
  // nhưng chuẩn nhất là dùng useWatch hoặc control, tuy nhiên để demo ta dùng biến goods giả lập trong useEffect)
  const currentGoods = [
      { id: 1, code: 'HS-001', desc: `Linh kiện điện tử (Lô ${selectedRecord.stt})`, qty: 1000, taxRate: 10, taxVal: 5000000 },
      { id: 2, code: 'HS-002', desc: 'Vỏ nhựa cao cấp', qty: 500, taxRate: 8, taxVal: 2000000 },
  ];

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

      {/* Danh sách tờ khai */}
      <h4 style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
        <FiList style={{ marginRight: 8 }} /> Danh sách tờ khai đã đăng ký
      </h4>
      
      <Table 
        columns={listColumns} 
        dataSource={declarationList} 
        pagination={paginationConfig} 
        size="small" 
        bordered
        style={{ marginBottom: 32, border: "1px solid #f0f0f0", borderRadius: 8 }}
        
        // --- LOGIC CLICK CHỌN DÒNG ---
        onRow={(record) => ({
          onClick: () => {
            // Cập nhật state selectedRecord
            setSelectedRecord(record);
          },
          style: { cursor: 'pointer' }
        })}
        
        // Highlight dòng đang chọn dựa trên so sánh mã tờ khai
        rowClassName={(record) => 
          record.no === selectedRecord?.no ? "selected-row" : ""
        }
      />
      
      <Divider style={{ borderColor: "#1677ff", borderWidth: 2 }}>
        <span style={{ color: "#1677ff", fontWeight: "bold" }}>
            CHI TIẾT TỜ KHAI
        </span>
      </Divider>
      
      {/* Form chi tiết */}
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
              // --- BINDING DATA ---
              value={selectedRecord?.no} 
              style={{ backgroundColor: '#f5f5f5', color: '#000', fontWeight: 'bold' }}
            />
          </Col>

          <Col span={8}>
            <label style={{ display: 'block', marginBottom: 4 }}>Ngày đăng ký</label>
            {/* Sử dụng dayjs để parse chuỗi "dd/mm/yyyy" thành object ngày */}
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
              // --- BINDING DATA ---
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
                // --- BINDING DATA ---
                value={selectedRecord?.taxTotal}
                precision={0}
                valueStyle={{ color: '#cf1322', fontWeight: 'bold', fontSize: 24 }}
                suffix="VND"
              />
            </Col>
          </Row>
        </div>

        <Divider />

        <h4 style={{ marginBottom: 16 }}>Danh sách hàng hóa & Thuế chi tiết</h4>
        <Table
          columns={detailColumns}
          // Sử dụng dữ liệu mẫu (hoặc dữ liệu thực tế từ state nếu có)
          dataSource={currentGoods}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
        />

        <Divider />

<<<<<<< HEAD
        <div style={{ textAlign: "right", marginTop: 20, paddingBottom: 20 }}>
          <Button size="large" className="btn-hover-white" style={{ marginRight: 12 }}>
=======
      <Divider />

      {/* 4. Đính kèm (Chỉ hiển thị, không cho sửa) */}
      <h4 style={{ marginBottom: 16 }}>Đính kèm chứng từ</h4>
      <div style={{ padding: 12, background: '#fafafa', border: '1px dashed #d9d9d9', textAlign: 'center', color: '#999' }}>
         Không có tệp đính kèm mới (Sử dụng tệp từ IDA)
      </div>

      <Divider />

      {/* 5. Nút bấm Bottom Bar */}
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button className="textSibar" size="large" style={{ marginRight: 12 }}>
<<<<<<< HEAD
=======
>>>>>>> 9c85ef33442b0295486bafafeb41df96be558f9b
>>>>>>> 4aabc03211034d5d05ec78cb1ad486315c90a84d
            Quay lại
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            icon={<FiSend />}
          >
            Gửi IDB ({selectedRecord?.no})
          </Button>
        </div>
      </form>
    </div>
  );
}