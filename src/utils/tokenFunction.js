function tokenGenerator() {
    const lettersAndNumberArray = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'x', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Z',
      ];
    const token = [];
    for (let i = 0; i <= 15; i += 1) {
        token[i] = lettersAndNumberArray[Math.floor(Math.random() * 57)];
    }
    return token.join('');
}

module.exports = tokenGenerator;