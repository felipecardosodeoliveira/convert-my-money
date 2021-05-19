const { convert, toMoney } = require('./convert');

test('convert 4 to 4', () => {
    expect(convert(4, 4)).toBe(16);
});

test('convert "5" to 4', () => {
    expect(convert("5", 4)).toBe(20);
});

test('convert "2" to "2"', () => {
    expect(convert("2", "2")).toBe(4);
});

test('toMoney converts float', () => {
    expect(toMoney(2)).toBe('2.00')
});

test('toMoney converts float', () => {
    expect(toMoney('4')).toBe('4.00')
});