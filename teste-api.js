const axios = require('axios');

const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='05-20-2021'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

axios.get(url)
    .then(res => console.log(res.data.value[0].cotacaoVenda));