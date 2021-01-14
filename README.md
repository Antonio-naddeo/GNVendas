# Gn-Vendas



Gn-Vendas é um sistema web para cadastro de produtos e emissão de boletos utilizando a Api disponibilizada pela [GerenciaNet][gn]

## Tecnologias!

  - Node.js
  - Vue.js
  - MySQL


## Pré-requisitos

Para execução deste projeto é necessario que sua maquina já tenha instalado o [MysqlServer][mysql] e [Node.js](https://nodejs.org/)

## Instalação
Faça o donwload do repositorio e execute os seguintes comandos

```sh
$ git clone https://github.com/Antonio-naddeo/GNVendas
```

Crie um database chamado gnvendas *OBS
-altere "username" pelo nome de usuario ja cadastrado no Mysql
```sh
$ mysql -u username -p
$ mysql> CREATE DATABASE gnvendas CHARACTER SET utf8 COLLATE utf8_swedish_ci;
```
Crie as tabelas no banco de dados
```sh
$ cd back-end\database
$ \back-end\database> npx sequelize-cli db:migrate
```

Instale as dependências
```sh
$ cd front-end
$ \front-end> npm install
$ \front-end> cd ..
$ cd back-end
$ \back-end> npm install
```
inicie o back-end e front-end
```sh
$ cd front-end
$ \front-end> npm run serve
```
```sh
$ cd back-end
$ \back-end> npm run start
```

## **OBS**
A senha e usúario configurados para o banco de dados são ambos 'root', caso seu usúario do mysql tenha uma configuração diferente basta alterar "username" e "passoword" no arquivo **/back-end/database/config/config.js**


   [gn]: <https://gerencianet.com.br/>
   [mysql]: <https://www.mysql.com/>



