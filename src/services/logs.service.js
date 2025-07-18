const { createError } = require("../configs/errorConfig.js");
const { Logs } = require("../models/index.js");
const { ObjectId } = require("mongodb");

const createLog = async (body) => {
  try {
    const log = new Logs(body);
    return await log.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updateLog = async (id, body) => {
  const logData = await Logs.findOne({ _id: new ObjectId(id) });
  if (!logData) {
    throw createError(400, "Invalid log id");
  }

  const updatedLog = await Logs.findByIdAndUpdate(
    new ObjectId(id),
    { $set: body },
    { new: true }
  );

  return updatedLog;
};

const getLogById = async (logId) => {
  const logDoc = await Logs.findById(new ObjectId(logId));

  if (!logDoc) {
    throw createError(404, "Log not found!");
  }

  return logDoc;
};

const findAndFilterLogs = async (filter, options) => {
  const logs = await Logs.paginate(filter, options);
  if (!logs) {
    throw createError(404, "Logs not found.");
  }
  return logs;
};

module.exports = {
  updateLog,
  createLog,
  findAndFilterLogs,
  getLogById,
};
