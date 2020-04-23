const rootElem = document.getElementById("root");
const mySearchInput = document.querySelector("#search");
const myDisplay = document.querySelector(".describe");
function makePageForEpisodes(episodeList)
{
  episodeList.forEach(element => { 
      const divResponsive = document.createElement("div");
      const divCard = document.createElement("div");
      const divBodyCard = document.createElement("div");
      divResponsive.className += "col-4 col-sm-4 mb-sm-4 mb-md-3 mb-lg-4 p-4";
      divCard.classList.add("card");
      divBodyCard.classList.add("card-body");
      const myHeader = document.createElement("h5");
      myHeader.className += "card-title border rounded p-4 shadow p-3 mb-5  rounded  text-light";
      myHeader.textContent = `${element.name}-S${element.season < 10 ? 0:""}${element.season}E${element.number < 10 ? 0:""}${element.number}`;
      const myImage = document.createElement("img");
      myImage.classList.add("card-img-top");
      myImage.src = element.image.medium;
      const myText = document.createElement("p");
      const fontAwesome = document.createElement("i");
      fontAwesome.className += "fas fa-film ";
      myText.className += "card-text pt-md-3 pt-lg-4 ";
      myText.appendChild(fontAwesome).innerHTML =" This Episode Summary is :" + element.summary;
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
//return true if given ep object contains given word -- else false
// to do make case insensitive 
// check in summary and title
function hasSpecificWord(ep,word){
  if(ep.name.includes(word)){
    return true;
  }
  else{
    return false;
  }
}
console.log("test result is ",hasSpecificWord(allEpisodes[0],"Winter"));
mySearchInput.addEventListener("input",showMatchingEpisodes);
function showMatchingEpisodes(word){
//find matching Eps
let filteredEps = allEpisodes.filter(episode => hasSpecificWord(episode,word));
console.log(filteredEps.length);
//re make page with match eps

// update count 
  let count = 0;
  allEpisodes.forEach(element =>
        {
        let name = element.name.toLowerCase();
        let summary = element.summary.toLowerCase();
        let newword = word.target.value.toLowerCase();
        if(name.includes(newword)){
          count += name.match(new RegExp(newword, "g")).length

        }
        if(summary.includes(newword)){
          count += summary.match(new RegExp(newword, "g")).length
        }
      }
   )
   myDisplay.innerHTML = "Displaying " + count;
  };        


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
window.onload = setup;
