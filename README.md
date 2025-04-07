[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/zEMxFy8r)
# URL Shortener avec AdonisJS & QR Code Generator

Un projet éducatif pour créer un raccourcisseur d'URL avec génération de QR codes.

## 🎯 Objectifs du projet

- Créer une application de raccourcissement d'URL avec AdonisJS
- Générer des QR codes pour les URLs raccourcies
- Développer une interface utilisateur intuitive
- Mettre en pratique les concepts de routing et controllers

## 📋 Fonctionnalités à implémenter

- [ ] Formulaire de saisie d'URL
- [ ] Génération d'URLs courtes uniques
- [ ] Création de QR codes
- [ ] Page d'affichage des résultats
- [ ] Redirection vers les URLs originales

## 🛠️ Installation

```bash
npm init adonis-ts-app@latest url-shortener
cd url-shortener
npm install @adonisjs/view
npm install qrcode

📦 Packages nécessaires
@adonisjs/view - Pour le templating avec Edge
qrcode - Pour la génération des QR codes


GitHub Copilot
📦 Packages nécessaires
@adonisjs/view - Pour le templating avec Edge
qrcode - Pour la génération des QR codes

📚 Documentation utile
AdonisJS Documentation
QRCode Documentation
Edge Templates

✨ Points à développer

1. Routes (start/routes.ts)
Route pour la page d'accueil
Route pour le raccourcissement d'URL
Route pour la redirection
Route pour la génération de QR code

2. Controllers
ShortUrlController: Gestion des URLs
QrCodeController: Génération des QR codes

3. Vues
Layout principal
Page d'accueil avec formulaire
Page de résultats
Composants header/footer

🎨 Interface utilisateur
L'interface doit inclure:

Un formulaire de saisie d'URL
Un affichage clair de l'URL raccourcie
Le QR code généré
Un design responsive et intuitif


💡 Conseils
Utilisez TailwindCSS pour le styling (déjà inclus dans AdonisJS)
Testez vos URLs avant de les raccourcir
Générez des codes courts uniques
Gérez les erreurs proprement
Commentez votre code

📝 Critères d'évaluation
Fonctionnalité du raccourcissement d'URL
Génération correcte des QR codes
Qualité du code et organisation
Interface utilisateur et expérience utilisateur
Gestion des erreurs
```
