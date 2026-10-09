
/* ITACHIVERSE cinematic page enhancement */
document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".iv-reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("iv-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("iv-visible"));
  }
});
