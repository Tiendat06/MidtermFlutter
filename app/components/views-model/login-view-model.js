import { Http, HttpResponse } from "@nativescript/core";
import { Observable } from '@nativescript/core';

async function getWeatherAPI() {
    // const apiUrl = "https://www.tiendatdev.top/api_new/get-students.php";
    const apiUrl = "http://192.168.100.3/api_new/get-students.php";
    // const apiUrl = "https://api.weatherapi.com/v1/current.json?key=9fce428d7ab14527a4d70202232211&q=%22Ho%20Chi%20Minh%22";
    
    try {
        const result = await Http.getJSON(apiUrl);
        console.log(result.message);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export function dataOnLoginPage(context) {
    const viewModel = new Observable();  
    viewModel.counter = 42
    getWeatherAPI()
        .then((repsponse) => {
            viewModel.set('message', repsponse.message);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    if(context){
        viewModel.set('items', context.items);
    }
  
    return viewModel;
}
