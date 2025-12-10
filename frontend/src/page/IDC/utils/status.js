export const formatIDA = (data) => ({
  ...data,
  regDate: data.regDate?.format("YYYY-MM-DD") || "",
});
