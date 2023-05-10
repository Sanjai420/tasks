var slider = document.getElementById("myRange");
var slider1 = document.getElementById("myRange1");
var slider2 = document.getElementById("myRange2");
var output = document.getElementById("demo");
var output1 = document.getElementById("demo1");
var output2 = document.getElementById("demo2");
var max = document.getElementById("max");

output.innerHTML = slider.value;
output1.innerHTML = slider1.value;
output2.innerHTML = slider2.value;
max.innerHTML = "50";

slider.oninput = function() {
  output.innerHTML = this.value;
  if (this.value >= slider1.value && this.value >= slider2.value) {
    max.innerHTML = this.value;
  }
}

slider1.oninput = function() {
  output1.innerHTML = this.value;
  if (this.value >= slider.value && this.value >= slider2.value) {
    max.innerHTML = this.value;
  }
}

slider2.oninput = function() {
  output2.innerHTML = this.value;
  if (this.value >= slider.value && this.value >= slider1.value) {
    max.innerHTML = this.value;
  }
}