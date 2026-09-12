import fs from 'node:fs';
const html = fs.readFileSync('legacy/index.html','utf8');
const re = /src="data:image\/(png|jpeg);base64,([^"]+)"/g;
let m, i=0;
while ((m = re.exec(html))) { i++; fs.writeFileSync(`scripts/legacy-${i}.${m[1]==='png'?'png':'jpg'}`, Buffer.from(m[2],'base64')); }
console.log('extraídas', i);
