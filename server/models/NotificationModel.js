import mongoose from "mongoose";
// dùng để cho admin thông báo gửi đến cho client
const notificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const NotificationModel = new mongoose.model(
  "notification",
  notificationSchema
);
export default NotificationModel;
