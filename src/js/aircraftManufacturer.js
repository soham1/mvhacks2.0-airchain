MApp = {
    init: async function () {
        MApp.initTemplates();
        $.getJSON('../aircrafts.json', function (data) {
            MApp.data = data;
            for (i = 0; i < data.length; i++) {
                console.log("DATA", data[i]);
                var html = MApp.tableTemplate(data[i]);
                $('.collection').append(html);
            }
            MApp.bindEvents();
        });
    },
    initTemplates: function () {
        var source = document.getElementById("table-template").innerHTML;
        MApp.tableTemplate = Handlebars.compile(source);


    },
    addAircraftFeature: function (feature) {
        console.log("Inside addAircraftFeature");
        var featureId = feature[0];
        console.log("Feature Id", featureId);
        var notFound = true;
        for (var i = 0; i < MApp.data.length; i++) {
            console.log('Trying to find featureId', featureId);
            if (MApp.data[i].featureId == featureId) {
                console.log('Found same feature id for', featureId);
                notFound = false;
                break;
            }
        }
        if (notFound) {
            var data = {
                name: 'Boeing 737',
                featureId: feature[0],
                modelId: 1,
                featureDescription: feature[1]
            };
            var html = MApp.tableTemplate(data);
            $('.collection').append(html);
        }
    },
    bindEvents: function () {
        $('#addFeatureForm').submit(function (event) {
            event.preventDefault();
            console.log('Submitting Add Feature');
            var feature = {
                "name": $('#name').val(),
                "modelId": $('#modelId').val(),
                "featureId": $('#featureId').val(),
                "featureDescription": $('#featureDescription').val()
            };
            MApp.data.push(feature)
            var html = MApp.tableTemplate(feature);
            $('.collection').append(html);
            //App.handleAddAircraftFeature($('#featureId').val(), $('#modelId').val(), $('#featureDescription').val());
        });
    }
};

$(function () {
    $(window).load(function () {
        $('.fixed-action-btn').floatingActionButton();
        $('.modal').modal();
        MApp.init();
    });
});