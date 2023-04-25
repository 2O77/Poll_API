import mongoose from 'mongoose';

const MongoConnection = async () => {
  const connection = await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {});

  return connection;
};
export default MongoConnection;
