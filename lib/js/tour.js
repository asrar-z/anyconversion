$(function() {
    bindTourButton();
})

function bindTourButton(){
    $('#tour_button').on('click',function () {
        var tour = new EnjoyHint({});
        var steps =[{
            'next #value' : 'Enter Value to convert'
        },{
            'next #convert_from' : 'Type to search or select "From Unit" from the drop down box'
        },{
            'next #convert_to' : 'Type to search or select the "To Unit" from the drop down box'
        },{
            'next #result': 'You will see the results here'
        },{
            'next #swap': 'Click here to swap "From" and "To" Units',
            'shape':'circle'
        }];
        var isSmallScreen = $('#main_layout').hasClass("is-small-screen");
        if(isSmallScreen){
            steps.push({
                'next .mdl-layout__drawer-button': 'Select specific categories from here, you will only see the units of that category',
                'showSkip' : false,
                'nextButton' : {className: "myNext", text: "Got it!"}
            });
        }else {
            steps.push({
                'next #main_category': 'Select specific categories from here, you will only see the units of that category',
                'showSkip' : false,
                'nextButton' : {className: "myNext", text: "Got it!"}
            });
        }
        tour.set(steps);
        tour.run();
    });
}