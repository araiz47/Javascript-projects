//Student Grade Manager Ver 1

const student_input = document.getElementById("student_input");
const grade_input = document.getElementById("grade_input");
const add_Student = document.getElementById("add_Student");
const show_Students = document.getElementById("show_Students");
const show_Statistics = document.getElementById("show_Statistics");
const reset = document.getElementById("reset");
const output = document.getElementById("output");


let students = []; // array where the students get added
let grades = []; //array where grades are added

add_Student.onclick = function(){ //add student button that basically add students

    let student_name = student_input.value.trim();    
   
    if(student_name === ""){
        output.textContent = "You haven't added a name..";
        return;
    }
    else if(grade_input.value === ""){
        output.textContent = "You need to add a Grade..";
        return;
    }
    let grade = Number(grade_input.value);
    
    if(isNaN(grade)){
        output.textContent = "You entered the wrong grade";
        return;
    }
    if (grade < 0 || grade > 100) {
        output.textContent = "You cannot add grade less than 0 and greater than 100";
        return;
    }
    if (students.includes(student_name)){

        output.textContent = "This student already exists";
        return;

    }

    students.push(student_name);
    grades.push(grade);
    output.textContent = "Student Added Successfully";

    student_input.value = "";
    grade_input.value = "";
    student_input.focus();
}

show_Students.onclick = function(){ //shows the students and the grades
    output.textContent = " ";
    
    students.forEach(function(student,index){
        
        output.innerHTML += `Student: ${student}, Grade: ${grades[index]}<br>`;

    })
}

show_Statistics.onclick = function(){ // shows the stats 
    if(students.length === 0){
        output.textContent = "No Students added yet";
        return;
    }

    let totalStudents = students.length;

    let passingStudents = grades.filter(function(grade){
        return grade >= 50;
    })

    let failingStudents = grades.filter(function(grade){
        return grade < 50;
    })
    

    let totalGrades = grades.reduce(function(total,grade){
        total += grade;
        return total;
    },0)

    let average = totalGrades / totalStudents;
    let highestmarks = Math.max(...grades);
    let lowestmarks = Math.min(...grades);

output.innerHTML = `📊 Student Statistics <br>

Total Students: ${totalStudents} <br>
Passing Students: ${passingStudents.length} <br>
Failing Students: ${failingStudents.length} <br>
Average Grade: ${average.toFixed(2)} <br>
Highest Grade: ${highestmarks} <br>
Lowest Grade: ${lowestmarks}`; 

}

reset.onclick = function(){
    students = [];
    grades = [];

    student_input.value = "";
    grade_input.value = "";

    output.textContent = "No students added yet.";

    student_input.focus();
}