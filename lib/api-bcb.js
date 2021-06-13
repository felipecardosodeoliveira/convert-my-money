const axios = require('axios');

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=${data}&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

const getCotacaoAPI = (url) => axios.get(url);

const extractCotacao = res => res.data.value[0].cotacaoVenda;

const getToday = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();

    return `${month}-${day}-${year}`;
}

const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
    try {
        const today = getToday();
        const url = getUrl(today);
        const res = await getCotacaoAPI(url);
        const cotacao = extractCotacao(res);
        return cotacao;

    } catch (error) {
        return '';
    }
}

module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
    extractCotacao,
    getToday,
    getUrl,
    pure: {
        getCotacao
    }
}