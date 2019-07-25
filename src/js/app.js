App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load pets.
    // $.getJSON('../pets.json', function (data) {
    //   var petsRow = $('#petsRow');
    //   var petTemplate = $('#petTemplate');

    //   for (i = 0; i < data.length; i++) {
    //     petTemplate.find('.panel-title').text(data[i].name);
    //     petTemplate.find('img').attr('src', data[i].picture);
    //     petTemplate.find('.pet-breed').text(data[i].breed);
    //     petTemplate.find('.pet-age').text(data[i].age);
    //     petTemplate.find('.pet-location').text(data[i].location);
    //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

    //     petsRow.append(petTemplate.html());
    //   }
    // });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    console.log('Web3 Web Provider Created in InitWeb3');

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Adoption.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
      console.log('Set Provider on Adoption Contract');
      // Use our contract to retrieve and mark the adopted pets
      //return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    //$(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function (adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function (instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function (adopters) {
      console.log("Adopters", adopters);
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  handleAddTrainingProgram: function (programId, featureId, featureDescription) {
    var adoptionInstance;

    console.log('handleAddAircraftFeature Called With', programId, featureId, featureDescription);
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function (instance) {
        adoptionInstance = instance;

        console.log("Adoption Instance Created in Handle Aircraft Feature", adoptionInstance);
        // Execute adopt as a transaction by sending account
        console.log('Calling contract method addTrainingProgram with:', programId, featureId, featureDescription);
        return adoptionInstance.addTrainingProgram(+featureId, +modelId, featureDescription, {
          from: account
        });
      }).then(function (result) {
        //TODO Refresh Screen With New Added Feature
        console.log('Results of addTrainingProgram', JSON.stringify(result));
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },

  
  handleCheckCertification: function (pilotId, featureId) {
    var adoptionInstance;

    console.log('handleCheckCertification Called With', pilotId, featureId);
    App.contracts.Adoption.deployed().then(function (instance) {
      adoptionInstance = instance;

      return adoptionInstance.checkCertification(pilotId, featureId);
    }).then(function (result) {
      console.log("Contract checkCertification results", JSON.stringify(result));
    }).catch(function (err) {
      console.log(err.message);
    });

  },
  
  handleApproveCertification: function (certificationId, pilotId, featureId, date) {
    var adoptionInstance;

    console.log('handleApproveCertification Called With', certificationId, pilotId, featureId, date);
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function (instance) {
        adoptionInstance = instance;

        console.log("Adoption Instance Created in Handle Aircraft Feature", adoptionInstance);
        // Execute adopt as a transaction by sending account
        return adoptionInstance.approveCertification(certificationId, pilotId, featureId, date, {
          from: account
        });
      }).then(function (result) {
        console.log('Contract approveCertification results:', result);
        //return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },


  handleAddAircraftFeature: function (featureId, modelId, featureDescription) {
    var adoptionInstance;

    console.log('handleAddAircraftFeature Called With', featureId, modelId, featureDescription);
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function (instance) {
        adoptionInstance = instance;

        console.log("Adoption Instance Created in Handle Aircraft Feature", adoptionInstance);
        // Execute adopt as a transaction by sending account
        return adoptionInstance.addAircraftFeature(+featureId, +modelId, featureDescription, {
          from: account
        });
      }).then(function (result) {
        //TODO Refresh Screen With New Added Feature
        console.log('Add Aircraft Feature Triggered', result);
        App.refreshAircraftFeatureList();
        //return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },

  refreshAircraftFeatureList: function () {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function (instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAircraftFeatureCount.call();
    }).then(function (result) {
      console.log("Count", result.toNumber());
      var count = result.toNumber();
      for (i = 0; i < count; i++) {
        console.log('Getting Feature Id of Index ', i);
        adoptionInstance.getAircraftFeatureIdByIndex(i).then(function(result1){
          console.log('Result of Get Feature By Index', i, result1.toNumber());
          var featureId = result1.toNumber();
          adoptionInstance.getAircraftFeatureById(featureId).then(function(result2){
            var feature = JSON.parse(JSON.stringify(result2));
            console.log("getAircraftFeatureById", feature);
            MApp.addAircraftFeature(feature);
          });
        });
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  // getAircraftFeatureByIndex: function () {
  //   var adoptionInstance;

  //   App.contracts.Adoption.deployed().then(function (instance) {
  //     adoptionInstance = instance;

  //     return adoptionInstance.getAircraftFeatureCount.call();
  //   }).then(function (count) {
  //     console.log("Count", count.c[0]);
  //   }).catch(function (err) {
  //     console.log(err.message);
  //   });
  // },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function (instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        // return adoptionInstance.adopt(petId, {
        //   from: account
        // });
        // }).then(function (result) {
        //   //return result;
        //   return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});