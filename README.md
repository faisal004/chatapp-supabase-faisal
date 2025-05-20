![Screenshot 2025-03-07 092013](https://github.com/user-attachments/assets/8bf99c10-dc21-4a47-bd84-281ff88dd270)


manually create it under "Account > Access Tokens"
copy the newly created token
take it to the cli and execute supabase login --token [pasted_token]

npx supabase gen types typescript --project-id "projectid" > lib/database.types.ts --debug