const mongoose = require("mongoose");
const paginate = require("./plugins/paginatePulugins");
const deletion = require("./plugins/deletion.plugin");

const paymentSchema = mongoose.Schema(
  {
    rider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "KES",
    },
  },
  { timestamps: true }
);

// paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);
paymentSchema.plugin(deletion);

const payments = mongoose.model("payments", paymentSchema);
module.exports = payments;
