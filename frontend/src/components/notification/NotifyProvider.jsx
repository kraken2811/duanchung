import { App as AntdApp, message, notification } from "antd";
import NotifyContext from "./NotifyContext";

export default function NotifyProvider({ children }) {
  const notify = {
    success: (msg, duration = 2) => {
      message.success(msg, duration);
    },
    error: (msg, duration = 3) => {
      message.error(msg, duration);
    },
    warning: (msg, duration = 3) => {
      message.warning(msg, duration);
    },
    info: (msg, duration = 2) => {
      message.info(msg, duration);
    },

    popup: {
      success: (title, desc) =>
        notification.success({ message: title, description: desc }),
      error: (title, desc) =>
        notification.error({ message: title, description: desc }),
      warning: (title, desc) =>
        notification.warning({ message: title, description: desc }),
      info: (title, desc) =>
        notification.info({ message: title, description: desc }),
    },
  };

  return (
    <AntdApp>
      <NotifyContext.Provider value={notify}>
        {children}
      </NotifyContext.Provider>
    </AntdApp>
  );
}
