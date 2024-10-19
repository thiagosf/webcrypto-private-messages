--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE users (
  uuid TEXT PRIMARY KEY,
  publicKey TEXT UNIQUE,
  createdAt DATETIME
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE users;