document.addEventListener("DOMContentLoaded", ()=> {
  console.log('Main JS Loaded!');

  let flashMessage = document.getElementById('flash-message');
  function hideFlashMessage() {
    setTimeout(() => {
      flashMessage.style.display = "none";
    }, 5000);
  }
  hideFlashMessage();


  // /* vp_h will hold the height of the browser window */
  // let vp_h = $(window).height();
  // console.log(vp_h);
  // /* b_g will hold the height of the html body */
  // let b_g = $('body').height();
  // console.log(b_g);
  // /* If the body height is lower than window */
  // if(b_g < vp_h) {
  //  /* Set the footer css -> position: absolute; */
  //  $('.footer').css("position","absolute");
  // }



  // window.addEventListener("scroll", function(e){
  //   var icon = document.querySelector(".service-icon");
  //   if(this.scrollY == 10){ // if scrolled 10px from the top
  //
  //       icon.classList.add("animate"); // add class "animate"
  //
  //   } else if(this.scrollY < 10){ // if at top of page
  //
  //       icon.classList.remove("animate"); // remove class "animate"
  //
  //   }
  // });

});
