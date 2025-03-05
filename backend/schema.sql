CREATE TABLE IF NOT EXISTS ops_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(140) NOT NULL,
  owner_email VARCHAR(140) NOT NULL,
  status VARCHAR(24) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
