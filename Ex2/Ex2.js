const numberSelector = $("#numberSelector");
const cityList = $("#cityItems");
const items = cityList.children(".item");

const options = [
  { value: "", text: "" },
  { value: "one", text: "1" },
  { value: "two", text: "2" },
  { value: "three", text: "3" },
  { value: "four", text: "4" },
  { value: "five", text: "5" },
  { value: "six", text: "6" },
  { value: "even", text: "Chẵn" },
  { value: "odd", text: "Lẻ" },
  { value: "reset", text: "Reset" },
];

const cities = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Huế",
  "Hải Phòng",
  "Nha Trang",
];

$.each(options, function (index, option) {
  const optionElement = $("<option>").val(option.value).text(option.text);
  numberSelector.append(optionElement);
});

$.each(cities, function (index, city) {
  const listItem = $("<li>")
    .addClass("item")
    .text(`${index + 1}.${city}`);
  cityList.append(listItem);
});

numberSelector.on("change", function () {
  highlightRows(this.value, items);
});

const itemMappings = {
  one: 0,
  two: 1,
  three: 2,
  four: 3,
  five: 4,
  six: 5,
  even: function (i) {
    return i % 2 === 1;
  },
  odd: function (i) {
    return i % 2 === 0;
  },
};

function setItemBackground(index, color) {
  if (index >= 0 && index < items.length) {
    items.eq(index).toggleClass("highlighted", color === "yellow");
  }
}

function highlightRows(selectedValue, items) {
  console.log(selectedValue);
  const mappingFunction = itemMappings[selectedValue];
  console.log(mappingFunction); // Thêm dòng này
  items.css("background-color", "");
  console.log(mappingFunction); // Thêm dòng này
  items.each(function (i) {
    console.log(i); // Thêm dòng này
    if (mappingFunction(i)) {
      setItemBackground(i, "yellow");
    }
  });
}
