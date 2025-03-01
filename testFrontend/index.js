$(function() {
    var slides = $('#slider ul').children().length;
    var slideWidth = $('#slider').width();
    var min = 0;
    var max = -((slides - 1) * slideWidth);

    $("#slider ul").width(slides*slideWidth).draggable({
        axis: 'x',
        drag: function (event, ui) {
        if (ui.position.left > min) ui.position.left = min;
            if (ui.position.left < max) ui.position.left = max;
        }
    });
});
