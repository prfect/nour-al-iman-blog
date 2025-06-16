# نور الإيمان - Blog Islamique Moderne

Ce projet est un blog islamique moderne destiné aux femmes marocaines, construit avec 11ty (Eleventy) et Netlify CMS. Le design est élégant, accessible, et adapté à un public senior.

## Fonctionnalités

- Design moderne avec éléments décoratifs islamiques
- Affichage de la date hijri
- Widget de temps de prière pour Oujda
- Mode sombre et contrôles d'accessibilité
- Système multilingue (arabe/français)
- Interface d'administration simple pour gérer le contenu
- Responsive design pour tous les appareils
- Optimisé pour le référencement

## Installation locale

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Un compte GitHub
- Un compte Netlify

### Étapes d'installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/VOTRE_NOM_UTILISATEUR/nour-al-iman-blog.git
   cd nour-al-iman-blog
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Démarrez le serveur de développement :
   ```bash
   npm start
   ```

4. Ouvrez votre navigateur à l'adresse : `http://localhost:8080`

## Déploiement sur Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/) si vous n'en avez pas déjà un.

2. Sur votre tableau de bord Netlify, cliquez sur "New site from Git".

3. Choisissez GitHub comme fournisseur de Git.

4. Autorisez Netlify à accéder à vos dépôts.

5. Sélectionnez votre dépôt `nour-al-iman-blog`.

6. Configurez les paramètres de build :
   - Build command : `npm run build`
   - Publish directory : `_site`

7. Cliquez sur "Deploy site".

## Configuration de Netlify CMS

1. Activez l'authentification Netlify Identity :
   - Dans votre tableau de bord Netlify, allez dans Settings > Identity
   - Cliquez sur "Enable Identity"
   - Sous "Registration preferences", sélectionnez "Invite only"

2. Activez le Git Gateway :
   - Dans Identity > Services, cliquez sur "Enable Git Gateway"

3. Invitez-vous en tant qu'utilisateur :
   - Allez dans l'onglet Identity > Invite users
   - Entrez votre adresse e-mail
   - Acceptez l'invitation dans votre e-mail

4. Accédez à l'interface d'administration :
   - Visitez `votre-site.netlify.app/admin/`
   - Connectez-vous avec vos identifiants

## Ajout de contenu

### Articles de blog

1. Accédez à l'interface d'administration à `votre-site.netlify.app/admin/`
2. Cliquez sur "Articles" dans le menu latéral
3. Cliquez sur "Nouvel article"
4. Remplissez les champs :
   - Titre
   - Date de publication
   - Catégorie
   - Image principale (téléchargez une image)
   - Contenu (en markdown)
   - Auteur
   - Extrait (facultatif)
   - Tags (facultatif)
5. Cliquez sur "Publier"

### Pages

1. Accédez à l'interface d'administration
2. Cliquez sur "Pages" dans le menu latéral
3. Cliquez sur "Nouvelle page"
4. Remplissez les champs :
   - Titre
   - Contenu (en markdown)
5. Cliquez sur "Publier"

## Personnalisation

### Modifier les catégories

Les catégories sont définies dans le fichier `admin/config.yml`. Pour ajouter ou modifier des catégories, modifiez les options sous le champ "category".

### Modifier le design

Le design est défini dans le fichier `css/styles.css`. Vous pouvez modifier les couleurs, les polices et autres styles en éditant ce fichier.

### Modifier les temps de prière

Les temps de prière sont récupérés via l'API Aladhan. Vous pouvez modifier les coordonnées dans le fichier `js/scripts.js` pour correspondre à votre ville.

## Assistance

Si vous avez besoin d'aide pour configurer ou utiliser ce blog, veuillez créer une issue sur GitHub ou nous contacter à [votre-email@exemple.com].

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le distribuer selon les termes de la licence.
