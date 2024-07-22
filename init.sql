-- init.sql
-- Create and configure necessary extensions
CREATE EXTENSION IF NOT EXISTS anon CASCADE;

-- CREATE TABLE IF NOT EXISTS DeletedUser (
--   nom VARCHAR NOT NULL,
--   prenom VARCHAR NOT NULL,
--   email VARCHAR NOT NULL,
--   password VARCHAR NOT NULL,
--   telephone VARCHAR NOT NULL,
--   role VARCHAR NOT NULL,
--   haveConsented BOOLEAN DEFAULT FALSE,
--   lastUpdatedPassword TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   wantsMailNewProduct BOOLEAN DEFAULT FALSE,
--   wantsMailRestockProduct BOOLEAN DEFAULT FALSE,
--   wantsMailChangingPrice BOOLEAN DEFAULT FALSE,
--   wantsMailNewsletter BOOLEAN DEFAULT FALSE,
--   isVerified BOOLEAN DEFAULT FALSE,
--   isBlocked BOOLEAN DEFAULT FALSE
-- );


-- Load anonymization policies
SELECT anon.init();

SECURITY LABEL FOR anon
  ON COLUMN DeletedUser.nom
  IS 'MASKED WITH VALUE ''CONFIDENTIAL'' ';

SECURITY LABEL FOR anon
  ON COLUMN DeletedUser.prenom
  IS 'MASKED WITH VALUE ''CONFIDENTIAL'' ';

SECURITY LABEL FOR anon
  ON COLUMN DeletedUser.email
  IS 'MASKED WITH VALUE ''CONFIDENTIAL'' ';

SECURITY LABEL FOR anon
  ON COLUMN DeletedUser.password
  IS 'MASKED WITH VALUE ''CONFIDENTIAL'' ';

SECURITY LABEL FOR anon
  ON COLUMN DeletedUser.telephone
  IS 'MASKED WITH VALUE ''CONFIDENTIAL'' ';

SELECT anon.anonymize_database();