// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
const getIdParam = async (req) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) throw new Error(`Parametro recibido Invalido: "${id}"`, 400);
  return Number.parseInt(id, 10);
};

module.exports = { getIdParam };
