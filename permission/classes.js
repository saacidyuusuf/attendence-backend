
//by idga kan wa user walba class kisa bu view garenkara
function canViewClasses(user, classka) {
  return user.role === 'admin' || classka.userId === user.id;
  ///mid kamida hdu run noqdo shaqada wala qbana
}

function scopeClasses(user, classka) {
  if (user.role === 'admin') return classka;
  return classka.filter((classes) => classes.userId === user.id);
}

function canDeleteClass(user, classka) {
  return classka.userId === user.id;
}

module.exports = {
  canViewClasses,
  scopeClasses,
  canDeleteClass,
};
