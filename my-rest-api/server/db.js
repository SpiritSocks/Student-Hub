require('dotenv').config();

const { Pool } = require('pg'); //Используем деструктуризацию в JavaScript для импорта класса Pool из модуля pg (node-postgres)

//Создать новый пул соединений с базой данных, используя переменные окружения.
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

module.exports = pool;

/*
Pool (пул соединений) — это группа соединений с базой данных,
которые можно переиспользовать,
чтобы не открывать новое соединение при каждом запросе.
*/