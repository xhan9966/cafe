"use strict";

const firstUpperCase = ([first, ...rest]) =>
  first?.toUpperCase() + rest.join("");

// hover in
const handlerIn = (event) => {
  const src = event.target.src.replace(".jpg", "_info.jpg");
  event.target.src = src;
};

// hover out
const handlerOut = (event) => {
  const src = event.target.src.replace("_info.jpg", ".jpg");
  event.target.src = src;
};

const menu = [
  {
    name: "espresso",
    price: 1.95,
  },
  {
    name: "latte",
    price: 2.95,
  },
  {
    name: "cappuccino",
    price: 3.45,
  },
  {
    name: "coffee",
    price: 1.75,
  },
  {
    name: "biscotti",
    price: 1.95,
  },
  {
    name: "scone",
    price: 2.95,
  },
];

let orders = [];

const handlerClick = (index) => {
  clearError();

  const name = menu[index].name;
  const price = menu[index].price;
  let item = null;
  orders.forEach((element) => {
    if (element.name === name) {
      item = element;
      item["count"] += 1;
    }
  });
  if (item === null) {
    item = menu[index];
    item["count"] = 1;
    orders.push(item);
  }
  $("#order option").remove();

  let total = 0;
  orders.forEach((element) => {
    const optionText = `$${element.price} - ${firstUpperCase(
      element.name
    )}  x ${element.count}`;
    $("#order").append(new Option(optionText, element.count));

    total += element.price * element.count;
  });

  total = total.toFixed(2);
  $("#total").html(`Total: $${total}`);
};

const placeOrder = () => {
  // error message will be displayed, if no item
  if (orders.length <= 0) {
    $("#error").html("Please select one item at least!");
    return;
  }
  $("#order_form").submit();
};

const clearOrder = () => {
  $("#order option").remove();
  orders = [];
  $("#total").html(``);
  clearError();
};

// clear error
const clearError = () => {
  $("#error").html("");
};

document.addEventListener("DOMContentLoaded", () => {
  // get all the img elements in menu and for each element
  $("#menu img").each(function (index) {
    //get the src from id and preload
    var img = new Image();
    img.src = $(this).attr("id");

    // add hover events
    $(this).hover(handlerIn, handlerOut);

    // add click event
    $(this).click(function () {
      handlerClick(index);
    });
  });

  // add click event for place_order button
  $("#place_order").click(placeOrder);

  // add click event for clear_order button
  $("#clear_order").click(clearOrder);
});
