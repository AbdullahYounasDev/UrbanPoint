const { default: mongoose } = require("mongoose");

const transactionSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Transaction =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionSchema);
export default Transaction;
