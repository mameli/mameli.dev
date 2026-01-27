# Model Python Stack

Ho creato una repo di template ma volevo dare un poco di contesto con questo articolo. Se la storia non vi interessa, la repo si trova qui: https://github.com/mameli/python_template . Questo template serve per bootstrappare progetti python e iniziare con il piede giusto. More on that later

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
- uv
- ruff
- ty
- pyx
