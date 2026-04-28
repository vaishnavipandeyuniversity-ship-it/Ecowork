# Ecowork
Ecowork is a zero-dependency and community action platform built for Indian neighbourhoods. It lets citizens report urgent local issues — broken water pipes, garbage pile-ups, unsafe roads, health crises, power outages — and instantly connects them with verified local volunteers who can act.

#  Ecowork — Community Action Network

<div align="center">

![Ecowork Banner](https://img.shields.io/badge/Ecowork-Community%20Action%20Network-2d5a3d?style=for-the-badge&logo=leaf&logoColor=8bc34a)

**Connecting communities with urgent local needs — one issue at a time.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-4a8c5c?style=flat-square)](/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Features](#-features) · [Screenshots](#-screenshots) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [How It Works](#-how-it-works) · [Multilingual Support](#-multilingual-support) · [Contributing](#-contributing)

</div>

---

## Overview

**Ecowork** is a zero-dependency, frontend-only community action platform built for Indian neighbourhoods. It lets citizens report urgent local issues — broken water pipes, garbage pile-ups, unsafe roads, health crises, power outages — and instantly connects them with verified local volunteers who can act.

> *"Ecowork gathers scattered community information into one clear picture — revealing the most pressing local needs and instantly matching them with available volunteers who can make a real difference."*

---

##  Features

###  Issue Reporting
- Submit community issues with full details: name, contact, gender, address, issue type, and description
- 8 issue categories: Infrastructure, Sanitation, Safety, Health, Environment, Water, Electricity, Other
- Auto-generated unique reference IDs (`ECO-0001`, `ECO-0002`, …)
- Issues appear instantly on the public dashboard and live feed

###  Volunteer Registration
- Multi-step registration form with availability preferences
- **AI-simulated ID card verification** (Aadhaar / Voter ID / Govt. ID upload)
- Image preview with file size display
- Auto-generated Volunteer IDs (`VOL-0001`, `VOL-0002`, …)

###  Community Dashboard
- Card-based issue grid with type badges, status indicators, and progress bars
- Three statuses: **Pending → Working → Resolved**
- Volunteers can update issue progress and leave notes visible to the community
- Animated progress bars that reflect current resolution status

###  Volunteer Issues Dashboard (Modal)
- Filter issues by status: All / Pending / Working / Resolved
- One-tap **Call Reporter** button
- Progress update modal with volunteer notes

### Live Community Feed
- Real-time feed panel in the hero section
- New submissions automatically bubble to the top
- Urgency badges: HIGH / MED / NEW

### Multilingual Support (12 Languages)
Full UI translation for:

| Language | Code | Language | Code |
|---|---|---|---|
| English | `en` | Tamil | `ta` |
| Hindi | `hi` | Urdu | `ur` |
| Telugu | `te` | Bengali | `bn` |
| Marathi | `mr` | Gujarati | `gu` |
| Kannada | `kn` | Malayalam | `ml` |
| Punjabi | `pa` | Odia | `or` |

Language preference is saved to `localStorage` and persists across sessions.

### Auth (Simulated)
- Gmail-based login flow (frontend-only simulation)
- Persistent user session via `localStorage`
- User avatar and name displayed in the topbar

---

## Screenshots

> Add screenshots to a `/screenshots` folder and update the paths below.

| Hero Section | Issue Report Modal |
|---|---|
| ![Hero](screenshots/hero.png) | ![Issue Modal](screenshots/issue-modal.png) |

| Volunteer Registration | Community Dashboard |
|---|---|
| ![Volunteer](screenshots/volunteer.png) | ![Dashboard](screenshots/dashboard.png) |

---

## Getting Started

### Option 1 — Open directly in browser

No build step required. Just open the file:

```bash
git clone https://github.com/your-username/ecowork.git
cd ecowork
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option 2 — Serve locally (recommended)

Using Python:
```bash
python3 -m http.server 8080
# Visit http://localhost:8080
```

Using Node.js (`npx`):
```bash
npx serve .
# Visit http://localhost:3000
```

Using VS Code:
- Install the **Live Server** extension
- Right-click `index.html` → *Open with Live Server*

---

## 📁 Project Structure

```
ecowork/
├── index.html        # All HTML markup — structure, sections, modals
├── styles.css        # All CSS — variables, layout, components, animations
├── app.js            # All JavaScript — state, logic, rendering, translations
├── screenshots/      # (optional) UI screenshots for README
└── README.md
```

### File responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Page skeleton, nav, hero, volunteer section, issue dashboard, footer, all modal dialogs |
| `styles.css` | CSS custom properties, layout (grid/flex), component styles, animations, dark panel sections, responsive breakpoints |
| `app.js` | State management, `localStorage` persistence, form validation, issue/volunteer submission, rendering, i18n translations, modal control, live feed |

---

## 🔧 How It Works

### Data Flow

```
User fills form
      │
      ▼
Validation (app.js)
      │
      ▼
Record saved to localStorage
      │
      ├──► renderRecords()  →  Updates issue dashboard grid
      ├──► addToFeed()      →  Pushes to live feed panel
      └──► updateCounts()   →  Refreshes hero statistics
```

### localStorage Keys

| Key | Contents |
|---|---|
| `ecoworkRecords` | JSON array of all submitted issues |
| `ecoworkVolunteers` | JSON array of all registered volunteers |
| `ecoworkUser` | Currently logged-in user object |
| `ecoworkLang` | Selected language code (`en`, `hi`, etc.) |

### Issue Object Schema

```js
{
  id:            "ECO-0001",        // Auto-generated reference ID
  name:          "Rahul Sharma",    // Reporter's full name
  contact:       "+91 98765 43210", // Phone number
  gender:        "Male",
  address:       "Near Ram Nagar Bridge, Varanasi",
  issueType:     "Water",           // One of 8 categories
  desc:          "Pipe burst...",   // Free-text description
  date:          "12 Apr 2026, 10:30 AM",
  timestamp:     1712913000000,     // Unix ms for sorting
  status:        "pending",         // pending | working | resolved
  volunteerNote: "",                // Set by volunteers on update
  assignedVol:   ""                 // Future: volunteer ID
}
```

### Volunteer Object Schema

```js
{
  id:        "VOL-0001",
  name:      "Priya Singh",
  contact:   "+91 99887 76655",
  gender:    "Female",
  community: "Sigra, Varanasi",
  work:      "Past experience in flood relief...",
  avail:     "Weekends",            // Weekends | Weekdays | Anytime | Evenings
  date:      "12 Apr 2026"
}
```

---

##  Multilingual Support

Translations live in the `T` object in `app.js`. To add a new language:

1. Add a new `<option>` in both language `<select>` elements in `index.html`:
   ```html
   <option value="fr">Français (French)</option>
   ```

2. Add a translation map in `app.js`:
   ```js
   T.fr = {
     login: 'Connexion / Inscription',
     nav_home: 'Accueil',
     hero_title_1: 'Relier',
     // ... all keys from T.en
   };
   ```

3. Remove `fr` from the fallback line if you want it to use its own translations:
   ```js
   // Remove 'fr' from this array:
   ['te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'or'].forEach(l => { T[l] = T.en; });
   ```

---

## Design System

### Color Palette

| Variable | Hex | Usage |
|---|---|---|
| `--forest` | `#1a3a2a` | Primary dark green — headers, backgrounds |
| `--moss` | `#2d5a3d` | Secondary green — hover states, gradients |
| `--leaf` | `#4a8c5c` | Mid green — accents, borders |
| `--lime` | `#8bc34a` | Bright green — CTAs, badges, highlights |
| `--cream` | `#f5f0e8` | Off-white — page background, cards |
| `--clay` | `#c4763a` | Warm orange — required field asterisks |
| `--muted` | `#6b7280` | Grey — secondary text |

### Typography

| Font | Role |
|---|---|
| [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Headings, titles, pull quotes |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Body text, UI labels, buttons |

---

## Contributing

Contributions are welcome! Here are some ideas for improvement:

- [ ] **Backend integration** — Replace `localStorage` with a real database (Firebase, Supabase, MongoDB)
- [ ] **Map integration** — Show issue pins on a Leaflet.js or Google Maps embed
- [ ] **Real AI verification** — Connect to a document verification API
- [ ] **Push notifications** — Alert volunteers when new issues are posted nearby
- [ ] **Photo upload** — Allow reporters to attach photos to issues
- [ ] **SMS alerts** — Integrate Twilio for contact without a smartphone
- [ ] **Admin panel** — Issue moderation and volunteer management
- [ ] **PWA support** — Add a service worker for offline use

### How to contribute

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/map-integration

# 3. Make your changes
# 4. Commit with a clear message
git commit -m "feat: add Leaflet.js map for issue locations"

# 5. Push and open a Pull Request
git push origin feature/map-integration
```

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- Inspired by civic tech platforms working to bridge the gap between citizens and local governance in India
- Quotes from Mahatma Gandhi, Elizabeth Andrew, and Anne Frank
- Fonts served by [Google Fonts](https://fonts.google.com)
- Built with zero external dependencies — pure HTML, CSS, and JavaScript

---

<div align="center">

Made with 🌿 for communities everywhere

**[⬆ Back to top](#-ecowork--community-action-network)**

</div>
