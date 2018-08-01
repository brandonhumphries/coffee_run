var runningOrderList = [];
var orderFormInput = document.querySelector('[data-coffee-order="form"]');
var pendingOrderList = document.querySelector('.pending-orders');
var orderRefreshButton = document.querySelector('.pending-order-refresh')

var displayOrder = function (pendingOrder) {
    pendingOrderList.appendChild(pendingOrder);
;}

var createObject = function (orderData) {
    var orderObject = {order: '', email: '', size: '', flavor: '', caffeine: ''};
    orderObject.order = orderData[0];
    orderObject.email = orderData[1];
    orderObject.size = orderData[2];
    orderObject.flavor = orderData[3];
    orderObject.caffeine = orderData[4];
    console.log(orderObject);
    return orderObject;
};

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
var createLI = function () {
    var pendingOrderLI = document.createElement('li');
    pendingOrderLI.classList.add('order-list-item-container');
    return pendingOrderLI;
};
var savedOrders = function (item) {
    var stringifiedItem = JSON.stringify(item);
    localStorage.setItem('order', stringifiedItem);
};
var parseOrders = function () {
    var retrieveStorage = localStorage.getItem('order');
    var retrievedOrder = JSON.parse(retrieveStorage);
    runningOrderList = retrievedOrder;
    return runningOrderList;
};
var parseServerData = function () {
    $.ajax('https://dc-coffeerun.herokuapp.com/api/coffeeorders', {
        success: function(data) {
            var retrievedData = data;
            console.log(retrievedData);
        }
    })
};

var displayOrders = function (runningOrderList) {
    runningOrderList.forEach(function (item) {
        var retainedOrder = createLI();
        var retainedOrderFormInput = {order: '', email: '', size: '', flavor: '', caffeine: ''};
        retainedOrderFormInput.order = item.order;
        retainedOrderFormInput.email = item.email;
        retainedOrderFormInput.size = item.size;
        retainedOrderFormInput.flavor = item.flavor;
        retainedOrderFormInput.caffeine = item.caffeine;
        retainedOrder.appendChild(createCheckBox());
        retainedOrder.appendChild(createOrderItem(retainedOrderFormInput));
        displayOrder(retainedOrder);
    })
};

parseOrders();

parseServerData();

displayOrders(runningOrderList);

orderFormInput.addEventListener('submit', function (event) {
    event.preventDefault();
    var coffeeOrderInput = document.querySelector('.form-control');
    var emailInput = document.querySelector('[name="emailAddress"]');
    var sizeInput = document.querySelector('[name="size"]:checked');
    var flavorInput = document.querySelector('[name="flavor"]');
    var caffeineInput = document.querySelector('[name="strength"]');
    var coffeeOrder = [];
    coffeeOrder.push(coffeeOrderInput.value, emailInput.value, sizeInput.value, flavorInput.value, caffeineInput.value);
    console.log(coffeeOrder);
    console.log(createObject(coffeeOrder));
    var pendingOrderFormInput = {order: '', email: '', size: '', flavor: '', caffeine: ''};

    var pendingOrder = createLI();

    pendingOrderFormInput.order = coffeeOrderInput.value;
    pendingOrderFormInput.email = emailInput.value;
    pendingOrderFormInput.size = sizeInput.value;
    pendingOrderFormInput.flavor = flavorInput.value;
    pendingOrderFormInput.caffeine = caffeineInput.value;

    pendingOrder.appendChild(createCheckBox());
    pendingOrder.appendChild(createOrderItem(pendingOrderFormInput));
    displayOrder(pendingOrder);

    runningOrderList.push(pendingOrderFormInput);
    savedOrders(runningOrderList);

});
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