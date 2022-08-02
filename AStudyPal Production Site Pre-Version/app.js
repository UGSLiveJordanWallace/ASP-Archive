if ($(document).width() > 1100){
  console.log("This is AStudyPal's WEBSITE");
}
else {
  console.log("This is AStudyPal's mobile WEBSITE");
  const git = document.getElementById("github-link");
  const gitParent = git.parentNode;
  document.getElementById("git").style.display="none";
  gitParent.removeChild(git);

  const signup = document.getElementById("signup-link");
  const signupParent = signup.parentNode;
  signupParent.removeChild(signup);
  document.getElementById("sign").style.display="none";

  const homeLink = document.getElementById("home-link");
  const parentHome = homeLink.parentNode;
  parentHome.removeChild(homeLink);

  const classLink = document.getElementById("class-link");
  const parentClass = classLink.parentNode;
  // parentClass.removeChild(classLink);
  // document.getElementById("cla").style.display="none";
  document.getElementById("navbar").style.display="none";
  document.querySelector("p").style.fontSize="6.5vw";
  document.getElementById("title").style.fontSize="14.2vw";
  document.getElementById("link-it").style.fontSize="8vw";
  document.getElementById("download-p").style.fontSize="5vw";
}

$('.navbar a').on('click', function(e){
  if(this.hash !== ""){
    e.preventDefault();
    const hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 600);
  }
})
