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
MONGODB_URI=<url for mongodb>
JWT_TOKEN=<eg. secret>
```
* in mongo `db>ruda-wrona>sections` add:
```
{
    "_id":{"$oid":"66532f5eac0a64fcccd31363"}, // id can be random
    "path":"/dzialy/glowna",
    "name":"Główna"
}
```
* add other sections if you want

run dev:
```
yarn dev
```

build and run for prod:
```
yarn build
yarn start
```