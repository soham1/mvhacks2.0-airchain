FApp = {
    init: async function () {
        FApp.initTemplates();
        $.getJSON('../faa.json', function (data) {
            FApp.data = data;
            for (i = 0; i < data.length; i++) {
                console.log("DATA", data[i]);
                var html = FApp.tableTemplate(data[i]);
                $('.collection').append(html);
            }
            $('.alertBtn').click(function(){
                M.toast({html: 'All Flight Schools Have Been Notified To Setup Certification Program for this Feature', displayLength: 10000, classes: "bottomToast"});
            });
        });

        
    },
    initTemplates: function () {
        var source = document.getElementById("table-template").innerHTML;
        FApp.tableTemplate = Handlebars.compile(source);
    },
    bindEvents: function () {
    }
};

$(function () {
    $(window).load(function () {
        $('.modal').modal();
        FApp.init();
    });
});