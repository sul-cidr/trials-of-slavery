(() => {
  const jumpLinksContainer = document.querySelector(".jump-links");
  const targets = document.querySelectorAll(".jump-targets [id]");
  const fudgeFactor = 5;

  window.onscroll = () => {
    const scrollPos =
      document.documentElement.scrollTop || document.body.scrollTop;
    targets.forEach((target: HTMLElement) => {
      if (
        target.offsetTop -
          parseInt(getComputedStyle(target)["scroll-margin-top"], 10) -
          fudgeFactor <=
        scrollPos
      ) {
        jumpLinksContainer.querySelector(".active")?.classList.remove("active");
        jumpLinksContainer
          .querySelector(`[href*=${target.id}]`)
          .classList.add("active");
      }
    });
  };
})();
