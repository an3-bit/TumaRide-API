const mongoose = require("mongoose");
const paginate = require("./plugins/paginatePulugins");
const deletion = require("./plugins/deletion.plugin");

const packageSchema = mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    type: {
      type: String,
      enum: ["fragile", "perishable", "normal"],
      required: true,
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
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
    cost: {
      type: Number,
      default: 0,
    },
    from: {
      name: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v) {
            return v.length === 2;
          },
          message: (props) =>
            `${props.value} must contain exactly 2 coordinates (longitude, latitude)!`,
        },
      },
    },

    to: {
      name: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v) {
            return v.length === 2;
          },
          message: (props) =>
            `${props.value} must contain exactly 2 coordinates (longitude, latitude)!`,
        },
      },
    },
    delivery_status: {
      type: String,
      enum: ["pending", "inProgress", "delivered"],
      default: "pending",
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    sender_payment_status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    rider_payment_status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// packageSchema.plugin(toJSON);
packageSchema.plugin(paginate);
packageSchema.plugin(deletion);

const packages = mongoose.model("packages", packageSchema);
module.exports = packages;
