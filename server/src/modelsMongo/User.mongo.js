import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { isEmailAddressValid } from "../helpers/emailAddressHelper.js";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
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
            validate: {
                validator: (email) => {
                    return isEmailAddressValid(email);
                },
                message: "Email is not valid",
            },
        },
        telephone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "ROLE_USER",
            validate: {
                validator: (role) => {
                    return role === "ROLE_USER" || role === "ROLE_STORE_KEEPER";
                },
                message: "Role must be ROLE_USER or ROLE_STORE_KEEPER",
            },
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
        collection: "Users",
    }
);

userSchema.index(
    { nom: "text", prenom: "text" },
    { email: "searchIndex" }
);

const User = mongoose.model("User", userSchema);

export default User;
