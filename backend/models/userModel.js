import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    images: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          imageUrl: { type: String, required: true },
          dateUploaded: { type: Date, default: Date.now }, // Add dateUploaded field
        },
      ],
      default: [],
    },
  },
  { minimize: false }
);

const User = mongoose.model("User", userSchema);

export default User;
