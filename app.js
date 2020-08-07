//The GPController
var GPController = (function (){

    //Create the constructors for the First and Second Semester
    var FirstSemester = function(id, courseCode, creditLoad, grade){
        this.id = id;
        this.courseCode = courseCode;
        this.creditLoad = creditLoad;
        this.grade = grade;
        var gradeValue = 0;
        var gradePoint = 0;
         
        switch (grade) {
            case 'A':
                gradeValue = 5
                break;

            case 'B':
                gradeValue = 4
                break;

            case 'C':
                gradeValue = 3
                break;
            
            case 'D':
                gradeValue = 2
                break;
            
            case 'E':
                gradeValue = 1
                break;
            
            case 'F':
                gradeValue = 0
        
            default:
                break;
        }
        this.gradeValue = gradeValue;
        this.gradePoint = gradeValue * creditLoad;

    }

    var SecondSemester = function(id, courseCode, creditLoad, grade){
        this.id = id;
        this.courseCode = courseCode;
        this.creditLoad = creditLoad;
        this.grade = grade;
        var gradeValue = 0;
         
        switch (grade) {
            case 'A':
                gradeValue = 5
                break;

            case 'B':
                gradeValue = 4
                break;

            case 'C':
                gradeValue = 3
                break;
            
            case 'D':
                gradeValue = 2
                break;
            
            case 'E':
                gradeValue = 1
                break;
            
            case 'F':
                gradeValue = 0
        
            default:
                break;
        }
        this.gradeValue = gradeValue;
        this.gradePoint = gradeValue * creditLoad;


    }
    //to store all the data
    var data = {
        allItems :{
            first: [],
            second: []
        },
        cummulative:{
            first:0,
            second:0
        },
        totalCL:{
            first:0,
            second:0
        },
        gradePoint:{
            first: 0,
            second:0
        },
        cgpa:0
    }
    //to calculate the cummulative
    var calculateCummulative = function(sem){

        var sum = 0;
        for (let index = 0; index < data.allItems[sem].length; index++) {
             sum += data.allItems[sem][index].gradePoint;
        }
        data.cummulative[sem] = sum;
    }
    //to calculate the total credit load
    var calculateTCL = function(sem){

        var sum = 0;
        for (let index = 0; index < data.allItems[sem].length; index++) {
             sum += data.allItems[sem][index].creditLoad;
        }
        data.totalCL[sem] = sum;
    }

    //to calculate semeseter GP
    var calculateGP = function(sem){
        var gp = data.cummulative[sem]/data.totalCL[sem];
        data.gradePoint[sem] = parseFloat(gp.toFixed(2));
    }

    //to calculate CGPA
    var calculateCGPA = function(){
       var cgpa = (data.gradePoint.first + data.gradePoint.second)/2;
       data.cgpa = cgpa;
    }

    return{
        addItem : function(semester, courseCode, creditLoad, grade){
            var newItem, id;
            
            if(data.allItems[semester].length > 0){
                id = data.allItems[semester][data.allItems[semester].length -1].id + 1;
            }
            else{
                id = 0;
            }
            //.log(id);
            //create a new item based on first or second semester
            if(semester ==='first'){
                newItem = new FirstSemester(id, courseCode,creditLoad,grade);
            }
            else if(semester === 'second'){
                newItem = new SecondSemester(id, courseCode,creditLoad,grade);
            }

            //push new items based on the semester
            data.allItems[semester].push(newItem);  
            console.log(newItem);  
            return newItem;
            
        },

        //to calculate the cummulative gradePoint
        calculateTGP : function(){
            //call the method for both of them to store the cummulative
             calculateCummulative('first');
             calculateCummulative('second');
             
        },
        calculateTCL : function(){
            calculateTCL('first');
            calculateTCL('second');
        },
        calculateGP : function(semeseter){
            calculateGP(semeseter);
        //calculateGP('second');
        },
        calculateCGPA : function(){
            calculateCGPA();
        },
        getValues : function(){
            return{
                firstCummulative: data.cummulative.first,
                secondCummulative : data.cummulative.second,
                firstTCL: data.totalCL.first,
                secondTCL: data.totalCL.second,
                firstGP: data.gradePoint.first,
                secondGP: data.gradePoint.second,
                cgpa: data.cgpa
            }
        },
        testing : function(){
            //console.log(data.allItems[semester].length)
            console.log(data)
        }
    }
     
})();


//the UI Controller
var UIController = (function (){
    //these are the DOMstrings
    var DOMStrings = {
        inputFirstName : '.firstName',
        inputLastName : '.lastName',
        inputOkBtn : '.btnOk',
        inputSaveBtn : '.btnSave',
        inputSemester : '.semester',
        inputCourseCode : '.courseCode',
        inputCreditLoad : '.creditLoad',
        inputGrade : '.grade',
        nameLabel : '.nameLabel',
        firstContainer : '.firstContainer',
        secondContainer : '.secondContainer',
        firstGpLabel : '.firstGpLabel',
        secondGpLabel : '.secondGpLabel',
        cummulativePointsFirst: '.cummulativePointsFirst',
        cummulativePointsSecond: '.cummulativePointsSecond',
        tclFirst: '.tclFirst',
        tctSecond: '.tclSecond',
        cgpaLabel : '.cgpaLabel',
        degreeLabel : '.degreeLabel'

    }
    //To format the name of the user input
    var nameFormatting = function(name){
        var x,y,z;       
        x = name;
        z = x.charAt(0).toUpperCase();
        y = x.slice(1, x.length).toLowerCase();
        
        return z+y;

    }

    return{
        //to get the first name and the last name
        getUserInput : function(){
            return{
                firstName : nameFormatting(document.querySelector(DOMStrings.inputFirstName).value),
                lastName : nameFormatting(document.querySelector(DOMStrings.inputLastName).value),
                
            }
        },
        //to get the course details
        getCourseInput : function(){
            return{
                semester : document.querySelector(DOMStrings.inputSemester).value,
                courseCode : document.querySelector(DOMStrings.inputCourseCode).value.toUpperCase(),
                creditLoad : parseInt(document.querySelector(DOMStrings.inputCreditLoad).value),
                grade : document.querySelector(DOMStrings.inputGrade).value.toUpperCase()
            }
        },
        //to add the name to the UI
        addItem: function(obj){
             document.querySelector(DOMStrings.nameLabel).textContent = 'Name: '+ obj.firstName + ' '+ obj.lastName;
        },
        //to add the item to the UI
        addListItem: function(obj, semester){

            var html, newHtml, element, cumText;
            //create HTML with a placeholder
           
            if(semester === 'first'){
                element = DOMStrings.firstContainer;
                html =  '<tbody><tr><th scope="row">%id%</th><td>%courseCode%</td><td>%grade%</td><td>%creditLoad%</td><td>%gradePoint%</td><td><button class ="btn__delete"><i class="fas fa-times-circle"></i></button></td></tr></tbody>';
            }
            else{
                element = DOMStrings.secondContainer;
                html =  '<tbody><tr><th scope="row">%id%</th><td>%courseCode%</td><td>%grade%</td><td>%creditLoad%</td><td>%gradePoint%</td><td><button class ="btn__delete"><i class="fas fa-times-circle"></i></button></td></tr></tbody>';
            }

            //replace the html with new html
            newHtml = html.replace('%id%', obj.id +1);

            newHtml = newHtml.replace('%courseCode%', obj.courseCode);
            newHtml = newHtml.replace('%grade%', obj.grade);
            newHtml = newHtml.replace('%creditLoad%', obj.creditLoad);
            newHtml = newHtml.replace('%gradePoint%', obj.gradePoint)

            //insert the new html into the container
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            //to display the cummulative
            
        },

        //to clear the field after typing
        clearField : function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputCourseCode +','+ DOMStrings.inputCreditLoad +','+ DOMStrings.inputGrade);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(element => {
                element.value = "";
            });
            fieldsArr[0].focus();
        },
        //to display the cummulatives
        displayCummulatives : function(obj){
            document.querySelector(DOMStrings.cummulativePointsFirst).textContent = obj.firstCummulative;
            document.querySelector(DOMStrings.cummulativePointsSecond).textContent = obj.secondCummulative;
            document.querySelector(DOMStrings.tclFirst).textContent = obj.firstTCL;
            document.querySelector(DOMStrings.tctSecond).textContent = obj.secondTCL;
            document.querySelector(DOMStrings.cgpaLabel).textContent = obj.cgpa;

            if(obj.firstGP === NaN){
                document.querySelector(DOMStrings.firstGpLabel).textContent = 0;
            }else{
                document.querySelector(DOMStrings.firstGpLabel).textContent = obj.firstGP;
            }
            if(obj.secondGP === NaN){
                document.querySelector(DOMStrings.secondGpLabel).textContent = 0;
            }else{
                document.querySelector(DOMStrings.secondGpLabel).textContent = obj.secondGP;
            }
             
             if (obj.cgpa >= 4.5) {
                 document.querySelector(DOMStrings.degreeLabel).textContent = 'First Class';
             }
             else if(obj.cgpa >= 3.5 && obj.cgpa < 4.5){
                document.querySelector(DOMStrings.degreeLabel).textContent = 'Second Class Upper';
             }
             else if(obj.cgpa >= 2.5 && obj.cgpa < 3.5){
                document.querySelector(DOMStrings.degreeLabel).textContent = 'Second Class Lower';
             }
             else if(obj.cgpa >= 1.5 && obj.cgpa < 2.5){
                document.querySelector(DOMStrings.degreeLabel).textContent = 'Third Class';
             }
             else{
                document.querySelector(DOMStrings.degreeLabel).textContent = 'School is not your calling';
             }
        },
        getDOMStrings : function(){
            return DOMStrings;
        }
    }

})();

//the global controller
var GlobalController = (function (gpCtrl, uiCtrl){
    
    var setupEventListeners = function(){

        var DOM, input;
        DOM = uiCtrl.getDOMStrings();
    
        document.querySelector(DOM.inputSaveBtn).addEventListener('click', function(){
            var input = uiCtrl.getUserInput();
             uiCtrl.addItem(input);
        });
    
        document.querySelector(DOM.inputOkBtn).addEventListener('click', ctrlAddItem);
    
        //when the enter key is pressed
        document.addEventListener('keypress', function(event){
            if(event.key === 'Enter' || event.which ===13){
               ctrlAddItem();
            }
       });
    }
    //calculate the GP
     

    var ctrlAddItem = function(){
        var courseInput, courseGPCtrl;
        //1. get the courseInput from the user
        courseInput = uiCtrl.getCourseInput();

         //the business rule on the input
         //grade must be a letter A-F
         //credit Load must be a number 

         //to check if the 
         var isGrade = false;
         var grades = ['A','B','C','D','E','F']

         grades.forEach(grade => {
             if(courseInput.grade === grade){
                 isGrade = true;
             }
             return isGrade;
         });
          

         if(isGrade && !isNaN(courseInput.creditLoad)){

             //2. pass the input to the gp controller
              courseGPCtrl = gpCtrl.addItem(courseInput.semester,courseInput.courseCode, courseInput.creditLoad, courseInput.grade);
     
              //3. display the detail
             uiCtrl.addListItem(courseGPCtrl, courseInput.semester);
     
             //4. clear the field
             uiCtrl.clearField();

             //5. calculate the tgp and the tcl
             gpCtrl.calculateTGP();
             gpCtrl.calculateTCL();

            //to calculate the CGP
            gpCtrl.calculateGP(courseInput.semester);

            gpCtrl.calculateCGPA();

            //6. to display the cummulative and total credit Load, get their values and pass it into the display method
            var value = gpCtrl.getValues();
            uiCtrl.displayCummulatives(value);
            

            //to calculate the cgpa
            
            
         }

         else{
             alert('Invalid entry');
             uiCtrl.clearField();
         }
    }

    return{
        initialize : function(){
             setupEventListeners(); 
        }
    }

})(GPController, UIController);

GlobalController.initialize();

 