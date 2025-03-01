// Slider Container
const sliderTab = document.querySelector("#slider-tab")
// Slider List
const sliderList = sliderTab.querySelector("#slider-list")
// Slider Buttons
const slideLeftBtn = sliderTab.querySelector("#slider-tab-left-btn")
const slideRightBtn = sliderTab.querySelector("#slider-tab-right-btn")

// Change Active Tab Item when Clicked
sliderList.querySelectorAll(".slider-item").forEach(function(el){
    el.addEventListener("click", function(e){
        e.preventDefault();
        sliderList.querySelector(".slider-item.active").classList.remove("active");
        el.classList.add("active")
    })
})

// // Left Slide Button Event Listener
// slideLeftBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     // Current Scroll
//     var currentSliderOffset = sliderList.scrollLeft;
//     // Decrease offset 100px to scroll left
//     var newSlideOffset = currentSliderOffset - 100;
//     // If new scroll offset is less than to scrollwidth, use set 0 as the new offset
//     if(newSlideOffset < 0)
//         newSlideOffset = 0;

//     // Update Scroll Offset
//     sliderList.scrollLeft = newSlideOffset;
// })

// // Right Slide Button Event Listener
// slideRightBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     // Scroll Width
//     var sliderWidth = sliderList.scrollWidth;
//     // Current Scroll
//     var currentSliderOffset = sliderList.scrollLeft;
//     // Add 100px to scroll right
//     var newSlideOffset = currentSliderOffset + 100;
//     // If new scroll offset is greater than to scrollwidth, use scroll width
//     if(newSlideOffset > sliderWidth)
//         newSlideOffset = sliderWidth;

//     // Update Scroll Offset
//     sliderList.scrollLeft = newSlideOffset;
// })

/**
 * Dragging / Sliding Tabs Events
 */
var dragSlider = false;
var dragStartX = 0;
var dragEndX = 0;

// mouse down event
sliderList.addEventListener("mousedown", function(e){
    e.preventDefault;
    // Identifier to start drag event
    dragSlider = true;
    // Starting Point of dragging
    dragStartX = e.clientX;
})

// mouse move event
window.addEventListener("mousemove", function(e){
    e.preventDefault;
    // Check if drag has started
    if(!dragSlider)
        return;
    // X axis point where current drag located
    dragEndX = e.clientX;

    // Compute the difference between the starting and ending X axis Point
    var dragDiff = dragEndX - dragStartX;

    // Update scroll offset
    sliderList.scrollLeft = sliderList.scrollLeft - dragDiff;
})

// mouse up event
window.addEventListener("mouseup", function(e){
    // Check if drag has started
    if(!dragSlider)
        return;

    // Reset Dragging Events Variables
    dragSlider = false;
    dragStartX = 0;
    dragEndX = 0;
})

