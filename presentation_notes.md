# pres0
Grundgerüst
- `main.html` anschauen: Canvas-Element, Skript `main.js`
- `main.ts` kompiliert zu `main.js`
- In Ausführungsreihenfolge:
    - ganz unten, `main()` ist erste "Ausführung", Rest nur Definitionen
    - wieso `loop()` so?
    - `var width: number;` typisierte Sprache, wo er nicht raten kann (wie z.B. bei `x`), müssen wir den Typ angeben
        - `number`: automatisch float, leider kein expliziter int
        - `String`
        - sonst hilft oft VSCode-Autocompletion
- kompilieren und Ergebnis anschauen

# pres1
Canvas maximieren
- auswendig lernen nicht nötig ^^

# pres2
Delta t
- Problem: Framerate "instabil"
- `requestAnimationFrame` ruft `loop` mit aktueller Zeit auf
- berechnen delta t in `loop`
- wir benutzen es für konstante Geschwindigkeit: Jetzt definiert in Pixel/s
- in "statischen" Spielen ist keine automatische Game-Loop nötig --> dann event-basiert zeichnen, kein "repaint-call" nötig (nicht getestet ^^)

# pres3
Coolere Zeichnungen
- in `draw()` anfangen:
    - polygon/path zeichnen
    - Übersicht über zeichenbare Primitive:
        - Polygon/Linienzug
        - Rechteck
        - Arc: Kreisbogen/Kreissegment mit konstantem Radius
        - Bezier curves: Definiert über Tangenten
        - Sprites/Images
    - farben für stroke und fill in CSS-Notation (rgb, hsl, gray, #badf00)
- `middle`: anonymes Objekt/"dictionary", Zugriff mit `object.key` oder `object["key"]`
- in `update` rechnen wir die Koordinaten aus, nicht so wichtig

# pres4
Translate
- Zeichnen über middle war ja umständlich. Besser: Ursprung der Zeichen-Koordinaten verschieben
- Rotieren auch `8-)`
- in `update()` ändern wir `middle` noch -> Bewegung
- `resetTransform()` nicht vergessen!
- Es gibt auch noch `scale` und die volle Transformationsmatrix, siehe Canvas Docs

# pres5
Tastatur-Input
- Event-Listener in `main()` registrieren mit Callback-Funktion
- keycodes gibt es in Tabellen -> Nachschauen
- Wir speichern uns irgendwie (hier: Set), welche Tasten gerade gedrückt sind
- im `update` machen wir dann abhängig davon Änderungen

# pres6
Maus-Input
- analog zur Tastatur
- Listener wird fürs `canvas` registriert und nicht fürs Window! (Für Canvas-Koordinatensystem)
- Hier ändern wir den Spielzustand (`middle`) gleich im Callback und setzen keine Flag. Je nach Spiel kann das auch für Tastatur sinnvoll sein
- Weitere Events/Handler/etc. im MDN nachschauen, wenn nötig
- Oft reicht auch die Auto-Completion in VSCode

# pres7
Sound
- Audio-Objekt **einmal** einlesen
- Kann dann beliebig oft abgespielt werden
- Vorsicht mit Fenster-Fokus, sonst spielt der Browser die Töne nicht ab
- wir haben einen `static`-Ordner hinzugefügt, kann auch für ggf. sprites benutzt werden (kommt gleich)
- Einmal `package.json` zeigen/erklären
- `tsconfig.json`?

# pres8
Sprites
- Ähnlich zum Audio-Objekt, aber extra `logo.png` setzen
- in `drawImage` kann man auch noch die Größe einstellen

# extras
- var, const, let
- websockets für "multiplayer"
    - backend in python -> einfacher Brotcast
    - Über events im Clients einbinden
- siehe `planung.md`

# Ideen
- Breakout/Pong
- Snake
- Tetris
- Tictactoe
- Dino-Jumpnrun
- Asteroids
- Flappy bird
- lunar lander (mal Bsp. zeigen? itch.io?)
- top-down Autospiel
- wie tank trouble
- side-view tank/cannon game
- Lenkraketen ausweichen
- Missile command