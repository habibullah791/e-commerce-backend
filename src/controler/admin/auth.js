const User = require('../../models/user')
const jwt = require('jsonwebtoken');
const { use } = require('bcrypt/promises');



exports.signup = (req, res) =>{
    User.findOne({email : req.body.email})
    .exec((err, user)=>{
        if(user) return res.status(401).json({
            message: "Admin already exist.....!"
        })
    });

    const {
        firstName,
        lastName,
        email,
        password, 
        role
    } = req.body;
    const _user = new User({
        firstName,
        lastName,
        email,
        password,
        userName: Math.random().toString(),
        role: 'admin'
    });

    // saving the data to the database
    _user.save((err, data)=>{
        if(err){
            return res.status(400).json({
                message: "something went wrong ..!"
            });
        }

        if(data){
            return res.status(200).json({
                message: "Admin Created successfully ..!"
            })
        }
    })
}


exports.login = (req, res)=>{
    User.findOne({email: req.body.email})
    .exec((err, user)=>{
        if(err) return res.status(400).json({err});
        if(user){
            if(user.aunthenticate(req.body.password) && role === 'admin'){
                const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h'});
                const{_id, firstName, lastName, email, role, fullName} = user;
                res.status(200).json({
                    token,
                    user : {_id, firstName, lastName, email, role, fullName}
                })
            }

        }else return res.status(400).json({message: "Something went wrong ."})
    })
}