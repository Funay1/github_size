Primeiramente gostaria de agradecer por estar fazendo parte do processo seletivo.

Utilizei uma lib de scrapping (cheerio) apenas para pegar a lista de proxy (somente para adianatar o desenvolvimento visto o tempo curto) mas é o unico momento em que tal lib é utilizada.

Algumas considerações em relação ao código, para armazenar as requisições passadas para evitar um delay muito grande de repositórios já procurados a ideia era usar REDIS porém não consegui finalizar essa parte por conta do tempo mas deixei a ideia como um vetor salvo em memória. (ainda sim para ter uma ideia parecida, faltou o tempo de expiração do registro).

Para garantir que a aplicação não fosse bloqueada, foram utilizadas 2 estratégias: 
1) não utilizar requisições de um mesmo repositório em paralelo (ex: usar promise.all), o que causa uma certa lentidão na primeira requisição
2) utilizar um proxy para cada repositório procurado 

Como para ter uma lista de proxy confiável é necessário pagar, utilizei uma lista de proxy free que nem sempre todos estão disponíveis https://sslproxies.org/.

Então fiz um parâmetro a mais na requisição da api que é proxy=false para que a requisição seja feita sem proxy (caso estejam tendo muito problema de erro 500 sugiro realizar a requisição sem proxy)

para testar a aplicação deve ser feito uma requisição GET na rota /github/getRepository com os parametros username repository e proxy
ex: https://immense-river-73432.herokuapp.com/?username=funay1&repository=thermapp&proxy=false

foi feito um teste simples usando jest para verificar se o servidor está retornando status 400 quando não é passado o username e o repository como parâmetro.


Quaisquer dúvidas estou a disposição,

Douglas Funayama Tavares
Douglasfunay@gmail.com