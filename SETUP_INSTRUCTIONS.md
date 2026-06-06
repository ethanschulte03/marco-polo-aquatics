# Marco Polo Aquatics — Free Hosting Setup

## Step 1 — Set Up Supabase Database
1. Go to supabase.com and open your project
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Open the file SUPABASE_SETUP.sql from this folder
5. Copy the entire contents and paste into the SQL editor
6. Click "Run"
7. All 5 tables will be created automatically

## Step 2 — Get Your Resend API Key
1. Go to resend.com and create a free account
2. Click "API Keys" in the left sidebar
3. Click "Create API Key"
4. Name it "Marco Polo Aquatics"
5. Copy the key — it starts with "re_"

## Step 3 — Upload to GitHub
1. Go to github.com and sign in
2. Click the "+" button → "New repository"
3. Name it "marco-polo-aquatics"
4. Make it Private
5. Click "Create repository"
6. Click "uploading an existing file"
7. Drag ALL the files from this folder into the upload area
8. Click "Commit changes"

## Step 4 — Deploy to Vercel
1. Go to vercel.com and sign in with your GitHub account
2. Click "Add New Project"
3. Find and select "marco-polo-aquatics"
4. Before clicking Deploy, click "Environment Variables" and add:
   - Name: VITE_RESEND_KEY
   - Value: paste your Resend API key from Step 2
5. Click "Deploy"
6. Your site will be live in about 2 minutes at a .vercel.app URL

## Step 5 — Custom Domain (Optional, ~$12/year)
1. Buy a domain at namecheap.com (e.g. marcopolo-aquatics.com)
2. In Vercel, go to your project → Settings → Domains
3. Add your domain and follow the DNS instructions
4. Takes about 10 minutes to go live

## Monthly Cost
- Vercel hosting: FREE
- Supabase database: FREE (up to 50,000 rows)
- Resend emails: FREE (up to 3,000/month)
- Total: $0/month

## Need Help?
Paste any error messages into Claude and it will fix them instantly.
