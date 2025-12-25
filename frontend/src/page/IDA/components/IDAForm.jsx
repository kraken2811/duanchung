import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Divider, Tabs, Space } from "antd";
import { FiSave, FiSend, FiPrinter } from "react-icons/fi";

import useNotify from "@/components/notification/useNotify";

import GeneralInfo1 from "./GeneralInfo1";
import GeneralInfo2 from "./GeneralInfo2";
import GoodsList from "./GoodsList";
import Attachments from "./Attachments";
import {
  createIDA,
  createIDAGoods,
  createInvoice,
  createBillOfLading,
} from "../api/ida.api";
import { formatIDA } from "../types";

export default function IDAForm() {
  const notify = useNotify();
  const safe =
    (fn) =>
      (...args) => {
        try {
          const result = fn(...args);

          if (result && typeof result.then === "function") {
            result.catch((err) => {
              const msg =
                typeof err === "string"
                  ? err
                  : err?.response?.data?.message
                  || err?.message
                  || JSON.stringify(err);

              console.error("ASYNC ERROR:", err);
            });
          }

          return result;
        } catch (err) {
          const msg =
            typeof err === "string"
              ? err
              : err?.message
              || JSON.stringify(err);

          console.error("SYNC ERROR:", msg);
        }
      };
  const { register, handleSubmit, setValue } = useForm();
  const [goods, setGoods] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const onSave = async (data) => {
    try {
      const payload = formatIDA({ ...data, goods });

      const ida = await createIDA(payload.toKhai);

      if (payload.invoice) {
        await createInvoice({
          ...payload.invoice,
          id_to_khai: ida.id_to_khai,
        });
      }

      if (payload.billOfLading) {
        await createBillOfLading({
          ...payload.billOfLading,
          id_lo_hang: ida.id_lo_hang,
        });
      }

      for (const item of payload.goods) {
        await createIDAGoods({
          ...item,
          id_to_khai: ida.id_to_khai,
        });
      }

      notify.success("Đã lưu thông tin tờ khai");
    } catch (err) {
      console.error("IDA SAVE ERROR:", err);

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Lỗi không xác định khi lưu tờ khai";

      notify.error(msg);
    }
  };
  const onDeclare = async (data) => {
    try {
      await onSave(data);
      notify.popup.success(
        "Khai báo thành công",
        "Tờ khai đã được gửi lên hệ thống"
      );
    } catch (err) {
      console.error(err);
      notify.popup.error(
        "Khai báo thất bại",
        "Vui lòng kiểm tra lại dữ liệu"
      );
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Thông tin chung 1",
      children: (
        <GeneralInfo1 register={register} setValue={setValue} />
      ),
    },
    {
      key: "2",
      label: "Thông tin chung 2",
      children: (
        <GeneralInfo2 register={register} setValue={setValue} />
      ),
    },
    {
      key: "3",
      label: "Danh sách hàng",
      children: (
        <GoodsList goods={goods} setGoods={setGoods} />
      ),
    },
    {
      key: "4",
      label: "Đính kèm chứng từ",
      children: <Attachments />,
    },
  ];

  return (
    <div>
      <div
        style={{
          background: "#fff",
          padding: "12px 16px",
          borderBottom: "1px solid #d9d9d9",
          marginBottom: 16,
        }}
      >
        <Space>
          <Button
            className="textSibar"
            icon={<FiSave />}
            onClick={safe(handleSubmit(onSave))}
          >
            Ghi
          </Button>

          <Button
            type="primary"
            icon={<FiSend />}
            onClick={safe(handleSubmit(onDeclare))}
          >
            Khai báo
          </Button>

          <Button className="textSibar" icon={<FiPrinter />}>
            In
          </Button>

          <Divider type="vertical" />

          <Button className="textSibar">Lấy phản hồi</Button>
          <Button className="textSibar">Đăng ký mới</Button>
          <Button danger>Xóa</Button>
        </Space>
      </div>
      <Tabs
        activeKey={activeTab}
        items={tabItems}
        onChange={setActiveTab}
      />
    </div>
  );
}
