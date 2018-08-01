var runningOrderList = [];
var currentI;
var orderFormInput = document.querySelector('[data-coffee-order="form"]');

var coffeeOrderInput = document.querySelector('.form-control');
var emailInput = document.querySelector('[name="emailAddress"]');
var flavorInput = document.querySelector('[name="flavor"]');
var caffeineInput = document.querySelector('[name="strength"]');

var pendingOrderList = document.querySelector('.pending-orders');


var displayOrder = function (pendingOrder) {
    pendingOrderList.appendChild(pendingOrder);
;}

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

var savedOrders = function (item) {
    var stringifiedItem = JSON.stringify(item);
    localStorage.setItem('order', stringifiedItem);
};

// var parseOrders = function () {
//     var retrievedOrders = localStorage.getItem('order');
//     var parsedItem = JSON.parse(retrievedOrders);
//     var retrievedOrderList = [];
//     retrievedOrderList.join(parsedItem);
//     runningOrderList = retrievedOrderList;
//     return parsedItem;
// };

// parseOrders();

var retrieveStorage = localStorage.getItem('order');
var retrievedOrder = JSON.parse(retrieveStorage);
runningOrderList = retrievedOrder;

var displayOrders = function (runningOrderList) {
    runningOrderList.forEach(function (item) {
        // var retainedOrderListItem = document.createElement('p');
        var retainedOrder = document.createElement('li');
        var retainedOrderFormInput = {order: '', email: '', size: '', flavor: '', caffeine: ''};
        retainedOrder.classList.add('order-list-item-container');
        // retainedOrderListItem.classList.add('order-list-item');
        retainedOrderFormInput.order = item.order;
        retainedOrderFormInput.email = item.email;
        retainedOrderFormInput.size = item.size;
        retainedOrderFormInput.flavor = item.flavor;
        retainedOrderFormInput.caffeine = item.caffeine;
        // retainedOrderListItem.textContent = retainedOrderFormInput.size + ' ' + retainedOrderFormInput.order + ' ' + retainedOrderFormInput.flavor + ' ' + retainedOrderFormInput.caffeine + ' ' + retainedOrderFormInput.email;
        retainedOrder.appendChild(createCheckBox());
        retainedOrder.appendChild(createOrderItem(retainedOrderFormInput));
        pendingOrderList.appendChild(retainedOrder);
    })
};

displayOrders(runningOrderList);

orderFormInput.addEventListener('submit', function (event) {
    event.preventDefault();
    var sizeInput = document.querySelector('[name="size"]:checked');
    var pendingOrderItem = sizeInput.value + ' ' + coffeeOrderInput.value + ' ' + flavorInput.value + ' ' + caffeineInput.value + ' ' + emailInput.value;

    var pendingOrderFormInput = {order: '', email: '', size: '', flavor: '', caffeine: ''};

    var pendingOrder = document.createElement('li');

    pendingOrderFormInput.order = coffeeOrderInput.value;
    pendingOrderFormInput.email = emailInput.value;
    pendingOrderFormInput.size = sizeInput.value;
    pendingOrderFormInput.flavor = flavorInput.value;
    pendingOrderFormInput.caffeine = caffeineInput.value;

    pendingOrder.classList.add('order-list-item-container');

    pendingOrder.appendChild(createCheckBox());
    pendingOrder.appendChild(createOrderItem(pendingOrderFormInput));
    displayOrder(pendingOrder);

    runningOrderList.push(pendingOrderFormInput);
    savedOrders(runningOrderList);

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
