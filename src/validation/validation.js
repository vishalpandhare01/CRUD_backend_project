// ---------------------------- check alphabetiacls or not-------------------------------
function lettersOnlyCheck(name)
{
   var regEx = /^[A-Za-z]+$/;
   if(regEx.test(name)){return true;}
   else{return false;}
}    

//------------------------------check valid 10 digit mobile number ------------------------------ 
const isValidMobileNo = function (value) {
    return /^[789][0-9]{9}$/.test(value);       //10 digit
  };

//-----------------------------------check vlid date formate -------------------------------------
function isDateValid(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateStr.match(regex) === null) {
      return false;
    }
    const date = new Date(dateStr);
    const timestamp = date.getTime();
    if(typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }
    return date.toISOString().startsWith(dateStr);
  }


//----------------------------------- check valid email id -------------------------------------------
const isValidEmail = function (value) {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value);
  };
  

module.exports = {lettersOnlyCheck ,isValidMobileNo ,isValidEmail ,isDateValid}