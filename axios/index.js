// import axios from "axios";
// import { Platform } from "react-native";

// axios.defaults.headers = {
//     'Cache-Control': 'no-cache, no-store, must-revalidate',
//     Pragma: 'no-cache',
//     Accept: '*/*',
//   };

// const baseUrl = `http://152.42.170.59:8000/get-result/`;

// /**
//  * Axios là thư viện hỗ trợ kết nối HTTP request.
//  * Tạo hàm wrapper axios để gọi axios đơn giản và dễ hiểu hơn.
//  * @param {*} url - endpoint của API
//  * @param {*} method - kiểu HTTP request: GET, POST, UPDATE, DELETE...
//  * @param {*} params - tham số truyền vào cho request
//  * @returns axios instance
//  */
//  export async function myCall(url, method, params) {
//   let headers = {
//     'cache-control': 'no-cache',
//     'Content-Type': 'application/json; charset=utf-8',
//     device: 'MOBILE',
//     client: Platform.OS,
//   };
//   let options = {
//     headers,
//     method,
//     url, // movie/10
//     params// { author: 'hai', year : 234 }
//   };
//   return axios(options);
// };

// export async function myGet(param) {
//   try {
//     const config = {
//       headers : {
//         'cache-control': 'no-cache',
//         'Content-Type': 'application/json; charset=utf-8',
//         device: 'MOBILE',
//         client: Platform.OS,
//       }
//     }
//     const fullurl = `${baseUrl}/?ad_name=${param.name}&number=${param.number}`;
//     console.log('The url use in axios is: ', fullurl)
//     return axios.get(fullurl, config);
//   } catch (error) {
//     console.log('get error ', error)
//   }
// };  
  
import axios from "axios";
import { Platform } from "react-native";

axios.defaults.headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Accept: '*/*',
};

// const baseUrl = `http://152.42.170.59:8000`;
// const baseUrl = `https://679c-2405-4802-9150-d6e0-788f-4f62-355b-ef22.ngrok-free.app`;
const baseUrl = `http://103.20.97.118:8000`;

export async function myGetDetail(param) {
    try {
        const config = {
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json; charset=utf-8',
                device: 'MOBILE',
                client: Platform.OS,
            }
        };
        const fullurl = `${baseUrl}/get-result/?ad_name=${param.name}&specific=${param.specific}`;
        console.log('The url use in axios is: ', fullurl);
        return axios.get(fullurl, config);
    } catch (error) {
        console.log('get error ', error);
        throw error; // Throw the error to be caught in saga
    }
}

export async function myGetTotal(ad_name) {
    try {
        const config = {
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json; charset=utf-8',
                device: 'MOBILE',
                client: Platform.OS,
            }
        };
        const fullurl = `${baseUrl}/get-total/?ad_name=${ad_name}`;
        console.log('The url use in axios is: ', fullurl);
        return axios.get(fullurl, config);
    } catch (error) {
        console.log('get error ', error);
        throw error; // Throw the error to be caught in saga
    }
}

export async function myDelete(param) {
    try {
        const config = {
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json; charset=utf-8',
                device: 'MOBILE',
                client: Platform.OS,
            }
        };
        const fullurl = `${baseUrl}/delete-result/?ad_name=${param.name}&specific=${param.specific}`;
        console.log('The url use in axios is: ', fullurl);
        return axios.delete(fullurl, config);
    } catch (error) {
        console.log('delete error ', error);
        throw error; // Throw the error to be caught in saga
    }
}

export async function myUpdate(param) {
    try {
        const config = {
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json; charset=utf-8',
                device: 'MOBILE',
                client: Platform.OS,
            }
        };
        console.log(`The keyname in index is: `, param.keyName)
        console.log(`The specific in index is: `, param.specific)
        console.log(`The data in index is: `, param.editableData)
        console.log(`The specific New in index is: `, param.specificN)
        const body = {
            ad_name : '',
            specific : '',
            result_js : '',
            specificN: ''
        }
        body["ad_name"] = param.keyName
        body["specific"] = param.specific
        body["result_js"] = param.editableData
        body["specificN"] = param.specificN
        const fullurl = `${baseUrl}/update-result/`;
        console.log('The url used in axios is: ', fullurl);
        console.log('The body used in axios is: ', body);
        return axios.put(fullurl, body, config);
    } catch (error) {
        console.log('post error ', error);
        throw error; // Throw the error to be caught in saga
    }
}

export async function uploadImage(file, ad_name) {
    try {
        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type
        });
        formData.append('ad_name', ad_name);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                device: 'MOBILE',
                client: Platform.OS,
            }
        };

        const fullurl = `${baseUrl}/upload-image/`;
        console.log('The url used in axios is: ', fullurl);
        console.log('The form data used in axios is: ', formData);

        return axios.post(fullurl, formData, config);
    } catch (error) {
        console.log('post error ', error);
        throw error; // Throw the error to be caught in saga
    }
}

export async function mySave(file, ad_name, result_js, specific) {
    try {
        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type
        });
        formData.append('ad_name', ad_name);
        formData.append('result_js', result_js);
        formData.append('specific', specific);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                device: 'MOBILE',
                client: Platform.OS,
            }
        };

        const fullurl = `${baseUrl}/save-result/`;
        console.log('The url used in axios is: ', fullurl);
        console.log('The form data used in axios is: ', formData);

        return axios.post(fullurl, formData, config);
    } catch (error) {
        console.log('post error ', error);
        throw error; // Throw the error to be caught in saga
    }
}




