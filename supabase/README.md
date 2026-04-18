# Supabase — migrations SQL

Ce dossier contient les migrations SQL à appliquer sur le projet Supabase
associé au site CBDL.

## Appliquer une migration

Deux options :

1. **CLI Supabase** (recommandé) :

   ```bash
   supabase link --project-ref <ref>
   supabase db push
   ```

2. **SQL Editor du dashboard** : ouvrir le fichier `.sql`, copier son contenu
   dans l'éditeur SQL de Supabase et l'exécuter.

## Migrations

- `20260418_enable_rls.sql` — active Row-Level Security sur `news` et
  `partnerships`. Lecture publique limitée aux lignes publiées/actives ;
  écriture réservée aux utilisateurs authentifiés (admin).
