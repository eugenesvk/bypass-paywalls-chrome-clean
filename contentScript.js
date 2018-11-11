window.localStorage.clear();
if (window.location.href.indexOf("bizjournals.com") !== -1) {
  const hiddenStory = document.getElementsByClassName(
    "js-pre-chunks__story-body"
  );
  if (hiddenStory && hiddenStory.length>0) {
    hiddenStory[0].style.display = "block";
  }

  const payWallMessage = document.getElementsByClassName(
    "chunk chunk--flex@lg chunk--paywall"
  );
  if (payWallMessage && payWallMessage.length>0 ) {
    payWallMessage[0].style.display = "none";
  }
} else if (window.location.href.indexOf("businessinsider.com") !== -1) {
  const paywall = document.getElementsByClassName(
    "tp-modal"
  );
  while (paywall.length > 0) {
    paywall[0].parentNode.removeChild(paywall[0]);
  }
}