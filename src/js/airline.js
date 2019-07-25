$("form").submit(function(e) {
    e.preventDefault();
});

$('.verifyPilotBtn').click(function(event){
    M.toast({html: 'Pilot is Certified for this Feature', classes: 'greenToast'});
});