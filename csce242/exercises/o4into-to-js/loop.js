document.getElementById("btn-display").onclick = () => {
    const startNum = parseInt(document.getElementById("txt-start").value);
    const endNum = parseInt(document.getElementById("txt-end").value);
    const displayArea = document.getElementById("start-end-display");
    displayArea.innerHTML = "";
    const errorDisplay = document.getElementById("error-num-order");
    errorDisplay.innerHTML = "";    //clear out any previous errors
    const favMessageP = document.getElementById("fav-message");
    favMessageP.innerHTML = "";

    if(endNum < startNum) {
        errorDisplay.innerHTML = `${endNum} is less than ${startNum}.`
        return; //don't do anything else if you already have an error
    }

    for(let i=startNum; i <= endNum; i++){
        const li = document.createElement("li");
        li.innerHTML = i;
        displayArea.append(li);
        //attach event to onclick li
        li.onclick = () => {
            favMessageP.innerHTML = `You clicked ${i}.`
        }
    }
}

let count = 0;
let updateCount;
//let's loop through the numbers and display count
document.querySelector('#btn-count').onclick = (event) =>{
    if(event.currentTarget.innerHTML.toLowerCase() == "start"){
        event.currentTarget.innerHTML = "stop";

        updateCount = setInterval(()=>{
            count++;
            document.querySelector("#count-display").innerHTML = count;
        },300);
    }
    //stop the counter
    else {
        event.currentTarget.innerHTML = "Start";
        clearInterval(updateCount);
    }
}
    document.querySelector('#btn-reset-count').onclick = () =>{
        count = 0;
        clearInterval(updateCount);
        document.querySelector("#btn-count").innerHTML = "Start";
        document.querySelector("#count-display").innerHTML = "";
    }

    //display  an array of toys
    document.querySelector('#btn-show-toy').onclick = (event)=> {
        const toys = ['ball',"skipping rope","car", "doll", "mini car", "elmo"]
        event.currentTarget.disabled = true;   //can only click this button once
        // loop throught toys
        /*
        for(let i =0; i<toys.length; i++){
            console.log(toys[i]);
        }
        
        toys.forEach((toy, i)=>{
            console.log(`${i+1}. ${toy}`);
        });
        */

        const ul = document.createElement("ul");
        document.getElementById("display-toys").append(ul);

        toys.forEach((toy, i)=>{
            const li = document.createElement("li");
            ul.append(li);
            li.innerHTML = `${i+1}. ${toy}`;
        });
    }

