var runningOrderList = [];
var orderFormInput = document.querySelector('[data-coffee-order="form"]');
var pendingOrderList = document.querySelector('.pending-orders');
var orderRefreshButton = document.querySelector('.pending-order-refresh')

var displayOrder = function (pendingOrder) {
    pendingOrderList.appendChild(pendingOrder);
;}

var createObject = function (orderData) {
    var orderObject = {coffee: '', emailAddress: '', size: '', flavor: '', strength: ''};
    orderObject.coffee = orderData[0];
    orderObject.emailAddress = orderData[1];
    orderObject.size = orderData[2];
    orderObject.flavor = orderData[3];
    orderObject.strength = orderData[4];
    // console.log(orderObject);
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
    pendingOrderListItem.textContent = pendingOrderFormInput.size + ' ' + pendingOrderFormInput.coffee + ' ' + pendingOrderFormInput.flavor + ' ' + pendingOrderFormInput.strength + ' ' + pendingOrderFormInput.emailAddress;
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

var postOrders = function (order) {
    $.ajax('https://dc-coffeerun.herokuapp.com/api/coffeeorders', {
        method: 'POST',
        data: order
    });
};

var parseOrders = function () {
    var retrieveStorage = localStorage.getItem('order');
    var retrievedOrder = JSON.parse(retrieveStorage);
    runningOrderList = retrievedOrder;
    return runningOrderList;
};
var retrieveServerData = function () {
    $.ajax('https://dc-coffeerun.herokuapp.com/api/coffeeorders', {
        success: function(data) {
            var retrievedData = data;
            console.log(retrievedData);
            var retrievedObjects = Object.values(retrievedData);
            runningOrderList = retrievedObjects;
            console.log(runningOrderList);
            displayOrders(runningOrderList);
        }
    })
};

var objectRetrievedData = function (dataList) {
    dataList.forEach(function (item) {
        var dataObject = {coffee: '', emailAddress: '', size: '', flavor: '', strength: ''};
        dataObject.coffee = item.coffee;
        dataObject.emailAddress = item.emailAddress;
        dataObject.size = item.size;
        dataObject.flavor = item.flavor;
        dataObject.strength = item.strength;
        console.log(dataObject);
    })
};


var displayOrders = function (runningOrderList) {
    runningOrderList.forEach(function (item) {
        var retainedOrder = createLI();
        var retainedOrderFormInput = {coffee: '', emailAddress: '', size: '', flavor: '', strength: ''};
        retainedOrderFormInput.coffee = item.coffee;
        retainedOrderFormInput.emailAddress = item.emailAddress;
        retainedOrderFormInput.size = item.size;
        retainedOrderFormInput.flavor = item.flavor;
        retainedOrderFormInput.strength = item.strength;
        retainedOrder.appendChild(createCheckBox());
        retainedOrder.appendChild(createOrderItem(retainedOrderFormInput));
        displayOrder(retainedOrder);
    })
};

// parseOrders();

retrieveServerData();

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
    // console.log(coffeeOrder);
    // console.log(createObject(coffeeOrder));
    var pendingOrderFormInput = {coffee: '', emailAddress: '', size: '', flavor: '', strength: ''};

    var pendingOrder = createLI();

    pendingOrderFormInput.coffee = coffeeOrderInput.value;
    pendingOrderFormInput.emailAddress = emailInput.value;
    pendingOrderFormInput.size = sizeInput.value;
    pendingOrderFormInput.flavor = flavorInput.value;
    pendingOrderFormInput.strength = caffeineInput.value;

    pendingOrder.appendChild(createCheckBox());
    pendingOrder.appendChild(createOrderItem(pendingOrderFormInput));
    displayOrder(pendingOrder);

    runningOrderList.push(pendingOrderFormInput);
    postOrders(pendingOrderFormInput);

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