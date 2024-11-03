const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  clerkName: {
    type: String,
    required: true,
  },
  clerkUserName: {
    type: String,
    required: true,
  },
  clerkEmail: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
