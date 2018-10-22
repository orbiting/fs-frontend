# FS Frontend

Locally render markdown files with images from the file system.

## Usage

Bootstrap your .env file:

```
cp .env.example .env
```

Install and run:

```
npm install
npm run dev
open http://localhost:3000/?repo=magazine
```

_The example env assumes a `~/Articles` directory which it looks for the repo query._