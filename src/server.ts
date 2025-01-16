import express from 'express';
import cors from 'cors';
import ApiRoutes from '@routes/api';
import formData from "express-form-data";

const app = express();

// parse data with connect-multiparty. 
app.use(formData.parse({ autoClean: true }));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());
// Use the CORS middleware
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());


app.use(ApiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));