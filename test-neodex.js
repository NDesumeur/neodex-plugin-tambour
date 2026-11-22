// lancé par le test « local » de NeoDex : choisit un morceau intégré, lance la partie, frappe quelques coups rouges et bleus,
// vérifie que la chanson avance et que les notes sont jugées, puis pause (avec NEO_SHOTS : garde des images du jeu)
module.exports = async ({ pj, sleep }) => {
  const key = k => pj(`document.dispatchEvent(new KeyboardEvent('keydown', {key: '${k}', bubbles: true})), 0`);
  const label = () => pj(`document.getElementById('gc').getAttribute('aria-label') || ''`);
  const shot = async n => { if (!process.env.NEO_SHOTS) return; const d = await pj(`document.getElementById('gc').toDataURL()`); require('fs').writeFileSync(require('path').join(process.env.NEO_SHOTS, 'tambour-' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  await pj(`document.querySelector('#rhSongs .rhSong .btn')?.click(), 0`); await sleep(1000);  // l'étiquette « prêt » du morceau d'avant doit d'abord disparaître
  for (let i = 0; i < 40 && !/: prêt,/.test(await label()); i++) await sleep(500);
  if (!/: prêt,/.test(await label())) throw new Error('le morceau devait se préparer : « ' + await label() + ' »');
  await shot('0-pret');
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); addEventListener('unhandledrejection', e => __e.push(String(e.reason?.message || e.reason))); 0`);
  await key(' '); await sleep(6500);
  const errs = await pj(`window.__e.join(' | ')`); if (errs) throw new Error('erreur : ' + errs);
  const judged = l => { const m = /: en jeu, score (\d+), combo \d+, parfait (\d+), bien (\d+), ok (\d+), raté (\d+)/.exec(l); return m ? +m[2] + +m[3] + +m[4] + +m[5] : 0; };
  for (let i = 0; i < 80 && judged(await label()) < 3; i++) { await key(i % 3 ? 'f' : 'd'); await sleep(300); }  // le morceau lent commence par une intro sans notes
  await shot('1-partie');
  const l = await label(), m = /: en jeu, score (\d+), combo \d+, parfait (\d+), bien (\d+), ok (\d+), raté (\d+)/.exec(l);
  if (!m || +m[2] + +m[3] + +m[4] + +m[5] < 3) throw new Error('la partie devait avancer et des notes être jugées : « ' + l + ' »');
  // la manette : une fausse manette ; A frappe le rouge, X le bleu
  await pj(`(() => { window.__pad = {buttons: Array.from({length: 17}, () => ({pressed: false})), axes: [0, 0]}; navigator.getGamepads = () => [window.__pad]; return 0; })()`);
  const pad = async (b, on) => { await pj(`(__pad.buttons[${b}].pressed = ${on}, 0)`); await sleep(120); };
  const drum = () => pj(`(() => { const r = document.getElementById('gc').__rh.st(); return r.drum ? r.drum.type + ':' + r.drum.at : ''; })()`);
  await pad(0, true); await pad(0, false); const d1 = await drum();
  await pad(2, true); await pad(2, false); const d2 = await drum();
  if (!d1.startsWith('don:') || !d2.startsWith('ka:')) throw new Error('la manette devait frapper rouge puis bleu : ' + d1 + ' / ' + d2);
  await key('p'); await sleep(400);
  if (!/: pause,/.test(await label())) throw new Error('P devait mettre en pause : « ' + await label() + ' »');
  // l'écran de fin et sa courbe de précision (une partie inventée : juste au début, des ratés au milieu)
  await pj(`(() => { const T = document.getElementById('gc').__rh, rh = T.st(), L = rh.c.len, h = []; for (let i = 0; i < 200; i++) { const t = i / 200 * L, mid = t > L * .4 && t < L * .6; h.push([t, mid ? (i % 3 ? 1 : 0) : (i % 7 ? 3 : 2)]); } T.finish(h); return 0; })()`);
  await sleep(1200); await shot('2-fin');
  const end = await pj(`(() => { const rh = document.getElementById('gc').__rh.st(); return [rh.mode, rh.hist.length].join(','); })()`);
  if (end !== 'over,200') throw new Error('écran de fin attendu : ' + end);
  // 1.3.0 : les trois branches sur un morceau du jeu
  const br = await pj(`(() => { const rh = document.getElementById('gc').__rh.st(); return [rh.br, new Set(rh.notes.map(n => n.br)).size].join(); })()`);
  if (br !== '0,3') throw new Error('branches : ' + br);
  // un .tja (avec sa musique en WAV) importé par le bouton : tempo, grosse note, ballon et son nombre de coups
  const tja = await pj(`(async () => { const sr = 22050, n = sr * 8, wav = new Uint8Array(44 + n * 2), dv = new DataView(wav.buffer), w4 = (o, s) => [...s].forEach((c, i) => wav[o + i] = c.charCodeAt(0));
      w4(0, 'RIFF'); dv.setUint32(4, 36 + n * 2, true); w4(8, 'WAVEfmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true); dv.setUint32(24, sr, true); dv.setUint32(28, sr * 2, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true); w4(36, 'data'); dv.setUint32(40, n * 2, true);
      const txt = 'TITLE:Essai tja\\nBPM:120\\nOFFSET:-1\\nWAVE:essai.wav\\nCOURSE:Oni\\nBALLOON:4\\n#START\\n1020,\\n3400,\\n70000008,\\n1111,\\n#END\\n';
      const inp = document.getElementById('tbTja'), dt = new DataTransfer(); dt.items.add(new File([txt], 'essai.tja')); dt.items.add(new File([wav], 'essai.wav')); inp.files = dt.files; inp.dispatchEvent(new Event('change'));
      for (let i = 0; i < 40; i++) { await new Promise(r => setTimeout(r, 250)); const rh = document.getElementById('gc').__rh.st(); if (String(rh.song).startsWith('tja') && rh.mode === 'ready') break; }
      const rh = document.getElementById('gc').__rh.st(); return String(rh.song).startsWith('tja') ? [rh.notes.length, rh.notes[2].big, rh.notes.find(x => x.kind === 'balloon')?.need, rh.diff, document.getElementById('rhSongs').textContent.includes('Essai tja')].join('|') : 'pas importé : ' + document.getElementById('rhImpMsg').textContent; })()`);
  if (tja !== '9|true|4|Oni|true') throw new Error('morceau .tja : ' + tja);
  await shot('3-tja');
  // une épreuve Dan : le premier morceau se prépare en Normal ; raté, l'épreuve s'arrête et espace la quitte
  const dan = await pj(`(async () => { const b = document.getElementById('tbDanBtn'); b.click();
      for (let i = 0; i < 40; i++) { await new Promise(r => setTimeout(r, 250)); if (document.getElementById('gc').__rh.st().mode === 'ready') break; }
      const T = document.getElementById('gc').__rh, a = [T.st().diff, b.textContent.trim()]; T.finish([]); await new Promise(r => setTimeout(r, 1500));
      document.dispatchEvent(new KeyboardEvent('keydown', {key: ' ', bubbles: true})); await new Promise(r => setTimeout(r, 500)); return [...a, b.textContent.trim()].join('|'); })()`);
  if (dan !== "normal|QUITTER L'ÉPREUVE|COMMENCER L'ÉPREUVE") throw new Error('épreuve Dan : ' + dan);
  return l + ' · branches, .tja et épreuve Dan ok';
};
