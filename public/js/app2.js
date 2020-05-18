//fetch from thhe url


const weatherForm=document.querySelector('form')//select the form tag after submit button
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1');
const messagetwo=document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>//submit is when we submit
{
    e.preventDefault()// it will not refresh the content on reloding the page
          const location=search.value//gives the value of the input
          
          messageOne.textContent='Loading...'
          messagetwo.textContent=''
          fetch('http://localhost:3000/weather?address=' + location).then((response)=>
          {
              response.json().then((data)=>
              {
                  if(data.error)
                  {
                     messageOne.textContent=data.error
                  }
                  else{
                    messageOne.textContent=data.location
                    messagetwo.textContent=data.forecast
                  }
              })
          })
        })