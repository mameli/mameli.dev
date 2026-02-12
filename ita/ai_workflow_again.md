---
title: 'My 2026 AI Workflow: Episode II'
description: 'OpenAi Strikes Back'
pubDate: '2026-02-08'
heroImage: 'https://res.cloudinary.com/deoefumc4/image/upload/v1770933565/hero_iuoxax.jpg'
---
Il mio articolo di ai workflow 2026 è invecchiato come latte fresco (insert fine wine joke). È molto difficile stare aggiornati su tutte le nuove uscite in questo ambito, ma è anche questo che mi spinge a seguire il più possibile queste evoluzioni. Per me siamo come nel rinascimento dell'informatica.

In questi ultimi due mesi ho continuato a interessarmi a questi tool e il mio ambiente di lavoro è cambiato in modo sostanziale rispetto a quando ho scritto nell'ultimo articolo.
Quindi volevo dare un update sul mio ambiente di sviluppo e varie ed eventuali.
Ho ricevuto alcune critiche/appunti su reddit che seppur in modo abbastanza sgarbato e diretto (ma davvero ti stai lamentando dell'utenza di reddit?) erano più che lecite. Quindi voglio strutturare in modo diverso il post senza passare dallo story telling, ma passando direttamente ai fatti.

## I modelli

Nel corso di queste settimane (Fine Dicembre - Metà Febbraio) ho provato:
- GPT 5.3 Codex
- Opus 4.6
- Kimi K2.5
- GLM 4.7 e 4.7 Flash

Nell'ultimo periodo ho cominciato ad apprezzare sempre di più i modelli di OpenAi. Alla fine si è chiuso il cerchio. Ho cominciato con quelli e ora ci sono tornato.
GPT 5.3 Codex è meno immediato di Opus, ma generalmente preferisco le risposte e la catena di pensiero adottata. Da 5.2 a 5.3 c'è stato comunque un bel salto in avanti per quanto riguarda la velocità di risposta e ora si inserisce bene nel mio workflow. Altro punto a favore è sicuramente l'utilizzo dei token. Codex ha un approcco molto più conservativo e riesco a lavorare senza pensare troppo allo usage. Opus al contrario è diventato un mostro mangia token. Con la nuova modalità di spawn di subagent è ancora più vorace e i limiti sull'abbonamento si fanno sentire molto prima rispetto a codex.

C'è da dire che entrambi i modelli sono ottimi e riescono a portare a casa sempre il risultato che voglio, ma se siete dei cheap bastard come me vi consiglio codex.

Guardandomi intorno poi non sono l'unico a pensare che il modello codex sia il migliore. Persone che ne sanno sicuramente meglio di me come Dax sono arrivati alla [stessa conclusione](https://x.com/thdxr/status/2021674924360831353).

Per i modelli open Kimi K2.5 è il migliore. È veloce, chiama i giusti tool e skill e ad oggi c'è anche la versione gratuita su Opencode.
Anche i modelli GLM si comportano bene, ma avendo a disposizione gli altri non ho motivi per usarli (in realtà uno c'è, ma lo menziono nel capitolo abbonamenti). È uscito da poco GLM 5, ma devo ancora provarlo ed è gratis con Kilo Cli.

<div style="display: flex; justify-content: center;  margin-bottom: 15px">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1770933565/models_f122zo.jpg" alt="models" style="width: 70%;"/>
</div>

## I tool

I modelli a mio avviso sono arrivati ad un livello tale che la scelta di uno o l'altro può essere data dalla preferenza personale dello sviluppatore. La gara per i tool non è invece per nulla scontata. Ho provato:

- Codex (app)
- Claude Code
- Opencode

L'app di codex è attualmente il mio modo preferito di interfacciarmi con i modelli di openai. L'interfaccia è davvero comoda e si vede che gli sviluppatori la stanno usando e stanno ascoltando l'utenza. Non è per nulla scontato avere tutte le funzionalità davanti e navigare tra i vari progetti e i thread è comodissimo.

Per il modello codex e per codex app, codex su vs code e la possibilità di usare i modelli di openai anche su opencode mi hanno fatto abbonare a OpenAi Plus e disdire Claude Pro.

<div style="display: flex; justify-content: center;  margin-bottom: 15px">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1770933565/codex_lpnxko.jpg" alt="codex" style="width: 40%;"/>
</div>

Anthropic ha dei modelli fantastici, ma proprio non sono riuscito a farmi piacere Claude Code. Sono sempre riuscito ad arrivare al risultato sperato con questo strumento, ma incappavo fin troppo spesso in dei bug che non trovato in altri tool. Certo, niente che mi bloccasse davvero il lavoro, ma flickering dello schemo, @ per richiamare file che non funzionavano e una ui confusa non aiutavano sicuramente. Mi ha dato anche fastidio che per avere una minima idea dell'utilizzo del contesto, del modello usato etc ci sia bisogno di configurare la statusline con una modalità molto "hacky". Ci sono strumenti come [ccstatusline](https://github.com/sirmalloc/ccstatusline) che aiutano, ma qui stiamo parlando di elementi base che sono presenti di default su Opencode e non c'è alcun motivo per ometterli se non per ingannare l'utente a fargli usare più token o il modello sbagliato.

La goccia che poi ha fatto traboccare il vaso è che per mia sfortuna tre giorni dopo il mio abbonamento a Claude pro anthropic abbia deciso di bloccare gli strumenti di terze parti. Per non buttare soldi o finire bannato ho preferito continuare unicamente con Claude code. Almeno l'ho provato, ma quanta pazienza...
Linko anche il [rant di Prime](https://youtu.be/LvW1HTSLPEk?si=diwfpxL8f20cGsPv) sulla ui per dare del contesto.

Opencode rimane il mio tool preferito per usare i modelli open. Invece ho abbandonato Kilo Code perché su Vscode sto usando l'estensione di codex e per i modelli su Openrouter mi trovo meglio con Opencode.

## Skills, SubAgent e MCP

Sono diventato uno skill guy. Con Codex è diventato molto semplice creare le skill e ogni volta che mi viene in mente qualcosa di ripetitivo che posso trasformare in skill ne creo una. Credo che questo processo sia molto personale e non ho scaricato nessuna skill dai vari siti come [vercel skills ](https://skills.sh/) o [ClawHub](https://clawhub.ai/skills). Al massimo prendo ispirazione, ma non copio pari pari. Il bello di questi modelli è che possono creare delle skill perfettamente su misura delle proprie esigenze, quindi non vedo perché affidarsi a quelle degli altri in toto. Senza mettere in mezzo poi [skill "malevole"](https://youtu.be/Y2otN_NY75Y) che possono creare danni importanti.
Inoltre codex app è molto comodo perché si ha una visione pulita delle proprie skill. 
Se comunque volete dare un occhio alle mie skill sto usando la mia [repo dotfiles](https://github.com/mameli/dotfiles) per tenere in sync le skill tra mac personale e di lavoro.

Ho cancellato i subagent perché invece di richiamare il subagent giusto su opencode mi affido alle skill. Di solito apro e chiudo sessioni che fanno un unica cosa molto mirata. L'uso dei subagent fa comodo per utilizzare meglio il contesto, ma se apro ogni volta una nuova sessione non devo preoccuparmi di questo problema.

Non uso MCP. Ho notato di non essere l'unico, anzi. I tool sono sempre più capaci di fare ricerche web, usare comandi cli e i server mcp sembrano superflui. Anche il creatore di OpenClaw non [è un grande fan](https://steipete.me/posts/just-talk-to-it) e sono d accordo con lui quando dice che servono solo per aggiungere spazzatura al contesto. Anche uno degli MCP più usati Playwright [consiglia l'utilizzo della versione CLI](https://github.com/microsoft/playwright-cli) rispetto a MCP per gli agenti.

<div style="display: flex; justify-content: center;  margin-bottom: 15px">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1770933565/skills_aefjmk.jpg" alt="skills" style="width: 50%;"/>
</div>

## Subscriptions

La migliore subscription adesso per me è OpenAi Plus a 23 euro. Il modello che preferisco per il coding è codex 5.3 high e avere anche chatgpt per tutti i giorni è sicuramente utile. Per questo periodo (fino ad aprile) c'è pure uno usage più alto usando Codex quindi ancora più conveniente. Ho provato anche Claude Pro, ma è davvero un ansia continua. Arrivavo costantemente al massimo uso delle 5h e il limite settimanale usando Opus e dovevo per forza passare a Sonnet per finire i task di lavoro. Come ho detto anche [qui](https://www.reddit.com/r/codex/comments/1qxhlrt/testing_gpt_53_codex_vs_opus_46_sort_of/) la differenza tra i due modelli non è così marcata negli output prodotti o nei benchmark però con l'abbonamento Claude Pro è difficile portare a termine quello che mi serve e devo stare troppo attento a token e contesto. Con Codex passo a xhigh a medium a seconda di quanto veloce/semplice è il comando e non devo avere sempre un occhio di riguardo sulla statusline.

Come backup ho fatto anche un abbonamento annuale a [Z.ai coding plan](https://z.ai/subscribe). Ho speso solo 24 euro per tutto un anno di usage e lo uso come api key per piccoli progetti. Da pochissimo è uscito GLM-5 e ancora non è disponibile nel mio plan, ma c'è speranza secondo [questo tweet](https://x.com/zai_org/status/2021656633320018365). È veramente chiedere troppo, ma sarebbe un bel colpaccio per gli user che hanno fatto abbonamento Lite con gli sconti delle feste di natale.

Ho valutato anche [Black](https://opencode.ai/it/black) di opencode e [Copilot](https://github.com/features/copilot/plans). I limiti di Black sono vaghi e da quello che ho letto non mi pare [molto generoso](https://www.reddit.com/r/opencodeCLI/comments/1qlfqcb/opencode_black_feedback/). Per Copilot il piano da 10 euro è troppo stretto e quello da 40 non ne vale la pena dato che esiste Openai plus a meno.

Per giocare con i modelli rimango fedele a Openrouter.

## Misc

Sono molto interessato al progetto Openclaw, ma penso che non lo userò fino a che non mi sembra abbastanza maturo. Non mi pare così utile per me da farmi rischiare la perdita di account, api key o altro. Preferisco stare a guardare, ma a distanza. Steinpete sembra [molto simpatico e entusiata](https://youtu.be/4uzGDAoNOZc?si=ooXa6vrfp0BE13Ht) e voglio proprio vedere come può andare.

---

I canali youtube che seguo per la parte di Ai sono:
- [Theo](https://www.youtube.com/@t3dotgg)
- [Ben Davis](https://www.youtube.com/@bmdavis419)
- [Prime](https://www.youtube.com/@ThePrimeTimeagen)
- e ora si è [aggiunto anche Joma](https://youtu.be/FD12D9kySCg?si=_FAcCrjHha6Wj5Z9)
- [Antirez](https://www.youtube.com/@antirez) - sono fortunato di essere italiano e di poter seguire anche lui
- [bycloud](https://www.youtube.com/@bycloudAI)
- [Caleb Writes Code](https://www.youtube.com/@CalebWritesCode)

---

Come editor sto ancora usando Vscode e Zed proprio non riesco a farmelo piacere. Ci sono ancora troppe cose che mancano rispetto a vscode e il fattore velocità è davvero superfluo su un computer moderno. Quando metteranno delle buone funzionalità per navigare su git e aggiungeranno il [supporto alla history con external acp agent](https://github.com/zed-industries/zed/issues/37074) allora potrei riprovare, ma è abbastanza inutile dato che mi trovo bene con vscode.

---

In questo [thread reddit](https://www.reddit.com/r/ClaudeCode/comments/1qpd4ro/before_you_complain_about_opus_45_being_nerfed/) ho trovato molti punti interessanti su come usare Claude ma più in generale i coding agent.


