const sendbtn=document.querySelector(".chat-input span");
const message=document.querySelector(".chat-input textarea");
const chatbox=document.querySelector(".chatbox")

const toggler=document.querySelector(".chatbot-toggler")
const closebt=document.querySelector(".close-btn")


let userMessage;
const Apikey="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";

const createChatLi=(mess,className)=>{
    const chatli=document.createElement("li");
    chatli.classList.add("chat",className);
    let chatcontent = className === "outgoing" ? `<p>${mess}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${mess}</p>`;
    chatli.innerHTML=chatcontent;
    chatli.querySelector("p").textContent=mess;
    
    return chatli
}
//geting response from api

const genResponse=(incomingChatli)=>{
   const messagegot=incomingChatli.querySelector("p")
   
    const ApiUrl=
   "https://api.openai.com/v1/chat/completions";
   const reqoption={
    method:"POST",
    headers:{
       "Content-Type":"application/json",
       "Authorization":`Bearer ${Apikey}`
    },
    body:JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: userMessage}]
   })
   }
   fetch(ApiUrl,reqoption).then(res=>res.json()).then(data=>{
        messagegot.textContent=data.choices[0].message.content;
   }).catch((e)=>{
    messagegot.textContent="Opps something went Wrong";
   })
}

const inputchat=()=>{

    userMessage=message.value.trim()
    if(!userMessage) return;
    message.value=""

    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(()=>{
        const incomingChatli=createChatLi("Thinking....","incoming")
        chatbox.appendChild(incomingChatli)
        genResponse(incomingChatli);
    },100)
}

function togglefun(){
    document.body.classList.toggle("show-chatbot")
}

sendbtn.addEventListener("click", inputchat);

toggler.addEventListener("click",togglefun);
closebt.addEventListener("click",()=>document.body.classList.remove("show-chatbot"))

window.addEventListener("keypress",(e)=>{
    
    if(e.key==="Enter"){
        e.preventDefault();
        inputchat()
    }
})