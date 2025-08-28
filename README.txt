# Système Univers Bastard pour Foundry VTT

Un système de jeu pour Foundry VTT basé sur **Univers Bastard**, où vous incarnez des bâtards interstellaires dans un vaste tas d'ordures galactique.

## Description

*"Salut, bande de déchets galactiques ! Bienvenue dans Universe Bastard, où l'espace n'a rien de noble, et vous êtes encore moins que ça. Vous n'êtes pas des héros, ni même des survivants exemplaires. Vous êtes des bâtards interstellaires, bons à rien, mais prêts à tout pour gratter un peu de pouvoir, de respect, ou simplement ne pas crever aujourd'hui."*

Ce système implémente les règles complètes d'Univers Bastard, créé par Aymeric et Jean.

## Fonctionnalités

### Types d'Acteurs
- **Personnages** : Les protagonistes joueurs avec leurs attributs, équipements et capacités
- **PNJ** : Personnages non-joueurs avec système de stress et actions simplifiées
- **Vaisseaux** : Véhicules spatiaux avec points de coque, énergie et modules

### Types d'Objets
- **Armes** : Système de combat avec types de dégâts (Cinétique, Plasma, Laser)
- **Armures** : Protection différentielle selon les types d'attaques
- **Modules** : Améliorations actives et passives pour armes, armures et vaisseaux
- **Équipement** : Objets divers et consommables
- **Espèces** : 8 espèces jouables (Gwoozhis, Légarians, Atlantéens, etc.)
- **Métiers** : 7 classes avec spécialisations
- **Handicaps** : Défauts narrative qui donnent des points de réputation
- **Capacités** : Pouvoirs spéciaux des classes

### Système de Jeu
- **Jets de 2d10** avec modificateurs d'attributs (-3 à +3)
- **Seuils de réussite** : Échec total (2-6), Échec positif (7-10), Réussite négative (11-15), Réussite totale (16-20)
- **Six attributs** : Violence, Corps, Adresse, Charisme, Mental, Instinct
- **Système de réputation** : Expérience et monnaie sociale
- **Énergie Vitale** avec seuils de blessures et malus
- **Combat par points d'adrénaline** pour un gameplay tactique

## Installation

### Méthode 1: Installation automatique
1. Dans Foundry VTT, allez dans l'onglet "Game Systems"
2. Cliquez sur "Install System"
3. Collez l'URL du manifest : `[URL_DU_MANIFEST]`
4. Cliquez "Install"

### Méthode 2: Installation manuelle
1. Téléchargez le fichier zip du système
2. Extrayez-le dans le dossier `Data/systems/` de Foundry VTT
3. Redémarrez Foundry VTT
4. Créez un nouveau monde en sélectionnant "Univers Bastard"

## Utilisation

### Création de Personnage
1. Créez un nouvel acteur de type "Personnage"
2. Répartissez les modificateurs d'attributs : 2×(+1), 2×(0), 2×(-1)
3. Choisissez une espèce et un métier
4. Sélectionnez jusqu'à 2 handicaps pour gagner des points de réputation
5. Choisissez une motivation
6. Calculez l'Énergie Vitale de base (6) plus les bonus du métier

### Système de Combat
- Les joueurs disposent de 3 Points d'Adrénaline par défaut
- Chaque action coûte 1 PA, certaines actions spéciales coûtent 2 PA
- Récupération d'adrénaline quand on perd des EV
- Le MJ accumule du stress selon les actions des joueurs

### Jets de Dés
- Cliquez sur les attributs pour effectuer des tests
- Les armes ont des boutons d'attaque automatique
- Le système gère automatiquement les seuils de réussite
- Les modificateurs de blessures sont appliqués automatiquement

### Vaisseaux Spatiaux
- Gérez les Points de Coque et Points d'Énergie
- Système de seuils de dégâts avec malus progressifs
- Modules et armes intégrées
- Postes d'équipage assignables

## Espèces Disponibles

1. **Gwoozhis** : Marchands rusés et avares
2. **Légarians** : Ex-esclaves agiles avec communication animale
3. **Atlantéens** : Amphibies télépathes aux corps visqueux
4. **Malharis** : Invisibles traqués pour leur peau précieuse
5. **Rokkar** : Colosses de pierre résistants au vide
6. **Ptolémiens** : Intellectuels scientifiques supérieurs
7. **Numériens** : Descendants présumés des Terras, dominants
8. **Automates** : Androïdes conscients libérés de leur programmation

## Métiers et Spécialisations

- **Archiviste** : Diplomate / Chercheur
- **Agent Furtif** : Assassin / Espion  
- **Pilote** : Racer / Contrebandier
- **Tech** : Mécanicien / Hacker
- **Médecin** : Chirurgien / Infirmier
- **Soldat** : Commando / Artilleur
- **Chevalier de Gelleïne** : Sentinelle / Exécuteur

## Configuration Recommandée

- **Foundry VTT** version 11 ou supérieure
- **Modules suggérés** :
  - Dice So Nice (pour des dés en 3D)
  - Token Action HUD (pour un accès rapide aux actions)

## Développement et Contributions

Ce système est basé sur les règles originales d'Univers Bastard par Aymeric et Jean. 

Pour signaler des bugs ou suggérer des améliorations, utilisez la section Issues du repository GitHub.

### Feuille de Route
- [ ] Compendiums pré-remplis avec armes, armures et équipements
- [ ] Système de jauges d'événements automatisé
- [ ] Intégration des tables de voyage interstellaire
- [ ] Macro de création de personnage guidée
- [ ] Support des effets actifs avancés

## Licence

Ce système est créé pour un usage non-commercial. Les règles d'Univers Bastard appartiennent à leurs créateurs originaux.

## Crédits

- **Système original** : Aymeric et Jean
- **Adaptation Foundry VTT** : [Votre nom]
- **Inspiration** : L'univers sombre et cynique d'Univers Bastard

---

*"Dans ce vaste tas d'ordures qu'on appelle l'univers, tout est permis : trahir, mentir, écraser, ou juste essayer de ne pas finir en bouillie."*