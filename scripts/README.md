# scripts/

- `img.mjs` — regenera `public/img/*` a partir de `../IDENTIDADE VISUAL` e `../MÍDIA` (sharp). Rode `node scripts/img.mjs` na raiz do projeto.
- `extract-legacy.mjs` — extrai as imagens base64 de `legacy/index.html` (uso único, já executado).

Os vídeos em `public/video/` foram gerados com o ffmpeg de `ffmpeg-static`:

```
ffmpeg -ss 4 -t 12 -i "../MÍDIA/PALESTRA (2).mp4" -an -vf "scale=720:-2,fps=30" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart public/video/hero.mp4
ffmpeg -i "../MÍDIA/PALESTRA (1).mp4" -vf "scale=540:-2,fps=30" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart public/video/palestra.mp4
```
