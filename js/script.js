function signup() {
    var firstName = document.getElementById("firstName").value;
    var verifFirstName = verifLength(firstName,5);
    if (verifFirstName) {
        document.getElementById("firstNameError").innerHTML ="";
    }
    else {
        document.getElementById("firstNameError").innerHTML = "First Name must have at least 5 characters";
        document.getElementById("firstNameError").style.color = "red";

    }
    var lastName = document.getElementById("lastName").value;
    var verifLastName = verifLength(lastName,4);
    if (verifLastName) {
        document.getElementById("lastNameError").innerHTML ="";
    }
    else {
        document.getElementById("lastNameError").innerHTML = "Last Name must have at least 4 characters";
        document.getElementById("lastNameError").style.color = "red";

    }


    var email = document.getElementById("email").value;
    var verifEmail = validateEmail(email);
    var verifExistemail = verifExistEmail(email,"users") ;
    if (verifEmail && verifExistemail) {
        document.getElementById("emailError").innerHTML ="";
    }
    else {
        document.getElementById("emailError").innerHTML = "Invalid Email";
        document.getElementById("emailError").style.color = "red";

    }
    var pwd = document.getElementById("pwd").value;
    var verifPwd = verifLength(pwd,8);
    if (verifPwd) {
        document.getElementById("pwdError").innerHTML ="";
    }
    else {
        document.getElementById("pwdError").innerHTML = "Password must have at least 8 characters";
        document.getElementById("pwdError").style.color = "red";

    }
    var confirmPwd = document.getElementById("confirmPwd").value;
    if (pwd == confirmPwd) {
        document.getElementById("confirmPwdError").innerHTML ="";
    }
    else{
        document.getElementById("confirmPwdError").innerHTML ="Invalid confirmation";
        document.getElementById("confirmPwdError").style.color ="red";

    }
    var tel = document.getElementById("tel").value;    
    if (tel.length ==8) {
        document.getElementById("telError").innerHTML ="";

    }else{
        document.getElementById("telError").innerHTML ="Invalid tel";
        document.getElementById("telError").style.color ="red";
    }

    // Déclaration d'un objet JSON
    //Un objet est un ensemble d'attributs ayant des valeurs
    //Objet JSON = JavaScript Object Notation 
    //JSON c'est un langage d'échanges des données textuelles (objets)

    if (verifFirstName && verifLastName &&  (verifEmail && verifExistemail) && verifPwd && (pwd == confirmPwd) && (tel.length ==8)) {
        var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
        var user = {
            id : idUser,
            firstName : firstName , 
            lastName : lastName ,
            email : email,
            pwd : pwd,
            confirmPwd : confirmPwd,
            tel : tel,
            role : "client" ,
            };
            var users = JSON.parse(localStorage.getItem("users") || "[]");

            users.push(user);

            localStorage.setItem("users",JSON.stringify(users));

            localStorage.setItem("idUser", idUser+1);
            
            location.replace("login.html");

    }



   

    // console.log("My user",user);

    // 1- Récupération des données à partir de LocalStorage
    // JSON.parse permet de convertir une chaine de caractère vers objet JSON
    // var user = {} (objet)
    // var users = [] (tableau)

    // console.log("Tableau Users from LS",users);

    // Ajout de l'objet user dans le tableau users
    // console.log("Tableau Users after add user object",users);

    //Suavegarde du tableau users dans localStorage
    // JSON.stringify permet de convertir un tableau d'objets vers une chaine de caractère
   


  
   
}

// Declaration de la fonction
function verifLength(chaine,nb) {
    // var test = false;
    // if (chaine.length >= nb) {
    //     test = true;
    // }

    // return test;
    return chaine.length >= nb;
}

function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

function verifExistEmail(email,clé) {
    var objects = JSON.parse(localStorage.getItem(clé)||"[]");
    test = false;
    for (let i = 0; i < objects.length; i++) {
  if (objects[i].email == email ) {
    test = true;
  
    
  }    
    }
    return test;
    
  }

function insertAdmins() {
    var admin1 = {
        id : 1,
        firstName : "admin1",
        lastName: "admin1",
        email: "admin1@gmail.com",
        pwd : "123admin",
        confirmPwd: "123admin",
        tel: "22639710",
        role: "admin"
    };
    

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    users.push(admin1);

    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("adminAdded","true");

}

function login() {
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var findedUser;
    for (let i = 0; i < users.length; i++) {
               if (users[i].email == email && users[i].pwd == pwd) {
                   findedUser = users[i];
               }     
    }




    if (findedUser.role == "admin") {
        localStorage.setItem("connectedUser",JSON.stringify(findedUser));
        location.replace("adminaccount.html");
    } else {
        localStorage.setItem("connectedUser",JSON.stringify(findedUser));
        location.replace("account.html");

    }

    

}


function displayUsers() {
    var users = JSON.parse(localStorage.getItem("users")|| "[]");

    var usersTable = ` <table class="table table table-hover">
    <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Actions</th>

    </tr>
    `;

    for (let i = 0; i < users.length; i++) {
        usersTable = usersTable +  `
        <tr>
        <td>${users[i].firstName}</td>
        <td>${users[i].lastName}</td>
        <td>${users[i].email}</td>
        <td>${users[i].tel}</td>
        <td>
             <button type="button" class="btn btn-warning" onclick="editUser(${users[i].id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'users')">Delete</button>
        </td>
        
    </tr>
        `;       
    }

    usersTable = usersTable + `    </table>`;

    document.getElementById("usersTable").innerHTML = usersTable;
}

function deleteUser(pos) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    users.splice(pos,1);

    localStorage.setItem("users",JSON.stringify(users));

    location.reload();
}

function deleteObject(pos,clé) {
    var objects = JSON.parse(localStorage.getItem(clé) || "[]");

    objects.splice(pos,1);

    localStorage.setItem(clé,JSON.stringify(objects));

    location.reload();

}

function editUser(id) {
    var user = searchById(id,"users");

    var editForm = `
    <div class="col-md-12 form-group">
								<input type="tel" class="form-control" id="tel" placeholder="Tel" value=${user.tel} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'">
	</div>
    <span id="newTelError"></span>
    <div class="col-md-12 form-group">
								<input type="text" class="form-control" id="pwd" placeholder="Password" value=${user.pwd} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
	</div>
    <span id="newPwdError"></span>

    <div class="col-md-12 form-group">
								<button type="submit" value="submit" class="primary-btn" onclick="validateEditUser(${user.id})">Edit</button>
	</div>
    `;

    document.getElementById("editFormUser").innerHTML = editForm ;
}


function validateEditUser(id) {
    var newTel = document.getElementById("tel").value;

    if (newTel.length==8) {
        document.getElementById("newTelError").innerHTML = "";
    } else {
        document.getElementById("newTelError").innerHTML = "Invalid tel";
        document.getElementById("newTelError").style.color = "red";
    }

    var newPwd = document.getElementById("pwd").value;
    var verifnewPwd = verifLength(newPwd,8);
    if (verifnewPwd) {
        document.getElementById("newPwdError").innerHTML = "";
    } else {
        document.getElementById("newPwdError").innerHTML = "Password must have at least 8 characters";
        document.getElementById("newPwdError").style.color = "red";
    }

    if ((newTel.length==8) && verifnewPwd) {
        var users = JSON.parse(localStorage.getItem("users") ||"[]");

        for (let i = 0; i < users.length; i++) {
           if (users[i].id == id) {
               //update
               users[i].tel = newTel ;
               users[i].pwd = newPwd;
               users[i].confirmPwd = newPwd;
           }
            
        }
        //sauvegarde
        localStorage.setItem("users",JSON.stringify(users));
        location.reload();
    }

   
}

function searchById(id,clé) {
    var objects = JSON.parse(localStorage.getItem(clé) || "[]");
    var obj;

    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id == id) {
            obj = objects[i];
        }
        
    }

    return obj ;
}

function sendmsg() {
    var firstNameMsg = document.getElementById("firstNameMsg").value;
  
    var lastNameMsg = document.getElementById("lastNameMsg").value;

    var emailMsg = document.getElementById("emailMsg").value;


    var subject = document.getElementById("subject").value;
   
  
    var message = document.getElementById("message").value;    
   
     
        var idMessage = JSON.parse(localStorage.getItem("idMessage") || "1");
        var message = {
            idMessage : idMessage,
            firstNameMsg : firstNameMsg , 
            lastNameMsg : lastNameMsg ,
            emailMsg : emailMsg,
            subject : subject,
            message : message,
            
            };
            var messages = JSON.parse(localStorage.getItem("messages") || "[]");

            messages.push(message);

            localStorage.setItem("messages",JSON.stringify(messages));

            localStorage.setItem("idMessage", idMessage+1);
            
            var contactsent = `
            <div class="alert alert-success" role="alert">
             Your message has been sent successfuly .
            </div>
            
            ` ;
            document.getElementById("contactsent").innerHTML = contactsent;


    }
   
   
 function displayMsgs() {
        var messages = JSON.parse(localStorage.getItem("messages")|| "[]");
    
        var messagesTable = ` <table  class="blueTable ">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
    
        </tr>
        `;
    
        for (let i = 0; i < messages.length; i++) {
            messagesTable = messagesTable +  `
            <tr>
            <td>${messages[i].firstNameMsg}</td>
            <td>${messages[i].lastNameMsg}</td>
            <td>${messages[i].emailMsg}</td>
            <td>${messages[i].subject}</td>
            <td>${messages[i].message}</td>
        </tr>
            `;       
        }
    
        messagesTable = messagesTable + `    </table>`;
    
        document.getElementById("messagesTable").innerHTML = messagesTable;
    }


   


    function addpaid() {
        var firstNamePaid = document.getElementById("firstNamePaid").value;
        var verifFirstNamePaid= verifLength(firstNamePaid,3);
        if (verifFirstNamePaid) {
            document.getElementById("firstNamePaidError").innerHTML ="";
        }
        else {
            document.getElementById("firstNamePaidError").innerHTML = "First Name must have at least 5 characters";
            document.getElementById("firstNamePaidError").style.color = "red";
    
        }
        var lastNamePaid = document.getElementById("lastNamePaid").value;
        var verifLastNamePaid = verifLength(lastNamePaid,3);
        if (verifLastNamePaid) {
            document.getElementById("lastNamePaidError").innerHTML ="";
        }
        else {
            document.getElementById("lastNamePaidError").innerHTML = "Last Name must have at least 4 characters";
            document.getElementById("lastNamePaidError").style.color = "red";
    
        }
    
    
        var emailPaid = document.getElementById("emailPaid").value;
        var verifEmailPaid = validateEmail(emailPaid);
        if (verifEmailPaid) {
            document.getElementById("emailPaidError").innerHTML ="";
        }
        else {
            document.getElementById("emailPaidError").innerHTML = "Invalid Email";
            document.getElementById("emailPaidError").style.color = "red";
    
        }
        var pwdPaid = document.getElementById("pwdPaid").value;
        var verifPwdPaid = verifLength(pwdPaid,8);
        if (verifPwdPaid) {
            document.getElementById("pwdPaidError").innerHTML ="";
        }
        else {
            document.getElementById("pwdPaidError").innerHTML = "Password must have at least 8 characters";
            document.getElementById("pwdPaidError").style.color = "red";
    
        }
        var confirmPwdPaid = document.getElementById("confirmPwdPaid").value;
        if (pwdPaid == confirmPwdPaid) {
            document.getElementById("confirmPwdPaidError").innerHTML ="";
        }
        else{
            document.getElementById("confirmPwdPaidError").innerHTML ="Invalid confirmation";
            document.getElementById("confirmPwdPaidError").style.color ="red";
    
        }
        var telPaid = document.getElementById("telPaid").value;    
        if (telPaid.length ==8) {
            document.getElementById("telPaidError").innerHTML ="";
    
        }else{
            document.getElementById("telPaidError").innerHTML ="Invalid tel";
            document.getElementById("telPaidError").style.color ="red";
        }
    
        // Déclaration d'un objet JSON
        //Un objet est un ensemble d'attributs ayant des valeurs
        //Objet JSON = JavaScript Object Notation 
        //JSON c'est un langage d'échanges des données textuelles (objets)
    
        if (verifFirstNamePaid && verifLastNamePaid &&  verifEmailPaid && verifPwdPaid && (pwdPaid == confirmPwdPaid) && (telPaid.length ==8)) {
            alert("user added.") ;
            var idUserPaid = JSON.parse(localStorage.getItem("idUserPaid") || "1");
            var userPaid = {
                idPaid : idUserPaid,
                firstNamePaid : firstNamePaid , 
                lastNamePaid : lastNamePaid ,
                emailPaid : emailPaid ,
                pwdPaid : pwdPaid,
                confirmPwdPaid : confirmPwdPaid,
                telPaid : telPaid ,
                rolePaid : "client"
                };
                var usersPaid = JSON.parse(localStorage.getItem("usersPaid") || "[]");
    
                usersPaid.push(userPaid);
    
                localStorage.setItem("usersPaid",JSON.stringify(usersPaid));
    
                localStorage.setItem("idUserPaid", idUserPaid+1);
                
    
        }
    

       
    }

 
function displayPaidUsers() {
    var usersPaid = JSON.parse(localStorage.getItem("usersPaid")|| "[]");

    var paidUsersTable = ` <table class="blueTable">
    <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Actions</th>

    </tr>
    `;

    for (let i = 0; i < usersPaid.length; i++) {

        console.log(usersPaid[i]) ;
        paidUsersTable = paidUsersTable +  `
        <tr>
        <td>${usersPaid[i].firstName}</td>
        <td>${usersPaid[i].lastName}</td>
        <td>${usersPaid[i].email}</td>
        <td>${usersPaid[i].tel}</td>
        <td>
             <button type="button" class="btn btn-warning" onclick="editUser(${usersPaid[i].idUserPaid})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'usersPaid')">Delete</button>
        </td>
        
    </tr>
        `;       
    }

    paidUsersTable = paidUsersTable + `    </table>`;

    document.getElementById("paidUsersTable").innerHTML = paidUsersTable;
}

  
   
function logout() {
    localStorage.removeItem("connectedUser");
    location.replace("index.html");
    
}


function hellouser() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    helloconnecteduser = ` ${connectedUser.firstName}
    ` ;

    document.getElementById("helloconnecteduser").innerHTML =helloconnecteduser ;

}

function addTraining(){

    var DateTraining = document.getElementById("DateTraining").value;
  
    var Cardio = document.getElementById("Cardio").value;

    var bodyparts = document.getElementById("bodyparts").value;


    var Time = document.getElementById("Time").value;
   
  
    var Exercices = document.getElementById("Exercices").value;    

    var Maxreps = document.getElementById("Maxreps").value;    

   
     
        var idTraining = JSON.parse(localStorage.getItem("idTraining") || "0");
        var training = {
            idTraining : idTraining,
            DateTraining : DateTraining , 
            Cardio : Cardio ,
            bodyparts : bodyparts,
            Time : Time,
            Exercices : Exercices,
            Maxreps : Maxreps,

            
            };
            var trainings = JSON.parse(localStorage.getItem("trainings") || "[]");

            trainings.push(training);

            localStorage.setItem("trainings",JSON.stringify(trainings));

            localStorage.setItem("idTraining", idTraining+1);

            location.reload() ;


}

function displayTraining() {

    var trainings = JSON.parse(localStorage.getItem("trainings")|| "[]");

    var trainingTable = ` <table class="blueTable">
    <tr>
        <th>Number</th>
        <th>Date</th>
        <th>Cardio</th>
        <th>Bodyparts</th>
        <th>Time</th>
        <th>Exercices</th>
        <th>Maxreps</th>
        <th>Actions</th>

    </tr>
    `;

    for (let i = 0; i < trainings.length; i++) {

        trainingTable = trainingTable +  `
        <tr>
        <td>${trainings[i].idTraining}</td>
        <td>${trainings[i].DateTraining}</td>
        <td>${trainings[i].Cardio}</td>
        <td>${trainings[i].bodyparts}</td>
        <td>${trainings[i].Time}</td>
        <td>${trainings[i].Exercices}</td>
        <td>${trainings[i].Maxreps}</td>

  <td>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'trainings')">Delete</button>
        </td>
        
    </tr>
        `;       
    }

    trainingTable = trainingTable + `    </table>`;

    document.getElementById("trainingTable").innerHTML = trainingTable;
}

  
function displayProfile() {
    
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));


    profileuser = `
    
    <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-xl-12 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"> </div>
                                <h6 class="f-w-600">${connectedUser.firstName} ${connectedUser.lastName}</h6>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Email</p>
                                        <h6 class="text-muted f-w-400">${connectedUser.email}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Phone</p>
                                        <h6 class="text-muted f-w-400">${connectedUser.tel}</h6>
                                    </div>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Type</h6>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <h6 class="text-muted f-w-400">${connectedUser.role}</h6>
                                    </div>
                                   
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>

    ` ;

    document.getElementById("profileuser").innerHTML = profileuser;


}

function addDiet(){

    var DateDiet = document.getElementById("DateDiet").value;
  
    var Meal1 = document.getElementById("Meal1").value;

    var Meal2 = document.getElementById("Meal2").value;


    var Meal3 = document.getElementById("Meal3").value;
   
  
    var Supplements = document.getElementById("Supplements").value;    

    var Plus = document.getElementById("Plus").value;    

   
     
        var idDiet = JSON.parse(localStorage.getItem("idDiet") || "0");
        var diet = {
            idDiet : idDiet,
            DateDiet : DateDiet , 
            Meal1 : Meal1 ,
            Meal2 : Meal2,
            Meal3 : Meal3,
            Supplements : Supplements,
            Plus : Plus,

            
            };
            var diets = JSON.parse(localStorage.getItem("diets") || "[]");

            diets.push(diet);

            localStorage.setItem("diets",JSON.stringify(diets));

            localStorage.setItem("idDiet", idDiet+1);

            location.reload() ;


}

function displayDiet() {

    var diets = JSON.parse(localStorage.getItem("diets")|| "[]");

    var DietTable = ` <table class="blueTable">
    <tr>
         <th>Number</th>

        <th>Date</th>
        <th>Meal1</th>
        <th>Meal2</th>
        <th>Meal3</th>
        <th>Supplements</th>
        <th>Plus</th>
        <th>Actions</th>

    </tr>
    `;

    for (let i = 0; i < diets.length; i++) {

        DietTable = DietTable +  `
        <tr>
        <td>${diets[i].idDiet}</td>
        <td>${diets[i].DateDiet}</td>

        <td>${diets[i].Meal1}</td>
        <td>${diets[i].Meal2}</td>
        <td>${diets[i].Meal3}</td>
        <td>${diets[i].Supplements}</td>
        <td>${diets[i].Plus}</td>

  <td>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'diets')">Delete</button>
        </td>
        
    </tr>
        `;       
    }

    DietTable = DietTable + `    </table>`;

    document.getElementById("DietTable").innerHTML = DietTable;

}

function  sendmsgadmin() {
    
    
        var subjectAdmin = document.getElementById("subjectAdmin").value;
       
      
        var messageAdmin = document.getElementById("messageAdmin").value;    
       
         
            var idMessageAdmin = JSON.parse(localStorage.getItem("idMessageAdmin") || "1");
            var messageAdmin = {
                idMessageAdmin : idMessageAdmin,
                subjectAdmin : subjectAdmin,
                messageAdmin : messageAdmin,
                
                };
                var messagesAdmin = JSON.parse(localStorage.getItem("messagesAdmin") || "[]");
    
                messagesAdmin.push(messageAdmin);
    
                localStorage.setItem("messagesAdmin",JSON.stringify(messagesAdmin));
    
                localStorage.setItem("idMessageAdmin", idMessageAdmin+1);

                var sentmsgadmin = `
                <div class="alert alert-success" role="alert">
                 Your message has been sent successfuly .
                </div>
                
                ` ;
                document.getElementById("sentmsgadmin").innerHTML = sentmsgadmin;
                
    
       
}


function displayAdminMessage (){

        var messagesAdmin = JSON.parse(localStorage.getItem("messagesAdmin")|| "[]");
    
        var adminMessageTable = ` <table  class="blueTable ">
        <tr>
            <th>Subject</th>
            <th>Message</th>
    
        </tr>
        `;
    
        for (let i = 0; i < messagesAdmin.length; i++) {
            adminMessageTable = adminMessageTable +  `
            <tr>
      
            <td>${messagesAdmin[i].subjectAdmin}</td>
            <td>${messagesAdmin[i].messageAdmin}</td>
        </tr>
            `;       
        }
    
        adminMessageTable = adminMessageTable + `    </table>`;
    
        document.getElementById("adminMessageTable").innerHTML = adminMessageTable;
   
}

function sendmsghelpcenter() {

    var subjecthelp = document.getElementById("subjecthelp").value;
       
      
    var messagehelp = document.getElementById("messagehelp").value;    
   
     
        var idMessagehelp = JSON.parse(localStorage.getItem("idMessagehelp") || "1");
        var messagehelp = {
            idMessagehelp : idMessagehelp,
            subjecthelp : subjecthelp,
            messagehelp : messagehelp,
            
            };
            var messageshelp = JSON.parse(localStorage.getItem("messageshelp") || "[]");

            messageshelp.push(messagehelp);

            localStorage.setItem("messageshelp",JSON.stringify(messageshelp));

            localStorage.setItem("idMessagehelp", idMessagehelp+1);
            

            var sentmsghelpcenter = `
            <div class="alert alert-success" role="alert">
             Your message has been sent successfuly .
            </div>
            
            ` ;
            document.getElementById("sentmsghelpcenter").innerHTML = sentmsghelpcenter;

}


function displayHelpMessage (){

    var messageshelp = JSON.parse(localStorage.getItem("messageshelp")|| "[]");

    var helpMessageTable = ` <table  class="blueTable ">
    <tr>
        <th>Subject</th>
        <th>Message</th>

    </tr>
    `;

    for (let i = 0; i < messageshelp.length; i++) {
        helpMessageTable = helpMessageTable +  `
        <tr>
  
        <td>${messageshelp[i].subjecthelp}</td>
        <td>${messageshelp[i].messagehelp}</td>
    </tr>
        `;       
    }

    helpMessageTable = helpMessageTable + `    </table>`;

    document.getElementById("helpMessageTable").innerHTML = helpMessageTable;

}

function addebook() {

   
  
    var ebookName = document.getElementById("ebookName").value;

    var ebookAuthor = document.getElementById("ebookAuthor").value;


    var ebookCategory = document.getElementById("ebookCategory").value;
   
  
    var ebookDownload = document.getElementById("ebookDownload").value;    
   
     
        var idEbook = JSON.parse(localStorage.getItem("idEbook") || "1");
        var ebook = {
            idEbook : idEbook ,
            ebookName : ebookName ,
            ebookAuthor : ebookAuthor,
            ebookCategory : ebookCategory,
            ebookDownload : ebookDownload,
            
            };
            var ebooks = JSON.parse(localStorage.getItem("ebooks") || "[]");

            ebooks.push(ebook);

            localStorage.setItem("ebooks",JSON.stringify(ebooks));

            localStorage.setItem("idEbook", idEbook+1);
            
            var ebookadded = `
            <div class="alert alert-success" role="alert">
            Ebook added successfuly .
            </div>
            
            ` ;
            document.getElementById("ebookadded").innerHTML = ebookadded;


}

function displayebook() {

    var ebooks = JSON.parse(localStorage.getItem("ebooks")|| "[]");
    
        var ebookTable = ` <table  class="blueTable ">
        <tr>
            <th>Ebook Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Download</th>
    
        </tr>
        `;
    
        for (let i = 0; i < ebooks.length; i++) {
            ebookTable = ebookTable +  `
            <tr>
            <td>${ebooks[i].ebookName}</td>
            <td>${ebooks[i].ebookAuthor}</td>
            <td>${ebooks[i].ebookCategory}</td>
            <td><a href="${ebooks[i].ebookDownload}" <button type="button" class="btn btn-primary">Download</button>
            </td>
        </tr>
            `;       
        }
    
        ebookTable = ebookTable + `    </table>`;
    
        document.getElementById("ebookTable").innerHTML = ebookTable;

}

function editprofile (){
  
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    var editFormProfile = `
    <div class="col-md-12 form-group">
    <h4> Phone </h4>
								<input type="tel" class="form-control" id="tel" placeholder="Tel" value=${connectedUser.tel} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'">
	</div>
    <span id="newTelError"></span>
    <div class="col-md-12 form-group">
    <h4> Password </h4>

								<input type="password" class="form-control" id="pwd" placeholder="Password" value=${connectedUser.pwd} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
	</div>
    <span id="newPwdError"></span>
    <div class="col-md-12 form-group">
    <h4> Email </h4>

    <input type="text" class="form-control" id="email" placeholder="Password" value=${connectedUser.email} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
</div>

    <div class="col-md-12 form-group">
								<button type="submit" value="submit" class="btn btn-primary" onclick="validateSaveUser(${connectedUser.id})">Save</button>
	</div>
    `;

    document.getElementById("editFormProfile").innerHTML = editFormProfile ;

}

function validateSaveUser(id) {
    var newTel = document.getElementById("tel").value;

  

    var newPwd = document.getElementById("pwd").value;

    var newEmail = document.getElementById("email").value;


    
        var users = JSON.parse(localStorage.getItem("users") ||"[]");

        for (let i = 0; i < users.length; i++) {
           if (users[i].id == id) {
               //update
               users[i].tel = newTel ;
               users[i].pwd = newPwd;
               users[i].confirmPwd = newPwd;
               users[i].email = newEmail ;
           }
            
        }
        //sauvegarde
        localStorage.setItem("users",JSON.stringify(users));
        location.reload();
    

   
}