const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = () => {
  return prisma.audit_log.findMany({
    orderBy: { ngay_tao: 'desc' },
  });
};

const getById = (id_log) => {
  return prisma.audit_log.findUnique({
    where: { id_log: BigInt(id_log) },
  });
};

const insert = (data) => {
  return prisma.audit_log.create({
    data,
  });
};

const update = (id_log, data) => {
  return prisma.audit_log.update({
    where: { id_log: BigInt(id_log) },
    data,
  });
};

const remove = (id_log) => {
  return prisma.audit_log.delete({
    where: { id_log: BigInt(id_log) },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
