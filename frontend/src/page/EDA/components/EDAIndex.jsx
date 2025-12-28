import { useEffect, useState } from "react";
import { Tabs, Button, Space, message } from "antd";
import { FiSave, FiSend } from "react-icons/fi";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";

import EdaGeneralInfo from "./EdaGeneralInfo";
import EdaGoods from "./EdaGoods";

import {
  createEDA,
  updateEDAGen2,
  submitEDA,
} from "../api/eda.api";
import EdaContainer from "./EdaContainer";
const defaultValues = {
  customsOffice: "",
  regDate: null,

  importer: {
    taxCode: "",
    name: "",
    address: "",
    phone: "",
  },

  exporter: {
    name: "",
    countryCode: "",
    phone: "",
  },

  loHang: {
    vanTai: null,
    cangXep: null,
    cangDo: null,
    luuKho: null,
    ngayXuat: null,
    ngayNhap: null,
    hangVanChuyen: null,
    daiLyHaiQuan: null,
    moTa: "",
  },
};

export default function EDAIndex() {
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;

  const [activeTab, setActiveTab] = useState("1");
  const [idToKhai, setIdToKhai] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("eda_gen1");
    if (saved) {
      const parsed = JSON.parse(saved);

      reset({
        ...parsed.form,
        regDate: parsed.form.regDate
          ? dayjs(parsed.form.regDate)
          : null,
      });
      setIdToKhai(parsed.idToKhai);
      setActiveTab("2");
    }
  }, [reset]);
  const onSaveGen1 = async (form) => {
    try {
      const payload = {
        loai_to_khai: "EDA",
        ma_cuc_hai_quan: form.customsOffice,
        ngay_khai_bao: form.regDate
          ? dayjs(form.regDate).toISOString()
          : null,
      };

      const res = await createEDA(payload);
      const id = res.id_to_khai;

      localStorage.setItem(
        "eda_gen1",
        JSON.stringify({
          idToKhai: res.id_to_khai,
          form,
        })
      );

      setIdToKhai(id);
      setActiveTab("2");

      message.success("Đã lưu GEN 1");
    } catch (err) {
      console.error(err);
      message.error("Lỗi lưu GEN 1");
    }
  };
  const onSaveGen2 = async () => {
    if (!idToKhai) return message.error("Chưa có tờ khai");

    const form = watch();

    const payload = {
      lo_hang: {
        van_tai: form.loHang?.vanTai,
        cang_xep: form.loHang?.cangXep,
        cang_do: form.loHang?.cangDo,
        luu_kho: form.loHang?.luuKho,
        ngay_xuat: form.loHang?.ngayXuat,
        ngay_nhap: form.loHang?.ngayNhap,
        hang_van_chuyen: form.loHang?.hangVanChuyen,
        dai_ly_hai_quan: form.loHang?.daiLyHaiQuan,
        mo_ta: form.loHang?.moTa,
      },
    };

    try {
      await updateEDAGen2(idToKhai, payload);
      message.success("Đã lưu GEN 2");
      setActiveTab("3");
    } catch (err) {
      console.error(err);
      message.error("Lỗi GEN 2");
    }
  };

  const onDeclare = async () => {
    try {
      await submitEDA(idToKhai);;

      message.success("Khai báo EDA thành công");
      localStorage.removeItem("eda_gen1");
      reset(defaultValues);
      setIdToKhai(null);
      setActiveTab("1");
    } catch (err) {
      message.error("Khai báo thất bại");
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <div style={{ background: "#fff", padding: 12, marginBottom: 16 }}>
          <Space>
            <Button onClick={handleSubmit(onSaveGen1)} icon={<FiSave />}>
              Ghi GEN 1
            </Button>

            <Button
              onClick={onSaveGen2}
              icon={<FiSave />}
              disabled={!idToKhai}
            >
              Ghi GEN 2
            </Button>

            <Button
              type="primary"
              icon={<FiSend />}
              disabled={!idToKhai}
              onClick={onDeclare}
            >
              Khai báo
            </Button>
            <Button
              onClick={() => window.print()}
            >
              In
            </Button>
            <Button
              disabled={!idToKhai}
              onClick={() =>
                message.info("Chức năng phản hồi đang phát triển")
              }
            >
              Lấy phản hồi
            </Button>
            <Button
              danger
              onClick={() => {
                localStorage.removeItem("eda_gen1");
                reset(defaultValues);
                setIdToKhai(null);
                setActiveTab("1");
              }}
            >
              Tạo mới
            </Button>

          </Space>
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "1",
              label: "1. Thông tin chung",
              children: <EdaGeneralInfo />,
            },
            {
              key: "2",
              label: "2. Lô hàng",
              children: <EdaContainer />,
            },
            {
              key: "3",
              label: "3. Hàng hóa",
              children: <EdaGoods idToKhai={idToKhai} />,
            },
            {
              key: "4",
              label: "4. Kết quả ",
              children: <EdaGoods idToKhai={idToKhai} />,
            },
          ]}
        />
      </div>
    </FormProvider>
  );
}
