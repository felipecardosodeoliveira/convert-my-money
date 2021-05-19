const convert = (cotacao, quantidade) => cotacao * quantidade;

const toMoney = v => Number(v).toFixed(2);

module.exports = {
    convert,
    toMoney
}