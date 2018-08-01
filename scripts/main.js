var runningOrderList = [];
var currentI;
var orderFormInput = document.querySelector('[data-coffee-order="form"]');

var coffeeOrderInput = document.querySelector('.form-control');
var emailInput = document.querySelector('[name="emailAddress"]');
var flavorInput = document.querySelector('[name="flavor"]');
var caffeineInput = document.querySelector('[name="strength"]');

var pendingOrderList = document.querySelector('.pending-orders');

// var retrieveStorage = localStorage.getItem('order');
// var retrievedOrder = JSON.parse(retrieveStorage);
// runningOrderList = retrievedOrder;

// var displayOrders = function (runningOrderList) {
//     runningOrderList.forEach(function (item) {
//         var retainedOrderListItem = document.createElement('p');
//         var retainedOrder = document.createElement('li');
//         var retainedOrderFormInput = {order: '', email: '', size: '', flavor: '', caffeine: ''};
//         retainedOrderFormInput.order = item.value;
//         retainedOrderFormInput.email = item.value;
//         retainedOrderFormInput.size = item.value;
//         retainedOrderFormInput.flavor = item.value;
//         retainedOrderFormInput.caffeine = item.value;
//         retainedOrderListItem.textContent = retainedOrderFormInput.size + ' ' + retainedOrderFormInput.order + ' ' + retainedOrderFormInput.flavor + ' ' + retainedOrderFormInput.caffeine + ' ' + retainedOrderFormInput.email;
//         retainedOrder.appendChild(retainedOrderListItem);
//         pendingOrderList.appendChild(retainedOrder);
//     })
// };

// displayOrders(runningOrderList);

var createCheckBox = function () {
    var newCheckbox = document.createElement('input');
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.classList.add('order-list-item');
    newCheckbox.classList.add('checkbox');
    return newCheckbox;
};

var createOrderItem = function (pendingOrderFormInput) {
    var pendingOrderListItem = document.createElement('p');
    pendingOrderListItem.textContent = pendingOrderFormInput.size + ' ' + pendingOrderFormInput.order + ' ' + pendingOrderFormInput.flavor + ' ' + pendingOrderFormInput.caffeine + ' ' + pendingOrderFormInput.email;
    pendingOrderListItem.classList.add('order-list-item');
    return pendingOrderListItem;
};

orderFormInput.addEventListener('submit', function (event) {
    event.preventDefault();
    var sizeInput = document.querySelector('[name="size"]:checked');
    var pendingOrderItem = sizeInput.value + ' ' + coffeeOrderInput.value + ' ' + flavorInput.value + ' ' + caffeineInput.value + ' ' + emailInput.value;

    // var pendingOrderFormInput = [];
    // console.log(coffeeOrderInput.value);
    var pendingOrderFormInput = {order: '', email: '', size: '', flavor: '', caffeine: ''};

    // var sizePending = document.createElement('span')
    // sizePending.textContent = sizeInput.value;
    // pendingOrderFormInput.size = sizePending;

    // var coffeeOrderPending = document.createElement('span')
    // coffeeOrderPending.textContent = coffeeOrderInput.value;

    var pendingOrder = document.createElement('li');
    pendingOrder.classList.add('order-container')
    // var pendingOrderListItem = document.createElement('p');
    // pendingOrderListItem.textContent = pendingOrderItem;
    // pendingOrderListItem.classList.add('order-list-item');

    // var newCheckbox = document.createElement('input');
    // newCheckbox.setAttribute('type', 'checkbox');
    // newCheckbox.classList.add('order-list-item');
    // newCheckbox.classList.add('checkbox');
    
   

    // pendingOrderListItem.appendChild(pendingOrderItem);
    // pendingOrderItem.appendChild(coffeeOrderPending);
    // console.log(pendingOrderFormInput.order);
    pendingOrderFormInput.order = coffeeOrderInput.value;
    pendingOrderFormInput.email = emailInput.value;
    pendingOrderFormInput.size = sizeInput.value;
    pendingOrderFormInput.flavor = flavorInput.value;
    pendingOrderFormInput.caffeine = caffeineInput.value;

    // var pendingOrderListItem = document.createElement('p');
    // pendingOrderListItem.textContent = pendingOrderFormInput.size + ' ' + pendingOrderFormInput.order + ' ' + pendingOrderFormInput.flavor + ' ' + pendingOrderFormInput.caffeine + ' ' + pendingOrderFormInput.email;
    // pendingOrderListItem.classList.add('order-list-item');

    // pendingOrderList.appendChild(pendingOrderItem);
    // var coffeeOrderItem = coffeeOrderInput.value;
    // pendingOrderItem.appendChild(coffeeOrderInput);
    // pendingOrderItem.appendChild(emailInput);
    // pendingOrderItem.appendChild(sizeInput);
    // pendingOrderItem.appendChild(flavorInput);
    // pendingOrderItem.appendChild(caffeineInput);
    // console.log(pendingOrderItem);
    // console.log(pendingOrderFormInput.order);
    // console.log(pendingOrderFormInput.email);
    // console.log(pendingOrderFormInput.size);
    // console.log(pendingOrderFormInput.flavor);   
    // console.log(pendingOrderFormInput.caffeine);
    pendingOrder.classList.add('order-list-item-container');

    pendingOrder.appendChild(createCheckBox());
    pendingOrder.appendChild(createOrderItem(pendingOrderFormInput));
    pendingOrderList.appendChild(pendingOrder);

    // pendingOrderList.forEach(element(addCheckbox));

    // var pendingOrder = 'A ' + pendingOrderFormInput.size + ' ' + pendingOrderFormInput.order + ' with ' + pendingOrderFormInput.flavor + ' flavor shot and a caffeine rating of ' + pendingOrderFormInput.caffeine + ' for ' + pendingOrderFormInput.email;
    // console.log(pendingOrderFormInput);
    // runningOrderList.push(pendingOrder)
    // console.log(runningOrderList);
    // var pendingOrderArray = Array.from(pendingOrder);
    // JSON.stringify(pendingOrder);
    // localStorage.setItem('order', pendingOrderArray);
    runningOrderList.push(pendingOrderFormInput);
    savedOrders(runningOrderList);

    // var coffeeOrderInput = document.querySelector('.form-control');
    // coffeeOrderInput.textContent = 
});


var orderRefreshButton = document.querySelector('.pending-order-refresh')
orderRefreshButton.addEventListener('submit', function (event) {
    event.preventDefault();
    var checkedItems = document.querySelectorAll('.order-list-item-container');
    var checkedItemsArray = Array.from(checkedItems);
    var newCurrentOrders = [];
    checkedItemsArray.forEach(function(item, i) {
        if (item.querySelector('.checkbox').checked) {
            item.remove();
        }
        else {
            newCurrentOrders.push(runningOrderList[i]);
        }
    });
    runningOrderList = newCurrentOrders;
    savedOrders(runningOrderList);
});


var savedOrders = function (item) {
        var stringifiedItem = JSON.stringify(item);
        localStorage.setItem('order', stringifiedItem);
};


var parseOrders = function () {
    var retrievedOrders = localStorage.getItem('order');
    var parsedItem = JSON.parse(retrievedOrders);
    console.log(parsedItem);
    // runningOrderList = parsedItem;
    console.log(runningOrderList);
};

parseOrders();


