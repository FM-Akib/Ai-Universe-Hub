const LoadData=(dataLimit)=>{
    const url='https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then(response=>response.json())
    .then(data=>showData(data.data.tools,dataLimit));
}
loaderOn();


const showData=(data,dataLimit)=>{
const MainContainer=document.getElementById('main-container');
MainContainer.innerHTML='';

const show=document.getElementById('show-all');
if(dataLimit===8){
data= data.slice(0,8);
show.classList.remove('d-none')
}
else {
    show.classList.add('d-none')
}


data.forEach(data=>{
    const cardDiv=document.createElement('div');
    cardDiv.innerHTML=`
    <div class="card shadow-lg" style="width: 24rem;">
    <img src="${data.image ? data.image :'./images/not found.jpg'}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Feature</h5>
      <p>
        1. ${data.features[0]}<br>
        2. ${data.features[1]}<br>
        3. ${data.features[2]}</p>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
        <div>
      <h5 class="card-title">${data.name}</h5>
      <date><i class="fa-regular fa-calendar-days" style="color: #8a8a8a;"></i> ${data.published_in}</date>
    </div>
    <div>
      
      <a href="#" class="btn btn-primary" onclick="ModelView(${data.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-regular fa-circle-right"></i></a>
    </div>

</div>

    </div>
    </div>
    `
    MainContainer.appendChild(cardDiv);
});
loaderoff()
}
const ModelView=(id)=>{
    let url='';
   if(id<10){
    url=`https://openapi.programming-hero.com/api/ai/tool/0${id}`;

   }
   else{
    url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;

   }
    // const url=`https://openapi.programming-hero.com/api/ai/tool/0${id}`
    // console.log(url)
    fetch(url)
    .then(response=>response.json())
    .then(data=> showitemDetails(data.data))
}

const showitemDetails=(data=>{
const modal=document.getElementById('modal');
modal.innerHTML=`
<div class="modalContainer">
<div class="card " style="width: 28rem;">
  <div class="card-body">
    <h5 class="card-title ">${data.description}</h5>

    <div class="Allminicard BottomMargin mt-3">
    <div class="modalMiniCard">
    <h6 class="p-4"> ${data.pricing?data.pricing[0]?data.pricing[0].price:"N/A":"N/A"}   ${data.pricing?data.pricing[0]?data.pricing[0].plan:"N/A":"N/A"}</h6>
    </div>
    <div class="modalMiniCard">
    <h6 class="p-4"> ${data.pricing?data.pricing[1]?data.pricing[1].price:"N/A":"N/A"}   ${data.pricing?data.pricing[1]?data.pricing[1].plan:"N/A":"N/A"}</h6>
    </div>
    <div class="modalMiniCard">
    <h6 class="p-4"> ${data.pricing?data.pricing[2]?data.pricing[2].price:"N/A":"N/A"}   ${data.pricing?data.pricing[2]?data.pricing[2].plan:"N/A":"N/A"}</h6>
    </div>
    </div>


    <div class="lowerPart">
    <div>
    <h5 class="card-title">Feature</h5>
    <p>
      1. ${data.features?data.features[1]?data.features[1].feature_name:"N/A":"N/A"}<br>
      2. ${data.features?data.features[2]?data.features[2].feature_name:"N/A":"N/A"}<br>
      3. ${data.features?data.features[3]?data.features[3].feature_name:"N/A":"N/A"}</p>
    </div>
    <div>
    <div>
    <h5 class="card-title">Integrations</h5>
    <p>
      1. ${data.integrations?data.integrations[0]:"N/A"}<br>
      2. ${data.integrations?data.integrations[1]:"N/A"}<br>
      3. ${data.integrations?data.integrations[2]:"N/A"}</p>
    </div>
    </div>
    
    
    </div>
  </div>
</div>
<div class="card p-4 Modal_Image" style="width: 28rem;">
  <img src="${data.image_link?data.image_link[0]:'No Imgae Found'}" class="card-img-top " alt="...">
  <div id="accuracy"class="topright">${data.accuracy.score}% Accuracy</div>
  <div class="card-body">
  <h5>${data.input_output_examples?data.input_output_examples[0]?data.input_output_examples[0].input:"N/A":"N/A"  }</h5>
    <p class="card-text">${data.input_output_examples?data.input_output_examples[0]?data.input_output_examples[0].output:"N/A":"N/A"  }</p>
  </div>
</div>
</div>
`
const Accuracy=document.getElementById('accuracy')
if(data.accuracy.score===null){
        Accuracy.classList.add('d-none')
}
else{
    Accuracy.classList.remove('d-none')
}
})

document.getElementById('show-all-btn').addEventListener('click',function(){
    LoadData(12);
  })

function loaderOn(){
  const Load=document.getElementById('loader');
    Load.classList.remove('d-none');    
}
function loaderoff(){  
  const Load=document.getElementById('loader');
    Load.classList.add('d-none');    
}

function SortByDate(){
    const url='https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then(response=>response.json())
    .then(data=>connectData(data.data.tools));  
}
function connectData(data){
    const sortedArray=sortByDate(data)
    // console.log(sortedArray);
    showData(sortedArray,8)
}
function sortByDate(objects) {
    return objects.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        return dateA - dateB;
    });
}
LoadData(8);