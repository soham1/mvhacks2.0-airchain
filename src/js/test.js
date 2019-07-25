TApp = {
  init: async function () {
    console.log('TApp.init');
    TApp.bindEvents();
  },
  bindEvents: function () {
    $('#addFeatureForm').submit(function (event) {
      console.log('Testing: App.handleAddAircraftFeature')
      event.preventDefault();
      App.handleAddAircraftFeature($('#featureId').val(), $('#modelId').val(), $('#featureDescription').val());
    });
    
    $('#addTrainingProgramForm').submit(function (event) {
      console.log('Testing: App.handleAddTrainingProgram')
      event.preventDefault();
      App.handleAddAircraftFeature($('#programId1').val(), $('#featureId1').val(), $('#featureDescription1').val());
    });

    $('#approveCertificationForm').submit(function (event) {
      console.log('Testing: App.handleApproveCertification')
      event.preventDefault();
      App.handleApproveCertification($('#certificationId').val(), $('#pilotId').val(), $('#featureId2').val(), $('#date').val());
    });
    
    $('#checkCertificationForm').submit(function (event) {
      console.log('Testing: App.handleCheckCertification')
      event.preventDefault();
      App.handleCheckCertification($('#pilotId3').val(), $('#featureId3').val());
    });

  },

  randomizeAddFeatureForm: function(){
    var featureId = TApp.add1('featureId');
    var modelId = TApp.add1('modelId');
    $('#featureDescription').val( 'featureId = ' + featureId + ', modelId = ' + modelId);
  },

  randomizeAddTrainingProgramForm: function(){
    var featureId1 = TApp.add1('featureId1');
    var programId1 = TApp.add1('programId1');
    $('#featureDescription1').val( 'featureId = ' + featureId1 + ', programId = ' + programId1);
  },

  randomizeApproveCertificationForm: function(){
    TApp.add1('certificationId');
    TApp.add1('pilotId');
    TApp.add1('featureId2');
  },

  randomizeCheckCertificationForm: function(){
    TApp.add1('pilotId3');
    TApp.add1('featureId3');
  },

  add1: function(id){
    var value = $('#' + id).val();
    value = +value + 1;
    $('#' + id).val(value);
    return value;
  }

};

$(function () {
  $(window).load(function () {
    TApp.init();
  });
});