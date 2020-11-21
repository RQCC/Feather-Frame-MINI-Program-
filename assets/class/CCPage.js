

const BaseClass = require("./baseClass.js").baseClass;
const CCPage = function(params){
  let model = BaseClass(params);
  return Page(model);
}
module.exports = CCPage;