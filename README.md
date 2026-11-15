# Tambour

Un jeu de rythme au tambour, sous les lanternes d'une fête de nuit : les notes rouges et bleues défilent vers le cercle, frappe au centre ou sur le bord au moment où elles le touchent. Joue les 1200 morceaux du plugin Rythme, ou ta propre musique.

*English version: [README.en.md](README.en.md)*

## Comment jouer

- **Notes rouges** : coup au centre, avec **F** ou **J**.
- **Notes bleues** : coup sur le bord, avec **D** ou **K**. Frapper la mauvaise couleur compte comme raté.
- **Grosses notes** : elles viennent des accords du morceau ; frappe des **deux mains** presque en même temps (F et J, ou D et K) pour doubler les points.
- **Barres jaunes** : un roulement, sur les notes longues. Tape le plus vite possible, chaque coup rapporte.
- À la **souris** ou au **doigt** : les tampons **DON** (rouge) et **KA** (bleu) en bas de l'écran.
- **Espace** : jouer · **P** : pause · **Plein écran** pendant la partie.

## Précision et points

Les notes sont jugées selon l'écart avec le bon moment : **Parfait** (environ ±45 ms), **Bien** (±90 ms), **OK** (±140 ms), sinon raté.

Les points d'une note augmentent de 1 % par note de combo, jusqu'au double à 100 notes de suite ; une note ratée remet le combo à zéro. À la fin, la précision donne une note : **S** à partir de 95 %, **A** à 90 %, **B** à 80 %, **C** à 70 %, **D** en dessous.

## Chansons et difficulté

L'onglet **Chansons** reprend les 1200 morceaux de Rythme, en quatre difficultés (Facile, Normal, Difficile, Expert). La difficulté de chaque niveau est calculée d'après ses notes (densité, passages chargés), de 1 à 10 étoiles.

## Mes musiques

Dans **Mes musiques**, crée un niveau à partir d'un **fichier audio** importé ou d'une musique de ta bibliothèque **NeoMusic** : le jeu trouve son tempo et ses temps forts et en fait un niveau, à la **difficulté** choisie (1 à 10 étoiles).

## Réglages

- **Volume** de la musique.
- **Son des clics** : le son joué à chaque note touchée, au choix parmi 10 (Doux, Clap, Bois, Grosse caisse, Cristal, Pop, Charleston, Caisse claire, Pluck, Tok) ou aucun. Perdre un combo de 10 ou plus joue un son « combo cassé ».
- **Décalage** (−300 à +300 ms) : il se règle tout seul après chaque partie selon ton retard ou ton avance moyens ; tu peux aussi le changer à la main.

## Données et synchronisation

Tes scores et notes par niveau et tes réglages sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Tambour → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).

## Manette et courbe de précision

- **Manette** : A et B frappent le rouge (les deux à la fois pour une grosse note), X, Y et les gâchettes hautes frappent le bleu. Start lance le morceau, Select met en pause.
- **Écran de fin** : une courbe montre la précision le long du morceau, avec les notes ratées en rouge.
