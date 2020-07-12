const { SocialUser } = require('../models');
const jwt = require('jsonwebtoken');

class SocialUserController {
    constructor() {
    }

    //
    getToken(req, res){
        // create the token
        const payload = {
            id: req.user.id,
            username: req.user.username
        }
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 86400
        })
        
        console.log("token",token);

        //res.cookie('jwt', token)
        //res.redirect('/')

        res.json({ access_token: token });
        
        //res.send(`auth <script type="text/javascript">window.close();</script>`);
    }
}

module.exports = SocialUserController;