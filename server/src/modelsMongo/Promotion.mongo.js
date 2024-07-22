import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const promotionSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        remise: {
            type: String,
            required: true,
        },
        dateDebut: {
            type: Date,
            required: true,
        },
        dateFin: {
            type: Date,
            required: true,
        },
    },
    {
        collection: "Promotions",
    }
);

promotionSchema.index(
    { remise: "text", dateDebut: "text", dateFin: "text" },
    { name: "searchIndex" }
);

const Promotion = mongoose.model("Promotions", promotionSchema);

export default Promotion;
