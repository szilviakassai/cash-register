function checkCashRegister(price, cash, cid) {
  var units = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
  var cidArr = cid.map(a => Math.round(100 * a[1]));
  var backArr = [
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ];
  var remainder = Math.round(100 * (cash - price));
  for (var i = cidArr.length - 1; i >= 0; i--) {
    while (cidArr[i] > 0 && remainder >= units[i]) {
      cidArr[i] -= units[i],
      backArr[i][1] += units[i],     
      remainder -= units[i]
    }; 
  };
  var funds = cidArr.reduce(function(a, b) {return a + b});
  if (remainder > 0 && funds > remainder && backArr[3][1] > 0) {
    backArr[3][1] -= units[3],
    cidArr[3] += units[3],
    remainder += units[3]
  };
  for (var i = 2; i >= 0; i--) {
    while (cidArr[i] > 0 && remainder >= units[i]) {
      cidArr[i] -= units[i],
      backArr[i][1] += units[i],
      remainder -= units[i]
    };
  };
  var status = "";
  var change = backArr.map(arr => [arr[0], Math.round(arr[1]) / 100]);    
  (remainder > 0)? (status = "INSUFFICIENT_FUNDS", change = []):
  funds === 0? (status = "CLOSED"):
  (status = "OPEN", change = change.reverse().filter(a => a[1] > 0));  
  return {"status": status, "change": change};
};
