# Setting up the resume editor (Supabase)

Your resume page now reads its content from a small Supabase database.
You edit it at **/admin** on your site — sign in, change anything, click **Save**, and the live site updates instantly. No code, no redeploy.

Until you finish these steps, the site keeps working and shows the built-in resume from `src/data/defaultResume.ts`.

---

## 1. Create a free Supabase project (about 5 min)

1. Go to https://supabase.com and sign up (GitHub login works).
2. Click **New project**, give it a name (e.g. `portfolio`), set a database password, pick the region closest to you, and create it.

## 2. Create the table

1. In your project, open **SQL Editor → New query**.
2. Open `supabase/schema.sql` from this folder, copy everything, paste it in.
3. **Check the email** in the three `policy` lines. It's set to `vasilika.papa108@gmail.com`. Change it if you'll sign in with a different email.
4. Click **Run**. You should see "Success".

## 3. Create your login

1. Go to **Authentication → Users → Add user → Create new user**.
2. Enter the same email as in step 2 and a strong password. Tick **Auto Confirm User**.
3. Go to **Authentication → Sign In / Providers** (may be called **Providers** or **Settings**) and turn **off** "Allow new users to sign up", so nobody else can create an account.
   Even if someone did, the database only lets your email save changes.

## 4. Connect the site

1. In Supabase, open **Project Settings → API** (or the **Connect** button) and copy:
   - **Project URL**
   - **anon / public key**
2. Locally: create a file named `.env.local` in the project folder with:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. On Vercel: **Project → Settings → Environment Variables**, add the same two variables, then **Redeploy**.

The anon key is designed to be public; write access is protected by the rules from step 2.

## 5. Use it

1. Visit `https://your-site/admin` (or `http://localhost:5173/admin` locally).
2. Sign in with the email and password from step 3.
3. Edit the tabs: Profile, Skills, Experience, Projects, Education, Training.
   - Lists like skills or technologies: separate with commas.
   - Achievements / highlights: one per line.
   - Use the arrows to reorder and the trash icon to delete.
4. Click **Save**. The first save copies your current resume into the database; from then on, the database is the source of truth.

Skills you edit also update the Skills section on the Home page.

To change the look of the resume page, pick a **Page design** at the top of the Profile tab (Journey or Cards) and click **Save**.

## Updating the PDF

The "Download PDF" button points to the **Resume PDF link** field in the Profile tab.
To swap the PDF without code, upload the new file somewhere public (for example a Supabase **Storage** public bucket, or Google Drive with "anyone with the link") and paste its link there.
Visitors can also click **Print** on the resume page to get a clean, light PDF of the current version.

## Troubleshooting

- **/admin says "Connect Supabase"** → the two environment variables are missing; restart `npm run dev` or redeploy on Vercel after adding them.
- **"Wrong email or password"** → check the user in Supabase Authentication → Users.
- **"This account isn't allowed to edit"** → the email in `supabase/schema.sql` doesn't match your login. Fix the email and run the SQL again.
