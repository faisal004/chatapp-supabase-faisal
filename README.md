
![Screenshot 2025-05-23 220112](https://github.com/user-attachments/assets/cfc67550-a3a8-4603-9ef9-02157ce9826d)

manually create it under "Account > Access Tokens"
copy the newly created token
take it to the cli and execute supabase login --token [pasted_token]

npx supabase gen types typescript --project-id "projectid" > lib/database.types.ts --debug
