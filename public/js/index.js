const submitcode = async (code, input, lang)=>{
    let token;
    let res = await axios({
        "method":"POST",
        "url":"https://judge0.p.rapidapi.com/submissions",
        "headers":{
        "content-type":"application/json",
        "x-rapidapi-host":"judge0.p.rapidapi.com",
        "x-rapidapi-key": "0cbf0df10dmsh85f06145799bd1fp1a1fddjsn1522555d35e7",
        "accept":"application/json",
        "useQueryString":true
        },
        "data":{
            "language_id":lang,
            "source_code":code,
            "stdin":input
        }
    }).then(async (response)=>{
        token = await response.data.token;
        getSubmit(token);
    }).catch((error)=>{
        console.log(error);
    });
}

const getSubmit = async (token)=>{
    res = await axios({
        "method": "GET",
        "url": `https://judge0.p.rapidapi.com/submissions/${token}`,
        "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"judge0.p.rapidapi.com",
            "x-rapidapi-key":"0cbf0df10dmsh85f06145799bd1fp1a1fddjsn1522555d35e7",
            "useQueryString":true
        }
    }).then((res)=>{
        if(res.data.stdout){
            stdout.setValue(res.data.stdout);
        }
        let description = "";
        if(res.data.memory){
           description = res.data.memory + "KB " + res.data.time + "s \n";
        }
        
        if(res.data.message){
            description = description + res.data.message + " " + res.data.stderr + "\n";
            document.getElementById('output__contain').style.border = "2px solid red";
        }
        
        description = description + res.data.status.description;
        output.setValue(description);
        compile.innerHTML = "Compiled";
    }).catch((error)=>{
        console.log(error);
    });
}
if (compile) {
     compile.addEventListener('click', e => {
         e.preventDefault();
         document.getElementById('output__contain').style.border = "2px solid green";
         e.target.textContent = "Compiling...";
         let code = editor.getValue();
         let input = stdin.getValue();
         if(!input){
             input = "";
         }
         const Language = parseInt(document.getElementById("Lang").value);
         submitcode(code, input, Language);
     });
}

if(clear){
    clear.addEventListener('click', e =>{
        e.preventDefault();
        editor.setValue("");
        stdin.setValue("");
        stdout.setValue("");
        document.getElementById('output__contain').style.border = "2px solid green";
        compile.innerHTML = "Compile";
    });
}