
/* =========================
   Course Display
   ========================= */

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");


function displayCourses(courseArray) {

    courseList.innerHTML = "";

    courseArray.forEach(course => {

        const courseElement = document.createElement("div");

        courseElement.classList.add("course");

        if (course.completed) {
            courseElement.classList.add("completed");
        }

        courseElement.textContent = `${course.subject} ${course.number}`;

        courseList.appendChild(courseElement);
    });


    /* Calculate total credits */

    const credits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = `Total Credits: ${credits}`;
}


/* =========================
   Course Filters
   ========================= */

function filterCourses(subject) {

    if (subject === "ALL") {
        displayCourses(courses);
    } else {
        const filteredCourses = courses.filter(
            course => course.subject === subject
        );

        displayCourses(filteredCourses);
    }
}


/* =========================
   Filter Buttons
   ========================= */

const allButton = document.querySelector("#all-courses");
const wddButton = document.querySelector("#wdd-courses");
const cseButton = document.querySelector("#cse-courses");


allButton.addEventListener("click", () => {

    filterCourses("ALL");

    allButton.classList.add("active");
    wddButton.classList.remove("active");
    cseButton.classList.remove("active");
});


wddButton.addEventListener("click", () => {

    filterCourses("WDD");

    wddButton.classList.add("active");
    allButton.classList.remove("active");
    cseButton.classList.remove("active");
});


cseButton.addEventListener("click", () => {

    filterCourses("CSE");

    cseButton.classList.add("active");
    allButton.classList.remove("active");
    wddButton.classList.remove("active");
});


/* =========================
   Initial Course Display
   ========================= */

displayCourses(courses);