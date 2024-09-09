import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Create or connect to the SQLite database
export const createDatabase = async () => {
  const db = await open({
    filename: "./sqlite.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS comics (
        comic_num INTEGER UNIQUE PRIMARY KEY ,
        views INTEGER DEFAULT 0
    )
`);

  console.log("Database connected and initialized");
};

export const getDatabase = () => {
  return open({
    filename: "./sqlite.db",
    driver: sqlite3.Database,
  });
};
