var timeVariable;

function myFunction() {
    timeVariable = setTimeout(showPage, 1000);
}

function showPage() {
    console.log("working")
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}