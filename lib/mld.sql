-- Créer la base de données
CREATE DATABASE media_management_system;
\c media_management_system;

-- Table categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table programmes
CREATE TABLE programmes (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    duree TIME NOT NULL,
    description TEXT,
    categorieid INT,
    FOREIGN KEY (categorieid) REFERENCES categories(id)
);

-- Table plannings
CREATE TABLE plannings (
    id SERIAL PRIMARY KEY,
    heuredebut TIME NOT NULL,
    heurefin TIME NOT NULL,
    date DATE,
    direct BOOLEAN NOT NULL,
    programmeid INT,
    FOREIGN KEY (programmeid) REFERENCES programmes(id)
);

-- Table presentateurs
CREATE TABLE presentateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    bibliographie TEXT
);

-- Table animations
CREATE TABLE animations (
    id SERIAL PRIMARY KEY,
    programmeid INT,
    presentateurid INT,
    role VARCHAR(255),
    FOREIGN KEY (programmeid) REFERENCES programmes(id),
    FOREIGN KEY (presentateurid) REFERENCES presentateurs(id)
);

-- Table commentaires
CREATE TABLE commentaires (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    datepub DATE NOT NULL,
    programmeid INT,
    abonneid INT,
    FOREIGN KEY (programmeid) REFERENCES programmes(id),
    FOREIGN KEY (abonneid) REFERENCES abonnees(id)
);

-- Table abonnees
CREATE TABLE abonnees (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    datenais DATE,
    genre VARCHAR(50),
    etatcivil VARCHAR(50),
    password VARCHAR(255) NOT NULL
);

-- Table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
