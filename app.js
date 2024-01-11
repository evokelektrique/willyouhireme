/**
 * Get a random gif from Giphy
 * 
 * @param {String} search Search anything on Giphy
 * @returns Downsized version of the gif 480p
 */
const getRandomGif = async (search) => {
  const params = new URLSearchParams({
    q: search,
    api_key: "Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g", // I have no idea, It was publicly being used in their website(Giphy), yoink
    limit: 100,
  });
  const request = await fetch('https://api.giphy.com/v1/gifs/search?' + params.toString())
  const response = await request.json();

  const randomPick = response.data[Math.floor(Math.random() * response.data.length)];

  return randomPick.images.downsized.url;
}

const makeItUnTouchable = (button) => {
  // Get button dimensions
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  // Get window dimensions
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Calculate maximum allowed position
  const maxX = windowWidth - buttonWidth;
  const maxY = windowHeight - buttonHeight;

  // Calculate random position within the maximum allowed area
  const randomX = Math.min(Math.random() * maxX, maxX);
  const randomY = Math.min(Math.random() * maxY, maxY);

  // Set the new position
  button.style.position = 'absolute';
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const gif_container = document.getElementById('gif-container');
  const search = gif_container.dataset.search || "ryan+gosling";
  const randomGif = await getRandomGif(search);

  const gif = document.createElement('img');
  gif.src = randomGif;

  gif_container.appendChild(gif);
})
