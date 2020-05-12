CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE visits
(
id uuid DEFAULT uuid_generate_v4 (),
user_id VARCHAR(255),
name VARCHAR(255),
created_at TIMESTAMP DEFAULT current_timestamp,
updated_at TIMESTAMP DEFAULT current_timestamp,
CONSTRAINT visits_pkey PRIMARY KEY (id)
);
