const pincodeInput = document.getElementById('pincode');
const postOfficeDropdown = document.getElementById('post-office');

pincodeInput = addEventListener('input',()=>{
    let pincode = pincodeInput.value;
    let error = document.getElementById('error');

    if (pincode.length === 6) {
        fetch(`https://api.postalpincode.in/pincode/${pincode}`).then((res)=> res.json()).then((data)=> {
            if(data[0].Status === "Success"){
                error.textContent = "";
                let postOffices = data[0].PostOffice;
                postOfficeDropdown.innerHTML = "";
                postOffices.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.Name;
                    option.innerText = element.Name;
                    postOfficeDropdown.appendChild(option);                    
                });
                document.getElementById('district').value = postOffices[0].District;
                document.getElementById('state').value = postOffices[0].State;
                document.getElementById('country').value = postOffices[0].Country;
            }else if(pincode <= 0){
                error.textContent = "Invalid... Pincode can't be Negative"
            }
            else{
                error.textContent = "Invalid Pincode... Enter correct One"
            }
        })
        .catch(()=>{
            error.textContent = "Error fetching data"
        });
        
    }
});
