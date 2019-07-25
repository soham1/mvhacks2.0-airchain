FSApp = {
  init: async function () {
    FSApp.initTemplates();
    $.getJSON('../pilots.json', function (data) {
      FSApp.data = data;
      for (i = 0; i < data.length; i++) {
        console.log("DATA", data[i]);
        var html = FSApp.tableTemplate(data[i]);
        $('.collapsible').append(html);
      }
      $('.alertBtn').click(function () {
        M.toast({
          html: 'All Flight Schools Have Been Notified To Setup Certification Program for this Feature'
        });
      });
    });
    FSApp.bindEvents();
  },
  initTemplates: function () {
    var source = document.getElementById("table-template").innerHTML;
    FSApp.tableTemplate = Handlebars.compile(source);
  },
  bindEvents: function () {
    $('#addCertificateForm').submit(function (event) {
      event.preventDefault();
      //alert('Submitting Add Cert');
      var pilot = {
        "name": $('#name').val(),
        "pilotId": $('#pilotId').val(),
        "modelId": $('#modelId').val(),
        "featureId": $('#featureId').val(),
        "modelName": $('#modelName').val(),
        "date": $('#date').val()
      };
      var html = FSApp.tableTemplate(pilot);
      $('.collapsible').append(html);
      MApp.data.push(pilot)
      //App.handleAddAircraftFeature($('#featureId').val(), $('#modelId').val(), $('#featureDescription').val());
    });
  }
};

$(function () {
  $(window).load(function () {
    $('.fixed-action-btn').floatingActionButton();
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('.datepicker').datepicker();
    FSApp.init();
  });
});