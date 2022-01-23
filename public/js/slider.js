SLIDE_ID = 1;
NB_SLIDE_TOT = 6;

// Create dynamically div for each slide
create_divs = function() {
    for (let i = 1; i <= NB_SLIDE_TOT; i++) {
        g = document.createElement('div');
        g.setAttribute("id", "content"+i);
        g.setAttribute("class", "content");
        document.body.appendChild(g);

        $("#content"+i).css('opacity', '0');
        $("#content"+i).css('z-index', '1');
        $("#content"+i).load("slide"+i+".html");
        }
}
create_divs();

// Show and hide arrows according to the slide number
update_arrows = function() {
    if (SLIDE_ID == 1) {
        $('#left-arrow').hide();
        $('#right-arrow').show();
    } else if (SLIDE_ID == NB_SLIDE_TOT) {
        $('#left-arrow').show();
        $('#right-arrow').hide(); 
    } else {
        $('#left-arrow').show();
        $('#right-arrow').show();
    }
}

clean_div_class = function(content_id) {
    $("#content"+content_id).css('margin-left', '0');
    $("#content"+content_id).css('margin-right', '0');
}

update_content = function(old_id) {
    clean_div_class(SLIDE_ID);
    clean_div_class(old_id);

    if (old_id == 0) { // Initialization
        $("#content"+SLIDE_ID).css('z-index', '2').animate({'opacity': 1}, 'slow', 'linear');
    } else if (SLIDE_ID > old_id) { // To the right
        $("#content"+old_id).css('z-index', '1').css('opacity', 0.3).animate({'opacity': 0, 'margin-left': '-200px'}, 'slow', 'linear', function() {$(this).hide()});
        $("#content"+SLIDE_ID).css('z-index', '2').show().animate({'opacity': 1}, 'slow', 'linear');
        clean_div_class(SLIDE_ID);
        clean_div_class(old_id);
    } else { // To the left
        $("#content"+old_id).css('z-index', '1').css('opacity', 0.3).animate({'opacity': 0, 'margin-left': '200px'}, 'slow', 'linear', function() {$(this).hide()});
        $("#content"+SLIDE_ID).css('z-index', '2').show().animate({'opacity': 1}, 'slow', 'linear');
    }
    clean_div_class(SLIDE_ID);
    clean_div_class(old_id);
    
    
}

// Initialization
update_arrows();
update_content(0);


// Prevent user to spam arrow
var arrow_enabled = true;

// Arrows
left_arrow_update = function() {
    if (!arrow_enabled) return;
    arrow_enabled = false;
    if (SLIDE_ID != 1) {
        old_id = SLIDE_ID
        SLIDE_ID -= 1
        
        update_arrows();
        update_content(old_id);
    }
    setTimeout(function() {arrow_enabled = true;}, 500);
}

right_arrow_update = function() {
    if (!arrow_enabled) return;
    arrow_enabled = false;
    if (SLIDE_ID != NB_SLIDE_TOT) {
        old_id = SLIDE_ID
        SLIDE_ID += 1

        update_arrows();
        update_content(old_id);
    }
    setTimeout(function() {arrow_enabled = true;}, 500);
}

$('#left-arrow').click(left_arrow_update);
$('#right-arrow').click(right_arrow_update);
$("body").keydown(function(e) {
    if(e.keyCode == 37) { left_arrow_update(); }
    else if(e.keyCode == 39) { right_arrow_update(); }
});