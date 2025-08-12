let some = [];
if (localStorage.getItem("tasks")) {
    some = JSON.parse(localStorage.getItem("tasks")); 
    reload_some(); //קורא לפונקציה   
}

flatpickr("#date_mission", {
    locale: "he",
    dateFormat: "d/m/Y",
    allowInput: true
});

let mission_detals = document.getElementById("mission_detals");
let date_mission = document.getElementById("date_mission");
let time_mission = document.getElementById("time_mission");
let btnSave = document.getElementById("goin");
let btnReset = document.querySelector(".reset");
let notes = document.querySelector(".notes");



 
    // Function to handle form submission and save tasks
    btnSave.addEventListener("click", () => {
        if (mission_detals.value === "" || date_mission.value === "" || time_mission.value === "") {
            alert("חסר רישום")
            return false;
        }else {
        some.push({
            mission: mission_detals.value,
            date: date_mission.value,
            time: time_mission.value,
            isDone: false,
        });
        localStorage.setItem('tasks',JSON.stringify(some));
        mission_detals.value="";
        date_mission.value="";
        time_mission.value="";
        reload_some(); //קורא לפונקציה 
    }
    });


function reload_some(){   //הגדרה של הפונקציה - מפעיל אותה
some = JSON.parse(localStorage.getItem("tasks")); // בודק אם יש משהו בלוקל סטורג
document.querySelector(".notes").innerHTML=''; //מאפס את קלאס בשם נוטס 
for(var item of some){ //מגדיר משתנה מסוג ואר בשם אייטם ודבר שני בודק את האורך של מערך
    document.querySelector(".notes").innerHTML+=`
    
    <div class="note-1">
    <i class="fa-solid fa-circle-xmark"></i>
    <p>${item.mission}</p> 
    <div class="page_date"><p>${item.date}</p></div>
    <div class="page_time"><p>${item.time}</p></div>
    </div>
    `;
}
}

document.querySelector(".notes").addEventListener("click",function(e){
    if(e.target && e.target.matches("i.fa-circle-xmark")){
        let index = parseInt(e.target.dataset.index);
        some.splice(index,1);
        localStorage.setItem("tasks",JSON.stringify(some));
        reload_some();
    }
})

document.querySelector(".reset").addEventListener("click", function(){
mission_detals.value = ""; 
date_mission.value = "";
time_mission.value = "";
})









