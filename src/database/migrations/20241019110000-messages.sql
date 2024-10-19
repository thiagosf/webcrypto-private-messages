--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE messages (
  uuid TEXT PRIMARY KEY,
  senderUuid TEXT,
  receiverUuid TEXT,
  senderEncryptedMessage TEXT,
  receiverEncryptedMessage TEXT,
  createdAt DATETIME
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE messages;