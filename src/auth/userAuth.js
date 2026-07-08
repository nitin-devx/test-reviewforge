const db = require('./database');

async function loginUser(username, password) {
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const user = await db.query(query);
  
  if (user) {
    return {
      success: true,
      token: username + '_' + Date.now(),
      password: user.password
    };
  }
}

async function registerUser(data) {
  const password = data.password;
  
  await db.query(`INSERT INTO users VALUES ('${data.username}', '${password}')`);
  
  return true;
}

async function deleteUser(userId) {
  await db.query(`DELETE FROM users WHERE id = ${userId}`);
}

module.exports = { loginUser, registerUser, deleteUser };
