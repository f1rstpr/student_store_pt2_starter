CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  password    TEXT NOT NULL,
  -- name        TEXT NOT NULL,
  name        TEXT,
  username    TEXT UNIQUE,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  category        TEXT NOT NULL,
  image           TEXT NOT NULL,
  description     TEXT NOT NULL,
  price           BIGINT NOT NULL
);

CREATE TABLE orders (
  id                  SERIAL PRIMARY KEY,
  customer_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at          TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE order_details (
  quantity                    INTEGER NOT NULL DEFAULT 1,
  discount                    INTEGER,
  order_id                    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id                  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (order_id, product_id)
);



