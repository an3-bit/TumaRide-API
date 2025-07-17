const mongoose = require("mongoose");
const paginate = require("./plugins/paginatePulugins");
const deletion = require("./plugins/deletion.plugin");

const kyc_verificationSchema = mongoose.Schema(
  {
    rider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "inProgress", "approved", "expired"],
      required: true,
    },
    expiry_date: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// kyc_verificationSchema.plugin(toJSON);
kyc_verificationSchema.plugin(paginate);
kyc_verificationSchema.plugin(deletion);

const kyc_verifications = mongoose.model(
  "kyc_verifications",
  kyc_verificationSchema
);
module.exports = kyc_verifications;
