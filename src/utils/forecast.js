const request=require('request');

const forecast=(lat,lon,callback)=>
{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=e0dcc23766f8547451fd4e4adb5b8d32';
    request({url/*shorthand is used*/ ,json:true},(err,{body})=>
    {
        if(err)
   {
    callback('Unable to connect to the weather app',err);
   }
   else if(body.message)
   {
callback('Unable to find location',err);
   }
   else{
    callback(undefined, 'It is currently '+body.main.temp+' kelvins out.The high today is '+body.main.temp_max+' with a low of '+body.main.temp_min+ '.Also,the Humidity is '+body.main.humidity+'gm/metercube.')
}
    });
} 
module.exports=forecast