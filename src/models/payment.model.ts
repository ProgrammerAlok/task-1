import { model, Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    app_id: String,
    amount: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Payment", PaymentSchema);
