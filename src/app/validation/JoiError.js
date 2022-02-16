module.exports = (error) => {
  const newErro = [];
  for (let i = 0; i < error.length; i++) {
    newErro[i] = {
      description: error[i].context.key,
      name: error[i].message
    };
  }
  return newErro;
};
