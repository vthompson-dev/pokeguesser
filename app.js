const guessButton = document.querySelector("#guessButton");
const reset = document.querySelector('#reset')
const correctName = document.querySelector('#correctName');
const pokeImage = document.querySelector('#pokeImage');
const img = document.querySelector('#spriteImage');
const hp = document.querySelector('#hpStat');
const atk = document.querySelector('#attackStat');
const def = document.querySelector('#defenseStat');
const spa = document.querySelector('#spattackStat');
const sdf = document.querySelector('#spdefenseStat');
const spd = document.querySelector('#speedStat');
const hint1 = document.querySelector('#hint1');
const hint2 = document.querySelector('#hint2');
const hint3 = document.querySelector('#hint3');
const hint4 = document.querySelector('#hint4');
const hint5 = document.querySelector('#hint5');
const pokeType = document.querySelector('#pokeType');
const firstLetter = document.querySelector('#firstLetter');
const ability = document.querySelector('#ability');
const locale = document.querySelector('#locale');
const pokeName = document.querySelector('#pokeName');
const pokeNo = document.querySelector('#pokeNo');
const imgP = document.querySelector('#imgP');
const nameDiv = document.querySelector('#nameDiv');
const winLose = document.querySelector('#winLose');
const giveUp = document.querySelector('#giveUp');
let id;
let type1;
let type2;
let nameValue;
let typeValues;
let abilities;
let locationArea;

reset.addEventListener('click', function () {
    location.reload();
})

let generatePokeNumber = Math.floor((Math.random() * 1015) + 1);

const getOnePokePath = `https://pokeapi.co/api/v2/pokemon/${generatePokeNumber}/`

const getLocationArea = `https://pokeapi.co/api/v2/pokemon/${generatePokeNumber}/encounters`

fetch(getOnePokePath)
    .then(res => {
        // console.log("Success", res)
        return res.json()
    })
    .then(data => {
        // console.log(data);
        correctName.innerText = data.name;
        const pokeSprite = img.setAttribute("src", data.sprites.front_default);
        hp.innerText = data.stats[0]?.base_stat ?? "N/A";
        atk.innerText = data.stats[1]?.base_stat ?? "N/A";
        def.innerText = data.stats[2]?.base_stat ?? "N/A";
        spa.innerText = data.stats[3]?.base_stat ?? "N/A";
        sdf.innerText = data.stats[4]?.base_stat ?? "N/A";
        spd.innerText = data.stats[5]?.base_stat ?? "N/A";
        typeValues = data.types ?? [];
        type1 = data.types?.[0]?.type?.name ?? null;
        type2 = data.types?.[1]?.type?.name ?? null;
        nameValue = data.species.name.split("")[0] ?? null;
        abilities = data.abilities?.[0]?.ability?.name ?? null;
        id = data.id ?? null;
        // console.log(nameValue);
    })
    .catch(e => {
        console.log("Error", e)
    })

fetch(getLocationArea)
    .then(res => {
        // console.log("Success", res)
        return res.json()
    })
    .then(data => {
        // console.log(data);
        locationArea = data?.[0]?.location_area?.name ?? null;
    })
    .catch(e => {
        console.log("Error", e)
    })

hint1.addEventListener('click', function (v) {
    if (typeValues.length !== 1) {
        pokeType.innerText = `${type1} and ${type2}`
    } else {
        pokeType.innerText = `${type1}`
    }
    v.preventDefault();
});
hint2.addEventListener('click', function (w) {
    if (nameValue === null) {
        firstLetter.innerText = "API Error, try clicking again."
    } else {
        firstLetter.innerText = nameValue.toUpperCase();
        w.preventDefault();
    }
});
hint3.addEventListener('click', function (u) {
    if (abilities === null) {
        ability.innerText = "API Error, try clicking again."
    } else {
        ability.innerText = `${abilities}`;
        u.preventDefault();
    }
});
hint4.addEventListener('click', function (t) {
    if (locationArea === null) {
        locale.innerText = "Cannot be caught in the wild, or API data missing."
    } else {
        locale.innerText = `${locationArea}`;
        t.preventDefault();
    }
});
hint5.addEventListener('click', function (s) {
    if (id === null) {
        pokeNo.innerText = "API Error, try clicking again."
    } else {
        pokeNo.innerText = `${id}`;
        s.preventDefault();
    }
});

guessButton.addEventListener('click', function (x) {
    if (pokeName.value.toLowerCase() === correctName.innerHTML) {
        imgP.classList.toggle('hide');
        nameDiv.classList.toggle('hide');
        winLose.innerText = 'Congratulations, you were right!'
        winLose.classList.add('trueText')
    } else {
        winLose.innerText = "Sorry, that wasn't right. Try again! If the pokemon has multiple forms, try including those with each word separated by a hyphen. For example, 'morpeko-full-belly'."
        winLose.classList.add('falseText')
    }
    x.preventDefault();
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('guessButton').click();
    }
});

giveUp.addEventListener('click', function (y) {
    imgP.classList.toggle('hide');
    nameDiv.classList.toggle('hide');
    winLose.innerText = 'Better luck next round!';
    winLose.classList.add('giveUpText');
    y.preventDefault();
})
