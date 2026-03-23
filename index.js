const content = document.querySelector("#content");
const submit = document.querySelector('#add');
const update = document.querySelector("#update");

//POST API
submit.addEventListener('click', () => {
    let fullname = document.querySelector("#fullname").value;
    let age = document.querySelector("#age").value;
    let contact_number = document.querySelector("#contact_number").value;
    let medical_condition = document.querySelector("#medical_condition").value;
    let formData={fullname, age, contact_number, medical_condition};

    if (fullname && age && contact_number && medical_condition) {

            fetch('https://clinic-back-t14l.onrender.com/api/add', {
        method: 'POST',
        body: JSON.stringify(formData), 
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((error) => {
        console.log(error);
    })
    alert("Appointment Added Successfully");
    location.reload();
    }


});

window.addEventListener('load', () => {
    getUsers();
})

function getUsers(){
    let html = ""
    fetch('https://clinic-back-t14l.onrender.com/api/appointmentList', {mode:'cors'})

    .then(response=>{
        console.log(response);
        return response.json();
    })

    .then(data=>{
        console.log(data);
        data.forEach(element=>{


            html+=`
            <tr>
                <td>${element.fullname}</td>
                <td>${element.age}</td>
                <td>${element.contact_number}</td>
                <td>${element.medical_condition}</td>
                <td>
                    <a href="javascript:void(0)" id="add" onClick="deleteMember(${element.id})" class="border-violet-800 border rounded-lg px-2 mt-4 w-auto hover:bg-violet-800 hover:text-white"> Delete</a>
                    
                    <a href="javascript:void(0)" id="update" onClick="updateMember(${element.id})" class="border-violet-800 border rounded-lg px-2 mt-4 w-auto hover:bg-violet-800 hover:text-white"> Update</button>
                </td>
            </tr>`    
        })
        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
    })
}


//DELETE
function deleteMember(id){

    let text;

    if (confirm("Press a button!") == true) {
        
    
        fetch("https://clinic-back-t14l.onrender.com/api/delete",{
            method:'DELETE',
            body: JSON.stringify({id}),
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then(response=> {
            if (response.ok) {
                alert("Appointment Deleted Successfully");
                location.reload();
            } else {
                alert ("Error Deleting User");
            }
        }).catch(error => console.log(error));
    }
}

    // search
    function updateMember(id){
        fetch (`https://clinic-back-t14l.onrender.com/api/appointmentId/${id}` )
        .then( response => response.json())
        .then(data => {
            
            document.querySelector("#fullname").value=data[0].fullname;
            document.querySelector("#age").value=data[0].age;
            document.querySelector("#contact_number").value=data[0].contact_number;
            document.querySelector("#medical_condition").value=data[0].medical_condition;

            document.querySelector("#ID").value=data[0].id;
        }).catch(error=> {
            console.log(error)
        })
    }

    // put
    update.addEventListener('click', () => {
        let fullname = document.querySelector("#fullname").value;
        let age = document.querySelector("#age").value;
        let contact_number = document.querySelector("#contact_number").value;
        let medical_condition = document.querySelector("#medical_condition").value;

        let id = document.querySelector("#ID").value

        let formdata = {fullname,age,contact_number,medical_condition,id};
        fetch (`https://clinic-back-t14l.onrender.com/api/update`, {
            method: 'PUT',
            body: JSON.stringify(formdata),
            headers : {
                "Content-Type" : "application/json",
            },
        }).catch((error)=>{
            console.log(error);
        })
        alert("Appointment Updated Successfully")
        location.reload();
})
