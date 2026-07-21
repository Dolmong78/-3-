const board = document.getElementById("board");
const result = document.getElementById("result");
const resultCards = document.getElementById("resultCards");
const resetBtn = document.getElementById("resetBtn");

// 카드 이름
const cardNames = [
"바보",
"마법사",
"여사제",
"황후",
"황제",
"교황",
"연인",
"전차",
"힘",
"은둔자",
"운명의 수레바퀴",
"정의",
"매달린 사람",
"죽음",
"절제",
"악마",
"탑",
"별",
"달",
"태양",
"심판",
"세계"
];

let selected = [];
let finished = false;

// 카드 22장 만들기
for(let i=0;i<22;i++){

    const card=document.createElement("div");
    card.className="card";

    const img=document.createElement("img");
    img.src="card_back.jpg";

    card.appendChild(img);

    card.onclick=()=>selectCard(card);

    board.appendChild(card);

}

// 카드 선택
function selectCard(card){

    if(finished) return;

    if(card.classList.contains("selected")) return;

    card.classList.add("selected");

    selected.push(card);

    if(selected.length===3){

        finished=true;

        setTimeout(showResult,700);

    }

}

// 결과 출력
function showResult(){

    board.style.display="none";

    result.classList.remove("hidden");

    resultCards.innerHTML="";

    // 0~21 섞기
    const randomCards=[...Array(22).keys()]
        .sort(()=>Math.random()-0.5)
        .slice(0,3);

    randomCards.forEach(index=>{

        const div=document.createElement("div");
        div.className="resultCard";

        const img=document.createElement("img");
        img.src=`cards/${index}.jpg`;

        const name=document.createElement("h3");
        name.textContent=cardNames[index];

        div.appendChild(img);
        div.appendChild(name);

        resultCards.appendChild(div);

    });

}

// 다시 뽑기
resetBtn.onclick=()=>{

    location.reload();

};