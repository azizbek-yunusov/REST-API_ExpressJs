const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.orginalUrl}: ${new Date}`)
  next();
};
 
module.exports = logger