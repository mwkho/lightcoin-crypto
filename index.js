class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    for (let transaction of this.transactions) {
      sum += transaction.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(account,amount) {
    this.account = account;
    this.amount = amount;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date;
      this.account.addTransaction(this);
      return true;
    } return false;

  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance >= this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');
let t3 = new Deposit(myAccount, 10);
t3.commit();
console.log('Transaction 3:', t3);

let t1 = new Withdrawal(myAccount, 50.0);
t1.commit();
console.log('Transaction 1:', t1);

let t2 = new Withdrawal(myAccount,9.99);
t2.commit();
console.log('Transaction 2:', t2);


console.log('Balance:', myAccount.balance);
