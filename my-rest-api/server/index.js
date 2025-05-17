const express = require('express');
const cors = require('cors');
const userController = require('./userController');

const app = express();
app.use(express.json()); // Enable JSON parsing
app.use(cors({
    origin: 'http://localhost:5173'
}));


app.get('/api/name', userController.getAllData);
app.post('/api/login', userController.loginUser);
app.post('/api/createUser', userController.createUser); //не использую
app.patch('/api/name', userController.updateUser); //не использую
app.delete('/api/name', userController.deleteUser); //
app.get('/api/courses', userController.getAllCourses);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
