# 🚀 Comment tester le site en local (sans erreurs CORS)

Le mode `file://` (double-clic sur un .html) bloque certaines fonctionnalités modernes : globe 3D, Vanta.js, chargement de scripts externes... Pour éviter ça, lance un mini-serveur local.

## Méthode 1 — Double-clic (le plus simple)

Double-clique sur **`start-server.bat`** dans le dossier du portfolio.

Le script détecte automatiquement Python ou Node.js sur ta machine, lance un serveur sur `http://localhost:8000`, et ouvre ton navigateur sur la page d'accueil.

Pour arrêter : `Ctrl+C` dans la fenêtre noire (puis ferme-la).

## Méthode 2 — Live Server dans VS Code (recommandé pour développer)

**Avantage** : à chaque sauvegarde de fichier, le navigateur se rafraîchit automatiquement.

1. Ouvre VS Code dans le dossier du portfolio
2. Onglet Extensions (`Ctrl+Shift+X`) → cherche **« Live Server »** (Ritwick Dey)
3. Clique sur **Install**
4. Clic droit sur `index.html` dans l'explorateur → **« Open with Live Server »**
5. Le navigateur s'ouvre automatiquement sur `http://127.0.0.1:5500/index.html`

## Méthode 3 — En ligne de commande

Si tu préfères lancer toi-même :

**Avec Python** :
```
cd "C:\Users\antoi\OneDrive\Desktop\Blog portfolio"
python -m http.server 8000
```

**Avec Node.js** :
```
cd "C:\Users\antoi\OneDrive\Desktop\Blog portfolio"
npx http-server -p 8000
```

Puis ouvre `http://localhost:8000/index.html` dans ton navigateur.

## Pourquoi c'est important ?

| Fonctionnalité | Mode `file://` | Mode `http://localhost` |
|---|---|---|
| Pages HTML statiques | ✅ | ✅ |
| CSS, JS local | ✅ | ✅ |
| Images locales | ✅ | ✅ |
| **Scripts depuis CDN (Vanta, Globe.gl)** | ❌ Bloqué CORS | ✅ |
| **Textures externes (globe terrestre)** | ❌ Bloqué CORS | ✅ |
| **Modules ES6 (`type="module"`)** | ❌ | ✅ |
| Fetch API | ❌ | ✅ |
| Future intégration de formulaire | ❌ | ✅ |

## Astuce bonus

Une fois Live Server lancé, tu peux tester sur ton **téléphone** sur le même Wi-Fi : récupère l'IP de ton PC (`ipconfig` → IPv4), et ouvre `http://192.168.X.X:5500/index.html` sur ton mobile. Pratique pour vérifier le responsive en conditions réelles.
