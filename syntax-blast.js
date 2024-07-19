import { TESTS } from "/levels/levelTests.js";

// Helpers
const getEl = (id, val) => document.getElementById(id)
const setEl = (id, val) => { 
    const el = getEl(id)
    el.innerHTML = val
    return el
}

// Dialog
const dialog = {
    levelComplete: "L e V e L C o M p L e T e",
}

// Main game loop setup, accepts a config arg that is currently not used
const SyntaxBlast = config => {
    
    let levelComplete = false

    // Game level challenge elements
    let currentChallenge = getEl('current-challenge')

    // Keyboard input
    let playerInput = getEl('player-input')
    playerInput.classList.remove('hidden')

    let detectChallengeComplete = () => playerInput.value === currentChallenge.innerHTML
    
    function textEnemyEffects(font, opacity, width) {
        currentChallenge.style.fontSize = font + "px"
        currentChallenge.style.opacity = opacity
        currentChallenge.style.width = width + "vw"
    }

    function levelLooper(challenge_index) {
        let i = challenge_index || 0 // index of current 'challenge'
        let font = 1
        let opacity = 0
        let width = 5   // up to 45vw  

        let levelSequence = setInterval(() => {
            if (detectChallengeComplete()) {

                playerInput.value = "Nice!" // randomize encouragin dialogue
                setTimeout(() => {
                    playerInput.value = ""
                }, 1000)
                
                TEST_LEVEL_STATS.kills += 1
                setEl("player-stats", updateStatsDisplay(TEST_LEVEL_STATS))

                font = 1
                opacity = 0
                width = 5
                i++
                
                // If level[i] now does not exist -> levelComplete
                currentChallenge.innerHTML = TESTS.INTRO_LEVEL_TEST[i] || dialog.levelComplete

                if (currentChallenge.innerHTML === dialog.levelComplete) {
                    console.log(currentChallenge.innerHTML === dialog.levelComplete)
                    console.log(currentChallenge.innerHTML )
                    levelComplete = true
                    clearInterval(levelSequence)
                    
                    
                }
                // Load / Reset Next Level...
                // Level Ends SyntaxBlast() gets called again on next Level Start
            }
            else {
                font++
                opacity += 0.02
                width += 1

                if (font > 49 && !detectChallengeComplete()) {
                    font = 1
                    opacity = 0.2
                    width = 5
                    TEST_LEVEL_STATS.health -= 25
                    setEl("player-stats", updateStatsDisplay(TEST_LEVEL_STATS))
                }
                textEnemyEffects(font, opacity, width)
            }
        }, 200)
    }

    if (!levelComplete) {
        levelLooper(0);
    }
    else {
        currentChallenge.classList.add('level-complete')
    }
    
}

 // Stats
let TEST_LEVEL_STATS = {
    levelNumber: 0,
    levelName: "TESTS",
    kills: 0,
    health: 100
}

function updateStatsDisplay(stats) {

  return `<p>Level: ${stats.levelNumber}</br>
          Name: ${stats.levelName}</br>
          Kills: ${stats.kills}</br>
          Health: ${stats.health}</p>`
}

const startButtonClickInit = () => {
    const button = getEl('start-button')

    button.addEventListener('click', () => {
        
        button.style.display = "none" // todo: add easein-out on display rule
    
        // Minimize landing logo
        const logo = getEl('logo')
        logo.classList.add('mini') // todo: ease here too
    
        // Set Stats
        const stats = setEl("player-stats", updateStatsDisplay(TEST_LEVEL_STATS))
        stats.classList.remove('hidden')
        
        SyntaxBlast('test - config')
    }, false)
}

startButtonClickInit();
