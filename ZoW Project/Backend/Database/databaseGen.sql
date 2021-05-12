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
    insecta BOOLEAN NOT NULL,
    salbatic BOOLEAN NOT NULL,
    comestibil BOOLEAN NOT NULL,
    incomestibil BOOLEAN NOT NULL,
    longevitate int NOT NULL,
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


----------- populating the table --------------
INSERT into animals 
       VALUES ( 0,
                'AFIDE',
                '../pages/animalPage.html',
                '../images/afide/afide1.jpg',
                '../images/afide/afide2.jpg',
                '../images/afide/afide3.jpg',
                '../images/afide/afide4.jpg',
                0,
                TRUE,
                'FALSE',
                'FALSE',
                'FALSE',
                'FALSE',
                'FALSE',
                'FALSE',
                'FALSE',
                'TRUE',
                'TRUE',
                'FALSE',
                'TRUE',
                2,
                'Afide – fac parte din ordinul Homoptera, familia Aphididae. Insectele din acest ordin au corpul mic sau mijlociu, capul hipogonat, aparatul bucal de intepat si supt, subtipul homopter. Antenele sunt formate
                din 5 – 6 articole, foarte rar 3 – 4, lungi. Picioarele sunt adaptate pentru mers, iar la unele specii (purici, cicade etc.) cele posterioare sunt adaptate pentru sarit.Este o specie raspandita in aproape toate tarile globului iar in tara noastra o intalnim din zonele de campie pana in cele muntoase, in camp, gradini si spatii protejate. Este considerat un daunator polifag,
                fiind semnalat pe numeroase plante cultivate si spontane insa pagube deosebite produce la culturile de castraveti, pepeni, dovlecei, bumbac, unele plante de sera.Paduchii solanaceelor ataca peste 200 de specii de plante ce includ legume ( tomate, cartof, salata, vinete, varza ), pomi fructiferi, plante ornamentale ( trandafiri ) si buruieni. Adultii si larvele produc
                pagube prin inteparea frunzelor apicale pe partea inferioara, ceea ce duce la gofrarea frunzelor si distrugerea mugurilor de crestere .Filoxera este un daunator cunoscut in toate podgoriile din tara. Se prezinta sub 4 forme, ce se deosebesc intre ele prin caractere morfologice distincte. Doar doua prezinta importanta mai mare: filoxera radicicola
                (pe radacini), forma foarte periculoasa si filoxera galicola (pe frunze).',
                'Paduchele negru al ciresului – Myzus cerasi: Specie intalnita frecvent in livezile de ciresi si visini, provocand pagube mari in pepiniere.
                Paduchele verde al piersicului, Myzodes persicae este o specie raspandita in Europa, Asia, America de Nord, Africa si Australia. In tara noastra se intalneste frecvent in toate regiunile.
                Adultii si larvele acestei specii ataca marul. Paduchii colonizeaza la inceput mugurii floriferi si vegetativi, apoi, frunzele si fructele tinere.',
                '1-2 luni',
                'Insecte',
                '0.01g',
                '0,1cm',
                'Japonia',
                'ierbivor'
            );                                                                                   