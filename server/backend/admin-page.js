import connectToDatabase from './dbConnection.js';
import bcrypt from "bcrypt";

const { client } = connectToDatabase;

export const checkLogIn = async (req,res) =>{
    const { username, password } = req.body;

    const admins = await client.query(`SELECT * FROM users_table WHERE status = 'admin' AND username = '${username}'`);
    
    if(admins.rows.length === 0){
        return res.json({ success: false, message: 'Admin not Found'});
    }

    const user = admins.rows[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ success: false, message: 'Invalid password' });
    }else{
        return res.json({ success: true });
    }
}


//USE THIS TO ADMINS TO CONVERT PASSWORDS TO HASH
export const hashPassword = async (req, res) => {
    //USERNAME: ejMamacos PASSWORD: jeojeojeo
    //USERNAME: lsJardeleza PASSWORD: lykalykalyka
    //USERNAME: glDeocampo PASSWORD: jimsjimsjims

    const name = 'glDeocampo'
    const users = await client.query(`SELECT password FROM users_table WHERE status = 'admin' AND username = '${name}'`);

    console.log(users.rows[0].password);

    const hashedPassword = await bcrypt.hash(users.rows[0].password, 10);

    await client.query(`UPDATE users_table SET password = '${hashedPassword}' WHERE username = '${name}'`)
}