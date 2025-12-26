import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Tag,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Empty,
} from "antd";
import { FiPlus, FiEdit, FiTrash2, FiPercent } from "react-icons/fi";

import DataTable from "@/components/common/DataTable";
import {
  getByDraftId,
  getByToKhaiId,
  createChiTietToKhai,
  updateChiTietToKhai,
  deleteChiTietToKhai,
  calcTaxByMaHS,
} from "../api/chiTietToKhai.api";

const { TextArea } = Input;

/**
 * Props:
 * - draftId?: string   // IDA nháp
 * - toKhaiId?: number // ID tờ khai sau khi ghi
 */
export default function GoodsList({ draftId, toKhaiId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const isLocked = !!toKhaiId;

  /* ================= LOAD DATA ================= */
  const fetchData = async () => {
    if (!draftId && !toKhaiId) return;

    setLoading(true);
    try {
      const res = toKhaiId
        ? await getByToKhaiId(toKhaiId)
        : await getByDraftId(draftId);

      setData(res);
    } catch {
      message.error("Không tải được danh sách hàng hóa");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [draftId, toKhaiId]);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        ...(draftId && { draft_id: draftId }),
      };

      if (editing) {
        await updateChiTietToKhai(editing.id_chi_tiet, payload);
        message.success("Cập nhật hàng hóa thành công");
      } else {
        await createChiTietToKhai(payload);
        message.success("Thêm hàng hóa thành công");
      }

      setOpen(false);
      setEditing(null);
      form.resetFields();
      fetchData();
    } catch (err) {
      message.error(err.message || "Lỗi lưu dữ liệu");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xóa hàng hóa?",
      content: "Dữ liệu sẽ bị xóa",
      okType: "danger",
      onOk: async () => {
        await deleteChiTietToKhai(id);
        message.success("Đã xóa");
        fetchData();
      },
    });
  };

  /* ================= CALC TAX ================= */
  const handleCalcTax = async (row) => {
    try {
      await calcTaxByMaHS(row.id_chi_tiet, {
        ma_hs: row.ma_hs,
        tong_gia_tri: row.tong_gia_tri,
      });
      message.success("Đã tính thuế");
      fetchData();
    } catch (err) {
      message.error(err.response?.data?.error || "Không tính được thuế");
    }
  };

  /* ================= COLUMNS ================= */
  const columns = [
    {
      title: "STT",
      render: (_, __, i) => i + 1,
      width: 60,
      align: "center",
    },
    {
      title: "Mô tả hàng hóa",
      dataIndex: "mo_ta_hang_hoa",
    },
    {
      title: "HS",
      dataIndex: "ma_hs",
      width: 120,
      align: "center",
      render: (v) => <Tag color="blue">{v}</Tag>,
    },
    {
      title: "SL",
      dataIndex: "so_luong",
      width: 90,
      align: "right",
    },
    {
      title: "ĐVT",
      dataIndex: "don_vi_tinh",
      width: 90,
      align: "center",
    },
    {
      title: "Trị giá",
      dataIndex: "tong_gia_tri",
      width: 130,
      align: "right",
    },
    {
      title: "Thuế NK",
      dataIndex: "tien_thue",
      width: 130,
      align: "right",
    },
    {
      title: "VAT",
      dataIndex: "tien_vat",
      width: 130,
      align: "right",
    },
    {
      title: "Tác vụ",
      width: 160,
      align: "center",
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<FiEdit />}
            disabled={isLocked}
            onClick={() => {
              setEditing(r);
              setOpen(true);
              form.setFieldsValue(r);
            }}
          />
          <Button
            size="small"
            icon={<FiPercent />}
            onClick={() => handleCalcTax(r)}
          />
          <Button
            size="small"
            danger
            icon={<FiTrash2 />}
            disabled={isLocked}
            onClick={() => handleDelete(r.id_chi_tiet)}
          />
        </Space>
      ),
    },
  ];

  /* ================= EMPTY STATE ================= */
  if (!draftId && !toKhaiId) {
    return (
      <Empty
        description="Vui lòng ghi IDA trước khi nhập danh sách hàng hóa"
      />
    );
  }

  return (
    <>
      <Space style={{ marginBottom: 12 }}>
        <Button
          type="primary"
          icon={<FiPlus />}
          disabled={isLocked}
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Thêm hàng
        </Button>
      </Space>

      <DataTable
        rowKey="id_chi_tiet"
        columns={columns}
        data={data}
        loading={loading}
      />

      {/* ================= MODAL ================= */}
      <Modal
        open={open}
        title={editing ? "Cập nhật hàng hóa" : "Thêm hàng hóa"}
        onCancel={() => setOpen(false)}
        onOk={handleSave}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="ma_hs" label="Mã HS" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="mo_ta_hang_hoa"
            label="Mô tả hàng hóa"
            rules={[{ required: true }]}
          >
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item name="so_luong" label="Số lượng" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="don_vi_tinh"
            label="Đơn vị"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="Cái">Cái</Select.Option>
              <Select.Option value="Chiếc">Chiếc</Select.Option>
              <Select.Option value="Kg">Kg</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="don_gia" label="Đơn giá">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="tong_gia_tri"
            label="Tổng trị giá"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="ma_ngoai_te" label="Ngoại tệ">
            <Select>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="VND">VND</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="ma_quoc_gia" label="Xuất xứ">
            <Select>
              <Select.Option value="VN">VN</Select.Option>
              <Select.Option value="CN">CN</Select.Option>
              <Select.Option value="KR">KR</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
