---
title: Harmoni - Eventplanlegging
stack: React, Node Express med Sequilize
slug: harmoni
thumb: /thumbs/location.svg
featImg: ../images/featured/harmoni.png
color: green
date: "2020-01-20T12:00:00"
github: https://github.com/NikolaiDokken/Harmoni
---

### SCRUM Prosjekt

Denne nettsiden ble laget som en oppgave i faget **TDAT2003 Systemutvikling 2 med web-applikasjoner**. Prosjektet varte i flere uker og vi brukte full SCRUM metodikk. Hver dag hadde vi stand-ups, hver uke hadde vi møte med oppdragsgiver, og det var en egen SCUM-master som skulle lede utviklingen.

### Oppgaven

Målet var å lage en side der arrangører kunne komme i kontakt med både artister, teknikere og frivillige. I eventbransjen bruker arrangører mye tid på å sende epost/ringe frem og tilbake for å booke artister, og for å leie teknikere og annet personell. Målet med siden er at arrangører skal kunne invitere artister de har tilknytning til, eller invitere nye artister. Dokumentopplastning og avtaler skal skje på siden, og frivillige skal kunne melde seg på arrangementet.

### Resultat

Resultatet, som du ser over, ble en side skrevet i **React**. På siden kunne brukere se en kart- og albumvisning over kommende eventer. Inne på hver event, kan brukere melde seg som frivillige, mens arrangører kan redigere eventet, samt invitere artister og håndtere kontrakter.

Backend brukte vi en node express server med ORM(Sequilize). For innlogging og autorisering brukte vi JWT(JSON Web Token).
