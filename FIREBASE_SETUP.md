# Firebase Setup Guide — Hartle's Subs Admin

## Step 1 — Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `hartles-subs` → Continue
3. Disable Google Analytics (not needed) → **Create project**

## Step 2 — Add a Web App & Copy Config

1. In your project, click the **`</>`** (Web) icon
2. Register app name: `Hartle's Subs Website`
3. **Copy the firebaseConfig object**
4. Open `firebase-config.js` in this project and paste in each value

## Step 3 — Enable Email/Password Authentication

1. Firebase Console → **Authentication** → **Get started**
2. Sign-in providers → **Email/Password** → Enable → Save
3. Go to **Users** tab → **Add user**
4. Enter the admin email (e.g. `admin@hartlessubs.com`) and a strong password
5. This is the login you'll use at `admin.html`

## Step 4 — Create Firestore Database

1. Firebase Console → **Firestore Database** → **Create database**
2. Choose **Start in production mode** → Select your region (e.g. `us-east1`) → Done

### Set Firestore Security Rules

Go to **Firestore → Rules** and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read:  if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

## Step 5 — Enable Firebase Storage

1. Firebase Console → **Storage** → **Get started**
2. Start in production mode → Choose same region → Done

### Set Storage Security Rules

Go to **Storage → Rules** and paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read:  if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

## Step 6 — Use the Admin Panel

1. Open `admin.html` in your browser (or deploy and visit the URL)
2. Sign in with the email/password you created in Step 3
3. **Menu Prices** tab — edit any price, click Save or Save All
4. **Gallery Images** tab — upload new food photos for the menu strip and featured cards
5. Changes are live instantly for all website visitors

## How It Works

| Where | What changes |
|---|---|
| `menu.html` | Loads live prices from Firestore; loads photo strip images from Storage |
| `index.html` | Loads featured card images from Storage |
| `admin.html` | Admin writes prices to Firestore, images to Storage |

All visitors see the same prices. No page reload needed — changes go live as soon as you save.
