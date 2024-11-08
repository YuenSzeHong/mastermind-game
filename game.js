export var ans = []
export var colors = ['red', 'orange', 'yellow', 'green', 'lime', 'blue', 'purple']

function RandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function Validate(answer, guess) {

    var flag = [4]
    var white = 0, black = 0

    for (let x = 0; x < 4; x++) 
        flag[x] = guess[x] == answer[x];

    for (let slot = 0; slot < 4; slot++) {
        if (guess[slot] == answer[slot])
            black++;
        else
            for (let s = 0; s < 4; s++)
                if (!flag[s] && guess[slot] == answer[s]) {
                    white++;
                    flag[s] = true;
                    break;
                }
    }
    //console.log(`black = ${black}, white = ${white}`)
    var results = [black, white]
    console.log(guess, answer)
    return results
}

export function Generate() {
    for (let i = 0; i < 4; i++) {
        ans[i] = colors[RandomInt(colors.length)]
    }
    console.log(ans)
}

