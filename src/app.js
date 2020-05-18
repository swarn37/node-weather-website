const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const app=express();
//define paths for express config
const dirpath=path.join(__dirname,'../public');//joins the last dir in path with the dir defined ..means moving up a dir
const viewspath=path.join(__dirname,'../templates/views');
const partialpath=path.join(__dirname,'../templates/partials');
//setup handlebars engine and views location
app.set('view engine','hbs')//it is use to set the modules in this case handlebars
app.set('views',viewspath);//helps in giving a custom name to the view dir
hbs.registerPartials(partialpath);// partials help as a part of the html design used in different files
//setup static directory to serve
app.use(express.static(dirpath));//static will use all the files in the dir and will be express on the port


app.get('',(req,res)=>//.get is used to create a route
{
    res.render('index', /* handlebars are used to make a site dynamic */ // below a template is created
    {
        title:"Weather",
        name:"Swarn Bali"
    });//use to render handlebars
})
app.get('/about',(req,res)=>
{
    res.render('about',
    {
        title:"About Swarn",
        name:"Swarn Bali"
    })
})
app.get('/weather',(req,res)=>
{ 
   geocode(req.query.address,(error,{latitude,longitude,location }={})=>  //destructuring body in geocode
   {
       if(error)
       {
           return res.send({error});
       }
       forecast(latitude,longitude,(error,forecastData)=>
       {
           if(error)
           {
               return res.send({error});
           }
           res.send({
               forecast: forecastData,
               location,
               address:req.query.address
           })
       })
   })
  
})
app.get('/products',(req,res)=>{

    if(!req.query.search)
    {
         return res.send({ //below send will not work cuz return
            error:'the search is not found.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>// error page
{
    res.render('404',{
        title:"404",
        name:"Swarn Bali",
        errorMessage:"Page not found."
    })
})
app.listen(3000);
console.log("server working");