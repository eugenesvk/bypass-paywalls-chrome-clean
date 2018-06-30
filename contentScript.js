if (window.location.href.indexOf("bizjournals.com") > -1) {
  const hiddenStory = document.getElementsByClassName(
    "js-pre-chunks__story-body"
  );
  if (hiddenStory) {
    hiddenStory[0].style.display = "block";
  }

  const payWallMessage = document.getElementsByClassName("chunk chunk--flex@lg chunk--paywall");
  if (hiddenStory) {
    payWallMessage[0].style.display = "none";
  }
}
