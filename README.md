# Markus Mikko Bakalaureusetöö

Lõputöö tulemus, mis on mõeldud lokaalseks kasutamiseks ja mis ei näita ettevõte Elisa Eesti AS'is kasutatavat konfidentsiaalset infot.
Eelduseks on Node.js:
```
node -v
```
Kui Node.js pole, siis on vaja minna leheküljele: https://nodejs.org/en/download/

Peale seda võiks eelneva päringuga tulla info ja on vaja alla tõmmata Angular:
```
npm install -g @angular/cli
```

Käivitamiseks on vaja seadistada andmebaas (autor kasutas lokaalselt MariaDb'i (Windowsis: https://mariadb.org/download/, peale mida tuleks avada MySQL client; MacOS'il on eelduseks brew olemasolu ja saab alla laadida sisestades käsuviipa: ```brew services start mariadb```, peale mida tuleks panna käsuviibale: ```sudo mysql -u root```). Seal teha kasutaja päringuga: 
```
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password'; 
```
Ja anda talle õigused:
```
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' IDENTIFIED BY 'password'; 
```

Rakenduse jooksutamiseks tuleb panna käsuviipa, olles rakenduse kaustas: ```ng serve```, mis avab pordil 4200 lokaalse rakenduse. Lisaks tuleb käivitada uues käsuviibas ```node src/index.js```, mis paneb andmebaasi kuulama pordile 2700. 

Peale seda võiks kõik lokaalselt toimida.
