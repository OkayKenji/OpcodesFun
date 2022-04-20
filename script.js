// Intital function to react to user intreaction
function parentOpcodesCaller() {
    //Get usr input
    let x = parseInt(document.getElementById("x-input").value), y = parseInt(document.getElementById("y-input").value);

    // Basic checks for invalid input
    if (isNaN(x)) {
        x = 0;
    }

    if (isNaN(y)) {
        y = 0;
    }

    //Calls needed functions
    opcodesCaller(x, y);
}

// Responsible for calling related functions
function opcodesCaller(x, y) {
    // Stores the expected values of doing expressions as per the computer
    let resultsArr = [];
    let results = resultSampler(x,y,resultsArr)

    // Displays on screen
    document.getElementById("expectedArea").innerText = `Expected:\n${results}`;

    // List of flags corresponds with: zx,nx,zy,ny,f,no,x,y
    let flagList = [0, 0, 0, 0, 0, 0, x, y];

    // Table header + stores 
    let fullAnswer = "zx,nx,zy,ny,f,no,x,y\n";
    let sample = "";

    // There's 64 possible combinations of the flag 0 and 1, does every one of them.
    for (let i = 0; i < 64; i++) {
        // Just count up in binary! 
        convert_2(i, flagList);

        // Does the ALU per what flags says
        let ans = alu(flagList[0], flagList[1], flagList[2], flagList[3], flagList[4], flagList[5], flagList[6], flagList[7]);
        
        // If an expected result matches what's outputed in the ALU, flag correspods maybe
        let mem = [];
        for (let j = 0; j < resultsArr.length; j++) {
            if (ans == resultsArr[j][1]) {
                mem.push(resultsArr[j][0]);
                resultsArr[j][2].push(i);
              //sample+= `${resultsArr[j][0]} may be solved by: ${flagList}\n`
            }
        }
        fullAnswer += `${flagList} Answer: ${ansFormater(ans)} Which may be: ${mem}\n`;
        //sample+= `${resultsArr[j][0]} may be solved by: ${resultsArr[j][3]}`
    }

    printBetterResults(resultsArr,x,y) ;
    document.getElementById("answerArea").innerText = fullAnswer;
   // document.getElementById("sampleArea").innerText = sample;
}

// Gives all the options for a operation
function printBetterResults(resultsArr,x,y) {
  //let sample = "";
  for (let lmao of resultsArr) {
    let row = document.createElement("tr");
   // sample += `${lmao[0]} has the results of: `
    let col1 = document.createElement("td")
    col1.innerText = `${lmao[0]} has the results of `;
    col1.width = "200px";
    row.appendChild(col1);
    
    for (let lol of lmao[2]) {
      let flagList = [0, 0, 0, 0, 0, 0, x, y];
      convert_2(lol,flagList);
    //  sample+= `${flagList} or `;

      let cols = document.createElement("td")
      cols.innerText = `${flagList}`;
      row.appendChild(cols);
    }
   // sample+=`actually there's more options\n`;
    document.getElementById("bodyTable").appendChild(row);
  }
   // document.getElementById("sampleArea").innerText = sample;
}

// Yes, I purposely used switched statement here to annoy my professor. 
// Wonderfully inefficent. 
function resultSampler(x,y,resultsArr) {
    let results = "";
      for (let i = 0; i < 18; i++) {
          switch (i) {
              case 0:
                  results += `X: ${x}\n`;
                  resultsArr.push(["X", x,[]]);
                 break;
              case 1:
                  results += `Y: ${y}\n`;
                  resultsArr.push(["Y", y,[]]);
                  break;
              case 2:
                  results += `X&Y: ${x&y}\n`;
                  resultsArr.push(["X&Y", x & y,[]]);
                  break;
              case 3:
                  results += `X|Y: ${x|y}\n`;
                  resultsArr.push(["X|Y", x | y,[]]);
                  break;
              case 4:
                  results += `~X: ${~x}\n`;
                  resultsArr.push(["~X", ~x,[]]);
                  break;
              case 5:
                  results += `~Y: ${~y}\n`;
                  resultsArr.push(["~Y", ~y,[]]);
                  break;
              case 6:
                  results += `X+Y: ${x+y}\n`;
                  resultsArr.push(["X+Y", x + y,[]]);
                  break;
              case 7:
                  results += `X-Y: ${x-y}\n`;
                  resultsArr.push(["X-Y", x - y,[]]);
                  break;
              case 8:
                  results += `Y-X: ${y-x}\n`;
                  resultsArr.push(["Y-X", y - x,[]]);
                  break;
              case 9:
                  results += `0: ${0}\n`;
                  resultsArr.push(["0", 0,[]]);
                  break;
              case 10:
                  results += `-1: ${-1}\n`;
                  resultsArr.push(["-1", -1,[]]);
                  break;
              case 11:
                  results += `1: ${1}\n`;
                  resultsArr.push(["1", 1,[]]);
                  break;
              case 12:
                  results += `-X: ${0-x}\n`;
                  resultsArr.push(["-X", 0 - x,[]]);
                  break;
              case 13:
                  results += `-Y ${0-y}\n`;
                  resultsArr.push(["-Y", 0 - y,[]]);
                  break;
              case 14:
                  results += `X+1: ${x+1}\n`;
                  resultsArr.push(["X+1", x + 1,[]]);
                  break;
              case 15:
                  results += `Y+1: ${y+1}\n`;
                  resultsArr.push(["Y+1", y + 1,[]]);
                  break;
              case 16:
                  results += `X-1: ${x-1}\n`;
                  resultsArr.push(["X-1", x - 1,[]]);
                  break;
              case 17:
                  results += `Y-1: ${y-1}\n`;
                  resultsArr.push(["Y-1", y - 1,[]]);
                  break;
          }
      }
      return results;
}

// Pads ans with spaces, cause js doesn't have printf :(
function ansFormater(ans,x,y) {
    let newString = " ${x + y}"; 
    let maxLength = newString.length;
    ans = ans+" ";    
    newString = "";

    for (let i = 0 ; i < maxLength ; i++) {
        if (i<ans.length)
            newString += ans.charAt(i);
        else
            newString += " ";
    } 
    return newString;
}

// Does the ALU operations per the flags
function alu(zx, nx, zy, ny, f, no, x, y) {
    if (zx == 1) // If zx is 1, we make x 0
        x = 0;
    if (nx == 1) //If nx is 1, we invert
        x = ~x;
    if (zy == 1) 
        y = 0;
    if (ny == 1) 
        y = ~y;
    
    let output;
    if (f == 0)          // If f is 0, we and the x y. otherwise add them
        output = x & y;
    else
        output = x + y;
    if (no == 1)         // If no is 1, we invert the output
        output = ~output;
    return output;
}

// Code adapted from class. converts dec to binary representation
function convert_2(dec, flagList) {

    let bitmask = 1;
    let tempBitMask = 0;

    let i = 0;
    for (i = 5; i >= 0; i--) {  // Yes, 5 is maghic number
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
