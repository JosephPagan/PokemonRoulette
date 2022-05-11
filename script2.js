document.querySelector('#generate').addEventListener('click',() => {
  generateUserPokemon();
  

});
document.querySelector('#battle').addEventListener('click', () => {
  generateBotPokemon();
  //battle();
});
document.querySelector('#searchButton').addEventListener('click', () => {
  searchPokemon();
});

function randomIntFromInterval(min,max){
    return Math.floor( Math.random() * (max - min + 1) + min);
};

function convertHeight(n) {
  let centimeters = n * 10;
  let initial = Math.floor(centimeters / 2.54);
  let feet = Math.floor(initial / 12);
  let inches = (initial - (feet * 12));
  if (feet <= 0) {
    return `${inches} inches`
  } else if (feet > 0 && inches <= 0) {
    return `${feet}ft`
  } else {
    return `${feet} ft ${inches} in`;  
  }  
}

function convertWeight(b) {
  return Math.ceil(b / 4.55) + ' lbs';
}

function extractType(array) {
  let result = [];
  for (x = 0; x < array.length; x++) {
    let typeData = array[x];
    for (let key in typeData.type) {
      if (key == 'name') {
        result.push(`${typeData.type[key]}`);
      }
    }
  }
  return result.join(' ');
}

function searchPokemon(str) {
  let pokName = document.querySelector('#pName').value.toLowerCase();
  
  const apiData = {
    url: 'https://pokeapi.co/api/v2/',
    type: 'pokemon',
    name: pokName,
  }
  console.log(apiData.name);
  const {url, type, name} = apiData;
  const apiUrl = `${url}${type}/${name}`;
  console.log(apiUrl);

  fetch(apiUrl)
    .then( (data) => data.json())
    .then( (pokemon) => {
      document.querySelector('#userPokeName').innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      document.querySelector('#userPokemon').src = pokemon.sprites.other.home.front_default
      document.querySelector('#userPokemon').className = 'pokePic'
      document.querySelector('#botPokemon').className = 'pokePic'
      document.querySelector('#userHeight').innerText = 'Height: ' + convertHeight(pokemon.height)
      document.querySelector('#userWeight').innerText = 'Weight: ' + convertWeight(pokemon.weight)
      document.querySelector('#userType').innerText = 'Type: ' + extractType(pokemon.types)
      document.querySelector('#userPower').innerText = pokemon.base_experience
    })
  
}

function generateUserPokemon() {
  //when generate button is pressed this span will appear
  //document.querySelector('#action').innerText = 'Get Ready To Battle!';
  const apiData = {
    url: 'https://pokeapi.co/api/v2/',
    type: 'pokemon',
    id: randomIntFromInterval(0,718),
  }
  const {url, type, id} = apiData;
  const apiUrl = `${url}${type}/${id}`;
  //console.log(apiUrl);

  fetch(apiUrl)
    .then( (data) => data.json())
    .then( (pokemon) => {
      document.querySelector('#userPokeName').innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      document.querySelector('#userPokemon').src = pokemon.sprites.other.home.front_default
      document.querySelector('#userPokemon').className = 'pokePic'
      document.querySelector('#botPokemon').className = 'pokePic'
      document.querySelector('#userHeight').innerText = 'Height: ' + convertHeight(pokemon.height)
      document.querySelector('#userWeight').innerText = 'Weight: ' + convertWeight(pokemon.weight)
      document.querySelector('#userType').innerText = 'Type: ' + extractType(pokemon.types)
      document.querySelector('#userPower').innerText = pokemon.base_experience
    })
}

function battle(b) {
  let uPower = document.querySelector('#userPower').innerHTML;
  //console.log(uPower);
  //console.log(b);
  if (uPower > b) {
    return 'Win!';
  } else {
    return 'Lose';
  }
}

function score(str) {
  let result = 0;
  if (str === 'Win!') {
    result += 1;
  }
  return result;
}

function countLoss(str) {
  let result = 0;
  if (str === 'Lose') {
    result += 1;
  }
  return result;
}

function champion(z, q) {
  if (z == 10 && !(q > 10)) {
    return 'You are Champion!'
  } else if (q == 10 && !(z > 10)) {
    return 'You have lost the battle'
  } else if (z == 69) {
    return 'Niccceeee'
  } else if (z == 100) {
    return 'You are a Pokemon Master!'
  } else {
    return '';
  }
}

function generateBotPokemon() {
  //get bot Pokemon data and display it
  const apiData = {
    url: 'https://pokeapi.co/api/v2/',
    type: 'pokemon',
    id: randomIntFromInterval(0,718),
  }
  const {url, type, id} = apiData;
  const apiUrl = `${url}${type}/${id}`;
  //console.log(apiUrl);

  fetch(apiUrl)
    .then( (data) => data.json())
    .then( (botPokemon) => {
      document.querySelector('#botPokeName').innerHTML = botPokemon.name.charAt(0).toUpperCase() + botPokemon.name.slice(1)
      document.querySelector('#botPokemon').src = botPokemon.sprites.other.home.front_default
      document.querySelector('#botHeight').innerText = 'Height: ' + convertHeight(botPokemon.height)
      document.querySelector('#botWeight').innerText = 'Weight: ' + convertWeight(botPokemon.weight)
      document.querySelector('#botType').innerText = 'Type: ' + extractType(botPokemon.types)
      document.querySelector('#botPower').innerText = botPokemon.base_experience
      document.querySelector('#result').innerText = battle(botPokemon.base_experience);
      document.querySelector('#winCount').innerText = Number(document.querySelector('#winCount').innerText) + score(document.querySelector('#result').innerText)
      document.querySelector('#lossCount').innerText = Number(document.querySelector('#lossCount').innerText) + countLoss(document.querySelector('#result').innerText)
      document.querySelector('#championDec').innerText = champion(document.querySelector('#winCount').innerText, document.querySelector('#lossCount').innerText)
    })
}
