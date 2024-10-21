// Import Client from 'pg' using ES6 module syntax
import pkg from 'pg';
import dotenv from 'dotenv';

const {Client} = pkg;

dotenv.config();
const dbURL = process.env.DB_PROJECT;
const dbPass = process.env.DB_PASSWORD;

// Initialize the PostgreSQL client using the Supabase connection string
const client = new Client({
  connectionString: `postgresql://postgres.hzmaypzsmgrunfapsldn:${dbPass}@${dbURL}.supabase.com:6543/postgres`, // Replace with actual Supabase credentials
  ssl: { rejectUnauthorized: false }, // Ensures a secure SSL connection
});

// Connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL Successfully');
  } catch (error) {
    console.error('Connection error', error.stack);
  }
}

// Export the client and connection function (optional)
export default { client, connectToDatabase };

// Call the function to establish the connection
connectToDatabase();

