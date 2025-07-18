const mongoose = require("mongoose");
const paginate = require("./plugins/paginatePulugins");
const deletion = require("./plugins/deletion.plugin");

const logSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    type: {
      type: String,
      enum: ["error", "audit"],
      required: true,
    },
    module: {
      type: String,
      enum: [
        "email",
        "user",
        "notification",
        "feedback",
        "payment",
        "package",
        "kyc_verification",
        "document",
        "auth",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

// logSchema.plugin(toJSON);
logSchema.plugin(paginate);
logSchema.plugin(deletion);

const logs = mongoose.model("logs", logSchema);
module.exports = logs;
