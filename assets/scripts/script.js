////////  Pre-defined Character Arrays ////////

// lowercase letters
const lowercaseArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

// uppercase letters
const upperCaseArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

// numbers
const numbersArray = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];

// special characters
const specialCharactersArray = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "-",
  "_"
];

// Array of characters selected by user input criteria
let selectedCharactersArray = [];

// Array of actual characters randomly chosen for password
let passwordCharactersArray = [];

////////  Criteria for password and user input prompts ////////

// Password Criteria
let passwordLength = 12;   //default
let includeLowercase = true;    //default
let includeUppercase = true;    //default
let includeNumbers = true;    //default
let includeSpecial = true;    //default

// Validation check for user inputs. As long as this value is false, the function that is called
// by the "Generate Password" button's event listener will start the user prompts function
let criteriaSet = false;

// User prompts
const userPrompts = () => {
  // Asks the user how long the password should be
  passwordLength = prompt("How long would you like your password to be? Must be between 8 and 128 characters! Submitting anything other than numbers in this field will cause errors!");

  // Alerts the user that input entered was not between 8 and 128 characters
  if (passwordLength > 128 || passwordLength < 8) {
    alert("Cannot generate password! Must be between 8 and 128 characters!");
    return;
  };

  // Asks to include lowercase letters
  if (confirm("Include lowercase letters?") === true) {
    includeLowercase = true;
  } else {
    includeLowercase = false;
  };

  // Asks to include uppercase letters
  if (confirm("Include uppercase letters?") === true) {  
    includeUppercase = true;  
  } else {
    includeUppercase = false;
  };

  // Asks to include numbers
  if (confirm("Include numbers?") === true) {  
    includeNumbers = true;  
  } else {
    includeNumbers = false;
  };

  // Asks to include special characters
  if (confirm("Include special characters?") === true) {  
    includeSpecial = true;  
  } else {
    includeSpecial = false;
  };

  // Alerts user that no character selection criteria were confirmed
  if (includeLowercase === false && includeUppercase === false && includeSpecial === false && includeNumbers === false) {
    criteriaSet = false;
    alert("No characters selected! Cannot generate password!");
    return;
  // Generates password according to user criteria
  } else {
    criteriaSet = true;
    writePassword();
  };
};

////////  Array loop logic ////////

// Selects lowercase letters if selected by user
const loopThroughLowercase = () => {
  if (includeLowercase === true) {
    for (let i = 0; i < lowercaseArray.length; i++) {
      selectedCharactersArray.push(lowercaseArray[i]);
    }
  } else {
    return;
  };
};

// Selects uppercase letters if selected by user
const loopThroughUppercase = () => {
  if (includeUppercase === true) {
    for (let i = 0; i < upperCaseArray.length; i++) {
      selectedCharactersArray.push(upperCaseArray[i]);
    }
  } else {
    return;
  };
};

// Selects numbers if selected by user
const loopThroughNumbers = () => {
  if (includeNumbers === true) {
    for (let i = 0; i < numbersArray.length; i++) {
      selectedCharactersArray.push(numbersArray[i]);
    }
  } else {
    return;
  };
};

//Selects special characters if selected by user
const loopThroughSpecials = () => {
  if (includeSpecial === true) {
    for (let i = 0; i < specialCharactersArray.length; i++) {
      selectedCharactersArray.push(specialCharactersArray[i]);
    }
  } else {
    return;
  };
};

////////  Functions that generate and display password ////////

// Runs the array loop logic functions in sequence to populate the selectedCharactersArray.
// Then randomly pushes a character from the selectedCharactersArray to the passwordCharactersArray
// as long as the number of characters pushed is not greater than the max number of characters
// set for the length of the password. Returns the passwordCharactersArray
// in a string format with no spaces, commas, etc in between characters.
const generatePassword = () => {
  loopThroughLowercase();
  loopThroughUppercase();
  loopThroughNumbers();
  loopThroughSpecials();
  do {
    randomSelection = selectedCharactersArray[Math.floor(Math.random() * selectedCharactersArray.length)];
    passwordCharactersArray.push(randomSelection);
  }
  while (passwordCharactersArray.length <= passwordLength - 1);
  return passwordCharactersArray.join('');
};

// Get references to the #generate element
const generateBtn = document.getElementById("generate");

// Write password to the #password input
const writePassword = () =>  {
  // If button is pressed without valid user criteria, prompts will appear sequentially to set the criteria
  if (criteriaSet === false) {
    userPrompts();
  // Otherwise if criteria is set, any subsequent button press will generate a new password with
  // the current set criteria
  } else {
    const password = generatePassword();
  
  // Final error check to ensure user did not input anything other than numbers into the
  // password length input. If this check is absent and non-numeric values were input 
  // the output will consist only of a single character. 
  // If this error is triggered the user must press the "Generate Password" button
  // to re-enter the password generation criteria.
    if (passwordCharactersArray.length < 8) {
      alert("ERROR: non-numerical text was entered as password length input!");
      return;
    };

    const passwordText = document.getElementById("password");
  
    passwordText.value = password;
  
    // Clears the passwordCharacterArray so it can be populated by a new password. 
    // If this array is not cleared and the user presses the "Generate Password" button again,
    // a single random character will be added to the end of the current password.
    passwordCharactersArray = [];
    console.log(criteriaSet)
  };
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);