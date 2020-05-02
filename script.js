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
allMoviesAtr.value = 0
allMovies.setAttributeNode(allMoviesAtr)
selectMovie.appendChild(allMovies)

// making page for Episodes
function makePageForEpisodes(episodeList) {
  episodeList.forEach((element) => {
    const divResponsive = document.createElement("div");
    const divCard = document.createElement("div");
    const divBodyCard = document.createElement("div");
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
    myImage.src = element.image.medium;
    const myText = document.createElement("p");
    const fontAwesome = document.createElement("i");
    fontAwesome.className += "fas fa-film ";
    myText.className += "card-text pt-md-3 pt-lg-4 ";
    myText.appendChild(fontAwesome).innerHTML =
      "This Episode's Summary is :" + element.summary;
    divBodyCard.appendChild(myHeader);
    divBodyCard.appendChild(myImage);
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



//level 300
//  making my  drop down  for episodes 
mySelectTag.addEventListener("change",function(){
  allEpisodes.forEach((element) => {
    const options = document.createElement("option");
    const idOfEachOption = document.createAttribute("id");
    idOfEachOption.value = element.id;
    options.innerHTML = `${element.name}-S${element.season < 10 ? 0 : ""}${
      element.season
    }E${element.number < 10 ? 0 : ""}${element.number}`;
    options.setAttributeNode(idOfEachOption);
    mySelectTag.appendChild(options);
  });
})

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
    rootElem.innerHTML = "";  
  } 
  else {
    filteredEps = data.filter((episode) => specificEps(episode));
    rootElem.innerHTML = "";
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
      .then( data  => {
           //make page with my uploaded Episodes
           function makePageForEpisodes(){
            data.forEach((element) => {
            const divResponsive = document.createElement("div");
            const divCard = document.createElement("div");
            const divBodyCard = document.createElement("div");
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
            // console.log(element.image)
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
              myImage.src = "https://www.kindpng.com/picc/m/4-43567_confused-shrugging-shrug-woman-confused-woman-don-t.png"
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
            divBodyCard.appendChild(myHeader);
            divBodyCard.appendChild(myImage);
            divBodyCard.appendChild(myText);
            divCard.appendChild(divBodyCard);
            divResponsive.appendChild(divCard);
            rootElem.appendChild(divResponsive);
          })};
        //make drop down list of episodes
        mySelectTag.innerHTML = ""
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
        console.log(allMovies.id)
        console.log(selectMovie.options[selectMovie.selectedIndex].id)
        console.log(data[0])
        console.log(selectMovie.options[selectMovie.selectedIndex].id)
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
  )  
})      

//level 500











function setup() {
  const allShows = getAllShows();
  
}

window.onload = setup;
