import { message, notification } from "antd";
import NotifyContext from "./NotifyContext";

export default function NotifyProvider({ children }) {
  const [messageApi, contextMsg] = message.useMessage();
  const [notifyApi, contextNotify] = notification.useNotification();

  const notify = {
    success: (msg, duration = 2) => {
      messageApi.success(msg, duration);
    },
    error: (msg, duration = 3) => {
      messageApi.error(msg, duration);
    },
    warning: (msg, duration = 3) => {
      messageApi.warning(msg, duration);
    },
    info: (msg, duration = 2) => {
      messageApi.info(msg, duration);
    },

    popup: {
      success: (title, desc) =>
        notifyApi.success({ message: title, description: desc }),
      error: (title, desc) =>
        notifyApi.error({ message: title, description: desc }),
      warning: (title, desc) =>
        notifyApi.warning({ message: title, description: desc }),
      info: (title, desc) =>
        notifyApi.info({ message: title, description: desc }),
    },
  };

  return (
    <NotifyContext.Provider value={notify}>
      {contextMsg}
      {contextNotify}
      {children}
    </NotifyContext.Provider>
  );
}
