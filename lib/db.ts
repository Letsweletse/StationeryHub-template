const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // This uses your Neon connection string
  ssl: { 
    rejectUnauthorized: false 
  }
});
