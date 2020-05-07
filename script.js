// level 100
const rootElem = document.getElementById("root");
const mySearchInput = document.querySelector("#search");
const myDisplay = document.querySelector(".describe");
const selectMovie = document.getElementById("movies");
const mySelectTag = document.querySelector("#episode");
const allEps = document.createElement("option") 
allEps.innerHTML = "All Episodes"
const allEpsAtr = document.createAttribute("id")
allEpsAtr.value = 0
allEps.setAttributeNode(allEpsAtr)
mySelectTag.appendChild(allEps)
const allMovies = document.createElement("option")
allMovies.innerHTML = "Choose your Movie"
const allMoviesAtr = document.createAttribute("id")
allMoviesAtr.value = null
allMovies.setAttributeNode(allMoviesAtr)
selectMovie.appendChild(allMovies)

// making page for Episodes
function makePageForEpisodes(episodeList) {
  episodeList.forEach((element) => {
    const divResponsive = document.createElement("div");
    const divCard = document.createElement("div");
    const divBodyCard = document.createElement("div");
    const divCardHeader = document.createElement("div");
    divResponsive.className += "col-sm-12 col-md-4 mb-sm-3 mb-md-3 mb-lg-3 p-2";
    divCard.className += "card col-12  p-sm-1";
    divBodyCard.className += "card-body  col-md-12 p-sm-1";
    const myHeader = document.createElement("h5");
    myHeader.className +=
      "card-title border col-md-12 col-lg-12  p-sm-4 shadow p-sm-3 mb-5  text-light";
    myHeader.textContent = `${element.name}-S${element.season < 10 ? 0 : ""}${
      element.season
    }E${element.number < 10 ? 0 : ""}${element.number}`;
    const myImage = document.createElement("img");
    myImage.classList.add("card-img-top");
    myImage.src = element.image.medium;
    const myText = document.createElement("p");
    const fontAwesome = document.createElement("i");
    fontAwesome.className += "fas fa-film ";
    myText.className += "card-text pt-md-3 pt-lg-4 ";
    myText.appendChild(fontAwesome).innerHTML =
      "This Episode's Summary is :" + element.summary;
    divCardHeader.appendChild(myHeader);
    divCardHeader.appendChild(myImage);
    divBodyCard.appendChild(divCardHeader);
    divBodyCard.appendChild(myText);
    divCard.appendChild(divBodyCard);
    divResponsive.appendChild(divCard);
    rootElem.appendChild(divResponsive);
  });
}

// level 200
// making search input for specific word
mySearchInput.addEventListener("input", showMatchingEpisodes);
function showMatchingEpisodes(word) {
  filteredShow = nameSortedShow.filter((movie) => {
    if (selectMovie.options[selectMovie.selectedIndex].id == movie.id) {
      return true;
    } else {
      return false;
    }
  })
  let showId = filteredShow[0].id
   fetch("https://api.tvmaze.com/shows/" +`${showId}` + "/episodes")
    .then( response => 
       response.json())
   .then(data => {
     let filteredEps = data.filter((episode) =>
    hasSpecificWord(episode, word)
  )
  myDisplay.innerHTML =
    "Displaying " + filteredEps.length + "/" + data.length;
  rootElem.innerHTML = " ";
  makePageForEpisodes(filteredEps);
  })    
}



//function inside of showMatchingEpisodes
function hasSpecificWord(ep, word) {
  let wordInsensitive = word.target.value.toLowerCase();
  let nameInsensitive = ep.name.toLowerCase();
  let summaryInsensitive = ep.summary.toLowerCase();
  if (
    nameInsensitive.includes(wordInsensitive) ||
    summaryInsensitive.includes(wordInsensitive)
  ) {
    return true;
  } else {
    return false;
  }
}


// Find specific episode in drop down
mySelectTag.addEventListener("change", showSelectedEps);
function showSelectedEps() {
  filteredShow = nameSortedShow.filter((movie) => {
    if (selectMovie.options[selectMovie.selectedIndex].id == movie.id) {
      return true;
    } else {
      return false;
    }
  })

  let showId = filteredShow[0].id
   fetch("https://api.tvmaze.com/shows/" +`${showId}` + "/episodes")
    .then( response => 
       response.json())
    .then( data =>{
    if (mySelectTag.options[mySelectTag.selectedIndex].id == 0) { 
      rootElem.innerHTML = ""
     makePageForEpisodes(data)
  } 
  else {
    rootElem.innerHTML = "";
    filteredEps = data.filter((episode) => specificEps(episode));
    makePageForEpisodes(filteredEps);
  }
})
}   


// function of filter inside showSelectedEps function
function specificEps(episode) {
  if (mySelectTag.options[mySelectTag.selectedIndex].id == episode.id) {
    return true;
  } else {
    return false;
  }
}




// level 400
const allShows = getAllShows();
const  nameSortedShow = allShows.sort(function (a, b) {
  if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
    return -1;
  }
  if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
    return 1;
  }
  return 0;
});


function makeShowsList(nameSortedShow) {
  nameSortedShow.forEach((element) => {
    const options = document.createElement("option");
    const idOfEachOption = document.createAttribute("id");
    const nameOfEachOption =document.createAttribute("name")
    idOfEachOption.value = element.id;
    nameOfEachOption.value = element.name;
    options.innerHTML = `${element.name}`;
    options.setAttributeNode(idOfEachOption);
    options.setAttributeNode(nameOfEachOption);
    selectMovie.appendChild(options);
  });
}


selectMovie.addEventListener("change", function() {
  filteredShow = nameSortedShow.filter((movie) => {
    console.log("movieId :" , movie.id)  
    if (selectMovie.options[selectMovie.selectedIndex].id == movie.id) {
        return true;
      } else {
        return false;
      }
    })
    if(filteredShow.length > 0){
    // console.log("filteredshow :" ,filteredShow)
     let showId = filteredShow[0].id
     fetch("https://api.tvmaze.com/shows/" +`${showId}` + "/episodes")
      .then( response => 
         response.json())
      .then( data  => {
           //make page with my uploaded Episodes
           function makePageForEpisodes(){
            data.forEach((element) => {
            const divResponsive = document.createElement("div");
            const divCard = document.createElement("div");
            const divBodyCard = document.createElement("div");
            const divCardHeader = document.createElement("div");
            divResponsive.className += "col-sm-12 col-md-4 mb-sm-3 mb-md-3 mb-lg-3 p-2";
            divCard.className += "card col-12  p-sm-1";
            divBodyCard.className += "card-body  col-md-12 p-sm-1";
            const myHeader = document.createElement("h5");
            myHeader.className +=
              "card-title border col-md-12 col-lg-12  p-4 shadow p-3 mb-5  text-light";
            myHeader.textContent = `${element.name}-S${element.season < 10 ? 0 : ""}${
              element.season
            }E${element.number < 10 ? 0 : ""}${element.number}`;
            const myImage = document.createElement("img");
            myImage.classList.add("card-img-top");
            if(element.image != null){
            myImage.src = element.image.medium;}
            const myText = document.createElement("p");
            const fontAwesome = document.createElement("i");
            fontAwesome.className += "fas fa-film ";
            myText.className += "card-text pt-md-3 pt-lg-4 ";
            if(element.summary != ""){
            myText.appendChild(fontAwesome).innerHTML =
              "This Episode's Summary is :" + element.summary;
            }
            else{
              myText.appendChild(fontAwesome).innerHTML = "This Episode doesn't have summary,you need to watch it :)"
            }
            if(element.image == null){
              myImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZz41AfUN6JDKErhgZAmfX0V-xWuXwzuZ_e4zB64aELfACFS1n&usqp=CAU"
              myImage.className += "myNullImage"
              const myText = document.createElement("p");
              const fontAwesome = document.createElement("i");
              fontAwesome.className += "fas fa-film ";
              myText.className += "card-text pt-md-3 pt-lg-4 ";
              if(element.summary != ""){
              myText.appendChild(fontAwesome).innerHTML =
                "This Episode's Summary is :" + element.summary;
              }
              else{
                myText.appendChild(fontAwesome).innerHTML = "This Episode doesn't have summary,you need to watch it :)"
              }
            }
            divCardHeader.appendChild(myHeader);
           divCardHeader.appendChild(myImage);
            divBodyCard.appendChild(divCardHeader);
            divBodyCard.appendChild(myText);
            divCard.appendChild(divBodyCard);
            divResponsive.appendChild(divCard);
            rootElem.appendChild(divResponsive);
          })};
        //make drop down list of episodes
        mySelectTag.innerHTML = ""
        const allEps = document.createElement("option") 
        allEps.innerHTML = "All Episodes"
        const allEpsAtr = document.createAttribute("id")
        allEpsAtr.value = 0
        allEps.setAttributeNode(allEpsAtr)
        mySelectTag.appendChild(allEps)

        data.forEach((element) => {
          const options = document.createElement("option");
          const idOfEachOption = document.createAttribute("id");
          idOfEachOption.value = element.id;
          options.innerHTML = `${element.name}-S${element.season < 10 ? 0 : ""}${
          element.season
          }E${element.number < 10 ? 0 : ""}${element.number}`;
          options.setAttributeNode(idOfEachOption);
          mySelectTag.appendChild(options)
        }
        )

      if (selectMovie.options[selectMovie.selectedIndex].id == 0) {
         rootElem.innerHTML = ""
        } 
       else {
        filteredShow = data.filter((movie) => 
         { if (selectMovie.options[selectMovie.selectedIndex].id == movie.id)
            {
              return true;
             } 
           else {
            return false;
            }
            })
           rootElem.innerHTML = "";
            makePageForEpisodes(filteredShow)
       }
    }
  )}
  else{
    const noFilm = document.createElement("div")
    rootElem.innerHTML = ""
    mySelectTag.innerHTML = ""
    const allEps = document.createElement("option") 
    allEps.innerHTML = "All Episodes"
    const allEpsAtr = document.createAttribute("id")
    allEpsAtr.value = 0
    allEps.setAttributeNode(allEpsAtr)
    mySelectTag.appendChild(allEps)
    const myHomePage = document.createElement("div")
    noFilm.innerHTML = "NO FILM SELECTED"
    noFilm.className += "noFilm m-auto"
    myHomePage.className += "m-auto"
    const homePageImgContainer = document.createElement("div")
    const myHomePageImg = document.createElement("img")
    myHomePageImg.src = "https://media1.tenor.com/images/5bd83065bde4fd090073c80ee6fa9504/tenor.gif?itemid=10244466"
    myHomePageImg.className += "myHomePageImg col-12 "
    myHomePage.appendChild(noFilm)
    homePageImgContainer.appendChild(myHomePageImg)
    rootElem.appendChild(myHomePage)
    rootElem.appendChild(homePageImgContainer)
    
  }  
}) 

function setup(){
 makeShowsList(nameSortedShow)
 document.querySelector(".describe").innerHTML = ""
 const homePageImgContainer = document.createElement("div")
 const mySetupImg = document.createElement("img")
 mySetupImg.src = "https://www.lovelyquotesimages.com/wp-content/uploads/2020/02/welcome-Gif.gif"
 mySetupImg.className += "col-12  mySetupImg"
 homePageImgContainer.appendChild(mySetupImg)
 rootElem.appendChild(homePageImgContainer)
}

window.onload = setup;






//level 300
//  making my  drop down  for episodes 
// mySelectTag.addEventListener("change",function(){
//   allEpisodes.forEach((element) => {
//     const options = document.createElement("option");
//     const idOfEachOption = document.createAttribute("id");
//     idOfEachOption.value = element.id;
//     options.innerHTML = `${element.name}-S${element.season < 10 ? 0 : ""}${
//       element.season
//     }E${element.number < 10 ? 0 : ""}${element.number}`;
//     options.setAttributeNode(idOfEachOption);
//     mySelectTag.appendChild(options);
//   });
// })

//level 500

// function setup() {
//   const allShows = getAllShows();
//   function makeAllShows(allShows){
//   allShows.forEach(element =>{
//     const divResponsive = document.createElement("div")
//     divResponsive.className += "container"
//     const divRow = document.createElement("div")
//     divRow.className += "row"
//     const divBody = document.createElement("div")
//     divBody.className += "col-12 col-sm-12"
//     const divContents = document.createElement("div")
//     divContents.className += "alert alert-warning border border-success rounded-top divDisplay"
//     const myImage = document.createElement("img")
//     if(element.image != null){
//     myImage.src = element.image.medium}
//     else{
//       myImage.src = "https://thumbs.dreamstime.com/z/upset-magnifying-glass-cute-not-found-symbol-unsuccessful-search-zoom-icon-no-suitable-results-upset-magnifying-glass-cute-122205498.jpg"
//     }
//     myImage.className += "col-4 col-sm-4 border border-danger m-auto"
//     const mySummary = document.createElement("p")
//     mySummary.className += "col-4 col-sm-4 text-center bg-primary text-dark"
//     if(element.summary != ""){
//     mySummary.innerHTML = element.summary
//     }
//     else{
//       mySummary.innerHTML = "This Movie is New,doesn't have any summary yet"
//     }
//     const divRandom = document.createElement("div")
//     divRandom.className += "col-4 col-sm-4 border border-dark"
//     const paragraphOne = document.createElement("p")
//     const paragraphTwo = document.createElement("p")
//     const paragraphThree =document.createElement("p")
//     const paragraphFour = document.createElement("p")
//     paragraphOne.className += "mb-1 m-auto"
//     paragraphOne.innerHTML = element.rating.average
//     paragraphTwo.className += "my-1 my-sm-1"
//     let lastName =element.genres[element.genres.length - 1]
//     element.genres.forEach(name => {
//       if(name == (lastName))
//       {
//         paragraphTwo.innerHTML += name 
//     }
//       else{
//         paragraphTwo.innerHTML += name + " | "
//       }
//     })
//     paragraphThree.className += "mb-1 m-auto"
//     paragraphThree.innerHTML = element.status
//     paragraphFour.className += "mb-1 m-auto"
//     paragraphFour.innerHTML = element.runtime
//     divRandom.appendChild(paragraphOne)
//     divRandom.appendChild(paragraphTwo)
//     divRandom.appendChild(paragraphThree)
//     divRandom.appendChild(paragraphFour)
//     divContents.appendChild(myImage)
//     divContents.appendChild(mySummary)
//     divContents.appendChild(divRandom)
//     divBody.appendChild(divContents)
//     divRow.appendChild(divBody)
//     divResponsive.appendChild(divRow)
//     rootElem.appendChild(divResponsive)
//   })}
//   makeAllShows(allShows)
// }


