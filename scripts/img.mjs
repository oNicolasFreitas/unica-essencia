import sharp from 'sharp';
const M = '../MÍDIA/', I = '../IDENTIDADE VISUAL/';
await sharp(I+'LOGO PNG.PNG').resize({width:600}).png({compressionLevel:9}).toFile('public/img/logo.png');
await sharp(I+'LOGO PNG.PNG').resize(64,64,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toFile('public/favicon.png');
await sharp(M+'PV.jpeg').rotate().resize({width:1200}).webp({quality:78}).toFile('public/img/pv.webp');
for (let i=1;i<=8;i++) await sharp(M+`MONITORIA (SERVINDO)/SERVINDO (${i}).jpeg`).rotate().resize({height:520}).webp({quality:75}).toFile(`public/img/servindo-${i}.webp`);
await sharp('scripts/legacy-2.jpg').rotate().resize({width:1000}).webp({quality:80}).toFile('public/img/liliany-1.webp');
await sharp('scripts/legacy-3.jpg').rotate().resize({width:1000}).webp({quality:80}).toFile('public/img/liliany-2.webp');
const logo = await sharp(I+'LOGO PNG.PNG').resize({height:440}).png().toBuffer();
await sharp({create:{width:1200,height:630,channels:3,background:'#5A2731'}}).composite([{input:logo,gravity:'center'}]).jpeg({quality:88}).toFile('public/img/og.jpg');
for (const f of ['pv','liliany-1','liliany-2','servindo-1','servindo-4']) { const m = await sharp(`public/img/${f}.webp`).metadata(); console.log(f, m.width, m.height); }
