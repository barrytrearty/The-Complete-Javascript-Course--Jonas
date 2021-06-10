"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2020-12-01T13:15:33.035Z",
    "2021-01-30T09:48:16.867Z",
    "2021-01-25T06:04:23.907Z",
    "2021-02-25T14:18:46.235Z",
    "2021-02-05T16:33:06.386Z",
    "2021-02-10T14:43:26.374Z",
    "2021-03-22T18:49:59.371Z",
    "2021-03-23T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "en-IE", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "es-ES",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0); //padStart adds zero for when date or month is single digit
  // const month = `${date.getMonth() + 1}`.padStart(2, 0); //+1 to compensate for zero base
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    //Decrease 1
    time--;
  };
  //Set timer to 5 minutes
  let time = 300;
  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//Creating dates lecture
//FAKE ALWAYS LOGIN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date and time: METHOD 1
    // const now = new Date(); //Logs normal format but we just want day/month/year
    //To fix this:
    // const day = `${now.getDate()}`.padStart(2, 0); //padStart adds zero for when date or month is single digit
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); //+1 to compensate for zero base
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //Provide date using API: BETTER METHOD
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long", //Other options: "2-digit", "numeric"
      year: "numeric", //Other options: "short", "narrow"
      weekday: "long",
    };
    // const locale = navigator.language;
    // console.log(locale);

    //The options object allows us to customise the date and add or take away elements
    //The locale variable gives us the users ISO code rather than us providing it, "en-IE", "en-US", etc

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Clear any prior timers and then Start timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date (Creating Dates - Lecture)
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan transfer date (Copied from above)
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 3000);

    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// LECTURE: Converting and Checking Numbers


console.log(23 === 23.0); //Logs a true

// Base 10 - 0 to 9
// Binary base 2 - 0 1

console.log(0.1 + 0.2); // Logs 0.300000000004
//This is a classic Javascript joke that illustrates the language's problem producing these type of numbers
console.log(0.1 + 0.2 === 0.3); //Logs a false
//This is an error we have to accept in JavaScript
//This means we cannot do very precise mathematic, financial or scientific calculations in JavaScript

//Converting
console.log(Number("23")); //Converts string to number
console.log(+"23"); //Cleaner method of string to number conversion

//Parsing
console.log(Number.parseInt("30pxs", 10)); //Logs 30
//parseInt converts a string as well as removes unnecessary letters and symbols so long as it begins with a number. The 10 passed in as the second argument tells JS we are using base-10 numbers and not binary
//Although not technically necessary, it is encouraged to call parseInt and parseFloat with Number.

console.log(Number.parseFloat("2.5rem")); //Logs 2.5
console.log(Number.parseInt("2.5rem")); //Logs 2

//To check if something is a number

//isNan
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN("20")); //false
console.log(Number.isNaN(+"20X")); //true
console.log(Number.isNaN(23 / 0)); //false
//Dividing by 0, returns infinity

//isFinite - better method
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite("20")); //false
console.log(Number.isFinite(+"20X")); //false
console.log(Number.isFinite(23 / 0)); //false
//Infinity is obviously not finite

//isInteger - best when working just with integers
console.log(Number.isInteger(20)); //true
console.log(Number.isInteger(20.1)); //false
console.log(Number.isInteger("20")); //false
console.log(Number.isInteger(+"20X")); //false
console.log(Number.isInteger(23 / 0)); //false

//LECTURE - Rounding Numbers

console.log(Math.sqrt(25)); //Logs 5, the square root
console.log(25 ** (1 / 2)); //Logs 5, the square root
console.log(25 ** (1 / 3)); //Logs 2.9..., the cubic root

console.log(Math.max(5, 10, 23, 11, 2)); //Returns 23, the biggest value
console.log(Math.max(5, 10, "23", 11, 2)); //Returns 23, does type conversion
console.log(Math.max(5, 10, "23c", 11, 2)); //Returns NaN, does not do parsing
console.log(Math.min(5, 10, 23, 11, 2)); //Returns 2, min works the same way

//Constants - PI
//Area of a circle = PI * RR
console.log(Math.PI * Number.parseFloat("10px") ** 2);

//Generating Random numbers 1-6
console.log(Math.floor(Math.random() * 6) + 1);

//Creating a random number generator constant
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//ROUNDING WHOLE NUMBERS
console.log(Math.trunc(23.6)); //Logs 23, removes anything after decimel
console.log(Math.round(23.6));
//Logs 24, rounds up or down
console.log(Math.ceil(23.3));
//Logs 24, rounds up to nearest whole number
console.log(Math.floor(23.6));
//Logs 23, rounds down to nearest whole number

//Difference between trunc and floor
console.log(Math.floor(-23.6)); //Logs -24, removes anything after decimel
console.log(Math.trunc(-23.6)); //Logs -23, rounds to nearest whole number
//For this reason, floor() is a little bit better than trunc()

//ROUNDING DECIMAL NUMBERS
console.log((2.6).toFixed(0)); //Logs 3, rounds to nearest number with specified number of decimal parts
console.log((2.67).toFixed(1)); //Logs 2.7
console.log((2.6).toFixed(2)); //Logs 2.60, adds zero so enough decimal parts
console.log(+(2.6).toFixed(0)); //toFixed returns a string so adding the + makes it a number


//LECTURE: Remainder Operator

console.log(5 % 2); //Logs 1, the remainder
console.log(8 % 3); //Logs 2

console.log(6 % 2); //Logs 0, 6 is even
console.log(7 % 2); //Logs 1, 7 is odd

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //true
console.log(isEven(23)); //false
console.log(isEven(514)); //true

//Using remainder on bankist app
//First spread movements__row elements into an array
//Add a function that makes every 2nd row a different color
//Put code in an event handler so it can be accessed within login
//Demonstrates how to do something every "nth" time
labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = "green";
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = "blue";
    }
  });
});


//LECTURE: Working with BigInt

console.log(2 ** 53 - 1); //Logs 9007199254740991, the biggest number that JS can safely represent with base-2
console.log(Number.MAX_SAFE_INTEGER); //Logs 9007199254740991, saved term for it
//Any number larger than the max safe integer is an unsafe number
console.log(785479045479478954789547890790); //Logs an approximation of this number
console.log(785479045479478954789547890790n); //Adding n, logs the number accurately
console.log(BigInt(785479045479478954789547890790)); //Number is slightly different in log
//BigInt function should only be used with smaller numbers

//OPERATIONS
console.log(100000n + 100000n); //Can be used on smaller numbers
console.log(7575479070954790489410771789418n * 1000000000n); //Works well with two BigInts

const huge = 2471791234798234793427893412n;
const num = 23;
// console.log(huge * num); //Cannot mix BigInt and other numbers
console.log(huge * BigInt(num)); //Works now

//EXCEPTIONS
console.log(20n > 15); //Logs true
console.log(20n == 20); //Logs true
console.log(20n === 20); //Logs false, === has no type conversion
console.log(typeof 20n); //logs bigInt

//DIVISIONS
console.log(100 / 15); //Logs 6.666666666666667
console.log(100n / 15n); //Logs 6, bigInt truncates the Int


//LECTURE: Creating Dates

//Typical JS date format: Mon Mar 22 2021 18:22:19 GMT+0000 (Greenwich Mean Time)

const now = new Date();
console.log(now); //Gives current date and time exactly in typical format
console.log(new Date("Mar 22 2021 18:22:19")); //Logs same format as above
console.log(new Date("December 24, 2015"));
console.log(new Date(account1.movementsDates[0])); //Logs date in above format
console.log(new Date(2019, 10, 30, 15, 23, 5)); //Logs Fri Nov 20 2015 15:23:05 GMT+0000 (Greenwich Mean Time)
//Year Month Date Hour Minute Second
//Months are 0 based in JS
console.log(new Date(2019, 10, 31, 15, 23, 5));
//As Nov only has 30 days, JS autocorrects to Dec 1

console.log(new Date(0)); // Logs Thu Jan 01 1970, beginning of Unix time, 0 secs after this date
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Logs Sun Jan 04, 3 days after Unix time, 3 days * 24 hours * 60 mins * 60 secs * 1000 millisecs, 259200000 millisecs after Unix time, timestamp

//WORKING WITH DATES
const future = new Date(2037, 10, 15, 10, 23);
console.log(future);
console.log(future.getFullYear()); //Logs 2027
console.log(future.getMonth()); //Logs 10 which in Nov, zero-based
console.log(future.getDate()); //Logs 19
console.log(future.getDay()); //Logs 0, which is Sun, zero-based,
console.log(future.getHours()); //Logs 10
console.log(future.getMinutes()); //Logs 23
console.log(future.getSeconds()); //Logs 0
console.log(future.toISOString()); //Logs 2037-11-15T10:23:00.000Z, an international standard date
console.log(future.getTime()); // "future" is 2141893380000ms since 1970 unix date, 2141893380000 is the timestamp for "future"

console.log(new Date(2141893380000)); //Using the ms time stamp gives us the "future" date

console.log(Date.now()); //This method gives us timestamp for the current moment in time

future.setFullYear(2040); //Changes year to 2040
console.log(future);


//LECTURE: Operations with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); //Logs date in typical format
console.log(Number(future)); //Logs timestamp
console.log(+future); //Logs timestamp

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); //Converts ms to days

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1);


//LECTURE: Internationalising Numbers (Intl)
const num = 1551554165.25;

const options = {
  style: "currency", //Other options: unit, percent.
  unit: "celsius",
  currency: "EUR",
  // useGrouping: false, //Removes comma separators
};

console.log("UK: ", new Intl.NumberFormat("en-GB", options).format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE", options).format(num));
console.log("Syria: ", new Intl.NumberFormat("ar-SY", options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

//LECTURE: setTimeout and setInterval

//setTimeout
const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log("Waiting...");
//First paramater is the function, the second is how long, in ms, it is scheduled to execute, everything that is the arguments that will be taken as parameters

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);
//clearTimeout cancels the timer

//setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

*/
