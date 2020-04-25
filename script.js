const rootElem = document.getElementById("root");
const mySearchInput = document.querySelector("#search");
const myDisplay = document.querySelector(".describe");
  
function makePageForEpisodes(episodeList)
{
  episodeList.forEach(element => { 
      const divResponsive = document.createElement("div");
      const divCard = document.createElement("div");
      const divBodyCard = document.createElement("div");
      divResponsive.className += "col-sm-12 col-md-4 mb-sm-3 mb-md-3 mb-lg-3 p-2";
      divCard.className += "card col-12  p-sm-1";
      divBodyCard.className += "card-body  col-md-12 p-sm-1";
      const myHeader = document.createElement("h5");
      myHeader.className += "card-title border col-md-12 col-lg-12  p-4 shadow p-3 mb-5  text-light";
      myHeader.textContent = `${element.name}-S${element.season < 10 ? 0:""}${element.season}E${element.number < 10 ? 0:""}${element.number}`;
      const myImage = document.createElement("img");
      myImage.classList.add("card-img-top");
      myImage.src = element.image.medium;
      const myText = document.createElement("p");
      const fontAwesome = document.createElement("i");
      fontAwesome.className += "fas fa-film ";
      myText.className += "card-text pt-md-3 pt-lg-4 ";
      myText.appendChild(fontAwesome).innerHTML = "This Episode Summary is :" + element.summary;
      divBodyCard.appendChild(myHeader);
      divBodyCard.appendChild(myImage);
      divBodyCard.appendChild(myText);
      divCard.appendChild(divBodyCard);
      divResponsive.appendChild(divCard);
      rootElem.appendChild(divResponsive);
    }
 )
}
 // level 200 
      

let allEpisodes = getAllEpisodes();
mySearchInput.addEventListener("input",showMatchingEpisodes);
function showMatchingEpisodes(word){
  let filteredEps = allEpisodes.filter(episode => hasSpecificWord(episode,word));
  myDisplay.innerHTML = "Displaying " + (filteredEps.length)+"/"+(allEpisodes.length);
  rootElem.innerHTML =" ";
  makePageForEpisodes(filteredEps);
  
}

function hasSpecificWord(ep,word){
  let wordInsensitive = word.target.value.toLowerCase();
  let nameInsensitive =  ep.name.toLowerCase();
  let summaryInsensitive = ep.summary.toLowerCase();
   if(nameInsensitive.includes(wordInsensitive) || summaryInsensitive.includes(wordInsensitive)){
     return true;
   }
   else{
     return false;
   }
 }
  
 //level 300
 const mySelectTag = document.querySelector("#movies");
 mySelectTag.addEventListener("change",selectedEps(allEpisodes));
 function selectedEps(allEpisodes){
  allEpisodes.forEach(element =>{
    const options = document.createElement("option");
    options.textContent = `${element.name}-S${element.season < 10 ? 0:""}${element.season}E${element.number < 10 ? 0:""}${element.number}`;
    mySelectTag.appendChild(options);
  })
 }



 
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
window.onload = setup;
