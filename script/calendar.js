function calendar() {
   const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ];
   var d = new Date();
   var month = d.getMonth();
   var year = d.getFullYear();
   var displaymonth = document.getElementById('month')
   displaymonth.innerText += "Things ToDo in " + monthNames[d.getMonth()]

   function getDaysInMonth(month, year) {
      var date = new Date(Date.UTC(year, month, 1));
      var days = [];
      while (date.getMonth() === month) {
         days.push(new Date(date));
         date.setDate(date.getDate() + 1);
      }
      return days;
   }

   var days = getDaysInMonth(month, year)

   days.forEach(function (el, i) {
      var i = ++i + 0;
      var id = 0
      var num = `${i}`
      var tab = `${i}`
      var today = new Date()
      var weekday = today.getDate();
      var newdiv = '<div id=' + num + ' class=result> ' + tab + ' </div>';
      document.getElementById('days').innerHTML += (newdiv);
      if (tab == weekday) {
         document.getElementById(weekday).classList.add('today')

      }
   });

}
document.addEventListener("DOMContentLoaded", main);