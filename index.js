var ctx = document.getElementById('myChart').getContext('2d');
var list = document.getElementById('side');
  let httpReq=new XMLHttpRequest()
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'confirmed',
            data: [], 
        }
        ]
    },
    options: {
        title:{
            display:true,
            text:"Morocco"
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  function updateChart(chart,raw){
     let labels = raw.map(e=>{
        let d=new Date(e.Date)
        day=d.getDate();
        month=d.getMonth()+1;
        return `${day}/${month}`
    })
        let confirmed = raw.map(e=>e.Confirmed)
        let recovered=raw.map(e=>e.Recovered)
        let deaths = raw.map(e=>e.Deaths)
        let actives=raw.map(e=>e.Active)
        let datasets=[
        {
            label:"confirmed",
            data:confirmed,
            borderColor:"orange"
        },
        {
            label:"Recovered",
            data:recovered,
            borderColor:"green"
        },
          {
            label:"Actives",
            data:actives,
            borderColor:"blue"
        },
          {
            label:"Deaths",
            data:deaths,
            borderColor:"red"
        }]
        myChart.data.labels=labels
        myChart.options.title.text = raw[0].Country
        myChart.data.datasets=datasets;
        myChart.update()
        
    
  }
function divClecked(e) {

    if(e == null)
     code="MA"
 else     code = e.target.getAttribute("id");

        
        
   httpReq.open("GET","https://api.covid19api.com/dayone/country/"+code,true)
  httpReq.onreadystatechange=function(){
  if(httpReq.readyState==4 && httpReq.status == 200){
        let raw=JSON.parse(httpReq.response);
        updateChart(myChart,raw);
    }   
}
 httpReq.send()
}
httpReq.open("GET","https://api.covid19api.com/countries",true)
httpReq.onreadystatechange=function(){
    if(httpReq.readyState==4 && httpReq.status == 200){
        let raw=JSON.parse(httpReq.response)
        resp=raw.sort((a,b)=>a.Country<b.Country?-1:1);
        resp.forEach(e =>{
            let d=document.createElement("div")
            d.setAttribute("id",e.ISO2)
            d.setAttribute('class',"listitem")
            d.innerHTML=e.Country
           d.addEventListener("click",divClecked)
            list.appendChild(d)
        });
        divClecked(null);
    }
}
httpReq.send();








