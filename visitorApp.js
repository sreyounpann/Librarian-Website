

var form = document.getElementById("myForm2");
var imgInput2 = document.querySelector(".img2");
var file2 = document.getElementById("imgInput2");
var visitorIdValue = document.getElementById("visitorId");
var visitorFullname = document.getElementById("visitorFullname");
var visitorNum = document.getElementById("visitorNum");
var visitorSubmitBtn = document.querySelector(".submit");
var visitorInfo = document.getElementById("dataVisitor");
var visitorModal = document.getElementById("visitorForm");
var visitorModalTitle = document.querySelector(".modal-title");
var newVisitorBtn = document.querySelector(".newVisitor");



let getData2 = localStorage.getItem('visitorProfile') ? JSON.parse(localStorage.getItem('visitorProfile')) : [];

let isEdit2 = false, editId2;

showInfo2();

newVisitorBtn.addEventListener('click', () => {
    visitorSubmitBtn.innerText = 'Submit';
    visitorModalTitle.innerText = "Fill Visitor Form";
    isEdit2 = false;
    imgInput2.src = "./Image/profile.webp";

    
    visitorIdValue.value = ""; 
    visitorFullname.value = ""; 
    visitorNum.value = ""; 
});


file2.onchange = function () {
    if (file2.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result;
            imgInput2.src = imgUrl;
        };

        fileReader.readAsDataURL(file2.files[0]);
    }
    else {
        alert("This file is too large!");
    }

};


function showInfo2() {
    document.querySelectorAll('.visitorDetails').forEach(info => info.remove());
    getData2.forEach((element, index) => {
        let createElement = `<tr class="visitorDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.visitorFullname}</td>
            <td>${element.visitorNum}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo2('${element.picture}', '${element.visitorFullname}', '${element.visitorNum}')" data-bs-toggle="modal" data-bs-target="#readVisitorData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo2(${index}, '${element.picture}', '${element.visitorId}', '${element.visitorFullname}', '${element.visitorNum}')" data-bs-toggle="modal" data-bs-target="#visitorForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo2(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
        visitorInfo.innerHTML += createElement;
    });

}

showInfo2();


function readInfo2(pic, visitorFullname, visitorNum) {
    document.querySelector('#showImgVisitor').src = pic;
    document.querySelector('#showVisitorFullname').value = visitorFullname;
    document.querySelector('#showVisitorNumber').value = visitorNum;
}




function editInfo2(index, pic, visitorId, visitorFullname, visitorNum) {
    isEdit2 = true;
    editId2 = index;
    imgInput2.src = pic; 
    visitorIdValue.value = visitorId; 
    visitorFullname.value = visitorFullname;
    visitorNum.value = visitorNum;

    document.querySelector("#visitorId").value = visitorId;
    document.querySelector("#visitorFullname").value = visitorFullname;
    document.querySelector("#visitorNum").value = visitorNum;

    visitorSubmitBtn.innerText = "Update";
    visitorModalTitle.innerText = "Update The Form";
}




function deleteInfo2(index) {
    if (confirm("Are you sure you want to delete?")) {
        getData2.splice(index, 1);
        localStorage.setItem("visitorProfile", JSON.stringify(getData2));
        showInfo2();
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();




    const information = {
        picture: imgInput2.src,
        visitorId:visitorIdValue.value, 
        visitorFullname: visitorFullname.value,
        visitorNum: visitorNum.value,
    };

    if (
        information.picture === "" ||
        information.visitorId === "" ||
        information.visitorFullname === "" ||
        information.visitorNum === ""
    ) {

        alert("Please fill in all fields");
    } else {
     
        if (!isEdit2) {
            getData2.push(information);
        } else {
            isEdit2 = false;
            getData2[editId2] = information;
        }
        localStorage.setItem('visitorProfile', JSON.stringify(getData2));
        visitorSubmitBtn.innerText = "Submit";
        visitorModalTitle.innerText = "Fill the Visitor Form";
        showInfo2();
        visitorId.value = "";
        visitorFullname.value = "";
        visitorNum.value = "";
        
        imgInput2.src = "./Image/profile.webp";
    }
});




function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.appendChild(document.createTextNode(message));

    const container = document.querySelector('.modal-body');
    const formElement = document.querySelector('#visitorForm'); 

    container.insertBefore(alertDiv, formElement);

   
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

//  searchVisitor function to update the visitorInfo section

function searchVisitor(searchTerm) {
    const filteredData = getData2.filter(visitor => visitor.visitorFullname.toLowerCase().includes(searchTerm));

    // Clear the existing visitorInfo
    visitorInfo.innerHTML = '';

    filteredData.forEach((element, index) => {
        let createElement = `<tr class="visitorDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.visitorFullname}</td>
            <td>${element.visitorNum}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo2('${element.picture}', '${element.visitorFullname}', '${element.visitorNum}')" data-bs-toggle="modal" data-bs-target="#readVisitorData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo2(${index}, '${element.picture}', '${element.visitorId}', '${element.visitorFullname}', '${element.visitorNum}')" data-bs-toggle="modal" data-bs-target="#visitorForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo2(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
        visitorInfo.innerHTML += createElement;
    });
}


document.querySelector('form').addEventListener('submit',  function(e) {
    e.preventDefault();

   const searchTerm = document.getElementById("searchTxt").value.toLowerCase();

    searchVisitor(searchTerm);

});



window.deleteInfo2 = deleteInfo2;
window.editInfo2 = editInfo2;
window.readInfo2 = readInfo2;
window.showAlert = showAlert;

