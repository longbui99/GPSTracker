const signInHtml = `<div class="mt-2 mb-2" id="s-i-cli-ui">
<p class="text-primary text-center" id="s-i-form-head-ui">Welcome back</p>
<div class="dropdown-divider border  bg-dark"></div>
<div class="input-group flex-nowrap">
    <div class="input-group-prepend">
        <span class="input-group-text" id="addon-wrapping">@</span>
    </div>
    <input type="text" id="si-username" class="form-control" placeholder="Email" aria-label="Username"
        aria-describedby="addon-wrapping">
</div>
<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
    else.</small>

<div class="dropdown-divider"></div>
<div class="input-group flex-nowrap">
    <div class="input-group-prepend">
        <span class="input-group-text" id="addon-wrapping"><i class="fas fa-key"></i></span>
    </div>
    <input type="text" id="si-password" class="form-control" placeholder="Password" aria-label="Password"
        aria-describedby="addon-wrapping">
</div>
<div class="mt-4 mb-3 align-middle pl-2" id="submit-oraction">
    <button type="submit" class="btn btn-primary" onClick=localSIAuth()>Submit</button>
    <span class="pl-1 pr-1">or use</span>
    <button type="submit" class="btn btn-danger" onClick=googleAuthRequest()>
        <span class="gg-icon border-right pr-3"><i class="fab fa-google"></i></span>
        <span class="gg-text pl-2" >Google Account</span></button>
</div>
<div class="d-flex" id="small-text-redirect">
    <small class="ml-auto">You don't have account, 
    <span class="redirect-signin" id="redi-s-i-addr" onClick=SUFUNCTION()> Create one</span></small>
</div>
</div>`

const signUpHtml = `<div class="mt-2 mb-2" id="s-u-cli-ui">
<p class="text-primary text-center" id="s-i-form-head-ui">Welcome back</p>
<div class="dropdown-divider border  bg-dark"></div>
<div class="input-group flex-nowrap">
    <div class="input-group-prepend">
        <span class="input-group-text" id="addon-wrapping">@</span>
    </div>
    <input type="text" id="su-username" class="form-control" placeholder="Email" aria-label="Username"
        aria-describedby="addon-wrapping" name="email" id="ip-user-evn">
</div>
<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
    else.</small>

<div class="dropdown-divider"></div>
<div class="input-group flex-nowrap">
    <div class="input-group-prepend">
        <span class="input-group-text" id="addon-wrapping"><i class="fas fa-key"></i></span>
    </div>
    <input type="text" id="su-password" class="form-control" placeholder="Password" aria-label="Password"
        aria-describedby="addon-wrapping" name="password" id="ip-pass-evn">
</div>
<div class="input-group flex-nowrap mt-2" id="ip-c-pas-contain">
    <div class="input-group-prepend">
        <span class="input-group-text" id="addon-wrapping"><i
                class="fas fa-check-double"></i></span>
    </div>
    <input type="text" id="su-password-c" class="form-control" placeholder="Check password" aria-label="Check"
        aria-describedby="addon-wrapping" id="ip-c-pass-evn">
</div>
<div class="mt-4 mb-3 align-middle pl-2" id="submit-oraction">
    <button type="submit" class="btn btn-primary" onClick=localSUAuth()>Submit</button>
    <span class="pl-1 pr-1">or use</span>
    <button type="submit" class="btn btn-danger" onClick=googleAuthRequest()>
        <span class="gg-icon border-right pr-3"><i class="fab fa-google"></i></span>
        <span class="gg-text pl-2">Google Account</span></button>
</div>
<div class="d-flex" id="small-text-redirect">
    <small class="ml-auto">You already have an account, 
    <span class="redirect-signin" id="redi-s-i-addr" onClick=SIFUNCTION()>Sign in</span></small>
</div>
</div>`

const NotificationHtml = ``

var C = [false,  false]

$('#s-i-ui-control').click(e=>{
    SIFUNCTION()
})
SIFUNCTION = ()=>{
    if (!C[0]){
        $('#auth-frame-cont').html(signInHtml)
        C[1] = false
    }
    else{
        $('#auth-frame-cont').html(``)
    }
    C[0] = !C[0]
}

$('#s-u-ui-control').click(e=>{
    SUFUNCTION()
})

SUFUNCTION = () =>{
    if (!C[1]){
        $('#auth-frame-cont').html(signUpHtml)
        C[0] = false
    }
    else{
        $('#auth-frame-cont').html(``)
    }
    C[1] = !C[1]
}

function googleAuthRequest(){
    window.open("/auth/google", "MsgWindow", "width=450,height=600, top=40, left=500");
}
function localSUAuth(){

}
function localSIAuth(){

}