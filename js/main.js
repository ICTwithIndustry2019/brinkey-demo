
// making the dissertation drop work on the homepage
$(".dissertation").draggable({ cursor: "crosshair", revert: "invalid"});
$("#drop").droppable({ accept: ".dissertation", 
    drop: function(event, ui) {
        //console.log("drop");
        var dropped = ui.draggable;
        var droppedOn = $(this);
        $(dropped).detach().appendTo(droppedOn);    
        $('#darkness').fadeIn();
        $('#loading').fadeIn();
        setTimeout(function(){ 
            $('#home').fadeOut(500, function(){
                $('#darkness').fadeOut();
                $('#loading').fadeOut();
                $('#select-brinkeys').fadeIn();
            });
        }, 2000);
    }
});

// making the brinkeys drop work
$(".suggested-brinkey").draggable({ cursor: "crosshair", revert: "invalid"});
$("#selected-brinkeys-drop").droppable({ accept: ".suggested-brinkey", 
    drop: function(event, ui) {
        var dropped = ui.draggable;
        var droppedOn = $(this);
        $(dropped).detach().appendTo(droppedOn); 
        if($('#brinkey-placeholder')){
            $('#brinkey-placeholder').hide();
        }
    }
});

// display results after button click
$('#check-result').click(function(){
    console.log('check results');
    // show overlap between brinkeys from KB and user
});
