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
                FALSE,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                TRUE,
                9,
                'Albinele sunt insecte zburătoare, clasificate în cadrul superfamiliei Apoidea din cadrul subordinului Apocrita, care mai conține viespile și furnicile, care se hrănesc cu nectarul florilor (ca sursă de energie
                grație conținutului de zaharuri) și cu polen (ca sursă de proteine, folosit mai mult la hrănirea larvelor), activitate ce se soldează cu polenizarea florilor și, în unele cazuri, cu producerea mierii și cerii.
                Astfel polenul pe care în mod inevitabil îl pierd în deplasarea lor de la o floare la alta este important pentru plante deoarece o parte din polen cade pe pistilul (structura reproductivă) altor flori din aceeași
                specie, ducând la polenizarea încrucișată. Albinele sunt, de fapt, cele mai importante insecte polenizatoare și interdependența între ele și plante fac din acestea un excelent exemplu al unui tip de simbioză cunoscută sub numele de
                „mutualism”, o asociere între organisme diferite care este avantajoasă pentru ambele părți.
                Pe de altă parte unele specii de albine produc miere din nectar. Albinele de miere și albinele fără ac adună mari cantități de miere, caracteristică ce este exploatată de apicultori, care recoltează mierea pentru
                consumul uman. Albinele sunt răspândite pe întreg globul, făcând excepție cele mai înalte altitudini, regiunile polare și unele mici insule oceanice. Cea mai mare diversitate de specii de albine se găsește în regiunile calde, aride
                sau semiaride, America de Sud și Mexic. Cele mai multe albine au trupul negru cu dungi galbene-verzui, aripile de o culoare gri-semitransparentă, iar capul este negru în totalitate.
                Durata de viață a albinei lucrătoare, depinde de gradul de uzură ca urmare a activităților intense desfășurate de aceasta (creșterea puietului și activitatea de cules nectar și polen). Astfel albinele eclozate
                in sezonul activ (din primăvară, martie până vara, în jurul lunii august) trăiesc numai 40 de zile pe când albinele eclozate toamna trăiesc până în primăvara viitoare, când se face schimbul de generații (6-9 luni). Durata de viață
                a trântorilor este între două și opt săptămâni și variază în funcție de sezon (activ sau perioadă de repaus) și de zona geografică.',
                ' Numărul speciilor cunoscute este de aproximativ 20.000 dar, probabil, sunt foarte multe care încă așteaptă să fie descoperite .
                 Multe specii de albine sunt puțin cunoscute. Cea mai mică albină este cea pitică (Trigona minima) cu lungimea de circa 2,1 mm (5/64"). Cea mai mare albină din lume este Megachile pluto, care poate atinge lungimea de 39 mm (1,5").
                Cea mai mare albină din lume este Megachile pluto, care poate atinge lungimea de 39 mm ,cel mai comune de albine din emisfera nordică sunt speciile de Halictidae, sau albinele atrase de transpirație, niște albine mici care adesea sunt
                Considerate în mod greșit viespi sau muște. Cea mai cunoscută specie de albine este albina europeană.',
                '6-9 luni',
                'Insecte',
                '0.01g',
                '1cm',
                'Campii deschide Europa,Asia,',
                'ierbivor'
            );   

INSERT into animals 
       VALUES ( 0,
                'ALBINA',
                '../pages/animalPage.html',
                '../images/albina/albina1.jpg',
                '../images/albina/albina2.jpg',
                '../images/albina/albina3.jpg',
                '../images/albina/albina4.jpg',
                0,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                TRUE,
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

INSERT into animals 
       VALUES ( 0,
                'BIBAN DE ACVARIU',
                '../pages/animalPage.html',
                '../images/biban_de_acvariu/bibanacvariu1.jpg',
                '../images/biban_de_acvariu/bibanacvariu2.jpg',
                '../images/biban_de_acvariu/bibanacvariu3.jpg',
                '../images/biban_de_acvariu/bibanacvariu4.jpg',
                0,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                FALSE,
                TRUE,
                FALSE,
                72,
                'Bibanul de acvariu (Serranus cabrilla) face parte din ordinul Perciformes, familia Serranidae si genul Serranus. Poate fi intalnit in Oceanul Atlanticu, Marea Mediterana, Marea Rosie, Marea Neagra si Crimeea.
                Este posibil sa fie prezent si in apele noastre. In salbaticie se hraneste cu alti pesti, cefalopode si crustacee . Se presupune ca este omnivor. La maturitate atinge lungimea de 10 – 25 cm. In mediul natural
                poate ajunge la marimea de 40 cm. Bibanul are un trup oval cu spate usor arcuit in special in apropierea capului. Spatele prezinta doua inotatoare de dimensiuni medii, foarte apropiate una de cealalta. Prima inotatoare este mai mare
                decat cea din spate, fiind in acelasi timp si mai dura si mai tepoasa. Capul bibanului are o forma conica si se termina cu o gura mare. Ochii sunt mari, iar dintii sunt mici si foarte desi.
                 Ca si alte specii de pesti, spatele mai inchis la culoare si burta aproape alba.Pe corp are in jur de 10 dungi verticale de culoare roscat-maronie, iar pe burta are 2-3 dungi roscate de-a paralele lungul corpului.',
                'Pescuitul la biban reprezinta activitatea preferata a pescarilor incepatori si a celor amatori. Nu exista niciun fel de restrictie in ceea ce priveste pescuitul acestei specii de-a lungul anului, asadar este apreciat de foarte multi
                dintre pescari.
                Pe teritoriul romanesc, dimensiunea maxima pe care o poate atinge bibanul este cuprinsa intre 15 si 30 cm, iar greutatea maxima este de 350 g. Bineinteles, exista si exemplare de dimensiuni mai mari, care pot atinge chiar si un kilogram;
                insa acestea sunt foarte rare. In ceea ce priveste comportamentul bibanului se poate spune ca este un peste fricos si sedentar caruia ii place apa calda si care se hraneste cu o lacomie de nedescris. ',
                '4-9 ani',
                'Pesti',
                '1-2kg',
                '10cm',
                'Oceanul Atlantic,Marea Mediterana',
                'omnivor'
            );  
                                                                                
INSERT into animals 
       VALUES ( 0,
                'BOTIA MACRACANTHA',
                '../pages/animalPage.html',
                '../images/botia_macracantha/botia_macracantha1.jpg',
                '../images/botia_macracantha/botia_macracantha2.jpg',
                '../images/botia_macracantha/botia_macracantha3.jpg',
                '../images/botia_macracantha/botia_macracantha4.jpg',
                0,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                216,
                'Botia macracantha este un peste tropical care poate fi intalnit in apele dulci din Indonezia. Cele mai mari popularii sunt in regiunile Sumatra si Borneo.
                Este un peste iubit de majoritatea acvaristilor pentru culoarea vie si caracterul relativ pajnic si comportamentul sau. Numele „macracantha” inseamna „ghimpe mare” si face referire la proeminenta cornoasa de
                sub ochi.
                Aceasta il ajuta sa se apere de pradatori. In mediul natural traieste chiar si 18 ani. Chiar daca este un peste sensibil la unele afectiuni, are si capacitatea de a se adapta foarte bine la altele. Este o specie
                omnivora care, in salbaticie, se hraneste in principal cu alge. Avand in vedere ca nu este un peste pretentios in captivitate poate fi hranit cu mancare uscata, congelata si hrana vie. Daca aveti plante naturale care cresc repede bune
                la gust le va consuma cu placere. Pentru diversificarea hranei puteti sa-i oferiti si legume.',
                'În habitatul natural, fasolea urzită poate fi găsită în apele alpine furtunoase ale râurilor din est: în India, Bangladesh, Pakistan și Nepal. Este interesant faptul că acest pește a apărut pentru prima dată în acvariu abia în 1912, și în acvariul european-chiar și în 1956.
                Corpul peștelui este alungit și drept, la bărbați este mult mai armonios, iar la femei abdomenul este mai înclinat și, în general, sunt mult mai mari. Lungimea este de 10–12 cm și poate atinge 16 cm, dar într-un acvariu de obicei nu depășește 7–8 cm.
                Durata medie de viață a unui pește este de 5–8 ani. În ceea ce privește vârfurile ochilor, ar trebui să fii atent. În ciuda demonstrației lor rare, nu ar trebui să scapi de legea blândeții. Când transportă peștele într-o pungă
                e plastic, un vertebrat speriat îl poate străpunge cu ușurință.',
                '18 ani',
                'Pesti',
                '2-10kg',
                '50cm',
                'Indonezia',
                'omnivor'
            );   

INSERT into animals 
       VALUES ( 0,
                'CALCAN',
                '../pages/animalPage.html',
                '../images/calcan/calcan1.jpg',
                '../images/calcan/calcan2.jpg',
                '../images/calcan/calcan3.jpg',
                '../images/calcan/calcan4.jpg',
                0,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                24,
                'Calcanul mare (Scophthalmus maximus) este o specie de pești din familia Scophthalmidae. Este un pește bentonic, care populează atât apele sărate, cât și cele salmastre ale Atlanticului de Nord, ale mărilor Baltică,
                 Mediterană și Neagră. Denumirea acestui pește provine din limba turcă, făcând aluzie la forma sa, și înseamnă „scut”.
                 Calcanul este un pește mare, cu ochii pe partea stângă a corpului, care poate fi găsit în apropiere de țărm pe fundul nisipos al apelor puțin adânci ale Mărilor Baltică, Mediteraneană, Neagră și ale Atlanticului
                 de Nord. Acest pește are un corp asimetric de forma discului și poate atinge greutatea de 25 kg și lungimea de 1 m.
                 Calcanul mare este foarte apreciat în arta culinară datorită gustului său delicat. Este o specie comercială de valoare, fiind obținut prin acvacultură și traulare. Este crescut în Bulgaria, Franța, Spania, Portugalia,
                Turcia, Chile, Norvegia, China, precum și în România.',
                ' Calcanul de Marea Neagră poate crește până la 45 cm lungime.
                  Statutul său taxonomic este controversat.
                  În literatura de specialitate este considerat fie o specie aparte (Scaphthalmus maeoticus), fie o subspecie a calcanului mare (Scaphthalmus
                  maximus maeoticus).
                  În martie și aprilie 1995 între Canada și Spania a avut loc un conflict pentru drepturi de pescuit cunoscut drept Războiul Calcanului (engl. Turbot War) sau Războiul Cambulei (sp. Guerra del flétan), subiectul acestui conflict a fost
                  pescuitul calcanilor în zona Marelui Banc al Terranovei, situat la intersecția zonei economice exclusive a Canadei și a apelor internaționale, pe 9 martie funcționari de la Canadian Fisheries Patrol au urcat la bordul traulerului
                  spaniol Estia, au arestat echipajul, și au escortat nava la St. John, Newfoundland. ',
                '1-3 ani',
                'Pesti',
                '1-4kg',
                '10-30cm',
                'Marea Baltica,Marea Mediterana',
                'ierbivor'
            ); 

  INSERT into animals 
       VALUES ( 0,
                'CAMELEON',
                '../pages/animalPage.html',
                '../images/cameleon/cameleon1.jpg',
                '../images/cameleon/cameleon2.jpg',
                '../images/cameleon/cameleon3.jpg',
                '../images/cameleon/cameleon4.jpg',
                0,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                FALSE,
                TRUE,
                72,
                'Cameleonul este o reptilă (din familia Chamaeleonidae) arboricolă și insectivoră din regiunile tropicale, cu gheare asemenea unui clește, care o ajută să se prindă de copaci. Are proprietatea de a-și schimba
                 culoarea pielii potrivit mediului înconjurător. În prezent sunt cunoscute 160 de specii, cameleonii făcând parte din rândul speciilor de animale periclitate.
                 Singuratic, cameleonul trăiește în copaci, dar este capabil să alerge rapid în cazul în care este amenințat. Adaptat la viața arboricolă și la vânătoarea de insecte, cameleonul are corpul puternic comprimat lateral, iar degetele picioarelor sunt orientate în două laturi opuse, formând un clește,cu care se prinde de ramurile copacilor.
                 Aproape jumătate din speciile de cameleoni de pe pământ trăiesc în insula Madagascar (Africa). Această comunitate de cameleoni este cea mai mare din lume, fiind unică și prin faptul că numără 59 de specii diferite, care nu se găsesc decât în Madagascar.',
                'Abilitatea cameleonilor de a-şi schimba culoarea pielii în funcţie de mediul în care se află apare începând cu vârsta de 5 luni.
                 Limba cameleonului poate avea o lungime de 1,5 ori mai mare decât cea a corpului.
                 Urechile cameleonilor sunt atât de mici încât nu pot fi distinse clar cu ochiul liber de către oameni, Ca atare, auzul lor este foarte prost si totuşi, ei pot auzi anumite sunete şi pot simţi vibraţiile.
                 Limba lor este lipicioasă şi puternică, perfectă pentru a-şi vâna prada şi pentru a o înghiţi cu rapiditate.',
                '4-8 ani',
                'Reptile',
                '1.3kg',
                '35cm',
                'deserturi, paduri tropicale',
                'omnivor'
            );                                                                                                     

    INSERT into animals 
       VALUES ( 0,
                'CAPUSA',
                '../pages/animalPage.html',
                '../images/capusa/capusa1.jpg',
                '../images/capusa/capusa2.jpg',
                '../images/capusa/capusa3.jpg',
                '../images/capusa/capusa4.jpg',
                0,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                TRUE,
                18,
                'Căpușele sau ixodidele (Ixodida) sunt un ordin de acarieni ectoparaziți ai reptilelor, păsărilor și mamiferelor, cu mod de hrănire obligatoriu hematofag și intermitent, și cu o importanță deosebită din punct
                 de vedere medical și veterinar. Înțepătura căpușelor poate determina leziuni grave ale tegumentului, unele specii pot provoca paralizii, iar alte specii servesc ca vectori pentru diverse microorganisme transmițând tifosul, boala Lyme,
                febra recurentă.
                Căpușele au un corp acarian tipic, turtit dorso-ventral, dar care a fost adaptat la viața ectoparazitară. Spre deosebire de insecte, căpușele nu au cap, antene, torace sau abdomen [2][3]. Corpul este împărțit
                într-o regiune anterioară, capitulul sau gnatosoma, și o regiune posterioară, idiosoma, care constituie restul corpului. Capitulul sau gnatosoma, se compune dintr-o regiune posterioară, baza capitulului, și o regiune anterioară, piesele
                bucale care sunt formate de palpi, chelicere și hipostom .
                Idiosoma este compusă din plăci numite scuturi. Idiosoma este împărțită în podosomă care poartă 4 perechi de picioare la adulți (trei la larve) și orificiile genitale și opistosomă, care se află posterior de
                picioarele IV și poartă placa spiraculară și orificiu anal. Partea superioară a idiosomei este acoperită de scutul dorsal.',
                'În România au fost identificate 27 specii de căpușe, Ixodes ricinus fiind cea mai frecventă specie.
                Acestea se gasesc in iarba inalta si in zonele umbroase si pot ajunge cu usurinta pe corpul animalelor si oamenilor.
                Capusele se afla pe locul doi dupa tantari in ceea ce priveste transmiterea de boli infectioase atat la oameni, cat si la animale. Perioada cu cel mai mare risc este primavara spre vara, atunci cand apar in zonele cu iarba inalta, in locurile umbroase, parcuri si gradini, iar durata medie de viata a unei capuse este de doi ani.',
                '1-2 ani',
                'Insecte',
                '0.01g',
                '0.1cm',
                'Europa,America de Nord,Asia',
                'carnivor'
            ); 

    INSERT into animals 
       VALUES ( 0,
                'CARABUS DE MAI',
                '../pages/animalPage.html',
                '../images/carabus_de_mai/carabus_de_mai1.jpg',
                '../images/carabus_de_mai/carabus_de_mai2.jpg',
                '../images/carabus_de_mai/carabus_de_mai3.jpg',
                '../images/carabus_de_mai/carabus_de_mai4.jpg',
                0,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                TRUE,
                50,
                'Carabusul de mai este o specie polifaga, se intalneste in toata Europa, semnalata in toate zonele din Romania, mai ales in regiunile de antestepa, in apropierea padurilor de stejar si fag. 
                Adultul are 20-25 mm lungime, cu capul, pronotul si scutelul de culoare neagra cu reflexe verzui, elitrele castanii, care prezinta patru catrene longitudinale, uneori cu pubescenta alba. Abdomenul este de culoare
                neagra, prevazut cu partile laterale cu sase pete triunghiulare albe. Oul este de culoare alb galbuie, de forma ovala, de 1.5-2 mm lungime. Larva este numita popular “vierme alb” sau “gainuse” si are corpul de culoare alb-galbui, iar
                protoracele si picioarele sunt brune-galbui.
                Carabusul de mai are o generatie la 3-4 ani si ierneaza in sol ca larva si/sau adult. In cursul zilei stau adapostiti in frunzisul pomilor sau arbustilor, hranindu-se cu frunzele acestora. Ouale sunt depuse
                 in sol, de preferinta in terenuri usoare, la 10-20 cm adancime, grupate cate 20-40. Larvele apar dupa 4-6 saptamani, in luna iulie sau la inceputul lunii august si se hranesc cu radacini mai fine. In anul al doilea ataca si radacinile
                 mai groase. Spre toamna, acestea coboara in sol, pana la adancimea de 40-80 cm si ierneaza.',
                'În România au fost identificate 27 specii de căpușe, Ixodes ricinus fiind cea mai frecventă specie.
                 Acestea se gasesc in iarba inalta si in zonele umbroase si pot ajunge cu usurinta pe corpul animalelor si oamenilor.
                 Capusele se afla pe locul doi dupa tantari in ceea ce priveste transmiterea de boli infectioase atat la oameni, cat si la animale, iar perioada cu cel mai mare risc este primavara spre vara, atunci cand apar in zonele cu iarba inalta, in locurile umbroase, parcuri si gradini, iar durata medie de viata a unei capuse este de doi ani.',
                '3-6 ani',
                'Insecte',
                '0.02g',
                '0.3cm',
                'Europa,America de Nord,Asia',
                'ierbivor'
            );       
  INSERT into animals 
       VALUES ( 0,
                'CARAS',
                '../pages/animalPage.html',
                '../images/caras/caras1.jpeg',
                '../images/caras/caras2.jpeg',
                '../images/caras/caras3.jpeg',
                '../images/caras/caras4.jpeg',
                0,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                24,
                'Carasul(Carrassius gibelio) (plural: Carași) este cel mai cunoscut și răspândit pește de apă dulce din România. El face parte din clasa Actinopterygii, ordinul Cypriniformes, familia Cyprinidae. Carasul este originar din Asia de Nord,
                de unde s-a răspândit în toată China ca pește ornamental, iar mai apoi în întreaga lume. Dimensiunile obișnuite ale carasului sunt de 10-15 cm, iar greutatea lui poate varia de la 80-150 de grame, la 1,5-2 kg, în mod excepțional.In
                Romania a fost prins un caras cântărind 5,2 kg. Se pare că este recordul mondial. In unele cazuri pot avea chiar si peste 30 de cm',
                'Colorația solzilor lui depinde de apa în care trăiește. În apele mâloase solzii lui bat spre culoarea neagră, în apele bogate în vegetație bate spre verde, iar în cele limpezi culoarea carasului este auriu-maronie. Forma capului este asemănătoare cu cea a crapului, lipsindu-i însă mustățile, iar forma gurii este obtuză, cu buze subțiri. Carasul poate trăi în ape foarte sărace în oxigen, între niște limite ale PH-ului, pe care puțini pești le suportă. Este un pește care rezistă și scos din apă, mai multe ore, mai ales dacă este învelit într-o cârpă udă, deoarece nu i se usucă solzii. Se hrănește cu larve, crustacee, vegetație, moluște, icre etc.',
                '1-3 ani',
                'Pesti',
                '1-2kg',
                '10-20cm',
                'Marea Neagra si Marea Mediterana',
                'omnivor'
            );  

  INSERT into animals 
       VALUES ( 0,
                'CLOVN',
                '../pages/animalPage.html',
                '../images/clovn/clovn1.jpg',
                '../images/clovn/clovn2.jpg',
                '../images/clovn/clovn3.jpg',
                '../images/clovn/clovn4.jpg',
                0,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                FALSE,
                TRUE,
                36,
                'Pestele clovn (Amphiprion percula), originar din zona Pacificului Indian si a Marii Bariere de Corali, este regasit din Nordul Queensland-ului pana in Malaezia, teritoriu care cuprinde Noua Guinee, New Britain,
                New Irland, Solomon Island si Vanuatu. In habitatul sau natural, traieste in apele marine la adancimi de 1-12 metri. In concluzie, pestele clovn este un peste de apa sarata, care, datorita coloritului sau caracteristic, se enumera
                printre preferintele acvaristilor.
                Este cunoscut si sub numele de peste Nemo, Pestele Anemona sau Pestele Arlechin. Ca toti pesti-anemone, pestele clovn isi creaza legaturi simbiotice cu anemonele marine. El isi foloseste gazda, atat ca adapost,
                cat si pentru a se proteja de pradatori si, in schimb, pestele clovn indeparteaza intrusii si isi toaleteaza gazda, inlaturand parazitii.
                Peștele clovn trăiește în oceanul Pacific, în partea de vest, preferând locurile ascunse și pietrele. În cazul în care peștele clovn trăiește în acvariu, se înțelege foarte bine cu toate speciile de pești.El
                preferă acvariile mijlocii .Această specie de pește se adaptează repede la mediul în care trăiește și de aceea se poate lipsi de anemonă.Peștele clovn se hrănește atât cu alge cât și cu carne, ceea ce ne spune despre el că este un
                pește omnivor. Dacă trăiește în acvariu, peștele trebuie hrănit de 2 sau 3 ori pe zi cu mâncare marină de calitate.',
                'Peștele clovn se împerechează pe tot parcursul anului. Femela dă naștere la o singură fătare la circa 100-1000 de descendenți, perechile formate pentru reproducție sunt monogame,iar după ce femela depune ouăle, masculul vine să le fertilizeze.
                După o incubație de 6-7 zile, ouăle de pește clovn sunt apte pentru a ecloza, chiar înainte de eclozare, embrionul este vizibil prin transparența membranei oului. După eclozare, larva are o lungime de 3-4 mm și este aproape transparentă, excepție făcând
                ochii, sacul vitelin și prezența câtorva pigmenți.
                Această specie de pește se adaptează repede la mediul în care trăiește și de aceea se poate lipsi de anemonă.
                Peștele clovn se hrănește atât cu alge cât și cu carne, ceea ce ne spune despre el că este un pește omnivor.
                 Dacă trăiește în acvariu, peștele trebuie hrănit de 2 sau 3 ori pe zi cu mâncare marină de calitate.',
                '3-4 ani',
                'Pesti',
                '0.1-0.9kg',
                '10cm',
                'Europa,America de Nord,Asia',
                'omnivor'
            );  

    
  INSERT into animals 
       VALUES ( 0,
                'COROPISNITA',
                '../pages/animalPage.html',
                '../images/coropisnita/coropisnita1.jpg',
                '../images/coropisnita/coropisnita2.jpg',
                '../images/coropisnita/coropisnita3.jpg',
                '../images/coropisnita/coropisnita4.jpg',
                0,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                TRUE,
                8,
                'Coropisnita este o specie raspandita in Europa, Asia Centrala si de Vest, Africa de Nord si Africa Centrala. In tara noastra este intalnita in toate zonele, in special in gradinile de legume, sere, solarii si
                 rasadnite, cu soluri bogate in materie organica, unde produce pagube considerabile. Este semnalata, de asemenea, si in culturi de camp. 
                 Adultul are corpul robust, alungit, aproape cilindric, de culoare brun-castanie, mai inchis pe fata dorsala si mai deschis pe fata ventrala (aproape galben), cu tegumentul pubescent. Lungimea corpului variaza
                 intre 35-50 mm. Oul este sferic, de culoare alb-galbui. Larva se aseamana cu adultul, dar este de dimensiuni mai mici, iar aripile nu sunt dezvoltate. Coropisnita ierneaza ca adult sau ca larva de varsta a III-a, in sol, la o adancime
                 de 30-40 cm.
                 Pana in toamna larvele naparlesc de doua ori, apoi se retrag pentru hibernare. In anul urmator larvele trec prin alte trei naparliri si se transforma in adulti, stadii in care hiberneaza. Adultii parasesc locurile
                 de hibernare in februarie-martie si trec in rasadnita.
                 Plantele atacate si daune. Coropisnita are un regim de hrana omnivor, hranindu-se cu substrat vegetal, dar si cu prada vie (rame, diverse larve sau insecte). Daunele produse sunt directe, prin roaderea sistemului
                 radicular al plantelor (reteaza tulpinile in momentul rasaririi sau repicarii) sau indirecte prin galeriile sapate pentru deplasare, scotand la suprafata solului, semintele incoltite sau plantele tinere. Plantele atacate se vestejesc
                 si se apleaca pe sol, smulgandu-se usor. Este considerata cea mai periculoasa specie polifaga a plantelor legumicole, atat in rasadnite, cat si in gradinile de legume. Ataca tomatele, ardeiul, vinete, castraveti, ceapa, morcov, cartof,
                 tutun, ridichii, varza, conopida etc. Larvele produc cele mai mari pagube. Atacul se manifesta in vetre, putand fi recunoscut prin mici ridicaturi la suprafata solului (mai ales dupa ploaie sau irigare) .',
                 'În România au fost identificate 27 specii de coropisnite.
                  Acestea se gasesc deobicei la adancimi mari sub pamant si ies la suprafata doar noaptea. ',
                '6-9 luni',
                'Insecte',
                '100g',
                '0.3cm',
                'Europa,America de Nord,Asia',
                'carnivor'
            );

      INSERT into animals 
       VALUES ( 0,
                'DORADA',
                '../pages/animalPage.html',
                '../images/dorada/dorada1.jpg',
                '../images/dorada/dorada2.jpg',
                '../images/dorada/dorada3.jpg',
                '../images/dorada/dorada4.jpg',
                0,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                18,
                'Dorada (Sparus aurata) este un pește care trăiește în Marea Mediterană și în unele părți costale ale Atlanticului de nord. Acest nume este asociat mai multor pești teleosteeni (cu reflexe aurii). Cel mai adesea,
                 acesta atinge ca lungime 35 de centimetri (sau chiar și până la 70 de centimetri) și în greutate, în cazuri record, până la 17,2 kilograme.
                 Dorada trăiește lângă țărm la adâncimi de la 5 până la 150 m. Preferă locațiile cu fund nisipos sau de prundiș, dar poate fi întâlnită și lângă recife sau stânci. De obicei acești pești sunt solitari și activi
                 ziua; în zonele de pescuit intens pot fi și nocturni. Un banc de dorade.
                 Doradele înoată mai ales lângă fund. Spre deosebire de multe alte sparide, se tem atât de scufundători, cât și de bărci. O particularitate a doradelor este, că nu există indivizi pur masculini sau pur feminini.
                 Ele sunt întotdeauna hermafrodite: până la atingerea vârstei de doi ani și lungimii de 20 – 30 cm sunt masculi, după aceea sunt femele.',
                'Dorada este un pește extrem de gustos și apreciat, care poate fi copt atât la grătar, cât și la cuptor, prăjit și înăbușit, se prinde cu plase, traule și paragate.
                 Dorada este crescută cu mult succes în Grecia, Turcia, Israel, Italia și Croația, Grecia și Croația fiind producătorii principali.
                 Dorada se undițează, folosindu-se ca nadă moluște, crabi și peștișori, acest pește opune o rezistență aprigă și este considerat o captură deosebită.',
                '1-2 ani',
                'Pesti',
                '2-3kg',
                '10-20cm',
                'Marea Mediterana',
                'parazitar'
            );

INSERT into animals 
       VALUES ( 0,
                'FLAMINGO',
                '../pages/animalPage.html',
                '../images/flamingo/flamingo1.jpg',
                '../images/flamingo/flamingo2.jpg',
                '../images/flamingo/flamingo3.jpg',
                '../images/flamingo/flamingo4.jpg',
                0,
                TRUE,
                FALSE,
                TRUE,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                FALSE,
                TRUE,
                300,
                'Păsările flamingo stau mult timp într-un picior, celălalt stand ridicat lipit de corp. Motivul nu este înțeles pe deplin, unii sugerează ca flamingo, că și alte animale, are capacitatea de a tine jumătate de corp într-o stare de somnolenta, si atunci cand aceasta este odihnita pasarea se sprijina pe celalalt picior pentru a-și odihni și cealalta jumatate a corpului.Acest lucru nu este încă dovedit. Cercetările recente au indicat ca pasărea își tine un picior lipit de corp pentru a-si conserva căldura corpului datorită faptului ca petrec mult timp in apa rece căutându-și hrana.
                 Stau cu picioarele lungi în apa putin adanca. Baga ciocu-n apa și practic matura cu, și anume, capul dintr-o parte în alta apa în căutare de hrană.Algele verzi-albastre și cele roșii, larvele, insectele, crustaceele, moluștele și peștii mici alcătuiesc dieta principala a pasarilor flamingo.
                 Pasarea Flamingo își hrănește puii cu lapte produs datorită acțiunii unui hormon numit prolactină, asemenea porumbeilor și gugustiucilor.Acesta contine mai multe grasimi si mai puține proteine și este produs de glandele aflate de-a lungul tubului digestiv.',
                'Pasarea flamingo este o pasăre cunoscută pentru frumusețea și eleganța ei.
                 Egiptenii antici credeau ca flamingo era reprezentarea vie a zeului Ra.
                 Din păcate exista mai multe păsări flamingo de plastic decât adevărate.
                 Păsările flamingo au culoarea roz pentru ca mananca foarte multe multe alge verzi-albastre.',
                '25 ani',
                'Pasari',
                '5kg',
                '10-20cm',
                'America de Sud',
                'omnivor'
            );
INSERT into animals 
       VALUES ( 0,
                'FLUTURE',
                '../pages/animalPage.html',
                '../images/fluture/fluture1.jpg',
                '../images/fluture/fluture2.jpg',
                '../images/fluture/fluture3.jpg',
                '../images/fluture/fluture4.jpg',
                0,
                FALSE,
                FALSE,
                TRUE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                FALSE,
                TRUE,
                TRUE,
                FALSE,
                TRUE,
                5,
                'Fluturele este o insectă din ordinul Lepidoptera. În funcție de context, mai ales în limbajul popular, conceptul de fluture include uneori și moliile. Ca și toate Lepidopterele, fluturii sunt de remarcat pentru
                 ciclul lor de viață neobișnuit, cu un stadiu larvar de omidă, un stadiu inactiv de pupă și o metamorfoză spectaculoasă într-o formă familiară de adult cu aripi colorate. Deoarece cele mai multe specii zboară ziua, atrag de regulă atenția.
                 Diversele modele formate pe aripile colorate și zborul lor extravagant și grațios au făcut ca observarea fluturilor să devină un hobby popular.
                 Fluturii se clasifică în fluturi adevărați (superfamilia Papilionoidea), fluturi hesperiide (superfamilia Hesperioidea, engleză skipper), și fluturi-molii (superfamilia Hedyloidea).
                 Fluturii sunt distribuiți în prezent în toată lumea, cu excepția regiunilor foarte calde și aride. A fost estimat un număr de 17,500 de specii de fluturi (Papilionoidea) dintr-un număr de 180,000 de specii de Lepidoptera.',
                'Fluturii au nevoie de căldura emisă de soare pentru a putea zbura.
                 Fluturii au sânge rece, iar pentru a-și lua zborul au nevoie de căldură.
                 Majoritatea fluturilor nu trăiesc mai mult de câteva săptămâni, însă există specii care pot trăi până la câteva luni.
                Unii fluturi pot zbura cu o viteză de 50km/oră sau chiar mai rapid Se spune că fluturii pot distinge doar 3 culori: roșu, verde și galben. Cu toate acestea, unele specii de fluturi pot vedea lumina ultravioletă (UV). În lume, există peste 24.000 de specii
                de fluturi.',
                '3-6 luni',
                'Insecte',
                '0.03g',
                '10-20mm',
                'Campii deschide,Europa',
                'omnivor'
            );