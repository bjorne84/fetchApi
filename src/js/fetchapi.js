"use strict"

// ***** Variabler *****

// Element for att lägga till en ny kurs, i översta formuläret
let formCreateEl = document.getElementById('formCreate');
// olika input-fält från formuläret
let createName = document.getElementById('name');
let createCode = document.getElementById('code');
let createProg = document.getElementById('progression');
let createLink = document.getElementById('kursplan');
/*Händelselyssnare för formuläret, skapa ny kurs, lyssnar på klick, 
riktar sig direkt till knapp-elementet*/
//formCreate.addEventListener('submit', createCourse());

formCreateEl.addEventListener('submit', (e) => {
    e.preventDefault(); // Förhindrar att sidan laddas om
    createCourse();
});

// Element för att läsa ut alla kurser, uppdatera och radera 
let courseEl = document.getElementById('courses');

// Händelselyssnare, när sidan har laddat klart
window.addEventListener('load', getCourse);
//Händelselyssnare för formuläret, skapa ny kurs


// ***** Funktioner ************

// Hämtar kurser
function getCourse() {
    // Tom element på innehåll
    courseEl.innerHTML = '';
    // Hämta data
    fetch('http://webb01.se/REST_Api/')
        .then(response => response.json()
            .then(data => {
                data.forEach(course => {
                    console.log(course);
                    courseEl.innerHTML +=
                        `<div class="formwrapper">
                        <form class="forms forms2" id="form_${course.Course_ID}" action="index.html" method="POST" enctype="multipart/form-data">
                        <p class="pfield pError" id="message_form_${course.Course_ID}"></p>
                        <fieldset class="field">
                            <label for="name">Name:</label><br>
                            <input type="text" name="name" class="input" placeholder="${course.Course_name}">
                            <label for="code">Code:</label><br>
                            <input type="text" name="code" class="input" placeholder="${course.Code}"><br>
                            <label for="progression">Progression:</label><br>
                            <input type="text" name="progression" class="input" placeholder="${course.Progression}"><br>
                            <label for="kursplan">Course syllabus:</label><br>
                            <input type="text" name="kursplan" class="input" placeholder="${course.Course_syllabus}"><br>
                            <a href="${course.Course_syllabus}">Länk till kursplan</a>
                        </fieldset>
                    </form>
                    <div class="btn-wrapper btn_wrapper2">
                    <button id="btn_up_${course.Course_ID}" class="btn btn2" onClick="startUpdateCourse(${course.Course_ID})">Update</button>
                    <button id="btn_del_${course.Course_ID}" class="btn btn2 btn-reset" onClick="deleteCourse(${course.Course_ID})">Delete</button>
                </div>
                </div>`
                })
            })
        )
}


// Skapar kurser
function createCourse() {
    // Sparar variabler med värde från formuläret
    let name = createName.value;
    let code = createCode.value;
    let prog = createProg.value;
    let link = createLink.value;

    // Sparar ner det som ett objekt som sedan görs om till JSON-format
    let course = { "Course_name": name, "Code": code, "Progression": prog, "Course_syllabus": link };
    console.log(course);
    //Skapar fetch-anrop
    fetch('http://webb01.se/REST_Api/', {
        method: 'POST',
        body: JSON.stringify(course),
    })
        //Vi kollar responsen, att anropet lyckats
        .then(response => response.json())
        .then(data => {
            let message = data.Message;
            document.getElementById("message_form").innerHTML = message;
            getCourse();
            document.getElementById("formCreate").reset();
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}



// Raderar kurser
function deleteCourse(id) {
    // Skapar objekt som innehåller kurs ID
    let obj =  { "Course_ID": id };
    /* Fetchar, skickar med metod delete och body med JSON-fil som 
    görs av objektet*/
    fetch('http://webb01.se/REST_Api/', {
        method: 'DELETE',
        body: JSON.stringify(obj),
    })
    // Tar emot respons-data i JSON-format
    .then(response => response.json())
    // Laddar om kurslistan
    .then(data => {
        getCourse();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}


//Uppdaterar kursen, varför fungerade inte detta???? 
function startUpdateCourse(id) {
    // Starta submit
    let formIdStart = "form_";
    let formId = formIdStart + id;
    console.log(formId);
    document.getElementById((formId).submit(),
    (e) => {
        e.preventDefault(); // Förhindrar att sidan laddas om
        updateCourse();
    });

}



function updateCourse() {
    // Tilldelar variabler fårn formdata
    let name = createName.value;
    let code = createCode.value;
    let prog = createProg.value;
    let link = createLink.value;

    // Sparar ner det som ett objekt som sedan görs om till JSON-format
    let course = { "Course_name": name, "Code": code, "Progression": prog, "Course_syllabus": link };
    console.log(course);


    //Skapar fetch-anrop
    fetch('http://webb01.se/REST_Api/', {
        method: 'PUT',
        body: JSON.stringify(course),
    })
        //Vi kollar responsen, att anropet lyckats
        .then(response => response.json())
        .then(data => {
            let message = data.Message;
            document.getElementById("message_form" + data.Course_ID).innerHTML = message;
            getCourse();
            document.getElementById("formCreate").reset();
        })
        .catch(error => {
            console.log('Error: ', error);
        })

}
/* 
               `<div class="formwrapper">
                        <form class="forms forms2" id="form_${course.Course_ID}" action="index.html" method="POST" enctype="multipart/form-data">
                        <p class="pfield pError" id="message_form_${course.Course_ID}"></p>
                        <fieldset class="field">
                            <label for="name">Name:</label><br>
                            <input type="text" name="name" class="input" placeholder="${course.Course_name}">
                            <label for="code">Code:</label><br>
                            <input type="text" name="code" class="input" placeholder="${course.Code}"><br>
                            <label for="progression">Progression:</label><br>
                            <input type="text" name="progression" class="input" placeholder="${course.Progression}"><br>
                            <label for="kursplan">Course syllabus:</label><br>
                            <input type="text" name="kursplan" class="input" placeholder="${course.Course_syllabus}"><br>
                            <a href="${course.Course_syllabus}">Länk till kursplan</a>
                        <div class="btn-wrapper">
                            <button type="submit" name="updatePost" id="btn-update-${course.Course_ID}" class="btn btn2">Update</button>
                            <button type="submit" name="deletePost" id="btn-delete-${course.Course_ID}" class="btn btn2 btn-reset">Delete</button>
                        </div>
                        </fieldset>
                    </form>
                    <div class="btn-wrapper btn_wrapper2">
                    <button id="btn_up_${course.Course_ID}" class="btn btn2" onClick="startUpdateCourse(${course.Course_ID})">Update</button>
                    <button id="btn_del_${course.Course_ID}" class="btn btn2 btn-reset" onClick="deleteCourse(${course.Course_ID})">Delete</button>
                </div>
                </div>`*/

