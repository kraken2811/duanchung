export const formatIDB = (data) => {
  return {
    ...data,
    regDate: data.regDate ? data.regDate.format("YYYY-MM-DD") : null,
  };
};
