# Flyer Catcher Client

A React + Vite app for creating promotional store flyers with live preview, image uploads, multi-product layouting, and PDF/print export.

## Features

- Step-based editor (`branding`, `products`, `review`)
- Live flyer preview while editing
- Image upload for store branding and product images
- Add/remove products dynamically
- Automatic multi-page flyer rendering (9 products per page)
- Download flyer as PDF (`html2canvas` + `jsPDF`)
- Print flyer directly from the browser
- Draft autosave in `localStorage`

## Tech Stack

- React 19
- Vite 7
- Material UI 7
- html2canvas
- jsPDF

## Getting Started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  App.jsx
  layouts/
    FlyerEditor.jsx
  components/
    FileUploadField.jsx
    FlyerEditorTemplate/
      FormPanel.jsx
      DocumentPanel.jsx
      StoreFlyer.jsx
  assets/
```

## Notes

- Uploaded `File` objects are not persisted in `localStorage`; only URL strings are persisted.
- If you change draft schema, clear `localStorage` key `flyer-draft` to reset saved data.


Made with ❤️ by Jay Modi
