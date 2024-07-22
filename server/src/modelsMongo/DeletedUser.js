import mongoose from "mongoose";

const deletedUserSchema = new mongoose.Schema(
  {
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
  },
  {
    collection: "DeletedUser",
  }
);

deletedUserSchema.index(
  { nom: "text", prenom: "text" },
  { email: "searchIndex" }
);

const DeletedUser = mongoose.model("DeletedUser", deletedUserSchema);

export default DeletedUser;
