CREATE TABLE users(
    id_user INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(64) NOT NULL,
    password_hash VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    isAdmin boolean NOT NULL,

    PRIMARY KEY (id_user)
);

CREATE TABLE animals(
    id_animal INT NOT NULL AUTO_INCREMENT,
    animalName VARCHAR(64) NOT NULL,
    pagePath  VARCHAR(64) NOT NULL,
    imagePath1 VARCHAR(64) NOT NULL,
    imagePath2 VARCHAR(64) NOT NULL,
    imagePath3 VARCHAR(64) NOT NULL,
    imagePath4 VARCHAR(64) NOT NULL,
    likes INT NOT NULL,
    terestru BOOLEAN NOT NULL,
    acvatic BOOLEAN NOT NULL,
    aerian BOOLEAN NOT NULL,
    mamifer BOOLEAN NOT NULL,
    pasare BOOLEAN NOT NULL,
    reptila BOOLEAN NOT NULL,
    dinozaur BOOLEAN NOT NULL,
    domestic BOOLEAN NOT NULL,
    salbatic BOOLEAN NOT NULL,
    comestibil BOOLEAN NOT NULL,
    incomestibil BOOLEAN NOT NULL,
    longevitate BOOLEAN NOT NULL,
    generalities TEXT NOT NULL,
    stiatiCa TEXT NOT NULL,
    cardLongevitate VARCHAR(64) NOT NULL,
    cardCategorie VARCHAR(64) NOT NULL,
    cardGreutateMedie VARCHAR(64) NOT NULL,
    cardInaltimeMedie VARCHAR(64) NOT NULL,
    cardMediuDeViata VARCHAR(64) NOT NULL,
    cardModDeHranire VARCHAR(64) NOT NULL,
    
    PRIMARY KEY (id_animal)
);

CREATE TABLE Albums(
    id_album  INT NOT NULL AUTO_INCREMENT,
    albumName VARCHAR(64) NOT NULL,
    id_animal INT NOT NULL,
    FOREIGN KEY (id_animal) REFERENCES animals(id_animal),
    PRIMARY KEY (id_album)
);
      


CREATE TABLE customAlbums(
    id_albumCustom INT NOT NULL AUTO_INCREMENT,
    albumCustomName VARCHAR(64) NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    PRIMARY KEY (id_albumCustom)
    
);

CREATE TABLE addAnimalToAlbum(
    id_albumCustom INT NOT NULL,
    id_animal INT NOT NULL,
    FOREIGN KEY (id_animal) REFERENCES animals(id_animal), 
    FOREIGN KEY (id_albumCustom) REFERENCES customAlbums(id_albumCustom)
);  