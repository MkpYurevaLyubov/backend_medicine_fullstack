const db = require("./db");

module.exports.createUser = async (login, password) => {
  const result = await db.query(`INSERT INTO users (login, password) values ('${login}', '${password}') RETURNING *`);
  return result.rows[0];
};

module.exports.authUser = async (login) => {
  const result = await db.query(`SELECT * FROM users WHERE login='${login}'`);
  return result.rows[0];
};

module.exports.allDoctors = async () => {
  const result = await db.query(`SELECT * FROM doctors ORDER BY fullname ASC`);
  return result.rows;
};

module.exports.allOrders = async (id, method, type, from, to) => {
  const result = await db.query(`SELECT orders.*, doctors.fullname FROM orders, doctors 
    WHERE userid='${id}' AND doctorid=doctors.id AND dateorder >= '${from}' AND dateorder <= '${to}'
    ORDER BY ${method || 'id'} ${type}, dateorder ASC`);
  return result.rows;
};

module.exports.createOrder = async (patientsname, dateorder, complaints, doctorid, id) => {
  const result = await db.query(`INSERT INTO orders (patientsname, dateorder, complaints, doctorid, userid) 
    values ('${patientsname}', '${dateorder}', '${complaints}', '${doctorid}', '${id}') RETURNING *`);
  return result.rows[0];
};

module.exports.updateOrder = async (patientsname, dateorder, complaints, doctorid, id) => {
  const result = await db.query(`UPDATE orders SET patientsname = '${patientsname}', dateorder = '${dateorder}', 
    complaints = '${complaints}', doctorid = '${doctorid}' WHERE id = '${id}' RETURNING *`);
  return result.rows[0];
};

module.exports.deleteOrder = async (id) => {
  const result = await db.query(`DELETE FROM orders WHERE id = '${id}' RETURNING *`);
  return result.rows[0];
};