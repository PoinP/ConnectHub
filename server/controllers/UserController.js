let bcrypt = require('bcryptjs');

function registerUser(req, res) {
    const {username, email, password} = req.body;

    if ([username, email, password].includes(undefined))
    {
      res.status(400).send(`Missing username, email or password`);
      return;
    }

    bcrypt.hash(password, 8, function(err, hash) {
      // TODO: store hash in DB
	  res.status(200).send(`Registered ${email}`);
    });
}
  
function loginUser(req, res) {
    const {email, password} = req.body; 
    if ([email, password].includes(undefined))
    {
      res.status(400).send(`Missing email, password or salt`);
      return;
    }       
    let dbPassword = "TODO"; // TODO: DB    
    bcrypt.compare(dbPassword, password).then((result) => {
      // result := true | false
      // TODO
      if (result)
      {
        res.status(200).send(`Logged in ${email}`);
        return;
      }
      else
      {
        res.status(400).send(`Wrong password for ${email}`);
      }
    });
}
  

module.exports = {
    registerUser,
    loginUser
};
  