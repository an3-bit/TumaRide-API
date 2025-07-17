const { createError } = require("../configs/errorConfig.js");
const { KYC_Verification } = require("../models/index.js");

const { ObjectId } = require("mongodb");

const createKYC_verification = async (body) => {
  try {
    const kyc = new KYC_Verification(body);
    return await kyc.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updateKYC_Verification = async (id, body) => {
  const KYC_VerificationData = await KYC_Verification.findOne({
    _id: new ObjectId(id),
  });
  if (!KYC_VerificationData) {
    throw createError(400, "Invalid KYC_Verification id");
  }

  const KYC_VerificationDoc = await KYC_Verification.findByIdAndUpdate(
    new ObjectId(id),
    { $set: body },
    { new: true }
  );

  return KYC_VerificationDoc;
};

const getKYC_VerificationById = async (KYC_Verificationid) => {
  const KYC_VerificationDoc = await KYC_Verification.findById(
    new ObjectId(KYC_Verificationid)
  );

  if (!KYC_VerificationDoc) {
    throw createError(404, "KYC_Verification not found!");
  }

  return KYC_VerificationDoc;
};

module.exports = {
  updateKYC_Verification,
  createKYC_verification,
  getKYC_VerificationById,
};
