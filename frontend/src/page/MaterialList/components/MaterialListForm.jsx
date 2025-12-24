import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal, Tabs, Row, Col, Input, Select, InputNumber, Radio, Checkbox, Button
} from "antd";
import { FiSearch, FiSave, FiX } from "react-icons/fi";
import { MATERIAL_DEFAULT, UNIT_OPTIONS } from "../types"; // Giữ nguyên import của bạn
import useNotify from "@/components/notification/useNotify";

const { TextArea } = Input;

export default function MaterialListForm({
  open,
  onCancel,
  initialData,
  onSuccess,
}) {
  const notify = useNotify();
  const isEdit = !!initialData?.id;

  const { control, reset, handleSubmit } = useForm({
    defaultValues: MATERIAL_DEFAULT,
  });

  useEffect(() => {
    if (open) reset(initialData || MATERIAL_DEFAULT);
  }, [open, initialData, reset]);

  const onSubmit = (data) => {
    console.log("Submit Material:", data);
    notify.success(isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
    onSuccess(data);
    onCancel();
  };

  // Helper render label giống trang Hợp đồng
  const Label = ({ children, required }) => (
    <label style={{ fontWeight: 500, display: "block", marginBottom: 4 }}>
      {children} {required && <span style={{ color: "red" }}>*</span>}
    </label>
  );

  const renderGeneralInfo = () => (
    <div style={{ paddingTop: 16 }}>
      <Row gutter={[16, 12]}>
        <Col span={12}>
          <Label required>Mã nguyên liệu</Label>
          <Controller
            name="code" control={control} rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Input {...field} placeholder="VD: NPL-001" disabled={isEdit} status={fieldState.error ? "error" : ""} />
            )}
          />
        </Col>
        <Col span={12}>
          <Label>Nguồn gốc</Label>
          <Controller
            name="source" control={control}
            render={({ field }) => (
              <Radio.Group {...field} style={{ width: "100%" }}>
                <Radio value="import">Nhập khẩu</Radio>
                <Radio value="domestic">Mua trong nước</Radio>
              </Radio.Group>
            )}
          />
        </Col>
        
        <Col span={24}>
          <Label required>Tên nguyên liệu (VN)</Label>
          <Controller
            name="name" control={control} rules={{ required: true }}
            render={({ field, fieldState }) => <Input {...field} status={fieldState.error ? "error" : ""} />}
          />
        </Col>
        
        <Col span={24}>
          <Label>Tên tiếng Anh (EN)</Label>
          <Controller
            name="nameEn" control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Col>

        <Col span={8}>
          <Label>Đơn vị tính</Label>
          <Controller
            name="unit" control={control}
            render={({ field }) => <Select {...field} options={UNIT_OPTIONS} style={{ width: "100%" }} />}
          />
        </Col>
        <Col span={8}>
          <Label>Mã HS</Label>
          <div style={{ display: "flex", gap: 4 }}>
            <Controller
              name="hsCode" control={control}
              render={({ field }) => <Input {...field} placeholder="Tra cứu..." />}
            />
            <Button icon={<FiSearch />} />
          </div>
        </Col>
        <Col span={8}>
          <Label>Xuất xứ (Nước)</Label>
          <Controller
            name="originCountry" control={control}
            render={({ field }) => <Input {...field} placeholder="VN, CN..." />}
          />
        </Col>
      </Row>
    </div>
  );

  const renderReferenceInfo = () => (
    <div style={{ paddingTop: 16 }}>
      <Row gutter={[16, 12]}>
        <Col span={8}>
          <Label>Đơn giá dự kiến</Label>
          <Controller
            name="unitPrice" control={control}
            render={({ field }) => (
              <InputNumber {...field} style={{ width: "100%" }} min={0} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
            )}
          />
        </Col>
        <Col span={8}>
          <Label>Thuế suất NK (%)</Label>
          <Controller
            name="taxRate" control={control}
            render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} min={0} max={100} />}
          />
        </Col>
        <Col span={8}>
          <Label>Trọng lượng (Gross)</Label>
          <Controller
            name="weight" control={control}
            render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} min={0} addonAfter="KGM" />}
          />
        </Col>
        <Col span={24}>
          <Label>Ghi chú</Label>
          <Controller
            name="notes" control={control}
            render={({ field }) => <TextArea {...field} rows={3} />}
          />
        </Col>
        <Col span={24}>
          <Controller
            name="isActive" control={control}
            render={({ field }) => <Checkbox checked={field.value} onChange={field.onChange}>Theo dõi hoạt động (Active)</Checkbox>}
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <Modal
      title={isEdit ? "CẬP NHẬT NGUYÊN PHỤ LIỆU" : "THÊM MỚI NGUYÊN PHỤ LIỆU"}
      open={open}
      onCancel={onCancel}
      width={700}
      maskClosable={false}
      footer={[
        <Button key="cancel" onClick={onCancel} icon={<FiX />}>Hủy bỏ</Button>,
        <Button key="save" type="primary" onClick={handleSubmit(onSubmit)} icon={<FiSave />}>Ghi lại</Button>,
      ]}
      styles={{ body: { padding: "0 24px" } }} // Antd v5 property
      style={{ top: 20 }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          { key: "1", label: "Thông tin chung", children: renderGeneralInfo() },
          { key: "2", label: "Thông tin tham khảo", children: renderReferenceInfo() },
        ]}
      />
    </Modal>
  );
}