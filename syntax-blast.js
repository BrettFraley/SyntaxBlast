const SyntaxBlast = config => {

    let levelArea = document.getElementById('level-area')
    let playerStats = document.getElementById('player-stats')
    let startButton = document.getElementById('start-button')

    startButton.addEventListener('click', () => {

        gameInit() // <- take levels, series', mode? etc
                
        // note when coming back here... things should be like
        // series.start, series.pause, series.stop, series.complete

    }, false)

    setEl("level-area", "SET LEVEL AREA TEST")
    setEl("player-stats", "SET PLAYER STATS TEST")
}

// This needs to work in a few ways.. basically need top create and
// append elements of various types that will contain various types
// values... mainly innerText values.
const setEl = (id, val) => document.getElementById(id).innerHTML = val


const gameInit = () => {
    console.log('testSeries called on gameStart')
    
}

const LEVEL_1_BLOCKS = [
    { time_limit : 10000 },
    "Hello World!",
    "Welcome to S y N T a X B l A s T"
]

SyntaxBlast('test - config')

/**
Give the illusion of paralax proportion using
opacity very light and font size very small
and increasing over the time limit and disipating
"collison" where the player loses health as they
did not complete the block acurately in time
*/
