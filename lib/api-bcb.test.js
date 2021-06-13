const apiBCB = require('./api-bcb');
const axios = require('axios');

jest.mock('axios');

test('getCotacaoAPI', () => {
    const res = {
        data: [
            {
                cotacaoVenda: 5.40
            }
        ]
    }

    axios.get.mockResolvedValue(res);
    apiBCB.getCotacaoAPI('11-06-2021').then(resp => {
        expect(resp).toEqual(res);
        expect(axios.get.mock.calls[[0]['url']])
    })
});

test('extractCotacao', () => {
    const res = {
        data: {
            value: [
                {
                    cotacaoVenda: 5.19
                }
            ]
        }
    }

    const cotacaoVenda = 5.19;
    expect(apiBCB.extractCotacao(res)).toBe(cotacaoVenda);
});

describe('getToday', () => {
    const RealDate = Date;

    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date);
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate;
    })

    test('getToday', () => {
        mockDate('2021-01-01t12:00:00z');
        const today = apiBCB.getToday();
        expect(today).toBe('1-1-2021')

    })
})

test('getURL', () => {
    const url = apiBCB.getUrl('MINHA-DATA');
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=MINHA-DATA&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () => {
    const getToday = jest.fn();
    getToday.mockReturnValue('1-1-2021');

    const getUrl = jest.fn();
    getUrl.mockReturnValue('url');

    const resp = {
        data: [
            {
                cotacaoVenda: 5.40
            }
        ]
    }

    const getCotacaoAPI = jest.fn();
    getCotacaoAPI.mockResolvedValue(resp);

    const extractCotacao = jest.fn();
    extractCotacao.mockResolvedValue(5.19);

    apiBCB
        .pure
        .getCotacao({
            getToday,
            getUrl,
            getCotacaoAPI,
            extractCotacao
        })().then(resp => {
            expect(resp).toBe(5.19)
        })
});

test('getCotacao', () => {
    const getToday = jest.fn();
    getToday.mockReturnValue('1-1-2021');

    const getUrl = jest.fn();
    getUrl.mockReturnValue('url');

    const getCotacaoAPI = jest.fn();
    getCotacaoAPI.mockReturnValue(Promise.reject('err'));

    const extractCotacao = jest.fn();
    extractCotacao.mockResolvedValue(5.19);

    apiBCB
        .pure
        .getCotacao({
            getToday,
            getUrl,
            getCotacaoAPI,
            extractCotacao
        })().then(resp => {
            expect(resp).toBe(5.19)
        })
});


// module.exports = {
//     getCotacaoAPI,
//     getCotacao,
//     extractCotacao,
//     getToday,
// }