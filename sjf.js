function createtable() {
  var a = parseInt(document.getElementById("p1").value);
  var cn = 4;

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
        if(c==1){
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
  var cn = 4;

  for(var r=0;r<a;r++)
  {
   var x=document.getElementById('my').insertRow(-1);
   for(var c=0;c<cn;c++)  
    {
        if(c==1){
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

function sjf() {
  function wta(processes, n, bt, wt) {
    wt[0] = 0;
    for (let i = 1; i < n; i++) {
      wt[i] = bt[i - 1] + wt[i - 1];
    }
  }
  function tata(processes, n, bt, wt, tat) {
    for (let i = 0; i < n; i++) {
      tat[i] = bt[i] + wt[i];
    }
  }
  function avgta(processes, n, bt) {
    let wt = new Array(n),
      tat = new Array(n);
    for (let i = 0; i < n - 1; i++) {
      wt[i] = 0;
      tat[i] = 0;
    }
    let total_wt = 0,
      total_tat = 0;
    wta(processes, n, bt, wt);
    tata(processes, n, bt, wt, tat);
    for (let i = 0; i < n; i++) {
      total_wt = total_wt + wt[i];
      total_tat = total_tat + tat[i];
      document.getElementById(i + "" + 2).value = wt[i];
      document.getElementById(i + "" + 3).value = tat[i];
    }

    let s = total_wt / n;
    let t = total_tat / n;
    document.getElementById("avgwt").value = s;
    document.getElementById("avgtat").value = t;
  }

  var z = document.getElementById("my");
  var rows = z.rows.length;
  let burst_time = [];
  let burst_tim = [];
  let process = [];
  let processes = [];
  for (var i = 0; i < rows - 1; i++) {
    a = parseInt(document.getElementById(i + "" + 0).value);
    processes.push(a);

    b = parseInt(document.getElementById(i + "" + 1).value);
    burst_time.push(b);
  }

  for (var r = 0; r < rows - 1; r++) {
    var x = document.getElementById("my").deleteRow(-1);
  }
  newcreatetable();

  var i, j, n, pos, temp;

  for (i = 0; i < rows - 1; i++) {
    burst_time[i];

    processes[i] = i + 1;
  }
  for (i = 0; i < rows - 1; i++) {
    pos = i;
    for (j = i + 1; j < rows - 1; j++) {
      if (burst_time[j] < burst_time[pos]) pos = j;
    }
    temp = burst_time[i];
    burst_time[i] = burst_time[pos];
    burst_tim.push(burst_time[i]);
    burst_time[pos] = temp;

    temp = processes[i];

    processes[i] = processes[pos];
    process.push(processes[i]);
    processes[pos] = temp;
  }

  n = processes.length;

  for (var i = 0; i < rows - 1; i++) {
    document.getElementById(i + "" + 1).value = burst_time[i];
    document.getElementById(i + "" + 0).value = "p" + processes[i];
  }

  avgta(processes, n, burst_time);
}
