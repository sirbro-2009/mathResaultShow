//بسم الله الرحمن الرحيم
let $ = document
let hoster = ``
$.querySelector("form").onsubmit = (event)=>{
$.querySelector("span").className = 'text-transparent'
event.preventDefault()
let name = $.getElementById("nameInput")
let password = $.getElementById("passwordInput")
if(name.value.trim() && password.value.trim()){
let body = {
    name:name.value.trim(),
    password:password.value.trim()
}
fetch(`${hoster}signIn`,{
method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then((e)=>{
    return e.json()
}).then(e=>{
if(e.state === true){
localStorage.setItem("token",e.token)
alert("تم تسجيل الدخول بنجاح")
location.reload()
}
else{
$.querySelector("span").className = 'text-red-600 text-2xl '
}
})
}
else{
$.querySelector("span").className = 'text-red-600 text-2xl '
}
}
////
if(!localStorage.getItem("token")){
$.getElementById("dashBord").style.display = 'none'
}
if(localStorage.getItem("token") ==="123456789"){
$.querySelector("form").style.display = 'none'
$.body.classList = 'bg-[url(./assets/bgPhone.png)] lg:bg-[url(./assets/bgPc.png)] '
}

////

/////
let searchInput = $.getElementById("searchInput")
searchInput.addEventListener("keypress",(ev)=>{
  if(ev.key === "Enter"){
  $.getElementById("searchRes").innerHTML = ''
  searchResault()
  }
})
$.getElementById("searchButton").onclick = ()=>{
$.getElementById("searchRes").innerHTML = ''
  searchResault()
}
function searchResault(){
fetch(`${hoster}studentList?name=${searchInput.value}`).then(e=>{
  return e.json()}).then((e)=>{
if(e.length >0){
e.forEach((ele)=>{
let theDiv = $.createElement("div")
theDiv.classList = ' bg-slate-600 text-center rounded-xl shadow-xl shadow-black justify-between my-2 flex flex-col lg:flex-row align-middle '
theDiv.dir = 'rtl'
theDiv.innerHTML = `
      <div   class=" rounded-xl p-2  w-full lg:w-1/2 text-start transition-all duration-1000  cursor-pointer align-middle" dir="rtl">
          <h1 class="text-2xl text-${ele.gender==="male"?'blue-500':'pink-500'} font-bold">الاسم : ${ele.name}</h1>
          <h2 class="text-2xl font-bold">القسم : ${ele.theClass === "2AS2"?'2 عت 2': "2 عت 1"}</h2>
          <span class="text-2xl animate-pulse font-bold">العلامة :  ${ele.note === null?`لم توضع بعد`:ele.note}</span>
          <p class="text-2xl font-bold">الملاحظة: ${ele.note === null?`لا يوجد`:ele.mark === null ?`لا يوجد`:ele.mark}</p>
      </div>
      <div class="text-center  w-full lg:w-1/2">
                <div class="flex flex-col m-2">
                    <h1 class="font-bold text-center">العلامة </h1>
                    <input type="number" id="noteInput" class="bg-white m-2 rounded-xl text-xl p-2" placeholder="ادخل العلامة">

                </div>
                <div class="flex flex-col m-2">
                    <h1 class="font-bold text-center">الملاحظة</h1>
                    <input type="text" id="markInput" class="bg-white m-2 rounded-xl text-xl p-2" placeholder="ادخل الملاحظة">
                </div>
                <button id="addButton"
                class="bg-slate-400 p-2 self-center my-2 rounded-xl duration-1000 transition-all hover:bg-slate-500 cursor-pointer">ضبط العلامة</button>
      </div>
`

$.getElementById("searchRes").append(theDiv)
$.getElementById("addButton").onclick = ()=>{
let bodyS = {
note:$.getElementById("noteInput").value.trim(),
mark:$.getElementById("markInput").value.trim(),
token:ele.token
}
fetch(`${hoster}setNote`,{
method: 'PUT',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(bodyS)
}).then((e)=>{return e.json()}).then((e)=>{
if(e.state === true){
  alert("تم التعديل بنجاح")
  location.reload()
}
else if(e.state === false){
  alert("تعذر التحديث")
  location.reload()  
}
})
}
})}
searchInput.value = ''

})
}
/** */