function parentOpcodesCaller() {
    opcodesCaller(99, 99);
}

function resultSampler(x,y,resultsArr) {
  let results = "";
    for (let i = 0; i < 18; i++) {
        switch (i) {
            case 0:
                results += `X: ${x}\n`;
                resultsArr.push(["X", x]);
                break;
            case 1:
                results += `Y: ${y}\n`;
                resultsArr.push(["Y", y]);
                break;
            case 2:
                results += `X&Y: ${x&y}\n`;
                resultsArr.push(["X&Y", x & y]);
                break;
            case 3:
                results += `X|Y: ${x|y}\n`;
                resultsArr.push(["X|Y", x | y]);
                break;
            case 4:
                results += `~X: ${~x}\n`;
                resultsArr.push(["~X", ~x]);
                break;
            case 5:
                results += `~Y: ${~y}\n`;
                resultsArr.push(["~Y", ~y]);
                break;
            case 6:
                results += `X+Y: ${x+y}\n`;
                resultsArr.push(["X+Y", x + y]);
                break;
            case 7:
                results += `X-Y: ${x-y}\n`;
                resultsArr.push(["X-Y", x - y]);
                break;
            case 8:
                results += `Y-X: ${y-x}\n`;
                resultsArr.push(["Y-X", y - x]);
                break;
            case 9:
                results += `0: ${0}\n`;
                resultsArr.push(["0", 0]);
                break;
            case 10:
                results += `-1: ${-1}\n`;
                resultsArr.push(["-1", -1]);
                break;
            case 11:
                results += `1: ${1}\n`;
                resultsArr.push(["1", 1]);
                break;
            case 12:
                results += `-X: ${0-x}\n`;
                resultsArr.push(["-X", 0 - x]);
                break;
            case 13:
                results += `-Y ${0-y}\n`;
                resultsArr.push(["-Y", 0 - y]);
                break;
            case 14:
                results += `X+1: ${x+1}\n`;
                resultsArr.push(["X+1", x + 1]);
                break;
            case 15:
                results += `Y+1: ${y+1}\n`;
                resultsArr.push(["Y+1", y + 1]);
                break;
            case 16:
                results += `X-1: ${x-1}\n`;
                resultsArr.push(["X-1", x - 1]);
                break;
            case 17:
                results += `Y-1: ${y-1}\n`;
                resultsArr.push(["Y-1", y - 1]);
                break;
        }
    }
    return results;
}

function opcodesCaller(x, y) {
    let resultsArr = [];
    let results = resultSampler(x,y,resultsArr)
    
    console.log(`Expected:\n${results}`);
    console.log(resultsArr);

    let flagList = [0, 0, 0, 0, 0, 0, x, y];

    for (let i = 0; i < 64; i++) {
        convert_2(i, flagList);
        let ans = alu(flagList[0], flagList[1], flagList[2], flagList[3], flagList[4], flagList[5], flagList[6], flagList[7]);
        let mem = [];
        for (let j = 0; j < resultsArr.length; j++) {
            if (ans == resultsArr[j][1])
                mem.push(resultsArr[j][0]);
        }
        console.log(`${flagList} Answer: ${ansFormater(ans)} Which may be: ${mem}`);
    }
}

function ansFormater(ans,x,y) {
    let newString = " ${x + y}"; 
    let maxLength = newString.length;
    ans = ans+" ";    
    newString = "";

    for (let i = 0 ; i < maxLength ; i++) {
       // console.log(`${ ans.charAt(i)}`);
        if (i<ans.length)
            newString += ans.charAt(i);
        else
            newString += " ";
    } 
    return newString;
}

function alu(zx, nx, zy, ny, f, no, x, y) {
    if (zx == 1)
        x = 0;
    if (nx === 1)
        x = ~x;
    if (zy == 1) {
        y = 0;
    }
    if (ny == 1) {
        y = ~y;
    }
    let output;
    if (f == 0)
        output = x & y;
    else
        output = x + y;
    if (no == 1)
        output = ~output;
    return output;
}

function convert_2(dec, flagList) {

    let bitmask = 1;
    let tempBitMask = 0;

    let i = 0;
    for (i = 5; i >= 0; i--) {
        // Shift bitmask (aka 1), i amount times.
        tempBitMask = bitmask << i;

        /**
         * Tests if a bit in dec is 0 or 1.
         * The bit it tests corresponds to where the "1" bit is in tempBitMask
         *
         * If the location we're testing in dec is "0", & operation will return 0, evaluating as false doing case 1.
         * If the location we're testing in dec is "1", & operation will return some integer, evaluating as true doing case 0.
         *
         * We use "LASTALLOWEDINDEX - i" to prevent the array from printing backwards
         */
        if (dec & tempBitMask) // Case 0: Put 1
            flagList[5 - i] = 1;
        else // Case 1: Put 0
            flagList[5 - i] = 0;
    }

    // theString[32] = '\0'; // Null 0, indicates termination of string
    // return theString;
}