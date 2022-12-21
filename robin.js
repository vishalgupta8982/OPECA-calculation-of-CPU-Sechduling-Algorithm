function createtable() {
  var a = parseInt(document.getElementById("p1").value);
  var cn = 5;

  var z = document.getElementById("my");
  var rows = z.rows.length;

  for (var r = 0; r < rows - 1; r++) {
    var v = document.getElementById("my").deleteRow(-1);
  }

  for(var r=0;r<a;r++)
  {
   var x=document.getElementById('my').insertRow(-1);
   for(var c=0;c<cn;c++)  
    {
        if(c==1||c==2){
            var y=  x.insertCell(c);
     y.innerHTML="<input class='table' id="+r+""+c+">"; 
     continue
        }
     var y=  x.insertCell(c);
     y.innerHTML="<input readonly='readonly' class='table' id="+r+""+c+">"; 
    }
   }

  var z = document.getElementById("my");
  var rows = z.rows.length;
  for (var i = 0; i < rows - 1; i++) {
    document.getElementById(i + "" + 0).value = "p" + (i + 1);
  }
}

function newcreatetable() {
  var a = parseInt(document.getElementById("p1").value);
  var cn = 5;

  for(var r=0;r<a;r++)
  {
   var x=document.getElementById('my').insertRow(-1);
   for(var c=0;c<cn;c++)  
    {
        if(c==1||c==2){
            var y=  x.insertCell(c);
     y.innerHTML="<input class='table' id="+r+""+c+">"; 
     continue
        }
     var y=  x.insertCell(c);
     y.innerHTML="<input readonly='readonly' class='table' id="+r+""+c+">"; 
    }
   }
  let z = document.getElementById("my");
  let rows = z.rows.length;
}
function robin() {
  const queueUpdation = (queue, timer, arrival, n, maxProccessIndex) => {
    let zeroIndex;
    for (let i = 0; i < n; i++) {
      if (queue[i] == 0) {
        zeroIndex = i;
        break;
      }
    }
    queue[zeroIndex] = maxProccessIndex + 1;
  };

  const queueMaintainence = (queue, n) => {
    for (let i = 0; i < n - 1 && queue[i + 1] != 0; i++) {
      let temp = queue[i];
      queue[i] = queue[i + 1];
      queue[i + 1] = temp;
    }
  };

  const checkNewArrival = (timer, arrival, n, maxProccessIndex, queue) => {
    if (timer <= arrival[n - 1]) {
      let newArrival = false;
      for (let j = maxProccessIndex + 1; j < n; j++) {
        if (arrival[j] <= timer) {
          if (maxProccessIndex < j) {
            maxProccessIndex = j;
            newArrival = true;
          }
        }
      }
      //adds the incoming process to the ready queue
      //(if any arrives)
      if (newArrival) queueUpdation(queue, timer, arrival, n, maxProccessIndex);
    }
  };

  //Driver Code
  let n = parseInt(document.getElementById("p1").value);
  let tq = parseInt(document.getElementById("q1").value);
  let timer = 0;
  let maxProccessIndex = 0;
  let avgWait = 0;
  let avgTT = 0;
  let wait = [];
  let turn = [];
  let queue = [];
  let temp_burst = [];
  let complete = [];
  let arrival = [];
  let burst = [];
  var z = document.getElementById("my");
  var rows = z.rows.length;
  for (var i = 0; i < rows - 1; i++) {
    a = parseInt(document.getElementById(i + "" + 1).value);
    arrival.push(a);

    b = parseInt(document.getElementById(i + "" + 2).value);
    burst.push(b);
  }

  for (let i = 0; i < n; i++) {
    temp_burst[i] = burst[i];
  }

  for (let i = 0; i < n; i++) {
    //Initializing the queue and complete array
    complete[i] = false;
    queue[i] = 0;
  }
  while (timer < arrival[0])
    //Incrementing Timer until the first process arrives
    timer++;
  queue[0] = 1;

  while (true) {
    let flag = true;
    for (let i = 0; i < n; i++) {
      if (temp_burst[i] != 0) {
        flag = false;
        break;
      }
    }
    if (flag) break;

    for (let i = 0; i < n && queue[i] != 0; i++) {
      let ctr = 0;
      while (ctr < tq && temp_burst[queue[0] - 1] > 0) {
        temp_burst[queue[0] - 1] -= 1;
        timer += 1;
        ctr++;

        // Checking and Updating the ready queue until all the processes arrive
        checkNewArrival(timer, arrival, n, maxProccessIndex, queue);
      }
      // If a process is completed then store its exit time
      // and mark it as completed
      if (temp_burst[queue[0] - 1] == 0 && complete[queue[0] - 1] == false) {
        //turn array currently stores the completion time
        turn[queue[0] - 1] = timer;
        complete[queue[0] - 1] = true;
      }

      // checks whether or not CPU is idle
      let idle = true;
      if (queue[n - 1] == 0) {
        for (let i = 0; i < n && queue[i] != 0; i++) {
          if (complete[queue[i] - 1] == false) {
            idle = false;
          }
        }
      } else idle = false;

      if (idle) {
        timer++;
        checkNewArrival(timer, arrival, n, maxProccessIndex, queue);
      }

      //Maintaining the entries of processes
      //after each premption in the ready Queue
      queueMaintainence(queue, n);
    }
  }

  for (let i = 0; i < n; i++) {
    turn[i] = turn[i] - arrival[i];
    wait[i] = turn[i] - burst[i];
  }

  for (let i = 0; i < n; i++) {
    document.getElementById(i + "" + 3).value = wait[i];
    document.getElementById(i + "" + 4).value = turn[i];
  }
  for (let i = 0; i < n; i++) {
    avgWait += wait[i];
    avgTT += turn[i];
  }
  avgTT /= n;
  avgWait /= n;
  document.getElementById("avgwt").value = avgWait;
  document.getElementById("avgtat").value = avgTT;
}
