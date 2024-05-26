//has used API of exchangerate-api.com to convert the currency and for flags flagsapi.com

alert("This Currency-Converter Application only converts the Indian rupees in Foreign Currency..");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {


  if(select.name === "to"){
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "INR") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "USD") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
  
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
  
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



const updateExchangeRate =async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  let requestURL = "https://v6.exchangerate-api.com/v6/bfbde2a29cf023a7bda49563/latest/INR";
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
 
  request.onload =  function() {
    let response = request.response;
    //console.log(response);
    let rate = response.conversion_rates[toCurr.value];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${Math.round(finalAmount * 100) /100} ${toCurr.value}`;
  }

};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


