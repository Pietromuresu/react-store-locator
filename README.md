La prova tecnica consiste nella prototipazione di una piattaforma che permette di gestire i punti vendita di una catena commerciale.

La dashboard interna permette ai nostri dipendenti (previa autenticazione) di aggiungere / modificare un nuovo store tramite una scheda specifica o di importarne di nuovi tramite CSV.

Agli utenti non registrati viene offerta la possibilità di visualizzare gli store su una mappa con dei markers o su una lista semplice (con paginazione). Cliccando su un marker si aprirà una modale con il dettaglio dello store. Inoltre, l’utente può ricercare gli store di una zona specifica inserendo un indirizzo (sfruttando il servizio di autocomplete di Google Maps). La ricerca aggiorna in automatico i risultati della mappa.

Per la creazione delle tabelle il candidato può fare riferimento al csv lasciato in allegato.

Riguardo l’import massivo di dati tramite CSV:
- se viene importato più volte lo stesso store, questo determina un aggiornamento del dato nel database
- gli store sono geolocalizzati tramite indirizzo (è richiesto l’utilizzo della Geocoding API di Google)

Il candidato dovrà fornire una soluzione completa, insieme ad una breve documentazione (preferibilmente in markdown) che comprenda:
- motivazioni delle scelte tecnologiche impiegate
- principali difficoltà riscontrate e soluzioni applicate
- istruzioni per eseguire e testare il codice
- note su come potrebbe essere migliorato il progetto avendo a disposizione più tempo rispetto a quello concesso

Non vi sono limitazioni né raccomandazioni riguardo le tecnologie frontend da utilizzare. Per il backend, invece, si chiede al candidato di utilizzare Laravel.
