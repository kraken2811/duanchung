import { useState, useEffect } from "react";
import { Card, Row, Col, Input, DatePicker, Select, Button, Space, Divider} from "antd";
import { FiSearch } from "react-icons/fi";
import "../css/declaration.css";
import { getLoaiHinh } from "../api/declarations.api";

const { RangePicker } = DatePicker;

export default function DeclarationsFilter({ onSearch, onReset }) {
  const [filters, setFilters] = useState({
    dateRange: null,
    declarationNumber: "",
    loai_hinh: null,
    partnerName: "",
    status: "",
  })

  const [loaiHinhs, setLoaiHinhs] = useState([]);
  const [loadingLoaiHinh, setLoadingLoaiHinh] = useState(false);

  // 🔥 load loại hình
  useEffect(() => {
    const fetchLoaiHinh = async () => {
      try {
        setLoadingLoaiHinh(true);
        const data = await getLoaiHinh();
        setLoaiHinhs(data || []);
      } finally {
        setLoadingLoaiHinh(false);
      }
    };

    fetchLoaiHinh();
  }, []);

  const STATUS_FE_TO_BE = {
    pending: "CHO_GUI,DA_GUI",
    inspection: "DA_TIEP_NHAN",
    completed: "DA_THONG_QUAN",
    cancelled: "HUY,TU_CHOI",
  };

  const handleSearch = () => {
    const payload = {
      so_to_khai: filters.declarationNumber || undefined,
      loai_hinh: filters.loai_hinh || undefined,
      doi_tac: filters.partnerName || undefined,
      trang_thai: filters.status
        ? STATUS_FE_TO_BE[filters.status]
        : undefined,
    };

    if (filters.dateRange?.length === 2) {
      payload.tu_ngay = filters.dateRange[0].format("YYYY-MM-DD");
      payload.den_ngay = filters.dateRange[1].format("YYYY-MM-DD");
    }

    onSearch(payload);
  };

  const handleReset = () => {
    const empty = {
      dateRange: null,
      declarationNumber: "",
      loai_hinh: null,
      partnerName: "",
      status: "",
    };

    setFilters(empty);
    onReset({});
  };

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Khoảng thời gian
          </label>
          <RangePicker
            style={{ width: "100%" }}
            placeholder={["Từ ngày", "Đến ngày"]}
            format="DD/MM/YYYY"
            value={filters.dateRange}
            onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
          />
        </Col>
        <Col span={6}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Số tờ khai
          </label>
          <Input
            placeholder="Nhập số tờ khai"
            prefix={<FiSearch />}
            value={filters.declarationNumber}
            onChange={(e) =>
              setFilters({ ...filters, declarationNumber: e.target.value })
            }
          />
        </Col>
        <Col span={5}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Loại hình
          </label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn loại hình"
            value={filters.loai_hinh}
            onChange={(value) =>
              setFilters({ ...filters, loai_hinh: value })
            }
            allowClear
            loading={loadingLoaiHinh}
            optionFilterProp="children"
            showSearch
          >
            {loaiHinhs.map((lh) => (
              <Select.Option key={lh.id_loai_hinh} value={lh.id_loai_hinh}>
                {lh.ma_loai_hinh} – {lh.ten_loai_hinh}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={5}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Trạng thái
          </label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn trạng thái"
            value={filters.status || undefined}
            onChange={(value) => setFilters({ ...filters, status: value })}
            allowClear
          >
            <Select.Option value="pending">Chờ thông quan</Select.Option>
            <Select.Option value="completed">Đã thông quan</Select.Option>
            <Select.Option value="inspection">Đang kiểm tra</Select.Option>
            <Select.Option value="cancelled">Đã hủy</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={10}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Tên đối tác
          </label>
          <Input
            placeholder="Nhập tên công ty, người xuất/nhập khẩu"
            value={filters.partnerName}
            onChange={(e) =>
              setFilters({ ...filters, partnerName: e.target.value })
            }
          />
        </Col>
        <Divider type="vertical" />
        <Col span={8} style={{ display: "flex", alignItems: "flex-end" }}>
          <Space>
            <Button type="primary" icon={<FiSearch />} size="large" onClick={handleSearch}>
              Tìm kiếm
            </Button>
            <Button className="textSibar" size="large" onClick={handleReset}>
              Xóa bộ lọc
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
