# Version 1.0.8

* [*] Adição do e-mail do atleta

PUT /assessoria/atletas/5a189056d657e6475fbbcacf HTTP/1.1
Host: 
x-access-token: 
Content-Type: application/x-www-form-urlencoded

email=hlgurgel%40gmail.com

# Version 1.0.7

* [*] Otimizações de código

# Version 1.0.6

* [Novidade] campo nome no POST/PUT /assessoria/atletas

# Version 1.0.5

* [Novidade] POST /assessoria/atletas (com campos 'celular', 'cpf', 'numero', 'data_nascimento', 'tamanho_camisa', 'nucleo')
* [Novidade] PUT /assessoria/atletas/:_id (mesmos dados do POST)

# Version 1.0.4

* [Novidade] Limpeza das rotas anteriores
* [Novidade] POST /autenticar passando 'usuario' e 'senha' recebendo 'token'
* [Novidade] GET /assessoria/tamanhoscamisa
* [Novidade] GET /assessoria/nucleos
* [Novidade] GET /assessoria/atletas

# Version 1.0.3

* [feature] CORS (with OPTIONS for all endpoints) ([#8](i8))

# Version 1.0.2

* [feature] /authenticate with cellphone. ([#7](i7))
* [feature] /runners/advisors ([#4](i4))
* [feature] /runners/frommobile ([#5](i5))
* [feature] /runners/becomearunner ([#6](i6))
