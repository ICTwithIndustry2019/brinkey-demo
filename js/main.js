
// making the dissertation drop work on the homepage
$(".dissertation").draggable({ cursor: "crosshair", revert: "invalid"});
$("#drop").droppable({ accept: ".dissertation", 
    drop: function(event, ui) {
        //console.log("drop");
        //var dropped = ui.draggable;
        //var droppedOn = $(this);
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
$("#selected-brinkeys").droppable({ accept: ".suggested-brinkey", 
    drop: function(event, ui) {
        
    }
});

