const User= require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: "Home"
    });
}

//Render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"CodeRush Sign Up"
    })
}

//Render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"CodeRush Sign In"
    })
}

//Get the sign up data
module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err, user){
        if (err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if (err){console.log('error in crating user while signing up'); return}

                return res.redirect('/users/sign-in')
            })
        }else{
           return res.redirect('back');
        }
    });
}

//get the sign in data and create the session for user
module.exports.createSession = function(req,res){
    //TODO later
}