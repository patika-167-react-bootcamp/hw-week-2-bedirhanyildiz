const state = {
  userList: []
 };

function setState(stateName, newValue) {
  state[stateName] = newValue;
}

let userId = 0


function addUser (event) {
    event.preventDefault()
    const userName = document.getElementById("newUser").value;
    const balance = document.getElementById("balance").value;

  
      setState("userList", [
        ...state.userList,
        {
          id: userId +=1,
          name: userName,
          balance: balance,
        },
      ]);
      senderList(userName,userId,balance)
      updateList()
      addedHistory(userName)
      document.getElementById('form').reset();
    }
}


function senderList(userName,userId) {
  const sender = document.getElementById('sender')
  const option = document.createElement('option')
  option.setAttribute('value',userName)
  option.setAttribute('id',userId)
  option.innerText = userName
  sender.appendChild(option)
 
  const receiver = document.getElementById('receiver')
  const option2 = document.createElement('option')
  option2.setAttribute('value',userName)
  option2.setAttribute('id',userId)
  option2.innerText = userName

 receiver.appendChild(option2)
}


function sendMoney(event) {

  event.preventDefault();
  const userSender = sender.value;
  const userReceiver = receiver.value;
  const senderIndex = sender.selectedIndex;
  const receiverIndex = receiver.selectedIndex;
  const amount = Number(document.getElementById("amount").value)
  const senderBalance = state.userList.find((item) => item.id == senderIndex)
  const receiverBalance = state.userList.find((item) => item.id == receiverIndex)


    senderBalance.balance -= amount
    receiverBalance.balance = Number(receiverBalance.balance)+ amount
     
    updateList()
    history(userSender,userReceiver,amount)
    document.getElementById('transferForm').reset();
  }
}


 function addedHistory(userName){
  const history= document.querySelector('#historyList');
  const historyLi = document.createElement('tr')
  
  historyLi.innerHTML = `
  <td id="historyLine">${userName} İsimli Kullanıcı Eklenmiştir.</td> 
  `;
  history.appendChild(historyLi)
 }


 function  updateList() {

  const allUserList= document.querySelector('#userTable');
  allUserList.innerHTML = ``;
  state.userList.map((user) => {
      const newLine = document.createElement('tr');

      newLine.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.balance}₺</td>
        `;
      allUserList.appendChild(newLine);
  });
};

function history(userSender,userReceiver,amount) { 
  const history= document.querySelector('#historyList');
  const historyLi = document.createElement('tr')
  
  historyLi.innerHTML = `
  <td id="historyLine">${userSender} tarafından ${amount} ₺ kullanıcı adı ${userReceiver} olan kullanıcıya gönderilmiştir. Transaction time : ${new Date().toLocaleString()}</td> 
  `;
  history.appendChild(historyLi)
}
