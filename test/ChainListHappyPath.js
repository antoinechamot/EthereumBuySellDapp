var ChainList = artifacts.require("./ChainList.sol");

//test suite
contract('ChainList', function(accounts){

 it("shoud be initialized with empty values", function(){
   return ChainList.deployed().then(function(instance){
    return instance.getArticle();
  }).then(function(data) {
    assert.equal(data[0],0x0, "seller must be empty");
    assert.equal(data[1],"","article must be empty");
    assert.equal(data[2],"","article must be empty");
    assert.equal(data[3].toNumber(),0,"article price must be zero");
  })
 });
});
