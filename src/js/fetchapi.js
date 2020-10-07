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
formCreateEl.addEventListener('submit', createCourse());



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
                    `<form class="forms forms2" id="form-${course.Course_ID}" method="POST" enctype="multipart/form-data">
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
                            <button type="reset" name="deletePost" id="btn-delete-${course.Course_ID}" class="btn btn2 btn-reset">Delete</button>
                        </div>
                        </fieldset>
                    </form>`
                })
            })
        )
}


// Skapar kurser
function createCourse() {
    // Sparar variabler med värde från formuläret
    let name = createName.value;
    let code = createCode.value;
    let prog = createProg .value;
    let link = createLink.value;

    // Sparar ner det som ett objekt som sedan görs om till JSON-format
    let course = {"Course_name": name, "Code": code, "Progression": prog, "Course_syllabus": link};
    console.log(course);
    //Skapar fetch-anrop
    fetch('http://webb01.se/REST_Api/', {
        method: 'POST',
        body: JSON.stringify(course),
    })
        //Vi kollar responsen, att anropet lyckats
        .then(response => response.json())
        .then(data => {
            getCourse();
        })
        .catch(error => {
            console.log('Error: ', error)
        })
}

