const type = [
  "Multi-Bit Screwdriver",
  "Drill",
  "Claw Hammer",
  "Adjustable Wrench",
  "Folding Hex Key Set",
  "Pliers",
  "Flashlight",
  "Tape Measure",
  "Extention Cord",
  "Level",
  "Ladder",
  "Caulking Gun",
  "Chisels",
  "Backsaw",
  "Handsaw",
  "Rasps",
  "Gimlet",
];

const location = [
  "Warehouse",
  "Warehouse",
  "Warehouse",
  "Warehouse",
  "Warehouse",
  "Vehicle 1",
  "Vehicle 2",
  "Vehicle 3",
  "Vehicle 4",
  "Vehicle 5",
  "Vehicle 6",
  "Vehicle 7",
  "Vehicle 8",
  "Tool Repair",
];

const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
};
const arr = [];
const noDups = (arr, random) => {
  while (arr.includes(random)) {
    random = (Math.floor(Math.random() * 100000) + 100000)
      .toString()
      .substring(1);
  }
  random = pad(random, 5);
  arr.push(random);
  return random;
};
console.log("INSERT INTO ihq.inventory_items values");
for (let i = 0; i < 500; i++) {
  var rand = (Math.floor(Math.random() * 100000) + 100000)
    .toString()
    .substring(1);
  var locationInd = location[Math.floor(Math.random() * location.length)];
  var typeInd = type[Math.floor(Math.random() * type.length)];
  var newrand = noDups(arr, rand);
  if (i < 499)
    console.log("(" + newrand + ',"' + typeInd + '","' + locationInd + '"),');
  else
    console.log("(" + newrand + ',"' + typeInd + '","' + locationInd + '");');
}
