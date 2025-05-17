const pool = require('./db');
const bcrypt = require('bcrypt');

exports.getAllData = async (req, res) => {
    try {
        const { sortBy = 'name', order = 'ASC' } = req.query;
        const validOrders = ['ASC', 'DESC'];
        if (!validOrders.includes(order.toUpperCase())) {
            return res.status(400).json({ error: 'Неверный параметр сортировки. Используйте ASC или DESC.' });
        }
        const result = await pool.query(`SELECT * FROM user_data ORDER BY ${sortBy} ${order}`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

exports.loginUser = async (req, res) => {
    try {   
        const { email_, password_ } = req.body;

        if (!email_ || !password_) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userResult = await pool.query(
            `SELECT * FROM user_data WHERE email = $1`,
            [email_]
        );
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = userResult.rows[0];

        const passwordMatches = await bcrypt.compare(password_, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const { password, ...userData } = user;
        res.json({ 
            message: 'Login successful', 
            user: userData 
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const {name_, email_, password_ } = req.body;
        console.log('Incoming data', req.body);
        if (!name_ || !email_ || !password_) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hashedPassword = await bcrypt.hash(password_, 10);

        const result = await pool.query(
            `INSERT INTO user_data (name, email, password, access_level) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name_, email_, hashedPassword, 'student']
        );
    
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteUser = async(req, res) => {
    try {
        const { id_ } = req.body;
        if(!id_){
            return res.status(400).json({error: 'Missing data'});
        }
        const result = await pool.query(
            'DELETE FROM test_table WHERE id = $1 RETURNING *', [id_]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json({ message: 'Record deleted', deletedRow: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateUser = async(req, res) => {
    try {
        const { id_, access_level } = req.body;
        if(!id_, !access_level){
            return res.status(400).json({error: 'Missing data'});
        }
        const result = await pool.query(
            'UPDATE user_data SET access_level = $1 WHERE id = $2 RETURNING *',
            [access_level, id_]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No record found with the given id_' });
        }
        res.json({ message: 'Successfully updated data', updatedRow: result.rows[0] });
    } catch (err) {
        console.error('Error updating record:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllCourses = async(req, res) =>{
    try{
        const result = await pool.query(`SELECT * FROM courses`);

        if(result.rowCount === 0){
            return res.status(400).json({error: 'No courses found'});
        }
        res.json(result.rows);
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
};