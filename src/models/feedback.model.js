const mongoose = require("mongoose");
const paginate = require("./plugins/paginatePulugins");
const deletion = require("./plugins/deletion.plugin");

const feedbackSchema = mongoose.Schema(
  {
    rider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    ratting: {
      type: Number,
      default: 0,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// feedbackSchema.plugin(toJSON);
feedbackSchema.plugin(paginate);
feedbackSchema.plugin(deletion);

const feedbacks = mongoose.model("feedbacks", feedbackSchema);
module.exports = feedbacks;
