App = {
     web3Provider: null,
     contracts: {},

     init: function() {


        return App.initWeb3();
     },

     initWeb3: function() {
          // initialize web3
          if(typeof web3 !== 'undefined'){
            //reuse the provider of web3 object injected by metamask
            App.web3Provider = web3.currentProvider;
          } else {
            //create a new provider and plug it directly into our local node
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
          }

          web3 = new Web3(App.web3Provider);
          App.displayAccountInfo();
          return App.initContract();
     },

     displayAccountInfo: function() {
       web3.eth.getCoinbase(function(err,account){
         if(err === null){
           App.account = account;
           $('#account').text(account);
           web3.eth.getBalance(account,function(err,balance){
             if(err === null){
               $('#accountBalance').text(web3.fromWei(balance,"ether") + "ETH");
             }
           });
         }
       });
     },

     initContract: function() {
        $.getJSON('ChainList.json',function(chainListArtifact){

          //get the contract artifact file and use it to instantiate a truffle contract abstraction
          App.contracts.ChainList = TruffleContract(chainListArtifact);
          //set the provider for the contracts
          App.contracts.ChainList.setProvider(App.web3Provider);
          //Retrieve the article from the contracts
          return App.reloadArticles();

        });
     },

     reloadArticles: function(){

     }
};

$(function() {
     $(window).load(function() {
          App.init();
     });
});
