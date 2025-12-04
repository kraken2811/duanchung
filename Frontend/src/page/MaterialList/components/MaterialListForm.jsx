import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Tabs,
  Row,
  Col,
  Input,
  Select,
  InputNumber,
  Radio,
  Checkbox,
  Button,
  Form,
} from "antd";
import { FiSearch, FiSave, FiX } from "react-icons/fi";
import { MATERIAL_DEFAULT, UNIT_OPTIONS } from "../types";
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

  const { control, reset, handleSubmit, setValue } = useForm({
    defaultValues: MATERIAL_DEFAULT,
  });

  // Reset form khi mở modal hoặc đổi dòng dữ liệu
  useEffect(() => {
    if (open) {
      reset(initialData || MATERIAL_DEFAULT);
    }
  }, [open, initialData, reset]);

  const onSubmit = (data) => {
    // Gọi API save tại đây
    console.log("Submit Material:", data);
    notify.success(isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
    onSuccess(data);
    onCancel();
  };

  // Tab 1: Thông tin chung
  const renderGeneralInfo = () => (
    <div style={{ padding: "8px 0" }}>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <label className="field-label">Mã nguyên liệu <span className="text-red">*</span></label>
          <Controller
            name="code"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="VD: NPL-001" disabled={isEdit} />}
          />
        </Col>
        <Col span={12}>
          <label className="field-label">Nguồn gốc</label>
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field} style={{ width: "100%" }}>
                <Radio value="import">Nhập khẩu</Radio>
                <Radio value="domestic">Mua trong nước</Radio>
              </Radio.Group>
            )}
          />
        </Col>
        
        <Col span={24}>
          <label className="field-label">Tên nguyên liệu (VN) <span className="text-red">*</span></label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
        </Col>
        
        <Col span={24}>
          <label className="field-label">Tên tiếng Anh (EN)</label>
          <Controller
            name="nameEn"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Col>

        <Col span={8}>
          <label className="field-label">Đơn vị tính</label>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <Select {...field} options={UNIT_OPTIONS} style={{ width: "100%" }} />
            )}
          />
        </Col>
        <Col span={8}>
          <label className="field-label">Mã HS</label>
          <div style={{ display: "flex", gap: 4 }}>
            <Controller
              name="hsCode"
              control={control}
              render={({ field }) => <Input {...field} placeholder="8-10 số" />}
            />
            <Button icon={<FiSearch />} title="Tra cứu HS" />
          </div>
        </Col>
        <Col span={8}>
          <label className="field-label">Xuất xứ (Nước)</label>
          <Controller
            name="originCountry"
            control={control}
            render={({ field }) => <Input {...field} style={{ width: "100%" }} placeholder="VN, CN..." />}
          />
        </Col>
      </Row>
    </div>
  );

  // Tab 2: Thông tin tham khảo
  const renderReferenceInfo = () => (
    <div style={{ padding: "8px 0" }}>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <label className="field-label">Đơn giá dự kiến</label>
          <Controller
            name="unitPrice"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} style={{ width: "100%" }} min={0} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
            )}
          />
        </Col>
        <Col span={8}>
          <label className="field-label">Thuế suất NK (%)</label>
          <Controller
            name="taxRate"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} style={{ width: "100%" }} min={0} max={100} />
            )}
          />
        </Col>
        <Col span={8}>
          <label className="field-label">Trọng lượng (Gross)</label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} style={{ width: "100%" }} min={0} addonAfter="KGM" />
            )}
          />
        </Col>
        <Col span={24}>
          <label className="field-label">Ghi chú</label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => <TextArea {...field} rows={3} />}
          />
        </Col>
        <Col span={24}>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onChange={field.onChange}>
                Theo dõi hoạt động (Active)
              </Checkbox>
            )}
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <Modal
      title={isEdit ? "Cập nhật Nguyên phụ liệu" : "Thêm mới Nguyên phụ liệu"}
      open={open}
      onCancel={onCancel}
      width={700}
      maskClosable={false}
      footer={[
        <Button key="cancel" icon={<FiX />} onClick={onCancel}>
          Hủy bỏ
        </Button>,
        <Button key="save" type="primary" icon={<FiSave />} onClick={handleSubmit(onSubmit)}>
          Ghi lại
        </Button>,
      ]}
      // Style để giống Desktop App: Header nhỏ, padding chặt
      styles={{ body: { padding: "0 24px" } }}
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