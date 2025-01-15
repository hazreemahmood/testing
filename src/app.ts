import express from 'express';
import { setItemRoutes } from '@routes/itemRoutes';
import { connectToDatabase } from '@config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectToDatabase();
    setItemRoutes(app);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();