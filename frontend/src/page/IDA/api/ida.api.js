import axios from "@/lib/axios";

export const idaAPI = {
  create: (data) => axios.post("/ida", data),
  getRules: () => axios.get("/ida/rules"),
};
