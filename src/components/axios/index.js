import JSONP from "jsonp";
export default class Axios1 {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JSONP(options.url, {
                param: 'callback',
            }, function (err, response) {
                if(response){
                    resolve(response)
                }else{
                    reject(err.message)
                }
            })
        })
    }
}