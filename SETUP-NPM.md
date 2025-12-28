# Running TranquilMindQuest with npm

## ⚠️ Important: Browser Rendering Differences

**The server you use (Python, npm, PHP) does NOT affect browser rendering differences.**

Browser rendering inconsistencies (like text overlap in Comet vs Edge) are caused by:
- **CSS rendering engine differences** between browsers
- **Font rendering calculations** (line-height, margins)
- **Flexbox/margin collapse** handling differences

**Solution**: Fix the CSS (which we've already done), not the server.

---

## 🔧 Fix PowerShell Execution Policy Error

You're getting this error because PowerShell blocks script execution by default for security.

### Solution 1: Bypass for Current Session (Recommended for Testing)

Open PowerShell and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

Then run your npm command:
```powershell
npx serve .
```

**Note**: This only affects the current PowerShell window. When you close it, the policy resets.

### Solution 2: Use Command Prompt (CMD) Instead

Open **Command Prompt** (not PowerShell) and run:
```cmd
npx serve .
```

CMD doesn't have execution policy restrictions.

### Solution 3: Use npm Scripts (Best Solution)

1. Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
npm start
```

This uses `http-server` which doesn't require npx.

### Solution 4: Change Execution Policy Permanently (Requires Admin)

**⚠️ Only do this if you understand the security implications**

Open PowerShell **as Administrator** and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This allows locally created scripts to run.

---

## 🚀 Running with npm

### Option 1: Using http-server (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   This will open the browser automatically at `http://localhost:8000`

   Or use:
   ```bash
   npm run serve
   ```
   This starts the server without opening the browser.

### Option 2: Using serve (Alternative)

If you prefer `serve` package:

1. **Install globally:**
   ```bash
   npm install -g serve
   ```

2. **Run:**
   ```bash
   serve .
   ```

### Option 3: Using http-server directly

```bash
npx http-server . -p 8000 -o
```

---

## 📊 Server Comparison

| Server | Pros | Cons |
|--------|------|------|
| **Python** | Built-in, no install needed | Requires Python installed |
| **npm/http-server** | Easy npm scripts, auto-reload options | Requires Node.js |
| **PHP** | Built-in on many systems | Requires PHP installed |
| **serve** | Simple, lightweight | Requires npm/npx |

**All servers serve static files the same way** - they won't fix browser rendering differences.

---

## ✅ Verifying the CSS Fix

The CSS fixes we applied should work in all browsers. To verify:

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** (Ctrl+F5 or Ctrl+Shift+R)
3. **Test in both browsers**

The fixes include:
- Using `padding` instead of `margin` to prevent collapse
- Explicit `line-height` values (not CSS variables)
- `display: block` for consistent rendering

If overlap still occurs, it's a CSS issue, not a server issue.

---

## 🐛 Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org/

### "Cannot find module 'http-server'"
Run `npm install` first

### Still seeing overlap after CSS fixes?
1. Hard refresh the browser (Ctrl+F5)
2. Check browser DevTools for CSS conflicts
3. Verify the CSS file is loading correctly

---

## 📝 Summary

- **Server choice doesn't affect browser rendering**
- **Use npm scripts** to avoid PowerShell execution policy issues
- **CSS fixes** (already applied) should resolve browser differences
- **Use CMD instead of PowerShell** if you prefer not to change policies

