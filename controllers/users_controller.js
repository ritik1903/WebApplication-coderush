const User= require('../models/user');


module.exports.profile = function(req, res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                })
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}

//Render the sign up page
module.exports.signUp = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"CodeRush Sign Up"
    })
}

//Render the sign in page
module.exports.signIn = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
    //find the user
    User.findOne({email : req.body.email}, function(err, user){
        if (err){console.log('error in crating user while signing in'); return}

        //handle user found
        if (user){
            //Handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookies('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            //handle user not found
            return res.redirect('back');
        }
    });
}

//SIgnin and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    
    req.logout();
    req.flash('success','Logged Out Successfully');
    
    return res.redirect('/');
}