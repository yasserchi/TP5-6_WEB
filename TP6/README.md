# Cours ESIR 2020
Documentation de base pour le TP

__Rappel pour toute communbication avec moi, n'oubliez pas de me mettre le noms du groupe de TP et le noms des personnes du groupe__

# Objectif
Réaliser un service avec NodeJS et MongoDB offrant une API CRUD. 
+ Cette API sera sécurisée par un JWT fourni par le service élaboré en première partie de TP avec Stéphane Michel.
+ le contrat d'API est celui fourni dans le swagger de ce projet

# Livrable
## Date limite pour rendre le TP le vendredi 22 mai 
Le livrable sera un zip ou un dépôt git (accessible) il devra contenir
+ le code des deux TP (Stéphane Michel et moi)
  + le code du serveur
  + les tests
  + les scripts (s'il y en a)
+ la documentation expliquant comment ça marche, ou pourquoi cela ne marche pas, pas besoin d'être long (des readme.md suffisent ou le lien sur un google doc ou autre)

Le code doit pouvoir être installé et lancé avec les opérations suivantes :
```
git clone // ou // unzip monfichier.zip
npm install
npm test
npm start
```

__Remarque :__ n'oubliez pas qu'il me faut un token (jwt) pour interroger l'API, aussi, il faut fournir le service développé dans la première partie afin que je puisse me logger pour récupérer le token

# Utilisation de MongoDB

Différentes Solutions
+ installer mongo en local sur le pc (si on a les droits)
+ utiliser docker pour lancer un container mongo en local sur le pc (si on a les droits) (vous pouvez trouver un tel container linux [ici](https://github.com/benco1967/mongo-container)
+ utiliser une instance externe sur le cloud [atlas de mongodb](https://www.mongodb.com/cloud/atlas) l'instance de base est gratuite

_remarque :_ Pensez à utiliser des paramètres de configuration pour accéder à votre base de données. En effet pour que je puisse tester vos livrable il me faudra tester sur ma propre base.

# Authentification
L'authentification se fait avec le JWT fourni par le précédent projet. C'est la même authentification que pour la partie CRUD.

# Configuration
Pour faciliter l'utilisation d'un service il est nécessaire de pouvoir le configurer, pour cela la lib `config` est la plus pratique et répandue, elle gère aussi bien différentes versions de fichier de configuration que le variables d'environnement. L'utilisation des variables d'environnement est très pratique en utilisation conjoite avec _docker_.

Vous pouvez la trouver sur le [repo npm](https://www.npmjs.com/package/config)

Une présentation succinte est disponible dans [cette présentation](https://slides.com/benoitchanclou/mean#/9)

Liste des éléments configurables :
+ accès la la base de données
  + host
  + port
  + identity
  + password
+ spécification du serveur
  + host
  + port
  
___REMARQUE IMPORTANTE : N'oubliez pas que les fichiers de configuration peuvent contenir des informations privées d'authentification, si c'est le cas ne les mettez pas sur un repository public.___ Pour cela n'oubliez pas d'ajouter les fichiers de configuration contenant des données privées dans votre fichier `.gitignore`. 
En revanche, le fichier `/config/default.yml` doit contenir des valeurs par défaut pour toutes les variables, les valeurs pouvant être juste des exemples invalides, par exemple :

```
# accès à la base de données
host: 127.0.0.1
port: 27017
user: username
password: mon_mot_de_passe
```
Ainsi les variables sont définies même si leurs valeurs feront échouer les requêtes. Le format YAML est le plus intéressant pour les fichiers de configuration car il permet d'ajouter des commentaire avec `#` pour faciliter la configuration mettre un commentaire pour explicité chacune des variables est une bonne pratique. Il n'est ainsi pas nécessaire de fournir une documentation de configuration.


  
