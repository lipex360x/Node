import mongoose from 'mongoose';

const mongoHelloSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model('mongoHello', mongoHelloSchema);
