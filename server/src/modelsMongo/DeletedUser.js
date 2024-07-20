import mongoose from "mongoose";

const deletedUserSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
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
  },
  {
    collection: "DeletedUsers",
  }
);

deletedUserSchema.index(
  { nom: "text", prenom: "text" },
  { email: "searchIndex" }
);

const DeletedUser = mongoose.model("DeletedUser", deletedUserSchema);

export default DeletedUser;
