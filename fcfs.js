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
    document.getElementById(i + "" + 0).value = "p" + "" + i;
  }
}
function fcfs() {
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
    for (let i = 1; i < n; i++) {
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

  let processes = [];
  let burst_time = [];
  let z = document.getElementById("my");
  let rows = z.rows.length;

  for (var i = 1; i < rows; i++) {
    a = parseInt(document.getElementById(i - 1 + "" + 0).value);
    processes.push(a);
    b = parseInt(document.getElementById(i - 1 + "" + 1).value);
    burst_time.push(b);
  }

  let n = processes.length;
  avgta(processes, n, burst_time);

  
}









 