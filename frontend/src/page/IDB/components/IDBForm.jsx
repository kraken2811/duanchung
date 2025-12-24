import { useForm } from "react-hook-form";
import {
  Row, Col, Input, DatePicker, Button, Divider, Table, Statistic, Card
} from "antd";
import { FiSend, FiFileText } from "react-icons/fi";
import useNotify from "@/components/notification/useNotify";
import { IDB_DEFAULT } from "../types";
import "../css/IDB.css";

export default function IDBForm() {
  const notify = useNotify();
  
  // Giả lập dữ liệu đã được hệ thống trả về từ bước IDA
  const defaultValues = {
      ...IDB_DEFAULT,
      declarationNumber: "1027429999",
      regDate: null, 
      typeName: "Nhập kinh doanh tiêu dùng (A11)",
      taxTotal: 154000000, // Tổng thuế
      goods: [
          { id: 1, code: 'HS-001', desc: 'Linh kiện điện tử A', qty: 1000, taxRate: 10, taxVal: 5000000 },
          { id: 2, code: 'HS-002', desc: 'Vỏ nhựa cao cấp', qty: 500, taxRate: 8, taxVal: 2000000 },
      ]
  };

  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    console.log("IDB SUBMIT:", data);
    notify.success("Đã gửi tờ khai IDB thành công!");
  };

  // Cấu hình cột bảng (Thêm cột tiền thuế)
  const columns = [
    { title: "Mã hàng", dataIndex: "code" },
    { title: "Mô tả", dataIndex: "desc" },
    { title: "Số lượng", dataIndex: "qty" },
    { title: "Thuế suất (%)", dataIndex: "taxRate" },
    { 
      title: "Tiền thuế (VND)", 
      dataIndex: "taxVal",
      render: (val) => val.toLocaleString() 
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 1. Thông tin chung */}
      <h4 style={{ marginBottom: 16, marginTop: 0 }}>
        <FiFileText style={{ marginRight: 8 }} />
        Thông tin tờ khai
      </h4>
      
      <Row gutter={24}>
        <Col span={8}>
          <label style={{ display: 'block', marginBottom: 4 }}>Số tờ khai</label>
          <Input 
            disabled 
            style={{ backgroundColor: '#f5f5f5', color: '#000', fontWeight: 'bold' }}
            {...register("declarationNumber")} 
          />
        </Col>

        <Col span={8}>
          <label style={{ display: 'block', marginBottom: 4 }}>Ngày đăng ký</label>
          <DatePicker 
            style={{ width: "100%", backgroundColor: '#f5f5f5' }} 
            disabled 
            placeholder="27/11/2025"
          />
        </Col>

        <Col span={8}>
          <label style={{ display: 'block', marginBottom: 4 }}>Loại hình</label>
          <Input 
            disabled 
            style={{ backgroundColor: '#f5f5f5' }}
            {...register("typeName")} 
          />
        </Col>
      </Row>

      {/* 2. Phần hiển thị Thuế (Điểm nhấn của IDB) */}
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
                    value={defaultValues.taxTotal} 
                    precision={0} 
                    valueStyle={{ color: '#cf1322', fontWeight: 'bold', fontSize: 24 }} 
                    suffix="VND"
                />
            </Col>
        </Row>
      </div>

      <Divider />

      {/* 3. Danh sách hàng hóa */}
      <h4 style={{ marginBottom: 16 }}>Danh sách hàng hóa & Thuế chi tiết</h4>

      <Table
        columns={columns}
        dataSource={defaultValues.goods}
        rowKey="id"
        pagination={false}
        bordered
        size="middle"
      />

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
            Quay lại
        </Button>
        <Button 
            type="primary" 
            size="large" 
            htmlType="submit" 
            icon={<FiSend />}
            style={{ backgroundColor: '#002766', borderColor: '#002766' }} // Màu xanh đậm giống header trong hình
        >
          Gửi IDB (Khai báo)
        </Button>
      </div>
    </form>
  );
}