const mongoose = require("mongoose");
const paginate = require("./plugins/paginatePulugins");
const deletion = require("./plugins/deletion.plugin");

const documentSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// documentSchema.plugin(toJSON);
documentSchema.plugin(paginate);
documentSchema.plugin(deletion);

const documents = mongoose.model("documents", documentSchema);
module.exports = documents;
