export function validateForm() {
  let x = document.forms["myForm"]["firstName"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}
