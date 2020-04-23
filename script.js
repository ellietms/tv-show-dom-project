const rootElem = document.getElementById("root");
const mySearchInput = document.createElement("input");
const myDisplay = document.createElement("p");
mySearchInput.className += "btn btn-secondary btn-lg btn-block col-12 col-sm-12 mb-sm-3 mb-md-3 mb-lg-3 p-2";
myDisplay.className += "text-light bg-dark";
mySearchInput.appendChild(myDisplay);
rootElem.appendChild(mySearchInput);
function makePageForEpisodes(episodeList) {
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
      rootElem.appendChild(divResponsive);});
      mySearchInput.onchange = function countEpisode(word){
        episodeList.forEach(element => 
          {if(element.name.includes(word.target.value) || element.summary.includes(word.target.value)){
               count += 1;
            }
            else{
              count += 0;
            }
          console.log(count);
         }
          );}
          
        
      // 
  
  // let count = 0 ;
  //  mySearchInput.onchange = function countEpisode(word){
  //  console.log(word.target.value);
  //  episodeList.foreach(element =>
  //   {if(element.name.includes(word.target.value) || element.summary.includes(word.target.value)){
  //      count += 1;
  //   }
  //   else{
  //     count += 0;
  //   }}
  // );
  // console.log(count);
  // }
  // myDisplay.innerHTML = "Displaying" + count + "/73 Ep";
  //  const countEpisode = episodeList.filter(element => {
//       if(element.summary.includes(e.target.value) || element.name.includes(e.target.value))
//       {
//         // console.log(element)
//         return element;
//       }
//     })
//  console.log(filterEpisode)

//   }
//   rootElem.appendChild(mySearchInput);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;
