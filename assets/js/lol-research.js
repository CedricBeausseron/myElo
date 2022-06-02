console.log('lol-research')

let apiKey;

if(window.location.href.includes("https://cedricbeausseron.github.io/myElo")) {//github
    apiKey = "";
}else if(window.location.href.includes("https://myelo.herokuapp.com/")){//heroku
    apiKey = "RGAPI-f30b5d4d-9697-4ab3-bd3b-e1c7d5e607af";  
}else{//local, change toutes les 24h
    apiKey = "RGAPI-ba0b5a8e-22ea-43dd-b0e4-ee1f50998e26";  
}

//voir pour utiliser async et await
//https://dmitripavlutin.com/javascript-fetch-async-await/

//with async await
getLoLUserByPseudo = async (pseudo) =>{
    let response = await fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+pseudo+'?api_key='+apiKey)
    return await response.json();
}

//EVENTS
let searching = false;
document.getElementById('input-search').addEventListener('input', (event) => {
    if(!searching){
        searching=true;
        setTimeout(() => {
            e = event.target;
            if(e.value){
                console.log('nouvelle recherche')
                getLoLUserByPseudo(e.value).then(lolUser => {
                    console.log(lolUser)
                })
                // document.getElementById('loader-search').classList.remove('invisible');
            }else{
                removeEvent();
            }
            searching = false;
        }, 1000);
    }
});


//tests
// trycatch = async (nb, pseudo) => {
//     try{
//         const response = await fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+pseudo+'?api_key='+apiKey)
//         .then((response) => {
//             console.log(nb +" : "+ response)
//         })
//     } catch (e) {
//         console.log("erreur" + e)
//     }
// }
// console.log("trycatch")
// trycatch("1", "lepti")
// trycatch("2", "zzerftgytrfgytrfgtrdfgfvgfgthjuioiuy")



mdn = async (nb, pseudo) => {
    fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+pseudo+'?api_key='+apiKey)
    .then(function(response) {
        if(response.ok) {
          response.blob().then(function(myBlob) {
              console.log(myBlob)
          });
        } else {
          console.log('Mauvaise réponse du réseau');
        }
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });    
}
console.log("mdn")
mdn("3", "Lepti")
mdn("4", "zzerftgytrfgytrfgtrdfgfvgfgthjuioiuy")

// async function fetchMovies404(pseudo) {
//     const response = await fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+pseudo+'?api_key='+apiKey);
    
//     response.ok;     // => false
//     response.status; // => 404
//     let ans;
//     if(await response.ok){
//         ans = await response.json();
//     }else{
//         ans = await response.text();
//     }
//     return ans;
// }
// console.log("fetchmovie")
// fetchMovies404("cdvfbgjtogfpkdsfkdbtonjirkofdpckofdnbjr").then(answer => {
//     console.log(answer)
// });
//endtest


// getLoLUserByPseudo("Lepti")
// .then(lolUser => {
//     console.log(lolUser)
//     console.log(lolUser.name)
// });

// document.getElementById("input-search").addEventListener("click", () =>{
//     console.log("truc")
// })

//without await

// callLolApi("Lepti")
// function callLolApi(pseudo){
//     fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+pseudo+'?api_key='+apiKey)
//     .then(result => result.json())
//     .then((output) => {
//         console.log(output);
//     }).catch(function(error) {
//         console.error("erreur : "+ error)
//     });
// }







//////////////////////////////////////////////
//copie venant du oldMyElo
//récupérer un json interne. attention il faut attendre le load pour pouvoir retourner et lire correctement
// let lol_champions_list = false;
// function getJSON(url, qs_params) {
//     function buildQueryString(params) {
//         return Object.entries(params).map(d => `${d[0]}=${d[1]}`).join('&');
//     }
//     return new Promise((resolve, reject) => {
//         const qs = qs_params ? '?' + buildQueryString(qs_params) : '';
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', `${url}${qs}`);

//         xhr.onload = function() {
//             if (xhr.status >= 200 && xhr.status < 400) {
//             resolve(JSON.parse(xhr.responseText));
//             } else {
//             resolve(xhr.responseText);
//             }
//         };
//         xhr.onerror = () => reject(xhr.statusText);
//         xhr.send();
//     });
// }
// getJSON("apis/riot/champions-1.21.1.json")
// .then(data => {
//     lol_champions_list = data.data;
//     console.log(lol_champions_list);
// });



// let api_key = "RGAPI-bc84889f-65ab-46a8-9825-d92a4c816fc8";

// let htmlEventCall = stringToHTML('<div id="call-event">event called !</div>');
// function callEvent(){
//     document.getElementById('search-section').append(htmlEventCall);
// }

// function callLoLChampionsMasteries(lol_profile_section, encrypted_summoner_id){
//     //champiosn masteries
//     fetch('https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+encrypted_summoner_id+'?api_key='+api_key)
//     .then(result => result.json())
//     .then((output) => {
//         console.log(output)
//         console.log(output[0]['championId']+" "+output[1]['championId']+" "+output[2]['championId']);
//         let answer = [];
//         if(lol_champions_list){
//             //doit deja etre array avant de chercher dedans
//             for(let i in lol_champions_list){
//                 // console.log(lol_champions_list[i]['key'])
//                 if( lol_champions_list[i]['key'] == output[0]['championId'] ||
//                     lol_champions_list[i]['key'] == output[1]['championId'] ||
//                     lol_champions_list[i]['key'] == output[2]['championId'] 
//                 ){
//                     answer.push(lol_champions_list[i])
//                 }
//             }
//             console.log(answer)
//             let lol_main_champions_section = (lol_profile_section.getElementsByClassName('main-champion'))
//             for (let pas = 0; pas < 3; pas++) {
//                 lol_main_champions_section[pas].getElementsByClassName('champion-name')[0].innerHTML = answer[pas]['name'];
//                 lol_main_champions_section[pas].getElementsByTagName("img")[0].src = "apis/riot/dragontail-11.19.1/img/champion/tiles/"+answer[pas]['id']+"_0.jpg"
//                 lol_main_champions_section[pas].getElementsByClassName('mastery-level')[0].innerHTML = "mastery "+output[pas]['championLevel'];
//                 lol_main_champions_section[pas].getElementsByClassName('mastery-points')[0].innerHTML = output[pas]['championPoints']+" points";
//             }
//         }
//     }).catch(function(error) {
//         console.error("erreur : "+error)
//     });
// }

// function callLolApi(pseudo){
//     callEvent();
//     fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+pseudo+'?api_key='+api_key)
//     .then(result => result.json())
//     .then((output) => {
//         console.log(output);
//         lol_profile_section = document.getElementById("lol-profile-section");
//         let lol_title = lol_profile_section.getElementsByTagName("h4")[0]
//         lol_title.innerHTML = output.name
//         document.getElementById('icon-lol-profile').src = "apis/riot/dragontail-11.19.1/11.19.1/img/profileicon/"+output.profileIconId+".png";
//         document.getElementById('lol-profile-section').classList.remove('d-none');
//         callLoLChampionsMasteries(lol_profile_section, output.id);
//         removeEvent();
//     }).catch(function(error) {
//         console.error("erreur : "+error)
//         removeEvent();
//     });
// }

// function stringToHTML (str) {
//     let parser = new DOMParser();
//     let doc = parser.parseFromString(str, 'text/html');
//     return doc.body;
// };

// function removeEvent(){
//     htmlEventCall.remove();
//     document.getElementById('loader-search').classList.add('invisible');
// }

// //EVENTS
// let searching = false;
// document.getElementById('input-search').addEventListener('input', (event) => {
//     if(!searching){
//         searching=true;
//         setTimeout(() => {
//             e = event.srcElement;
//             if(e.value){
//                 document.getElementById('loader-search').classList.remove('invisible');
//                 callLolApi(e.value);
//             }else{
//                 removeEvent();
//             }
//             searching = false;
//         }, 1000);
//     }
// });