# Markus Mikko Bakalaureusetöö

Lõputöö tulemus, mis on mõeldud lokaalseks kasutamiseks ja mis ei näita ettevõte Elisa Eesti AS'is kasutatavat konfidentsiaalset infot.

Käivitamiseks on vaja seadistada andmebaas (autor kasutas lokaalselt MariaDB). Seal teha kasutaja päringuga: 
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password'; 
Ja anda talle õigused:
GRANT ALL PRIVILEGES ON Tärn.Tärn TO 'user'@'localhost' IDENTIFIED BY 'password'; (Tärn = *)

Rakenduse jooksutamiseks tuleb panna käsuviipa: "ng serve", mis avab pordil 4200 lokaalse rakenduse. Lisaks tuleb käivitada uues käsuviibas "node src/index.js", mis paneb andmebaasi kuulama pordile 2700. 

Peale seda võiks kõik lokaalselt toimida.
