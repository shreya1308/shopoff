/**
 * ShreController
 *
 * @description :: Server-side logic for managing shres
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `ShreController.index()`
   */
   home: function (req, res) {
    return res.view();
  },
  sites: function (req, res) {
    return res.view();
  },
   index: function (req, res) {
    return res.view();
  },


login: function (req,res,next){
  if(!req.param('email') || !req.param('password')){
    res.view();
    return;
  }
  Shre.findOneByEmail(req.param('email'),function founduser(err,shre){
    if(err) {return next(err);console.log(err);}
    if(!shre) {
       res.redirect('shre/login');
       console.log('not such user');
       return next();
    }
     if(shre.password == req.param('password')){
       res.redirect('shre/viewuser/' + shre.id);
       console.log('logged in ' + shre.name);
     }
     
  });
 },
viewuser: function(req,res,next){
  Shre.findOne(req.param('id'),function finduser(err,user){
      if(err) next();
      if(!user) return next();
      res.view({user:user});
  });
},
  /**
   * `ShreController.create()`
   */
  create: function (req, res, next) {
    Shre.create(req.params.all(), function userCreated(err,shre){
      if (err) {
console.log("error");
        return next(err);
        
        // res.redirect('shre/create')
      }
      console.log("created user " + shre.name);
      res.redirect('shre/viewuser/' + shre.id);
    });

   }
};

