# Modern Data Python Stack

Ho creato una repo di template per i progetti nel mondo dei dati con python, ma volevo dare un poco di contesto con questo articolo. Se la storia non vi interessa, la repo si trova qui: https://github.com/mameli/python_template . Questo template serve per bootstrappare progetti python e iniziare con il piede giusto. More on that later

Per i più curiosi cominciamo il pippone...

Tutti quelli che hanno lavorato con il linguaggio Python si sono imbattuti sul problema di gestione delle dipendenze, virtual environment e versioni di Python.
Nella comunità di sviluppatori è diventata celebre la vignetta di XKCD che ironizza su quanto sia complicato questo aspetto del linguaggio.
Oggi però si può dire che quella vignetta è diventata obsoleta se si utilizzano i moderni tool che abbiamo a disposizione.

I tool in questione sono:
- ⚡ uv - Lightning-fast package manager
- ✨ ruff - Ultra-fast linter and formatter
- 🛡️ ty - Modern type checker
- 📚  Marimo - Reactive notebooks
- 🐻‍❄️ Polars – data analysis and exploration

E altri tool per devops per migliorare ancora di più la developer experience come:
- MkDocs + GitLab/Github Pages – Easy to maintain documentation
- 🚀 Docker - Containerization
- 📝 Commitizen - Conventional commits

## The problem with "old" Python
Nel corso degli anni la popolarità di Python è aumentata vertiginosamente: ha preso piede in ogni ambito dell'industria ed è diventato uno dei linguaggi più usati anche nella ricerca accademica, grazie alla sua semplicità d'uso. In modo quasi paradossale, però, gli strumenti che lo circondavano non sono maturati con la stessa velocità.

Per esempio, Anaconda ha migliorato la developer experience, ma non ha davvero rivoluzionato l'ecosistema: si è aggiunto al groviglio di `pip` e affini. I package manager tradizionali possono essere lenti e la gestione delle dipendenze spesso è rimasta piuttosto semplicistica; anche la gestione degli ambienti virtuali non è sempre stata chiara, pur essendo necessaria per evitare di "sporcare" il Python di sistema con tutte le dipendenze del progetto.

E poi c'è il tema delle versioni: 3, 4, N installazioni di Python (quella di sistema, quella di Homebrew, quelle di Conda...), con una confusione che, a volte, sembra inevitabile.

Infine i notebook Jupyter: all'università li ho usati fin troppo. Mi piacciono ancora come strumento per esplorare dati e fare esperimenti, ma presentano anche diversi aspetti che fanno storcere il naso, come la difficoltà di riprodurre i risultati e i "bug fantasma" causati da stato nascosto e variabili globali gestite male.

I problemi erano molti, ma l'affetto (e anche un po' di abitudine) non mi ha mai fatto abbandonare questo linguaggio. Aveva però bisogno di tool di sviluppo all'altezza della sua popolarità.

![alt text](../img/image.png)

## Astral ecosystem
Gran parte degli strumenti di cui adesso non posso fare a meno li sta ideando un unica company che è Astral. Questa company fondata da Charlie Marsh ha come mission proprio quella di migliorare i tool di sviluppo python. I loro cavalli di battaglia sono:

- **uv**: package manager e tool di project management veloce, pensato per sostituire `pip` + `virtualenv` con un flusso più semplice e rapido.
- **ruff**: linter e formatter ultra-veloce, compatibile con molte regole di flake8/isort/black in un unico tool.
- **ty**: type checker moderno, focalizzato su velocita e feedback immediato durante lo sviluppo.
- **pyx**: registry Python-native di Astral (backend per uv) che accelera installazioni e gestione pacchetti

pyx è ancora un work in progress, ma per gli altri tre sono tutti tool pronti per essere usati in produzione (per ty forse aspetterei ancora un po' ma questione di poco come annunciato nel [blog](https://astral.sh/blog/ty))

### uv
Il vero tool "game changer" per modernizzare Python è `uv`. È scritto in Rust ed è pensato come drop-in replacement di `pip` e `virtualenv` (e, di fatto, rimpiazza anche `pip-tools`/poetry in molti workflow). Il risultato è che installazioni e risoluzione delle dipendenze diventano *davvero* veloci (ordine di grandezza: anche 10–100x rispetto a `pip`), senza dover riscrivere mezzo progetto: funziona con `requirements.txt` e `pyproject.toml`, crea e gestisce automaticamente `.venv` e ti lascia un lockfile (`uv.lock`) per avere ambienti riproducibili.

Le cose che mi hanno convinto di più:
- **Workflow da progetto moderno:** `uv init`, poi `uv add httpx` / `uv remove ...` e `uv run main.py` (che esegue sempre dentro l’ambiente giusto). In alternativa `uv sync` per allineare l’ambiente al lockfile.
- **Gestione versioni di Python inclusa:** puoi installare e “pinnare” la versione (`uv python install 3.11`, `uv python pin 3.11`) e, se manca, `uv` la scarica al volo. Niente più tool separati stile `pyenv` se non ti servono.
- **Tool “usa e getta” con `uvx`:** `uvx` (alias di `uv tool run`) è l’equivalente di `npx`/`pipx`: esegui `ruff`, `black`, `mypy`, ecc. in ambienti isolati e temporanei, senza sporcare il progetto.
- **Packaging senza drammi:** `uv build`/`uv publish` coprono build e publish su PyPI; e con gli update `uv-build` è diventato il backend di build predefinito, puntando a sostituire `setuptools`/`hatchling` con build molto più rapide. In più, il supporto ai **workspace** rende più gestibili monorepo e codebase grandi condividendo lockfile e ambiente.

In pratica `uv` riduce parecchio la toolchain “storica” a un unico comando, e lo fa senza chiederti di cambiare tutto: puoi anche usarlo in modalità compatibile, tipo `uv pip install -r requirements.txt` (o `uv pip compile` stile `pip-tools`), e iniziare da lì.

### ruff
Se `uv` toglie di mezzo il caos di `pip`/virtualenv, `ruff` fa lo stesso con la qualità del codice: è un linter **e** formatter ultra-veloce (scritto in Rust) che mette insieme in un unico tool quello che, di solito, richiede una collezione di dipendenze (`flake8` + plugin, `isort`, `black`, ecc.). Nella pratica lo configuri una volta nel `pyproject.toml`, lo fai girare on-save e in CI, e ti dimentichi di tutto il resto.

Le cose che mi hanno convinto di più:
- **Velocità “da default”:** nell’ordine di grandezza fino a ~10–100x rispetto ai tool tradizionali, quindi puoi permetterti di farlo girare sempre.
- **Drop-in replacement reale:** copre gran parte dei casi d’uso di `flake8` e `isort`, e con `ruff format` può sostituire `black` senza stravolgere il workflow.
- **Regole complete:** 800+ regole integrate che coprono style, bug comuni e suggerimenti di performance.
- **Auto-fix:** `ruff check --fix` risolve automaticamente un sacco di problemi (e puoi scegliere quanto essere “aggressivo” con i fix).
- **Integrazione editor:** estensione ufficiale per VS Code e integrazioni solide per pre-commit/CI.

In genere il setup minimo è questo: `ruff check --fix .` per il linting e `ruff format .` per la formattazione.

### ty
Se `ruff` ti fa litigare meno con lo stile, `ty` ti fa litigare meno con i *tipi*. È un type checker moderno (sempre Astral, sempre Rust) pensato come drop-in replacement di `mypy`, con un’ossessione precisa: darti feedback **subito** mentre scrivi codice, senza trasformare il type checking in un job che lanci “ogni tanto” in CI.

Perché vale la pena provarlo (anche solo su un progetto medio):
- **Velocità:** è progettato per essere molto più veloce dei checker tradizionali, quindi puoi eseguirlo spesso (o addirittura in watch mode) senza interrompere il flow.
- **Diagnostiche migliori:** errori più chiari e *actionable*, meno “mistero” su cosa cambiare.
- **Esperienza da editor:** include un language server, quindi l’integrazione con l’IDE è parte del progetto, non un afterthought.
- **Integrazione con uv:** lo installi/usi come tool “usa e getta” (`uvx`) o lo fissi nel toolchain del repo.

Nota pratica: al momento è ancora giovane (beta), quindi io lo introdurrei gradualmente—prima come check “informativo”, poi come gate in CI quando sei soddisfatto del segnale/rumore.

Setup minimo: `uvx ty check` (o `ty check`) e, se ti piace il feedback continuo, `ty check --watch`.

### pyx
Per pyx si sa ancora troppo poco. Rimando semplicemente all'annuncio di qualche mese fa che si può trovare [qui](https://astral.sh/blog/introducing-pyx).

## Marimo e Polars
Non c'è solo Astral in questa lista di tool moderni (e per fortuna the more the better). Anche i team dietro Marimo e Polars hanno sicuramente migliorato l'ecosistema python. Qui parliamo di strumenti più improntati sugli esperimenti e l'esplorazione dei dati, ma che possono sicuramente tornare utili a tutti.

### Marimo
Marimo è il notebook che finalmente mi ha fatto abbandonare Jupyter. Non pensavo sarebbe mai successo: Jupyter Notebook lo uso dai tempi dell’università. Poi ho provato Marimo e non ho più avuto dubbi. Il punto chiave è che è un notebook *reattivo*: l’esecuzione è guidata dalle dipendenze del codice, quindi è deterministica e riproducibile (niente stato nascosto, niente “run all cells” per far tornare i conti). E soprattutto: il notebook è un file Python, quindi lo versioni bene, lo riesegui come script, lo riusi come modulo.

Le cose che mi hanno convinto di più:
- **Esecuzione deterministica e riproducibile:** niente stato nascosto e addio incubi da “run all cells”.
- **Prototipazione veloce:** iteri in fretta, senza dover resettare il kernel ogni due per tre.
- **Git-friendly:** i notebook sono file Python, non blob JSON.
- **Interattività:** elementi UI (button, slider, checkbox, ecc.) per giocare con i dati e costruire piccole demo.

Quick start (con `uv`):
- `uv add marimo`
- `uv run marimo edit notebook.py`

### Polars
Ne ho già parlato in dettaglio in <a href="/blog/transitioning-from-pandas-to-polars/">questo articolo</a>, quindi qui vado dritto al punto: se oggi devo fare data wrangling e analisi su una singola macchina, Polars è quasi sempre la prima scelta. È una libreria DataFrame con un motore in Rust e una mentalità “query engine”: sfrutta l’esecuzione lazy quando serve, ottimizza il piano (pushdown di filtri/selezioni, ecc.), usa bene tutti i core e si sposa naturalmente con formati moderni come Parquet/Arrow.

Le cose che mi hanno convinto di più:
- **Lazy API fatta bene:** con `LazyFrame` descrivi *cosa* vuoi ottenere, poi lasci a Polars il *come* (ottimizzazioni incluse). E se vuoi capire cosa sta succedendo, puoi ispezionare il query plan con `explain()`.
- **Scan + streaming per dataset grossi:** `scan_parquet`/`scan_csv` ti evitano di caricare tutto in memoria subito e, quando serve, puoi processare anche oltre la RAM con l’esecuzione streaming (es. `collect(engine="streaming")`).
- **Expression API “componibile”:** trasformazioni leggibili e performanti senza finire a colpi di `.apply` e lambda che uccidono le performance.
- **Arrow-first:** interop solido con l’ecosistema (PyArrow/Parquet/IPC) e integrazione facile con tool come DuckDB quando vuoi mischiare SQL e DataFrame.
- **Performance senza complicazioni:** parallelismo di default e ottime prestazioni già in locale, spesso senza dover introdurre framework distribuiti.

### Tool DevOps
Chiudo con tre tool “DevOps” e affini che non hanno bisogno di presentazioni: **MkDocs** (abbinato a GitLab/GitHub Pages) e **Docker**. Il primo ti aiuta a mantenere documentazione statica versionata nel repo e pubblicarla facilmente; il secondo resta lo standard per containerizzare e rendere riproducibili ambienti e pipeline. **Commitizen** invece merita due righe: è un tool che ti guida nella scrittura dei commit secondo lo standard Conventional Commits (es. `feat`, `fix`) e può automatizzare bump di versione e generazione del changelog a partire dalla history (`cz commit`, `cz bump`).

## Conclusioni
Se vuoi passare dalla teoria alla pratica, nella repo di template trovi già tutti questi tool pronti da provare: configurazioni sane di default, comandi già impostati e un setup che ti permette di esplorare `uv`, `ruff`, `ty`, Marimo, Polars e gli extra DevOps.

La cosa bella è che, per una volta, non stiamo parlando di “aggiustare” Python: stiamo parlando di dargli finalmente strumenti all’altezza di quello che è diventato. Vedere tool come `uv`, `ruff` (e presto `ty`) alzare così tanto l’asticella—veloci, curati, con UX da linguaggi più giovani—rende molto più facile continuare a scegliere Python senza sentirsi in svantaggio rispetto a TypeScript e, in generale, rispetto alle toolchain moderne. Se questa è la direzione—tool semplici, velocissimi, con feedback immediato—sono davvero ottimista: Python si merita i tool migliori, e oggi sembra che li stia finalmente ottenendo.
