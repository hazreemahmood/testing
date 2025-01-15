import express from 'express';
import cors from 'cors';
import * as itemRoutes from '@routes/itemRoutes';

const app = express();

// Use the CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

itemRoutes.setItemRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));