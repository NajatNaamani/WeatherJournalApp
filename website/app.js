// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=45b214631d003bb0272a74811fac9e9d&units=imperial';
const date = Date.now();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
   const zip =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
    getWeather(baseURL,zip,apiKey)
    
    // New Syntax!
    .then(function(data){
      // Add data
      postData('/add',{temp:data.main.temp, content:feelings, date:date} );
    })
    .then(function(){
        retrieveData();
    }
    )
  }

  
/* Function called by event listener */
const getWeather = async (baseURL, zip, apiKey)=>{

    const res = await fetch(baseURL+zip+apiKey)
    try {
  
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };
/* Function to GET Web API Data*/

/* Function to POST data */
const postData = async ( url , data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData);
    // Write updated data to DOM elements, get always the recenet data pushed to the array
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =new Date(allData.date).toLocaleDateString();
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   };