import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(cookieParser());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})