# Kázání na neděli — Kontext pro Claude

## O projektu
Průvodce přípravou kázání pro začínající faráře Církve československé husitské. Metodicky vychází z Pokorného hermeneutiky. Používání aplikace má být **radost a povzbuzení**, ne akademická povinnost.

## Architektura UX
Dva odlišné systémy, které se nesmí překrývat:
- **Průvodce** (GuideBar) = jemné vedení krok za krokem přípravou kázání (4 fáze, sub-steps s flow items)
- **Nástroje** (překlady, kontext knihy, originální jazyky...) = on-demand pomůcky, které uživatel otevře když je potřebuje

## Pracovní postup pro UX/design změny

### 1. Vždy začni HTML prototypem
Před jakýmkoli kódováním UI změny vytvoř **standalone HTML prototyp** (jeden soubor, žádné závislosti). Uživatel ho chce vidět a proklikat, než se začne implementovat. Nabídni to aktivně: "Udělám nejdřív prototyp, ať to vidíš."

### 2. Ptej se na uživatelský flow, ne na UI prvky
Když uživatel popíše UI prvky ("5 bublin vpravo"), zeptej se: "Co uživatel v tu chvíli dělá? Jaký je jeho cíl?" Flow určuje design, ne naopak.

### 3. Analyzuj celý systém před lokální změnou
Před implementací jakékoli UI komponenty projdi, jak zapadá do celku. Zkontroluj, že se nepřekrývá s existujícími prvky (z-index, pozice, účel).

## Tech stack
- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- TypeScript
- Fonty: Cormorant Garamond, Lora, Plus Jakarta Sans
- Barvy: brick (#9b4a3c), sage (#6b8f71), cream (#faf7f4)

## Konvence
- Commit messages v angličtině
- UI texty v češtině
- Komponenty v `src/components/pruvodce/`
- Data fází v `src/data/`
- Dev server: `npm run dev` (port 3000), launch.json nakonfigurován
