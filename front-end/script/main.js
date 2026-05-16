//بسم الله الرحمن الرحيم
let $ = document
let hoster = `https://mathresaultshow.onrender.com/`
let signUpform = $.getElementById("signUpform")
let signInForm = $.getElementById("signInForm")
signInForm.style.display = 'none'
$.getElementById("adminPage").onclick = ()=>{
    location.href = 'admin.html'
}
///
signUpform.onsubmit = (e)=>{
e.preventDefault()
let names =$.getElementById("nameInput")
let genderInput = $.getElementById("genderInput")
let classInput = $.getElementById("classInput")
let password = $.getElementById("passwordInput")
if(names.value.trim() && genderInput.value.trim() && classInput.value.trim() && password.value.trim() ){
let bodyS = {
name:names.value.trim(),
gender:genderInput.value.trim(),
password:password.value.trim(),
theClass:classInput.value.trim(),
}
fetch(`${hoster}addStudent`,{
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(bodyS)
}).then((e)=>{
return e.json()
}).then(e=>{
if(e.state === true){
localStorage.setItem("token",e.token)
alert(`تم اضافة الحساب بنجاح يا ${e.name}`)

location.reload()
}
else{
alert("تعذرت اضافة حساب")
location.reload()
}
})
}
}
signInForm.onsubmit = (e)=>{
e.preventDefault()
let nameuInput = $.getElementById("nameuInput")
let passworduInput = $.getElementById("passworduInput")
fetch(`${hoster}studentList?name=${nameuInput.value.trim()}&password=${passworduInput.value.trim()}`).then(e=>{
  return e.json()}).then(ele=>{
    let e = ele[0]
    if(!e.state){
    localStorage.setItem("token",e.token)
    alert("تم تسجيل دخول بنجاح")
    location.reload()
    }
    else if(e.state === false){
    alert("تعذر تسجيل الدخول تحقق من البيانات او جرب لاحقا")
    }
  })
}
$.getElementById("signIn").onclick = ()=>{
signUpform.style.display = 'none'
signInForm.style.display = 'flex'
}
$.getElementById("signUp").onclick = ()=>{
signUpform.style.display = 'flex'
signInForm.style.display = 'none'  
}
/////
if(localStorage.getItem("token") && localStorage.getItem("token") !== "123456789"){
$.getElementById("searchTitle").remove()
$.querySelectorAll("form").forEach((e)=>{e.style.display = 'none'})
  console.log(`${hoster}studentList?token=${localStorage.getItem("token")}`)
fetch(`${hoster}studentList?token=${localStorage.getItem("token")}`).then(e=>{

  return e.json()}).then(ele=>{
    let e = ele[0]

    let div = $.getElementById("studentProps")
    div.classList = `bg-${e.gender === "male"?`blue-300/50`:`pink-500/50`} flex flex-col  items-center mb-10 justify-center p-2  rounded-xl`
    div.innerHTML = `
    <h1 class="text-3xl my-5 text-${e.gender === "male"?`blue-700/50`:`pink-700/50`}"> السلام عليكم ${e.name} </h1>
    <h1 class="text-3xl my-5">من قسم ${e.theClass === "2AS2"?'2 عت 2': "2 عت 1"}</h1>
    <h1 class="text-3xl my-5">العلامة : ${e.note === null?`لم توضع بعد`:e.note}</h1>
    <h1 class="text-3xl my-5">الملاحظة :${e.note === null?`لا يوجد`:e.mark === null ?`لا يوجد`:e.mark}</h1>
                <button id="logOut" dir="rtl"
                class="bg-slate-400 p-2 self-center my-2 rounded-xl duration-1000 transition-all hover:bg-slate-500 cursor-pointer">تسجيل الخروج 👋</button>
    `
    $.getElementById("logOut").onclick = ()=>{localStorage.removeItem("token")
      location.reload()
    }
  })
}