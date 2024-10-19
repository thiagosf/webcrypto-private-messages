--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE messages (
  uuid UUID PRIMARY KEY,
  sender_uuid UUID,
  receiver_uuid UUID,
  sender_encrypted_message TEXT,
  receiver_encrypted_message TEXT,
  created_at TIMESTAMP
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE IF EXISTS messages;