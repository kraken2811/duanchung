import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tabs, Button, Space, message } from "antd";
import { FiSave, FiSend } from "react-icons/fi";

import GeneralInfo1 from "./GeneralInfo1";
import GeneralInfo2 from "./GeneralInfo2";
import GoodsList from "./GoodsList";

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
      console.log("🔁 Restore idToKhai:", saved.idToKhai);
      setIdToKhai(saved.idToKhai);
      reset(saved.form);
      setActiveTab("2");
    }
  }, [reset]);
  const onSaveGen1 = async (form) => {
    try {
      const payload = {
        loai_to_khai: "IDA",
        phan_loai: "IDA",
        ma_cuc_hai_quan: form.customsOffice,
        ngay_khai_bao: form.regDate
          ? form.regDate.toISOString()
          : null,
        id_loai_hinh: form.typeCode,
        id_cong_ty: form.importer.companyId,
        nguoi_tao: JSON.parse(localStorage.getItem("user")).id_nguoi_dung,
      };

      const res = await createIDA(payload);
      const idToKhai = res.data.id_to_khai;
      localStorage.setItem(
        "ida_gen1",
        JSON.stringify({
          idToKhai,
          form,
        })
      );

      setIdToKhai(idToKhai);
      setActiveTab("2");
      console.log("GEN1 OK:", res);
      setIdToKhai(res.data.id_to_khai);

      message.success("Đã lưu GEN 1");
      setActiveTab("2");
    } catch (err) {
      console.error(err);
      message.error("Lỗi lưu GEN 1");
    }
  };
  const onSaveGen2 = async () => {
    if (!idToKhai) {
      message.error("Chưa có tờ khai");
      return;
    }

    const payload = {
      invoice: {
        number: watch("invoice.number"),
        date: watch("invoice.date"),
        incoterms: watch("invoice.incoterms"),
        currency: watch("invoice.currency"),
        totalValue: watch("invoice.totalValue"),
        paymentMethod: watch("invoice.paymentMethod"),
      },
      customsValue: {
        method: watch("customsValue.method"),
        freight: watch("customsValue.freight"),
        insurance: watch("customsValue.insurance"),
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
      message.error("Chưa có tờ khai");
      return;
    }

    try {
      await declareIDA(idToKhai);
      message.success("Khai báo IDA thành công");

      reset(defaultValues);
      setGoods([]);
      setIdToKhai(null);
      setActiveTab("1");
    } catch (err) {
      message.error("Khai báo thất bại");
    }
  };

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
            label: "Gen 2 – Hàng hóa",
            children: <GeneralInfo2 control={control} />,
          },
          {
            key: "3",
            label: "Thông tin bổ sung",
            children: (
              <GoodsList
                goods={goods}
                setGoods={setGoods}
              />
            ),

          },
        ]}
      />
    </div>
  );
}
