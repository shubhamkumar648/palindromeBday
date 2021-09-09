
var birthDayInput=document.querySelector('#birthDayInput');
var checkBtn=document.querySelector('#checkBtn');
var display=document.querySelector('#display');


function reverseStr(str) {
  
  var reversedStr = str.split('').reverse('').join('');
  return reversedStr;
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(date) {

  var dateStr = { 

    day: '', 
    month: '',
     year: '' 
  };

  if (date.day < 10) {
    dateStr.day = '' + date.day;
  }
  else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '' + date.month;
  }
  else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkForAllDateFormats(date){
  var listOfPalindromes = getAllDateFormats(date);
  var temp = false;

  for(var i=0; i < listOfPalindromes.length; i++){
    if(isPalindrome(listOfPalindromes[i])){
      temp = true;
      break;
    }
  }
  
  return temp;
}

// function to check for leap year
function isLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// function to get next date
function getNextDate(date){
  var day = date.day + 1;  
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   // function to check for february
  if(month === 2){ 
    
    if(isLeapYear(year)){ 

       if(day > 29){ 

         day = 1;
         month++;  
       }
    }
    else {

       if(day > 28){

         day = 1;
         month++;  
       }
    }
  }
  else {
    
    if(day > daysInMonth[month - 1]){ 

      day = 1; 
      month++; 
    }
  }

  if(month > 12){
    month = 1;
    year++; 
  }

  return {
    day: day,  
    month: month,
    year: year
  };
}

// function to get next palindrome date
function getNextPalindromeDate(date){
  var count = 0;
  var nextDate = getNextDate(date);

  while(1){
    count++;
    var isPalindrome = checkForAllDateFormats(nextDate);
    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
}

function clickHandler(){
  var birthDate=birthDayInput.value;

  if(birthDayInput !==''){
    var dateList=birthDate.split('-');

    var date={

      day:dateList[2],
      month:dateList[1],
      year:dateList[0],
    }
    
    var palindrome = checkForAllDateFormats(date);
    if(palindrome){

      display.innerHTML="Wohooo!! you are a Palindrome Person 🙌!!";
    }
    else{

       var [count,nextDate]=getNextPalindromeDate(date);
        //template literals are enclosed in backtick``
       display.innerHTML=` 😢 The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${count} days `
    }
  }
}

if(checkBtn){
  checkBtn.addEventListener('click',clickHandler)
}