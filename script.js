document.getElementById("submit").onclick = function() {
  var data = document.getElementById("input-text").value;
  document.getElementById("wordArr").textcontent = arrayify(findUniq(data));
  document.getElementById("form1").submit();
};

function findUniq(arg) {
//arg is body of text from which frequency list is generated
  var argList = arg.toLowerCase().split(" ");
 var uniqueWords = [];
  for (var i = 0; i < argList.length; i++) {
    if (uniqueWords.indexOf(argList[i]) === -1) {
      uniqueWords.push(argList[i]);
    }
  }
  return findFreq(uniqueWords, argList);
}

function findFreq(arr, argList) {
  var freqList = {};
  for (var i = 0; i <arr.length; i++) {
    var counter = 0;
    for (var j = 0; j < argList.length; j++) {
      if (arr[i] === argList[j]) {
        counter++;
      }
    }
    freqList[arr[i]] = counter;
  }
  return freqList;
}

function arrayify(obj) {
  var finalArr = [];
  var max = document.getElementById("number");
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
    finalArr.push(obj[prop]);
    }
  }
  finalArr.sort(function(a,b) {
    return b-a;
  });
  finalArr = finalArr.slice(0,max);
  return finalArr;
}
