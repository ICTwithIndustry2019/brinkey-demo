
// making the dissertation drop work on the homepage
$(".dissertation").draggable({ cursor: "crosshair", revert: "invalid"});
$("#drop").droppable({ accept: ".dissertation", 
    drop: function(event, ui) {
        //console.log("drop");
        var dropped = ui.draggable;
        var droppedOn = $(this);
        $(dropped).detach().appendTo(droppedOn);   // actually move element to new container

        // set up brinkey options and save gold brinkeys
        suggestedBrinkeys = dropped.data('suggested-brinkeys').split(';');
        goldBrinkeys = dropped.data('gold-brinkeys').split(';');
        $('#suggested-brinkey-container').html(''); // empty div, in case there's any left over from previous analysis
        for(key in suggestedBrinkeys){
            $('#suggested-brinkey-container').append('<p class="suggested-brinkey" data-brinkey="'+suggestedBrinkeys[key]+'">'+suggestedBrinkeys[key]+' <span class="ui-icon ui-icon-arrow-4"></span></p>');
        }
        makeBrinkeysDroppable()
        
        // place title and abstract
        $('span#title').html(dropped.find('h3').html());
        $('span#abstract').html(dropped.find('.abstract').html());
         
        $('#darkness').fadeIn();
        $('#loading').fadeIn();
        setTimeout(function(){ 
            $('#home').fadeOut(500, function(){
                window.scrollTo(0, 0);
                $('#darkness').fadeOut();
                $('#loading').fadeOut();
                $('#select-brinkeys').fadeIn();
            });
        }, 100);
    }
});

function makeBrinkeysDroppable(){
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
}

// display results after button click
$('#check-result').click(function(){
    goldBrinkeysCopy = goldBrinkeys;
    correctBrinkeys = 0;
    $('.suggested-brinkey').each(function(){
        if(goldBrinkeys.includes($(this).data('brinkey'))){
            $(this).addClass('correct').children('span').removeClass('ui-icon-arrow-4').addClass('ui-icon-check');
            if($(this).parent().attr('id')=='selected-brinkeys-drop'){ // only count correctly identified brinkeys
                correctBrinkeys++;
            }
            // 2DO remove brinkey from goldbrinkeyscopy, then check if any left
        }
        else if($(this).parent().attr('id')=='selected-brinkeys-drop') { // only show wrong answers in selected field
            $(this).addClass('incorrect').children('span').removeClass('ui-icon-arrow-4').addClass('ui-icon-close');
        }
    });
    correctRatio = correctBrinkeys / goldBrinkeys.length;
    
    if(correctRatio == 0){
        message = "Helaas, je hebt geen correcte keywords aangegeven!";
    }
    else if(correctRatio < 1){
        message = "Prima gedaan, je hebt er een paar goed!";
    }
    else if(correctRatio == 1){
        message = "Alles goed, geweldig!";
    }
    message += "<Br/><br/>De juiste keywords zijn hieronder groen gekleurd.";
    $("#dialog p").html(message);
    $( "#dialog" ).dialog();
    console.log($('.back-btn.hidden'));
    $('.back-btn.hidden').fadeIn();
});

// back button
$('.back-btn').click(function(){
    $('#select-brinkeys').fadeOut(500, function(){
        location.reload();
    });
});


