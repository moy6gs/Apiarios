var pass=require("passport")
var local=require("passport-local").Strategy;
var con=require('../database/config.js')

pass.serializeUser(function (user,done) {
  done(null,user)
})
pass.deserializeUser(function (user,done) {
  done(null,user)
})
pass.use(new local(
  function(username, password, done) {
    con.query("select user, password from clientes where user='"+username+"' and password='"+password+"'",function (err,result) {

      if (err) { return done(err); }
      if (!result[0]) { return done(null, false); }

      return done(null, username);
    });

  }
));
module.exports=pass;
