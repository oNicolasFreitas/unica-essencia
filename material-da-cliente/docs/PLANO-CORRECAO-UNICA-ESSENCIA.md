# Plano de correção — página de vendas Única Essência

Origem: auditoria de 12/09/2026 por três revisores independentes (estrutura, técnico, conversão), todos contra a régua do próprio Nicolas (`skills/nicolas-mode/references/padroes/portao-de-qualidade.md`). Página auditada no ar em https://unica-essencia.vercel.app e no código de `pagina-de-vendas/src/`. Caminhos abaixo são relativos a `pagina-de-vendas/`.

Veredito consolidado: a página não vende hoje e o motivo não é a copy. Três strings vazias em `src/config.ts` matam todos os 8 CTAs; a assinatura visual (liquid glass) está desligada no Chrome por erro de build; e a percepção de "poluída" é fragmentação (15 seções, 16 eyebrows, 15/15 trocas de fundo, 19 ideias repetidas), não volume (2.046 palavras, dentro da faixa).

Régua de qualidade completa: `C:\Users\Nicolas\Desktop\ClaudeCode\skills\nicolas-mode\references\padroes\portao-de-qualidade.md` (a cópia da skill instalada no app tem só o SKILL.md; use este caminho absoluto).

---

## FASE 0 — Depende da Liliany (não é código, não invente)

Sem isto a página não vende, independente de qualquer fix abaixo. Até chegar, marcar no código com `// AVISO: placeholder — substituir por dado real`.

| # | Dado | Onde vai | Por quê |
|---|---|---|---|
| 0.1 | Link de checkout Asaas do ingresso Única | `src/config.ts:7` (`CHECKOUT.unica`) | Botão "Quero a experiência Única" aponta para `#` |
| 0.2 | Link de checkout Asaas do ingresso Essencial | `src/config.ts:8` (`CHECKOUT.essencial`) | Botão "Quero o Essencial" aponta para `#` |
| 0.3 | Número do WhatsApp comercial | `src/config.ts:11` (`WHATSAPP`) | Botão "Tirar minha dúvida" aponta para `#duvida`, a própria seção |
| 0.4 | Política de reembolso (mínimo: 7 dias CDC art. 49) | nova faixa abaixo dos cards em `Ingressos.tsx` + FAQ #2 | Zero menção a reembolso. Obrigatório em venda online |
| 0.5 | Nome do auditório | `copy.ts:229` (hoje: "chega no seu e-mail") | Mulher de outra cidade não planeja deslocamento sem isso |
| 0.6 | Conteúdo do Kit Única | `copy.ts:201` | R$ 300 a mais e o kit é caixa fechada |
| 0.7 | Quantas vagas Única existem (mesas na frente) | card Única em `Ingressos.tsx` | Escassez legítima do tier premium, hoje ausente |
| 0.8 | Almoço: incluído? intervalo? | FAQ | 10h de evento, FAQ manda deixar almoço da família pronto e não fala do dela |
| 0.9 | Reescrever 3 frases da FAQ que afirmam histórico de edições que não existem | `copy.ts:249` ("Muitas vezes é assim que uma amiga…"), `copy.ts:258` ("a maioria vem assim" e "Muitas mulheres que chegam sozinhas saem acompanhadas") | Primeira edição. Viola a régua ética (inteligencia-de-vendas.md: "NUNCA depoimento, número ou selo inventado"). Sugestão para #4: "Pode. As dinâmicas são em dupla e em grupo, formadas ali dentro; ninguém fica de fora." |

---

## FASE 1 — Bugs de código (≈10 linhas, ~30 min) → commit

| # | Problema | Arquivo:linha | Correção |
|---|---|---|---|
| 1.1 | **Liquid glass sem blur no Chrome.** `index.css:78` declara `backdrop-filter` não-prefixado ANTES do `-webkit-`; o minificador do Vite descartou o não-prefixado. No `dist/assets/*.css` só sobrou `-webkit-backdrop-filter`. ~2/3 dos visitantes veem retângulo a 4% de branco. | `src/index.css:78` | Deixar só `backdrop-filter: blur(6px);` e deixar o autoprefixer prefixar. Validar no build: `grep -o "backdrop-filter:blur" dist/assets/*.css` deve retornar match SEM `-webkit-` na frente. |
| 1.2 | **Navbar sem fundo.** `<header>`/`<nav>` não têm nenhuma classe `bg-*`/`backdrop-*`. O estado `scrolled` existe (`:7,:10`) mas só troca a variante do pill. `transition-colors` na `:32` é órfão. Texto da página passa por trás do logo ao rolar. | `src/components/Navbar.tsx:29` | `className={`fixed inset-x-0 top-0 z-50 enter enter-1 transition-colors duration-300 ${scrolled ? 'bg-cacau/90 backdrop-blur-md' : ''}`}` |
| 1.3 | **Barra fixa de 76px sem compensação.** `<main>` sem className, `padding-bottom` = 0. A barra cobre conteúdo e, após `#fechamento`, cobre o footer. Somada ao header: 144px (18%) de 812px de cromo fixo no celular. | `src/App.tsx:21` | `<main className="pb-24">` |
| 1.4 | **Duas barras fixas no mobile.** Navbar `fixed` + BarraFixa `fixed`. Abaixo de 640px o pill da navbar já é `hidden`, então a BarraFixa é o único CTA: o header não precisa ser fixo lá. | `src/components/Navbar.tsx:29` | `fixed` → `absolute md:fixed` |
| 1.5 | Encolher a BarraFixa | `src/components/BarraFixa.tsx:32,39` | wrapper `py-2` → `py-1.5`; botão `py-3` → `py-2.5` (pill vai a ~52px) |
| 1.6 | **Navbar quebra em 2 linhas a 768–900px.** Logo "ÚNICA / ESSÊNCIA" e links "O / dia", "Quem / conduz" quebram. Filhos do nav somam 721px em 721px disponíveis. | `src/components/Navbar.tsx:36,41,69,89` | `whitespace-nowrap` no `<span>` do logo (`:36`); `ul` de `md:flex` para `lg:flex` (`:41`); hambúrguer e drawer de `md:hidden` para `lg:hidden` (`:69,:89`) |
| 1.7 | **6 links focáveis dentro de `aria-hidden`.** Drawer e BarraFixa usam `aria-hidden={!aberto}` mas os links continuam no tab order. | `src/components/Navbar.tsx:88-89`, `src/components/BarraFixa.tsx:27` | `aria-hidden={!x}` → `inert={!x}` (React 19 aceita boolean) |
| 1.8 | **Fallback do checkout é `#` (rola ao topo).** Enquanto Fase 0.1–0.3 não chega, o clique de compra some. | `src/config.ts:20` | `return CHECKOUT[lote] || '#duvida'` (cai no bloco do WhatsApp em vez do topo). Adicionar `// AVISO: placeholder — substituir por dado real` nas linhas 7, 8 e 11. |
| 1.9 | Vídeos do hero ignoram `prefers-reduced-motion` | `src/components/Hero.tsx:40-42, 92-94` | `autoPlay={!reduced}` usando o mesmo `matchMedia` de `useReveal.ts:7` |
| 1.10 | Backdrop do drawer é `<div onClick>` sem role | `src/components/Navbar.tsx:91-94` | `<button type="button" aria-label="Fechar menu" tabIndex={-1}>` |

Checagem antes do commit da Fase 1: `npm run build` limpo; grep do 1.1 passa; screenshots a 375, 800 e 1440px; ao rolar no mobile o texto não passa por trás do logo; a barra inferior não cobre o último parágrafo antes do footer.

---

## FASE 2 — Estrutura e régua (~2h) → commit

Princípio: cortar e fundir. Não redigir. Nenhuma frase que apareça pela primeira vez na página é reescrita. A copy é boa; o problema é repetição e fragmentação.

### 2.1 Eyebrows: 16 → 0

Régua §F.30 (banimento absoluto) e §B.8. Hoje: `Header` obriga a prop `rotulo` (`src/components/ui.tsx:42-62`) e é usado em 12 seções; mais `Rotulo` solto em `Hero.tsx:62`, `Espelho.tsx:9`, `ComoFunciona.tsx:40`, `QuemConduz.tsx:71`, `FAQ.tsx:84`. Mais 10 sub-labels tracked-caps (`Espelho.tsx:19,28`, `QuemConduz.tsx:18,31`, `Ingressos.tsx:20,87`, `Hero.tsx:100`).

- Tornar `rotulo` opcional em `Header` (`ui.tsx:42`).
- Remover em todos os 16 lugares. Se quiser manter algum, no máximo hero + 2, e o do hero não (data/cidade já estão na BarraFixa e no footer).
- Sub-labels do Espelho (`:19,:28`) viram peso normal, mesma cor (hoje `text-blush` vs `text-dourado` sem regra).
- Isto também resolve o contraste 2,08:1 do rótulo dourado sobre marfim nas 4 seções creme (`OQueE:8`, `ComoFunciona:9`, `Ingressos:13`, `FAQ:67`).

### 2.2 Seções: 15 → 10

Ordem final: Hero → Espelho → Por Que Eu → O Dia → Para Quem → Quem Conduz → O Encontro → Ingressos → Perguntas → Fechamento.

| Seção atual | Componente | Decisão | Detalhe |
|---|---|---|---|
| Hero | `Hero.tsx` | MANTER | Cortar eyebrow (`:62-64`). H1 em 2 linhas: `max-w-[15ch]` (`:65`) → `max-w-[22ch]` (hoje 3 linhas a 1440, 4 a 800). |
| O Espelho | `Espelho.tsx` | MANTER | Cortar item 4 da lista "O que todos veem" (`copy.ts:27`, cópia literal do hero). Lista fica com 3. |
| Por Que Eu | `PorQueEu.tsx` | MANTER INTACTO | Melhor copy da página. Cortar só `legendaVideo` (`copy.ts:64`) e `legendaFoto` (`:65`) — repetem "Uma mulher de cada vez", que fica em `:160`. |
| O Que É | `OQueE.tsx:4` | FUNDIR → O Dia | Só o deck `copy.ts:71` ("Palestra você assiste. Imersão você atravessa.") sobrevive, como lead de O Dia. Título e texto dizem "não é palestra" 3× em 72 palavras. |
| O Dia (Três Objetos) | `OQueE.tsx:20` | MANTER, absorve O Que É e O Que Fica | Núcleo da oferta. Trocar `md:grid-cols-3` (`:27`) por empilhamento ou zigzag (§B.10 trio genérico; e `ComoFunciona` usa o mesmo trio). |
| O Que Fica | `OQueFica.tsx:5` | FUNDIR → O Dia (2 de 4 itens) | `copy.ts:112` repete o batom (`:86-87`); `:110` repete o ofício da Liliany (`:146`). Só `:111` (ferramenta) e `:113` (sustentar × carregar) são novos: viram duas linhas no fecho de O Dia, sem lista numerada. |
| Para Quem | `OQueFica.tsx:26` | MANTER | 114 palavras, tamanho certo. Trocar as 2 caixas bordadas (`:30`) por 2 colunas sem borda (não duplicar família "par de cards" com Ingressos). |
| Quem Conduz | `QuemConduz.tsx` | MANTER REDUZIDA | Cortar `bastidores.rotulo/titulo/texto` (`copy.ts:161-165`, paráfrase de `:147`), foto pv + legenda (`QuemConduz.tsx:53-63`). Fica: `liliany.p[1]` (`:146`, única menção Febracis/Protagon), card Duda (`:152-158`), 1 foto (`liliany-2` com legenda `:160`), marquee sem header. |
| Como Funciona | `ComoFunciona.tsx:6` | CORTAR | 113 palavras, 0 informação nova: passo 1 = `:229`; passo 2 = A menina + `:183`; passo 3 = ficha do Encontro. |
| Prazo | `ComoFunciona.tsx:23` | FUNDIR → O Encontro | Counter 130 + `copy.ts:180,182,185`. Cortar `:183-184` (repete foto e presente). **Adicionar botão "Garantir minha vaga"** — é a única seção de urgência e não tem saída. |
| Ingressos | `Ingressos.tsx:6` | MANTER | Cortar `igualdade2` (`copy.ts:217`). Adicionar faixa de segurança abaixo dos cards (Fase 0.4/0.5/0.8). Traduzir "mesa" ("mesa própria para escrever nas dinâmicas"); "plenária" (`:211`) → "auditório". |
| O Encontro | `Ingressos.tsx:78` | MANTER, absorve Prazo | Vira ficha técnica + urgência, imediatamente antes de Ingressos. Cortar `:222` (paráfrase de `:73`); usar `:180` como título. |
| Perguntas | `FAQ.tsx:46` | MANTER, absorve Duvida | Cortar faq[5] (`copy.ts:269-270`, duplica `:214`). |
| Ainda não é hora? | `FAQ.tsx:62` | FUNDIR → Perguntas | 58 palavras + seção marfim inteira para 1 botão. Vira 1 linha + botão WhatsApp no rodapé do FAQ. |
| Fechamento | `FAQ.tsx:79` | MANTER | Cortar rótulo `copy.ts:284` (BarraFixa já mostra a data). Tese `:289` opcional (repete `:39`). |

Resultado: ~2.100 → ~1.500 palavras. Só remoção e movimentação.

### 2.3 Fundos: 15 trocas → ~7

Hoje: cacau → vinho → cacau → marfim → cacau → ameixa → cacau → vinho → marfim → cacau → marfim → ameixa → cacau → marfim → vinho → cacau. Nenhuma seção compartilha fundo com a vizinha (§B.13). Meta: blocos de 2–3 seções no mesmo tom; no máximo 1 ilha marfim (Ingressos).

### 2.4 CTAs

- Unificar rótulo: "Garantir minha vaga" em todos (`Navbar.tsx:61`, `BarraFixa.tsx:41` usam "Garantir vaga"). §A.5.
- Hero: variante `glass` (`Hero.tsx:74`) → sólida/`gold`. Régua: sólido primário no hero; fantasma é secundário.
- BarraFixa: `md:hidden`. Acima de 640px a navbar já tem o pill; hoje são dois "Garantir vaga" simultâneos.
- CTA de checkout ≤ 3 palavras (§A.6): "Quero a experiência Única" (4) e "Tirar minha dúvida no WhatsApp" (5).

### 2.5 Travessões: 29 → 0 (§A.7b)

`copy.ts` linhas 19, 39, 48, 54, 62, 64, 73, 80, 85, 86, 93, 112, 123, 126, 146, 147, 157, 160, 173, 183, 200, 217, 239, 254, 258, 264, 279, 287 + `Navbar.tsx:34` (aria-label). Trocar por ponto, vírgula ou dois-pontos, um a um. É pontuação, não reescrita.

### 2.6 Tipografia e contraste

- `text-[0.68rem]` = 10,88px em `Ingressos.tsx:20,87` → `text-[0.72rem]` (piso 11px, §F.32).
- Secundários abaixo de 4,5:1: `Ingressos.tsx:51` (`cacau/60` sobre marfim, 3,97:1) → `/75`; `Ingressos.tsx:92` (`marfim/70` sobre ameixa, 4,11:1) e `OQueFica.tsx:16` (`marfim/75`, 4,44:1) → `/85`.
- 21 tamanhos de fonte renderizados a 375px; `index.css:9-28` declara tokens `--t-*` (razão 1.25) mas cada um é usado 1 vez e o resto usa escala Tailwind + 5 arbitrários (`text-[0.68|0.7|0.95|0.98|1.05rem]`). Decidir: tokens em tudo (via `fontSize` no Tailwind config) OU apagar os tokens. Não os dois.
- Bloco "O que ninguém vê" (`Espelho.tsx:29`): Josefin 300 itálico a 24px sobre vinho, 4 frases empilhadas. Não é serif (não há serif na página). Subir para peso 400 ou tirar itálico de 3 das 4.

### 2.7 Técnico restante

- `index.css:105`: `[data-reveal] { opacity: 0 }` — 87 elementos nascem invisíveis; `useReveal.ts:24` stagger `i*90` sem teto (screenshot fullPage mostra buracos, §D.19). Animar só `transform`/`filter`, manter opacidade 1; `Math.min(i, 6) * 90`.
- z-index: 10 valores soltos, zero escala nomeada (§B.14e). Registrar em `tailwind.config.js` `zIndex: { video: 0, overlay: 10, nav: 20, drawer: 30 }` e trocar. `z-[55]`/`z-[60]` estão dentro do `<header z-50>` (stacking context próprio) e só ordenam entre si.
- `FioDourado.tsx:45`: halo dourado decorativo (§C.18e) → `ring-4 ring-dourado/20`.
- `OQueE.tsx:27-40` e `ComoFunciona.tsx:10`: dois trios de 3 colunas (§B.9/10). Como Funciona é cortado; O Dia vira empilhamento.
- `QuemConduz.tsx:84-92`: `<img height={260}>` sem `width` → CLS nas 16 imagens do marquee.
- `index.html:23`: remover `1,300;1,400` de Work Sans e `1,200` de Josefin (não usados; 3 arquivos de fonte à toa).
- `package.json`: remover `motion` (não importado).
- `FAQ.tsx:17`: botões do FAQ sem `pressable`.
- `index.css:106` + `useReveal.ts:41`: `transition: transform` em `.is-in` colide com `scrub` do GSAP nas 2 figures com parallax. Remover `data-reveal` das figures ou tirar `transform` da transição.
- Âncoras sem `scroll-margin-top`: `scroll-mt-20` nas `Section` com id.
- Bundle 385 KB raw / 126 KB gzip sem dynamic import; GSAP entra estático só para reveal + 2 parallax + contador. Opcional: `React.lazy` no `useReveal`.

Checagem antes do commit da Fase 2: rodar o portão de qualidade inteiro (caminho absoluto no topo deste arquivo) e listar o que ainda reprova, com arquivo:linha. Screenshots a 375, 800, 1440.

---

## O que NÃO mexer

A ordem emoção → desejo → razão está certa. O prazo de 3/out é gatilho verdadeiro e bem justificado. "Palestra você assiste. Imersão você atravessa." (`copy.ts:71`), a resposta à objeção das 10 horas (`:239-243`), a honestidade sobre a venda no fim do dia (`:261-266`) e "O problema nunca foi a sua força — foi ela ter virado o único lugar onde você cabe." (`:39`) são copy de alto nível. "Nenhuma mulher aprende mais por pagar mais" (`:214`) é a decisão mais inteligente da oferta; manter.

## Contradições de copy a resolver (Fase 0, com a Liliany)

- Counter "130 lugares. Nem um a mais." grita escassez de cadeira; três parágrafos depois: "Depois de 3 de outubro pode até sobrar cadeira." A escassez é de tempo, não de assento. Um dos dois cede.
- Presente "leva o nome de uma mulher específica" e foto "volta com o seu nome" vs. FAQ #2 "até 9/out você indica outra mulher e a gente troca o nome". A substituta chega sem foto e sem presente personalizado. Uma frase resolve.
- Legenda "Liliany conduzindo uma turma" e "É assim que ela trabalha há anos" vs. "Este é o primeiro evento dela" e "não vem de um palco". Se ela conduziu (monitoria em sala), dizer onde.
- Página estática: em 4/out continua dizendo "encerram em 3 de outubro". Marcar data de revisão.
