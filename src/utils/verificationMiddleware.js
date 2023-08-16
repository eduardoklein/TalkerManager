const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } if (email.includes('@') && email.includes('.com') && email.indexOf('@') > 0) {
      return next();
    }
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  };
  
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } if (password.length > 5) {
    return next();
}
  return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

const validateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ message: 'Token não encontrado' });
  } if (token.length !== 16 && typeof token === 'string') {
    return res.status(401).send({ message: 'Token inválido' });
  }
  return next();
};

const validateNameOnPost = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const validateAgeOnPost = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  } if (typeof age !== 'number' || age < 18 || !Number.isInteger(age)) {
    return res.status(400).send(
      { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
    );
  }
  return next();
};

const validateTalkOnPost = (req, res, next) => {
  if ('talk' in req.body) {
    return next();
  }
  return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
};

const validateWatchedAtOnPost = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (watchedAt) {
    return next();
  }
  return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
};

const isValidDay = (day) => day > 0 && day <= 31;

const isValidMonth = (month) => month > 0 && month <= 12;

const isValidYear = (year) => year >= 1000 && year <= 9999;

const isDateFormatValid = (watchedAt) => {
  const [day, month, year] = watchedAt.split('/');
  return isValidDay(day) && isValidMonth(month) && isValidYear(year);
};

const validateDateFormat = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const isValid = isDateFormatValid(watchedAt);
  
  if (isValid) {
    return next();
  }

  return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
};

const validateRateOnPost = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate || rate === 0) {
    return next();
  }
  return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
};

const validateRateValueOnPost = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
  return res.status(400).send({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  return next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateNameOnPost,
  validateAgeOnPost,
  validateTalkOnPost,
  validateWatchedAtOnPost,
  validateDateFormat,
  validateRateOnPost,
  validateRateValueOnPost,
};