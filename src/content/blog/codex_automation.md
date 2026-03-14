---
title: 'Maoty: usare Codex per scoprire musica nuova'
description: 'Come ho creato una piccola web app che ogni venerdi filtra le uscite piu interessanti per i miei gusti partendo da Last.fm, Aoty e Codex.'
pubDate: '2026-03-13'
heroImage: 'https://res.cloudinary.com/deoefumc4/image/upload/v1773511627/maoty_schema_dark_jdyvy2.svg'
---

Mi sono creato una webapp per aiutarmi nella paralisi della scelta quando voglio ascoltare nuova buona musica. Ho last.fm per salvare gli ascolti e i miei trend. A mio malgrado, nel 2025 mi sono accorto di aver ascoltato la metà delle canzoni rispetto al 2024.

<div class="not-prose" style="display: flex; justify-content: center;">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1773507211/lastfm_zcabzn.png" alt="lastfm" style="width: 50%;"/>
</div>

Non è certo una gara, ma sapere che ho dato meno spazio a uno degli hobby che amo di più mi rattrista, e volevo risolvere questa mancanza. Ogni venerdì escono decine e decine di album, ma solo alcuni sono davvero interessanti per me, e c'è da fare una bella scrematura dato che è impossibile ascoltare tutto. L'anno scorso sono cambiate un po' di cose nella mia vita personale e non sono riuscito a ritagliarmi del tempo per la ricerca delle nuove uscite. Così, a dicembre, mi sono ritrovato a guardare le classifiche e a non riconoscere molti artisti.

Da qui è nata l'idea: invece di lasciar perdere o continuare ad ascoltare gli stessi artisti, potevo costruirmi un sistema di raccomandazioni che mi mettesse di fronte a più musica nuova senza appesantirmi la vita.

<div class="not-prose" style="display: flex; justify-content: center;">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1773507355/maoty_home_kwruqe.png" alt="maoty home" style="width: 70%;"/>
</div>

## Cosa c'entra l'intelligenza artificiale?

La parte interessante, per me, è proprio questa. Non volevo fare la solita app per farmi performare meglio al lavoro. Volevo usare questi strumenti per qualcosa di molto più personale.

Quando si parla di SaaS con AI o di AI automation salta fuori sempre lo stesso argomento: la produttività. Come faccio a produrre di più? Come faccio a fare questo task più velocemente? Come mi può aiutare un qualsiasi AI agent a svolgere questo compito ricorrente?

Questa voglia infinita di consumare in modo ottimizzato, però, mi pare spesso solo una scorciatoia per il burnout. Se ho da leggere 100 email e non ho tempo per farlo, probabilmente non mi devo appellare a un AI agent per risolvere il problema. Dovrei prima pormi domande più giuste: perché non ho tempo? Come mai ho tutte queste email e non riesco a stargli dietro? Ho un problema nel mio processo lavorativo?

Di sicuro degli automatismi possono aiutare, ma non risolvono alla base le cause di questi nostri impegni impossibili da adempiere.

## Uscire dai soliti use case

Quindi mi sono fatto una domanda diversa: se questi use case non mi interessano, cosa posso creare che possa sul serio migliorarmi la giornata?

A questa domanda è abbastanza difficile rispondere, perché non siamo abituati a farcela. Se avevamo un bisogno, iniziavamo a cercare l'app più giusta per noi, se c'era già qualcosa di fatto, un servizio o una app che poteva fare al caso nostro. Andavamo sul nostro amato Google e cercavamo cosa potesse aiutarci.

Credo che adesso sia possibile creare app o automatismi perfettamente cuciti su di noi, e senza regalare i nostri dati a qualche data broker. Fino a poco tempo fa non c'erano strumenti abbastanza veloci per finire questi progetti in un tempo ragionevole. Per questo le vedevo come attività sostanzialmente sprecate.

Adesso però la situazione è cambiata molto con gli ormai soliti Claude Code, Codex, Openclaw e compagnia. Ed è da qui che è partita l'idea: provare a costruire qualcosa di piccolo, personale e davvero utile per me, invece di rincorrere l'ennesimo esperimento sulla produttività.

## Ecco che nasce Maoty

Una webapp con un solo utente che non deve scalare, non deve farmi soldi, senza accessi, senza tracking, senza notifiche e con l'unico scopo di essere uno showcase delle migliori uscite musicali recenti... per me. L'app si aggiorna automaticamente ogni venerdì mattina e così nel weekend so già cosa ascoltare con il minimo di frizione. Se ho altro tempo poi posso anche cercare altro, ma almeno i "migliori" album li ascolto.



<div class="not-prose" style="display: flex; justify-content: center;">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1773507214/maoty_video_u5k1tc.gif" alt="maoty video" style="width: 30%;"/>
</div>

## Cosa c'è sotto?

L'app è un sito statico fatto con Astro. I dati degli album li prendo da Aoty che è un sito di aggregazione di recensioni, e ogni venerdì rigenero un JSON che poi Astro usa per costruire la homepage.
Per prima cosa ho preso lo storico dei miei artisti preferiti e i loro generi da last.fm e li ho salvati in un file, così da avere una base che descrivesse almeno un po' i miei gusti. Con Codex app ho creato la parte di scraping del sito utilizzando Playwright CLI e una sessione persistente del browser, così sono già loggato sul mio account e ho meno problemi con Cloudflare.

Lo script prende i primi album della sezione Must Hear, filtra le nuove uscite con un minimo di recensioni e punteggio, e poi per ogni disco apre la pagina dedicata per salvare copertina, generi e link ad Apple Music. Poi con Codex faccio anche in automatico commit e push su GitHub, e da lì parte da solo il deploy su Vercel. Alla fine il risultato è molto semplice: raccolta automatica dei dati, ma filtro personale. Anche le etichette finali dell'app, quelle tipo "It's a match" o "Maybe you'll like it", non arrivano da una formula perfetta ma da un ultimo passaggio più editoriale.

<div class="not-prose" style="display: flex; justify-content: center;">
  <picture>
    <source
      srcset="https://res.cloudinary.com/deoefumc4/image/upload/v1773511627/maoty_schema_dark_jdyvy2.svg"
      media="(prefers-color-scheme: dark)"
    />
    <img
      src="https://res.cloudinary.com/deoefumc4/image/upload/v1773511625/maoty_schema_light_frbd2s.svg"
      alt="Schema dell'automazione di Maoty con Last.fm, Aoty, Playwright CLI, Codex e deploy su Vercel"
      style="width: 100%; max-width: 900px;"
    />
  </picture>
</div>

Ci tengo a precisare che ho l'abbonamento ad Aoty e ci tengo alla manutenzione di questo sito che si poggia sulla pubblicità per i non paganti.

## Per il futuro

Credo che creerò altre app di questo tipo perché davvero non mi impiegano molto tempo. Per questa ci ho messo un pomeriggio ed è stato tempo ben speso. Non credo di mettere sempre tutto pubblico e posso far girare tutto sul mio mac mini di casa. Questa app mi fa comodo che sia pubblica perché la posso condividere con qualche amico, ma non tutte saranno così. Posso pensare di intrudurre anche tailscale per poter accedere a queste app anche fuori casa, ma prima di imbastire tutto questo cinema devo capire cosa fare.
In generale vorrei creare qualcosa che possa aiutare le persone e non sostituirle. Questo è un esempio di uso dell'intelligenza artificiale che positivo senza mettere in mezzo il solito turbo capitalismo.
