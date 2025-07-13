import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFeedback extends Document {
  employeeId: mongoose.Types.ObjectId;
  feedbackText: string;
  createdAt: Date;
  updatedAt: Date;
}

const feedbackSchema: Schema<IFeedback> = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    feedbackText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback: Model<IFeedback> = mongoose.models.Feedback || mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;
