# Quick Start Guide

## 🚀 Get Running in 3 Minutes

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Add Your OpenAI API Key (30 sec)
Create a `.env` file:
```bash
echo OPENAI_API_KEY=sk-your-key-here > .env
```

Or manually create `.env` and add:
```
OPENAI_API_KEY=sk-or-v1-your-openrouter-api-key-here
```

Get your API key from: https://openrouter.ai/keys

### Step 3: Run the App (30 sec)
```bash
npm run dev
```

Open http://localhost:3000

### Step 4: Try It Out (1 min)
1. Click **"Extract Memory"** - analyzes 30 sample messages
2. View extracted preferences, emotions, and facts
3. Click **"Generate Personality Responses"**
4. See how 3 different personalities respond to the same query!

## 🌐 Deploy to Vercel (5 minutes)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main

# Then on Vercel:
# 1. Import your GitHub repo
# 2. Add OPENAI_API_KEY env variable
# 3. Deploy
```

## 🛠️ Troubleshooting

**"Module not found" error?**
```bash
npm install
```

**"API key not configured" error?**
- Check `.env` file exists in root directory
- Verify key starts with `sk-`
- Restart dev server: `Ctrl+C` then `npm run dev`

**API calls failing?**
- Verify OpenRouter API key is valid
- Check OpenRouter account has credits
- Check internet connection

## ✅ Ready to Submit

Once deployed, you'll have:
- ✅ GitHub repository link
- ✅ Live deployed application link
- ✅ Working demo with all features

**That's it! You're ready to go! 🎉**
