const LANDMARK_WIDTH = 135.5;

const data = [
  [
    1,
    "Reykjavík, Iceland",
    "The journey of a thousand miles begins with a single step.",
    "Lao Tzu",
    0,
  ],
  [
    2,
    "Reykjavík, Iceland",
    "If you are brave enough to say goodbye, life will reward you with a new hello.",
    "Paulo Coelho",
    0,
  ],
  [
    3,
    "Tórshavn, Faroe Islands",
    "It is not the mountain we conquer but ourselves.",
    "Sir Edmund Hillary",
    1,
  ],
  [
    4,
    "Bergen, Norway",
    "May your days be merry and bright, and may all your Christmases be white.",
    "Irving Berlin",
    2,
  ],
  [
    5,
    "Oslo, Norway",
    "The world is a book and those who do not travel read only one page.",
    "Saint Augustine",
    3,
  ],
  [
    6,
    "Copenhagen, Denmark",
    "Kindness is like snow—it beautifies everything it covers.",
    "Kahlil Gibran",
    4,
  ],
  [7, "Hamburg, Germany", "Adventure is worthwhile.", "Aesop", 5],
  [
    8,
    "Amsterdam, Netherlands",
    "The best way to spread Christmas cheer is singing loud for all to hear.",
    "Buddy the Elf (from 'Elf')",
    6,
  ],
  [
    9,
    "London, United Kingdom",
    "Do not follow where the path may lead. Go instead where there is no path and leave a trail.",
    "Ralph Waldo Emerson",
    7,
  ],
  [
    10,
    "Paris, France",
    "Blessed is the season which engages the whole world in a conspiracy of love.",
    "Hamilton Wright Mabie",
    8,
  ],
  [
    11,
    "Brussels, Belgium",
    "A single act of kindness throws out roots in all directions, and the roots make all trees pop up.",
    "Amelia Earhart (paraphrased for Christmas tree theme)",
    9,
  ],
  [12, "Trier, Germany", "Oh, the places you'll go!", "Dr. Seuss", 10],
  [
    13,
    "Lucerne, Switzerland",
    "The only way to achieve the impossible is to believe it is possible.",
    "Charles Kingsleigh (from 'Alice in Wonderland')",
    11,
  ],
  [
    14,
    "Milan, Italy",
    "Travel makes one modest. You see what a tiny place you occupy in the world.",
    "Gustave Flaubert",
    12,
  ],
  [
    15,
    "Venice, Italy",
    "Keep your eyes on the stars, and your feet on the ground.",
    "Theodore Roosevelt",
    13,
  ],
  [
    16,
    "Florence, Italy",
    "The true meaning of Christmas is giving and sharing the love and light you have.",
    "Unknown",
    14,
  ],
  [
    17,
    "Rome, Italy",
    "Ancient Wonders",
    "Life is either a daring adventure or nothing at all.",
    "Helen Keller",
    15,
  ],
  [
    18,
    "Rome, Italy",
    "We travel not to escape life, but for life not to escape us.",
    "Anonymous",
    15,
  ],
  [
    19,
    "Naples, Italy",
    "The biggest adventure you can take is to live the life of your dreams.",
    "Oprah Winfrey",
    16,
  ],
  [
    20,
    "Valletta, Malta",
    "Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do.",
    "Mark Twain",
    17,
  ],
  [
    21,
    "Zagreb, Croatia",
    "If you think adventure is dangerous, try routine; it is lethal.",
    "Paulo Coelho",
    18,
  ],
  [
    22,
    "Split, Croatia",
    "We live in a wonderful world that is full of beauty, charm and adventure. There is no end to the adventures we can have if only we seek them with our eyes open.",
    "Jawaharlal Nehru",
    19,
  ],
  [
    23,
    "Ljubljana, Slovenia",
    "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    "Albus Dumbledore (from 'Harry Potter')",
    20,
  ],
  [
    24,
    "Vienna, Austria",
    "Christmas waves a magic wand over this world, and behold, everything is softer and more beautiful.",
    "Norman Vincent Peale",
    21,
  ],
  [
    25,
    "Bratislava, Slovakia",
    "To boldly go where no man has gone before.",
    "Captain Kirk (from 'Star Trek')",
    22,
  ],
  [
    26,
    "Budapest, Hungary",
    "Fill your life with experiences, not things. Have stories to tell, not stuff to show.",
    "Anonymous",
    23,
  ],
  [27, "Belgrade, Serbia", "He who is brave is free.", "Seneca", 24],
  [
    28,
    "Sofia, Bulgaria",
    "Only the light of Christmas can conquer the deep shadows of the year.",
    "Unknown",
    25,
  ],
  [
    29,
    "Plovdiv, Bulgaria",
    "Life itself is the most wonderful fairy tale.",
    "Hans Christian Andersen",
    26,
  ],
  [
    30,
    "Thessaloniki, Greece to Mount Olympus and Delphi",
    "We keep moving forward, opening new doors, and doing new things, because we're curious and curiosity keeps leading us down new paths.",
    "Walt Disney",
    27,
  ],
];

let animateInterval = null;
let animateOffset = 0;
let daysLeft = 0;

function positionIconAtPercent(percent) {
  const path = document.querySelector("svg path");
  const santa = document.querySelector("#santa-sleigh");
  const svg = document.querySelector("svg");

  const svgLayout = {
    left: 21,
    top: 21,
    width: 56,
    height: 52,
  };

  const totalLength = path.getTotalLength();

  const point = path.getPointAtLength(totalLength * percent);
  const vb = svg.viewBox.baseVal;

  const relativeX = (point.x - vb.x) / vb.width;
  const relativeY = (point.y - vb.y) / vb.height;

  const finalLeft = svgLayout.left + relativeX * svgLayout.width;
  const finalTop = svgLayout.top + relativeY * svgLayout.height;

  santa.style.left = `${finalLeft}%`;
  santa.style.top = `${finalTop}%`;
}

const animatePath = () => {
  const svg = document.querySelector("#map svg");
  animateOffset += 0.5;

  svg.style["strokeDasharray"] = `${animateOffset} 30`;
  if (animateOffset >= 30 - daysLeft) {
    positionIconAtPercent((30 - daysLeft) / 30);
    animateOffset = 0;
    clearInterval(animateInterval);
  }
};

(function () {
  const mapElem = document.querySelector("#map");
  const countdownDayElem = document.querySelector("#countdown-day");
  const locationTitleElem = document.querySelector("#location-title");
  const locationImageElem = document.querySelector("#location-image");
  const quoteElem = document.querySelector("#quote");
  const showMapElems = document.querySelectorAll(".clickable");

  const today = new Date();
  const deliveryDate = new Date(2026, 0, 20);
  const timeDiff = deliveryDate - today;
  daysLeft = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));

  countdownDayElem.innerText = daysLeft;

  if (daysLeft <= 0) {
    locationTitleElem.innerText = "Your Hands!";
    quoteElem.innerText = "Merry Christmas! - Santa Claus";
    locationImageElem.style["background"] =
      "url('images/package.png') center center no-repeat";
    return;
  }

  const [day, location, quote, source, imageIndex = 0] =
    data[Math.max(0, 30 - daysLeft)];

  locationTitleElem.innerText = location;
  locationImageElem.style["background-position"] = `${
    -imageIndex * LANDMARK_WIDTH
  }px center`;
  quoteElem.innerText = `"${quote}" - ${source}`;

  const toggleMap = () => {
    mapElem.classList.toggle("bg");
    if (!mapElem.classList.contains("bg"))
      animateInterval = setInterval(animatePath, 35);
  };

  showMapElems.forEach((elem) => elem.addEventListener("click", toggleMap));
})();
