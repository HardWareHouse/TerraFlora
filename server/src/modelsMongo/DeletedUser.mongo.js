import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const deletedUserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    role: {
      type: String,
      default: "ROLE_USER",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: true,
    },
    userId: {
      type: String,
      default: uuidv4,
      required: true,
    },
  },
  {
    collection: "DeletedUser",
  }
);

deletedUserSchema.index(
  { role: "text", 'user._id': "text" },
  { email: "searchIndex" }
);

const DeletedUser = mongoose.model("DeletedUser", deletedUserSchema);

export default DeletedUser;
