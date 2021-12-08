export function setLocalStorage(key, value){
    let val;
    if(typeof value  === "object"){
        val = JSON.stringify(value);
    } else {
        val = value;
    }
    localStorage.setItem(key, val);
}

 //Un Masking Mobile Number before saving
export function unMaskMobileNumber (mobileNumber : string) {
    return mobileNumber.replace(/ /g, ''); 
};