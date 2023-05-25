class Account {
    private bankName: string;
    private owner: string;
    private balance: number;
    private accountNumber: string;

    constructor (bankName: string, owner: string, balance: number, accountNumber: string) {
        this.bankName = bankName;
        this.owner = owner;
        this.balance = balance;
        this.accountNumber = accountNumber;

    }

    getBankName(): string {
        return this.bankName;
    }

    getOwner(): string {
        return this.owner;
    }

    getBalance(): number {
        return this.balance;
    }

    getAccountNumber(): string {
        return this.accountNumber;
    }

    deposit(amount: number) {
        this.balance += amount;
    } 

    withdraw(amount: number) {
        if(this.balance >= amount) {
            this.balance -= amount;
            return this.balance;
        } else {
            alert("Insufficient Funds")
        }
    }

    transfer(amount: number, account: Account) {
        if(this.balance >= amount) {
            this.balance -= amount;
            return account.deposit(amount);
        } else {
            alert("Insufficient Funds")
        }
    }
}

class AccountRepository{
    private accounts: Array<Account>;
    constructor(accts: Array<Account>) {
        this.accounts = accts;
    }
    getAccountByAccountNumber(accountNumber: string): Account | null {
        const requiredAccount = this.accounts.find((account) => account.getAccountNumber() === accountNumber);
        if(!requiredAccount) return null;
        return requiredAccount;
    }
}



const user1 = new Account("NewBank", "Adejuwon Temitayo", 3000, "12000002")
const user2 = new Account("NewBank", "Adetayo Omotomiwa", 10000, "0226660175")

const accounts = new AccountRepository([user1, user2]);


// update UI


const currencyUtility = (number) => {
     const CURRENCY_FORMATTER = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })

     return CURRENCY_FORMATTER.format(number);
}

const updateUI = () => {

  if(document){
    //   User One
    const userOneAccountBalance = document.getElementById("user_one_balance")!;
    const userOneAccountNumber = document.getElementById("user_one_account_number")!;
    const userOneUserName = document.getElementById("user_one_username")!;

    userOneAccountBalance.innerHTML = `<span>Balance: <span/> <span class="font-semibold" >${currencyUtility(user1.getBalance())}</span>`;
    userOneAccountNumber.innerHTML = `<span>Account Number: </span> <span class="font-semibold">${user1.getAccountNumber()} </span> `;
    userOneUserName.innerText = `Name: ${user1.getOwner()}`;

    const userTwoAccountBalance = document.getElementById("user_two_balance")!;
    const userTwoAccountNumber = document.getElementById("user_two_account_number")!;
    const userTwoUserName = document.getElementById("user_two_username")!;

    userTwoAccountBalance.innerText = `Balance: ${currencyUtility(user2.getBalance())}`;
    userTwoAccountNumber.innerText = `Account Number: ${user2.getAccountNumber()}`;
    userTwoUserName.innerText = `Name: ${user2.getOwner()}`;
  }

}

// withdraw

const withdraw = (sectionId: string, user: Account) => {

    const userSection = document.getElementById(sectionId)!;
    const formElement = userSection.querySelector(".withdraw-form")!
    const withdrawInput  = formElement.getElementsByTagName("input")[0]!

    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const  amount = Number(withdrawInput.value) || 0;
        user.withdraw(amount);
        updateUI();
        withdrawInput.value = "";
    })
}

//  
withdraw("user-one", user1);
withdraw("user-two", user2);


const deposit = (sectionId: string, user: Account) => {

    const userSection = document.getElementById(sectionId)!;
    const formElement = userSection.querySelector(".deposit-form")!
    const depositInput  = formElement.getElementsByTagName("input")[0]!

    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const  amount = Number(depositInput.value) || 0;
        user.deposit(amount);
        updateUI();
        depositInput.value = "";
    })
}

deposit("user-one", user1);
deposit("user-two", user2);




const transfer = (sectionId: string, user: Account) => {

    const userSection = document.getElementById(sectionId)!;
    const formElement = userSection.querySelector(".transfer-form")!
    const accountNumber  = formElement.getElementsByTagName("input")[0]!
    const transferInput  = formElement.getElementsByTagName("input")[1]!


    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const amountToSend = Number(transferInput.value);
        const receivingUser = accounts.getAccountByAccountNumber(accountNumber.value);

        if(!receivingUser){
            alert("User Not Found");
            return;
        }
        user.transfer(amountToSend, receivingUser);
        updateUI();
        accountNumber.value = "";
        transferInput.value = "";
    })
}


transfer("user-one", user1);
transfer("user-two", user2);




updateUI()