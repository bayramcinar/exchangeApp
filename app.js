var dolar = document.querySelector(".dolar");
var euro = document.querySelector(".euro");
var sterlin = document.querySelector(".sterlin");
var altın = document.querySelector(".altın");
var tarihText = document.querySelector(".tarihText");
const submitButton = document.getElementById('submitBtn');
var moneyText = document.querySelector(".moneyText");
var changeButton = document.querySelector(".fa-arrow-right-arrow-left");
var sagSelected = document.querySelector(".sagSelected");
var solSelected = document.querySelector(".solSelected");


const selectElementSag = document.getElementById('sag');
var selectedValueSag = "USD";


selectElementSag.addEventListener('change', function() {
    selectedValueSag = selectElementSag.value;
});
const selectElementSol = document.getElementById('sol');
var selectedValueSol ="TRY";


selectElementSol.addEventListener('change', function() {
    selectedValueSol = selectElementSol.value;
});

function changeInput(){
    
    selectedValueSag = selectElementSol.value;
    selectedValueSol = selectElementSag.value;

    sagSelected.innerHTML = selectedValueSag;
    solSelected.innerHTML = selectedValueSol;
    selectElementSol.value = selectedValueSol;
    selectElementSag.value=selectedValueSag;

}

changeButton.addEventListener('click', changeInput);

var numDolar;
var numEuro;
var numSterlin;

fetch('https://finans.truncgil.com/today.json')
    .then(response => response.json())
    .then(data => {
      
        const dolarFiyat = data.USD.Alış;
        const euroFiyat = data.EUR.Alış;
        const sterlinFiyat = data.GBP.Alış;

        numDolar = parseFloat(dolarFiyat.replace(",", "."));
        numEuro = parseFloat(euroFiyat.replace(",", "."));
        numSterlin = parseFloat(sterlinFiyat.replace(",", "."));
          
        const altinAlis = data['gram-altin']['Alış'];  
        const tarih = data["Update_Date"];
        tarihText.innerHTML = tarih;
        dolar.innerHTML = data.USD.Alış + " TL";
        euro.innerHTML = data.EUR.Alış + " TL";
        sterlin.innerHTML = data.GBP.Alış + " TL";
        altın.innerHTML = altinAlis + " TL";

    })
    .catch(error => {
        console.error('Hata:', error);
    });    

submitButton.addEventListener('click', function(event) {
    event.preventDefault(); 
        
    const inputField = document.querySelector('.form-control');
    const valuee = inputField.value;
    var value = parseFloat(valuee);
    

    var convert;

    if(isNaN(value)){
        moneyText.innerHTML = "Invalid";
    }
    else{
        if (selectedValueSol == "TRY") {
            if (selectedValueSag == "USD") {
                convert = value / numDolar;
            } else if (selectedValueSag == "EUR") {
                convert = value / numEuro;
            } else if (selectedValueSag == "GBP") {
                convert = value / numSterlin;
            }else if (selectedValueSag == "TRY") {
                convert = value;
            }
        } else if (selectedValueSol == "USD") {
            if (selectedValueSag == "TRY") {
                convert = value * numDolar;
            } else if (selectedValueSag == "EUR") {
                convert = value * (numDolar / numEuro);
            } else if (selectedValueSag == "GBP") {
                convert = value * (numDolar / numSterlin);
            }else if (selectedValueSag == "USD") {
                convert = value;
            }
        } else if (selectedValueSol == "EUR") {
            if (selectedValueSag == "TRY") {
                convert = value * numEuro;
            } else if (selectedValueSag == "USD") {
                convert = value * (numEuro / numDolar);
            } else if (selectedValueSag == "GBP") {
                convert = value * (numEuro / numSterlin);
            }
            else if (selectedValueSag == "EUR") {
                convert = value;
            }
        } else if (selectedValueSol == "GBP") {
            if (selectedValueSag == "TRY") {
                convert = value * numSterlin;
            } else if (selectedValueSag == "USD") {
                convert = value * (numSterlin / numDolar);
            } else if (selectedValueSag == "EUR") {
                convert = value * (numSterlin / numEuro);
            }else if (selectedValueSag == "GBP") {
                convert = value;
            }
        }
    }
    


    moneyText.innerHTML = convert.toFixed(2) +" "+ selectedValueSag;


});
