const { createError } = require("../configs/errorConfig.js");
const { Package } = require("../models/index.js");

const { ObjectId } = require("mongodb");

const createPackage = async (body) => {
  try {
    const package = new Package(body);
    return await package.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updatePackage = async (id, body) => {
  const packageData = await Package.findOne({ _id: new ObjectId(id) });
  if (!packageData) {
    throw createError(400, "Invalid package id");
  }

  const packageDoc = await Package.findByIdAndUpdate(
    new ObjectId(id),
    { $set: body },
    { new: true }
  );

  return packageDoc;
};

const getPackageById = async (packageid) => {
  const packageDoc = await Package.findById(new ObjectId(packageid));

  if (!packageDoc) {
    throw createError(404, "package not found!");
  }

  return packageDoc;
};

const findandfilter = async (filter, options) => {
  const packageDoc = await Package.paginate(filter, options);
  if (!packageDoc) {
    throw createError(404, "package not found.");
  }
  return packageDoc;
};

const deletePackage = async (id) => {
  const packageDoc = await Package.findByIdAndUpdate(new ObjectId(id), {
    $set: { is_deleted: true },
  });

  return packageDoc;
};

module.exports = {
  updatePackage,
  createPackage,
  findandfilter,
  deletePackage,
  getPackageById,
};
