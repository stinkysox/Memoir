import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }, // Keep this if you want to support password login in the future

    images: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          imageUrl: { type: String, required: true },
          dateUploaded: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },

    loginPin: { type: String },
    pinExpires: { type: Date },
  },
  { minimize: false }
);

const User = mongoose.model("User", userSchema);

export default User;
