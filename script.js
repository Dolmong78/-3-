const board = document.getElementById("board");
const result = document.getElementById("result");
const resultCards = document.getElementById("resultCards");
const resetBtn = document.getElementById("resetBtn");

const applyPage = document.getElementById("applyPage");
const goApplyBtn = document.getElementById("goApplyBtn");
const applyBtn = document.getElementById("applyBtn");
const userName = document.getElementById("userName");
const userPhone = document.getElementById("userPhone");
const privacyAgree = document.getElementById("privacyAgree");
const applyMessage = document.getElementById("applyMessage");


// ==============================
// Google Apps Script 주소
// ==============================

// 나중에 Google Apps Script를 만들고
// 여기의 주소를 실제 주소로 바꿔주세요.

const GOOGLE_SCRIPT_URL = "";


// ==============================
// 카드 이름
// ==============================

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


// ==============================
// 선택된 카드
// ==============================

let selected = [];

let finished = false;


// ==============================
// 카드 22장 만들기
// ==============================

for(let i = 0; i < 22; i++){

    const card = document.createElement("div");

    card.className = "card";

    // 카드 번호 저장
    card.dataset.index = i;


    const img = document.createElement("img");

    img.src = "card_back.jpg";


    card.appendChild(img);


    card.onclick = () => selectCard(card);


    board.appendChild(card);
}


// ==============================
// 카드 선택
// ==============================

function selectCard(card){

    if(finished) return;


    // 이미 선택한 카드라면 무시
    if(card.classList.contains("selected")) return;


    card.classList.add("selected");


    // 카드 번호를 저장
    selected.push(Number(card.dataset.index));


    // 3장 선택 완료
    if(selected.length === 3){

        finished = true;

        setTimeout(showResult, 700);

    }

}


// ==============================
// 결과 출력
// ==============================

function showResult(){

    board.style.display = "none";

    result.classList.remove("hidden");

    resultCards.innerHTML = "";


    // 사용자가 실제 선택한 3장의 카드 표시
    selected.forEach(index => {

        const div = document.createElement("div");

        div.className = "resultCard";


        const img = document.createElement("img");

        img.src = `cards/${index}.jpg`;


        const name = document.createElement("h3");

        name.textContent = cardNames[index];


        div.appendChild(img);

        div.appendChild(name);


        resultCards.appendChild(div);

    });

}


// ==============================
// 응모 페이지로 이동
// ==============================

goApplyBtn.onclick = () => {

    result.classList.add("hidden");

    applyPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};


// ==============================
// Google Sheets로 응모 정보 전송
// ==============================

applyBtn.onclick = async () => {

    const name = userName.value.trim();

    const phone = userPhone.value.trim();


    // 이름 확인
    if(name === ""){

        alert("이름을 입력해주세요.");

        userName.focus();

        return;
    }


    // 연락처 확인
    if(phone === ""){

        alert("연락처를 입력해주세요.");

        userPhone.focus();

        return;
    }


    // 개인정보 동의 확인
    if(!privacyAgree.checked){

        alert("개인정보 수집·이용에 동의해주세요.");

        return;
    }


    // Google Apps Script 주소 확인
    if(GOOGLE_SCRIPT_URL.includes("여기에_구글")){

        alert("아직 Google Sheets 연동 주소가 입력되지 않았습니다.");

        return;
    }


    // 버튼 잠시 비활성화
    applyBtn.disabled = true;

    applyBtn.textContent = "응모 중...";


    // 선택한 카드 이름
    const card1 = cardNames[selected[0]];
    const card2 = cardNames[selected[1]];
    const card3 = cardNames[selected[2]];


    // Google Sheets로 보낼 데이터
    const data = new URLSearchParams();

    data.append("name", name);
    data.append("phone", phone);

    data.append("card1", card1);
    data.append("card2", card2);
    data.append("card3", card3);


    try{

        await fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            body: data,

            mode: "no-cors"

        });


        applyMessage.textContent =
            "🎉 응모가 완료되었습니다!";

        applyMessage.style.marginTop = "20px";


        applyBtn.textContent = "응모 완료";

        applyBtn.disabled = true;


    }catch(error){

        console.error(error);

        alert(
            "응모 중 오류가 발생했습니다.\n" +
            "잠시 후 다시 시도해주세요."
        );


        applyBtn.disabled = false;

        applyBtn.textContent = "응모하기";

    }

};


// ==============================
// 다시 뽑기
// ==============================

resetBtn.onclick = () => {

    location.reload();

};
