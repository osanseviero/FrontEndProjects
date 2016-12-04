var bio = {
    name: "Omar Sanseviero",
    role: "Software Crafter",
    welcomeMessage: "I'm a software crafter.",
    biopic: "http://placehold.it/250x200",
    contacts: {
        "mobile": "55 5555 5555",
        "email": "osanseviero@gmail.com",
        "github": "osanseviero",
        "twitter": "@osanseviero",
        "location": "Mexico City"

    },
    skills: ["front end", "teaching", "game development"],
    display: function() {
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
        $("#header").prepend(formattedRole);

        var formattedName = HTMLheaderName.replace("%data%", bio.name);
        $("#header").prepend(formattedName);

        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        $("#topContacts").append(formattedMobile);

        var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
        $("#topContacts").append(formattedEmail);

        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        $("#topContacts").append(formattedGithub);

        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        $("#topContacts").append(formattedTwitter);

        var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
        $("#topContacts").append(formattedLocation);

        var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
        $("#header").append(formattedBioPic);

        var formattedWelcome = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
        $("#header").append(formattedWelcome);

        if(bio.skills.length > 0) {
            $("#header").append(HTMLskillsStart);

            for(i = 0; i < bio.skills.length; i++) {
                var formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
                $('#skills').append(formattedSkill);
            }
        }

        var contacts = $('#topContacts').children().clone();
        $("#footerContacts").append(contacts);
    }
};

var education = {
    schools : [
        {
            "name": "ITESM",
            "location": "Mexico City",
            "degree": "BS",
            "majors": ["Computer Science"],
            "dates": "2014-2018",
            "url" : "www.itesm.mx",
        },
        {
            "name": "DevF",
            "location": "Mexico City",
            "degree": "Red belt coder",
            "majors": ["Full Stack Web Development"],
            "dates": "2014",
            "url" : "www.devf.mx",
        }
    ],
    onlineCourses : [
        {
            "title" : "Front End Nanodegree",
            "school" : "Udacity",
            "dates" : "2016-2017",
            "url" : "www.udacity.com"
        },
        {
            "title" : "Introduction to Computer Science",
            "school" : "EdX",
            "dates" : "2015",
            "url" : "www.edx.org"
        }
    ],
    display: function() {
        education.schools.forEach(function(school, idx) {
            if(education.schools.length > 0) {

                $('#education').append(HTMLschoolStart);

                var schoolName = HTMLschoolName.replace("%data%", school.name);
                var schoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
                $('.education-entry:last').append(schoolName + schoolDegree);

                var schoolDates = HTMLschoolDates.replace("%data%", school.dates);
                $('.education-entry:last').append(schoolDates);

                var schoolLocation = HTMLschoolLocation.replace("%data%", school.location);
                $('.education-entry:last').append(schoolLocation);

                for(i = 0; i < school.majors.length; i++) {
                    var schoolMajor = HTMLschoolMajor.replace("%data%", school.majors[i]);
                    $('.education-entry:last').append(schoolMajor);
                }
            }
        });
        if(education.onlineCourses.length > 0) {
            $('#education').append(HTMLonlineClasses); 

            education.onlineCourses.forEach(function(course, idx) {
                $('#education').append(HTMLschoolStart);

                var onlineTitle = HTMLonlineTitle.replace("%data%", course.title);
                var onlineSchool = HTMLonlineSchool.replace("%data%", course.school);
                $('.education-entry:last').append(onlineTitle + onlineSchool);

                var onlineDates = HTMLonlineDates.replace("%data%", course.dates);
                $('.education-entry:last').append(onlineDates);

                var onlineURL = HTMLonlineURL.replace("%data%", course.url);
                $('.education-entry:last').append(onlineURL);
            });
        }
        
    }
};

var work = {
    jobs: [
        {
            "employer" : "DevF",
            "title" : "Sensei",
            "location" : "Mexico City",
            "dates" : "Summer 2015",
            "description" : "Designed a project‐based front‐end curriculum for complete beginners."
        },
        {
            "employer" : "Red Wolf & Microsoft",
            "title" : "Teacher",
            "location" : "Mexico",
            "dates" : "Summer 2016",
            "description" : "Designed a curriculum with Microsoft to teach Kodu in Mexican public elementary schools."
        }
    ],
    display: function() {
        work.jobs.forEach(function(job, idx) {
            if(work.jobs.length > 0) {
                $("#workExperience").append(HTMLworkStart);
                var employerLink = HTMLworkEmployer.replace("%data%", job.employer);
                employerLink += HTMLworkTitle.replace("%data%", job.title);
                $('.work-entry:last').append(employerLink);

                var workDate = HTMLworkDates.replace("%data%", job.dates);
                $('.work-entry:last').append(workDate);

                var workLoc = HTMLworkLocation.replace("%data%", job.location);
                $('.work-entry:last').append(workLoc);

                var workDesc = HTMLworkDescription.replace("%data%", job.description);
                $('.work-entry:last').append(workDesc);
            }
        });
    }
};

var projects = {
    projects: [
        {
            "title" : "Fizcode",
            "dates" : "2014-2016",
            "description" : "Free Education",
            "images" : ["http://placehold.it/350x150", "http://placehold.it/300x150" ]
        },
        {
            "title" : "Web Courses",
            "dates" : "2016",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quas aspernatur, nulla a inventore quod explicabo ipsum eveniet totam harum rerum. Autem, ullam provident suscipit repudiandae excepturi laborum veritatis nemo!",
            "images" : ["http://placehold.it/300x150" ]
        }
    ],
    display : function() {
        projects.projects.forEach(function(project, idx) {
            if(projects.projects.length > 0) {
                $('#projects').append(HTMLprojectStart);

                var projectTitle = HTMLprojectTitle.replace("%data%", project.title);
                $('.project-entry:last').append(projectTitle);

                var projectDates = HTMLprojectDates.replace("%data%", project.dates);
                $('.project-entry:last').append(projectDates);

                var projectDescription = HTMLprojectDescription.replace("%data%", project.description);
                $('.project-entry:last').append(projectDescription);

                for(i = 0; i < project.images.length; i++) {
                    var projectImage = HTMLprojectImage.replace("%data%", project.images[i]);
                    $('.project-entry:last').append(projectImage);
                }
            }
        });
    }
};

bio.display();
education.display();
work.display();
projects.display();

$("#mapDiv").append(googleMap);



