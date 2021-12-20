export const validateCPF = (cpf) => {
    let soma = 0;
    let i;
    let resto;
    let inputCPF = cpf

    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
        ].indexOf(inputCPF) !== -1)
        return false

    for (i = 1; i <= 9; i++)
      soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(inputCPF.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++)
      soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
}

export const verifyAge = (bornAge) => {
    const birthDate = new Date(bornAge);

    const difference = Date.now() - birthDate.getTime();

    const ageDate = new Date(difference);
    let calculatedAge =  Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge
}