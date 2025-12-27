import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tabs, Button, Space, message } from "antd";
import { FiSave, FiSend } from "react-icons/fi";

import GeneralInfo1 from "./GeneralInfo1";
import GeneralInfo2 from "./GeneralInfo2";
import GoodsList from "./GoodsList";
import dayjs from "dayjs";
import {
  createIDA,
  updateGen2,
  declareIDA,
} from "../api/ida.api";
const defaultValues = {
  declarationNumber: "",
  typeCode: "",
  customsOffice: "",
  regDate: null,

  importer: {
    companyId: null,
    taxCode: "",
    name: "",
    address: "",
    phone: "",
  },

  exporter: {
    doiTacId: null,
    name: "",
    address: "",
    countryCode: "",
    phone: "",
    email: "",
  },

  loHang: {
    shippingMethodId: null,
    portOfLoading: null,
    portOfDischarge: null,
    storageLocation: null,
    estimatedExportDate: null,
    estimatedImportDate: null,
    carrierId: null,
    agentId: null,
    description: "",
  },

  invoice: {},
  customsValue: {},
  taxesAndGuarantees: {},
  otherInformation: {},
};

export default function IDAForm() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues,
  });

  const [activeTab, setActiveTab] = useState("1");
  const [goods, setGoods] = useState([]);
  const [idToKhai, setIdToKhai] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ida_gen1"));

    if (saved?.idToKhai) {
      const form = saved.form;

      reset({
        ...form,
        invoice: {
          ...form.invoice,
          date: form.invoice?.date
            ? dayjs(form.invoice.date)
            : null,
        },
        otherInformation: {
          ...form.otherInformation,
          contractDate: form.otherInformation?.contractDate
            ? dayjs(form.otherInformation.contractDate)
            : null,
        },
      });

      setIdToKhai(saved.idToKhai);
      setActiveTab("2");
    }
  }, [reset]);
  const onSaveGen1 = async (form) => {
    try {
      const payload = {
        loai_to_khai: "IDA",
        phan_loai: "IDA",
        ma_cuc_hai_quan: form.customsOffice || null,
        id_hop_dong: form.contractId,
        ngay_khai_bao: form.regDate
          ? dayjs(form.regDate).toISOString()
          : null,

        id_loai_hinh: form.typeCode || null,
        id_cong_ty: form.importer?.companyId,
        nguoi_tao: JSON.parse(localStorage.getItem("user"))?.id_nguoi_dung,
      };

      const res = await createIDA(payload);
      const idToKhai = res.data.id_to_khai;

      if (!idToKhai) {
        throw new Error("Không nhận được id_to_khai từ server");
      }

      localStorage.setItem(
        "ida_gen1",
        JSON.stringify({
          idToKhai,
          form,
        })
      );

      setIdToKhai(idToKhai);
      setActiveTab("2");

      message.success("Lưu GEN 1 thành công");
    } catch (err) {
      console.error("GEN1 ERROR:", err);
      message.error("Lỗi lưu GEN 1");
    }
  };

  const onSaveGen2 = async () => {
    if (!idToKhai) {
      message.error("Chưa có tờ khai");
      return;
    }

    const payload = {

      hoa_don: {
        so_hoa_don: watch("invoice.number"),
        ngay_hoa_don: watch("invoice.date"),
        dieu_kien_giao_hang: watch("invoice.incoterms"),
        ma_ngoai_te: watch("invoice.currency"),
        tong_tien: watch("invoice.totalValue"),
      },

      tri_gia: {
        phuong_phap: watch("customsValue.method"),
        phi_van_chuyen: watch("customsValue.freight"),
        phi_bao_hiem: watch("customsValue.insurance"),
      },
      hop_dong: {
        so_hop_dong: watch("otherInformation.contractNumber"),
        ngay_ky: watch("otherInformation.contractDate"),
        loai_hop_dong: watch("otherInformation.contractType"),
      },
    };

    try {
      await updateGen2(idToKhai, payload);
      message.success("Lưu GEN 2 thành công");
      setActiveTab("3");
    } catch (err) {
      console.error(err);
      message.error("Lỗi lưu GEN 2");
    }
  };
  const onDeclare = async () => {
    if (!idToKhai) {
      message.error("Chưa có tờ khai để khai báo");
      return;
    }

    try {
      await declareIDA(idToKhai);

      message.success("Khai báo thành công! Tờ khai đã được gửi lên hệ thống hải quan.");
      reset(defaultValues);
      setIdToKhai(null);
      setActiveTab("1");
      localStorage.removeItem("ida_gen1");

    } catch (err) {
      const msg = err.response?.data?.message || "Khai báo thất bại";
      message.error(msg);
    }
  }

  return (
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
            onClick={onDeclare}
            disabled={!idToKhai}
          >
            Khai báo
          </Button>
        </Space>
      </div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "1",
            label: "Gen 1 – Thông tin tờ khai",
            children: (
              <GeneralInfo1
                control={control}
                setValue={setValue}
              />
            ),
          },
          {
            key: "2",
            label: "Gen 2 – Thông tin bổ sung",
            children: <GeneralInfo2 control={control} />,

          },
          {
            key: "3",

            label: "Hàng hoá",
            children: (
              <GoodsList idToKhai={idToKhai} />
            ),
          },
        ]}
      />
    </div>
  );
}
