# tjc-scheduling-web

## Local setup:

```bash
git clone https://github.com/House-on-a-Rock/tjc-scheduling-web.git
cd tjc-scheduling-web
git checkout develop # later on, you'd make your own branch off of the "develop" branch
mkdir secrets
touch secrets/secretStuff.js
code secrets/secretStuff.js # add this: export const secretIp = "http://10.0.0.49:8080/";
npm install
npm run dev
```

Or all in one command: (triple-click to select all)

```bash
git clone https://github.com/House-on-a-Rock/tjc-scheduling-web.git && cd tjc-scheduling-web && git checkout develop && mkdir secrets && touch secrets/secretStuff.js && code secrets/secretStuff.js && npm install && npm run dev; echo -e '\nMake sure to add this to secrets\/secretStuff.js: \033[1;34mexport const secretIp = "http:\/\/10.0.0.49:8080\/";\033[0m\n'
```

Then Control+C to stop.
