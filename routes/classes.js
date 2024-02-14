const express = require("express");
const router = express.Router();
const {Class,User} = require('../models/model')
const { checkAuthenticated } = require("../auth");
const { canViewClasses, scopeClasses,canDeleteClass } = require("../permission/classes");

router.get("/", checkAuthenticated, async (req, res) => {
  try{
    const classes = await Class.find({})
    res.json(scopeClasses(req.user, classes));
  }catch(err){
    res.status(500).json({msg: 'failed to fetch classes'})
  }
});

router.get("/:classid", setClasses, checkAuthenticated, authGetClass, async (req, res) => {
  try{
    res.json(req.class);
  }catch(Err){
    res.status(500).json({msg: 'err failed to fetch single classes'})
  }
});

router.delete("/:classid", setClasses, checkAuthenticated, authDelete, (req, res) => {
  //peform the delete operation on req.class
    res.send("deleted project")
});


async function setClasses(req, res, next) {
  const classid = parseInt(req.params.classid);
  req.class =  await Class.findOne({id: classid});
  console.log(req.class = Class.findOne({id: classid}))

  if (req.class == null) {
    res.status(404);
    return res.send("no class was found")
  }
  next();
}

function authGetClass(req, res, next) {
  if (!canViewClasses(req.user, req.class)) {
    res.status(401);
    return res.send("not alllowed");
  }
  next();
}

function authDelete(req, res, next) {
  if (!canDeleteClass(req.user, req.class)) {
    res.status(401);
    return res.send("not alllowed");
  }
  next();
}

module.exports = router;
