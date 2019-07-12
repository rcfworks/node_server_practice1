console.log('Client side javascript loaded!');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const display = document.querySelector("#transporter");

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(search.value);
    display.textContent = search.value;
    
    fetch('http://localhost:3050/weather?address='+search.value).then((response)=>{
        response.json().then((data)=>{
            console.log(data);
            display.textContent = JSON.stringify(data);
        });
    });
});
