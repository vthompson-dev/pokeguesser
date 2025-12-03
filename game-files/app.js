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
const hint1 = document.querySelector('#hint1')
const hint2 = document.querySelector('#hint2')
const pokeType = document.querySelector('#pokeType')
const firstLetter = document.querySelector('#firstLetter')
const pokeName = document.querySelector('#pokeName')
const imgP = document.querySelector('#imgP')
const nameDiv = document.querySelector('#nameDiv')
const winLose = document.querySelector('#winLose')

guessButton.addEventListener('mouseover', function () {
    guessButton.classList.add('buttonHover')
});

guessButton.addEventListener('mouseout', function () {
    guessButton.classList.remove('buttonHover')
});

hint1.addEventListener('mouseover', function () {
    hint1.classList.add('buttonHover')
});

hint1.addEventListener('mouseout', function () {
    hint1.classList.remove('buttonHover')
});

hint2.addEventListener('mouseover', function () {
    hint2.classList.add('buttonHover')
});

hint2.addEventListener('mouseout', function () {
    hint2.classList.remove('buttonHover')
});

reset.addEventListener('mouseover', function () {
    reset.classList.add('buttonHover')
});

reset.addEventListener('mouseout', function () {
    reset.classList.remove('buttonHover')
});

reset.addEventListener('click', function () {
    location.reload();
})

let generatePokeNumber = Math.floor((Math.random() * 1015) + 1);

const getOnePokePath = `https://pokeapi.co/api/v2/pokemon/${generatePokeNumber}/`

fetch(getOnePokePath)
    .then(res => {
        console.log("Success", res)
        return res.json()
    })
    .then(data => {
        console.log(data);
        correctName.innerText = data.name;
        const pokeSprite = img.setAttribute("src", data.sprites.front_default);
        hp.innerText = data.stats[0].base_stat
        atk.innerText = data.stats[1].base_stat
        def.innerText = data.stats[2].base_stat
        spa.innerText = data.stats[3].base_stat
        sdf.innerText = data.stats[4].base_stat
        spd.innerText = data.stats[5].base_stat
        hint1.addEventListener('click', function () {
            if (data.types.length !== 1) {
                pokeType.innerText = `${data.types[0].type.name} and ${data.types[1].type.name}`
            } else {
                pokeType.innerText = `${data.types[0].type.name}`
            }
        })
        hint2.addEventListener('click', function () {
            const stringArray = data.name.split("");
            firstLetter.innerText = stringArray[0].toUpperCase();
        })
    })
    .catch(e => {
        console.log("Error", e)
    })

guessButton.addEventListener('click', function (x) {
    if (pokeName.value.toLowerCase() === correctName.innerHTML) {
        imgP.classList.toggle('hide');
        nameDiv.classList.toggle('hide');
        winLose.innerText = 'Congratulations, you were right!'
        winLose.classList.add('trueText')
    } else {
        winLose.innerText = "Sorry, that wasn't right. Try again!"
        winLose.classList.add('falseText')
    }
    x.preventDefault();
})

