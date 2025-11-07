# Ruda Wrona Orła Nie Pokona (school project)

download:
```
git clone https://github.com/sws6546/ruda_wrona
cd ruda_wrona
yarn install
```

config:
* add `.env.local` in root of directory
* put env variables:
```
MONGODB_URI=mongodb://root:toor@mongo:27017/
JWT_TOKEN=<eg. secret>
```

and just run `docker compose up`