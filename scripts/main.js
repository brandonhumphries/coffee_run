var runningOrderList = [];
var orderFormInput = document.querySelector('[data-coffee-order="form"]');
var pendingOrderList = document.querySelector('.pending-orders');
var orderRefreshButton = document.querySelector('.pending-order-refresh')

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
var displayOrders = function (runningOrderList) {
    runningOrderList.forEach(function (item) {
        var retainedOrder = document.createElement('li');
        var retainedOrderFormInput = {order: '', email: '', size: '', flavor: '', caffeine: ''};
        retainedOrder.classList.add('order-list-item-container');
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

displayOrders(runningOrderList);

orderFormInput.addEventListener('submit', function (event) {
    event.preventDefault();
    var sizeInput = document.querySelector('[name="size"]:checked');
    var coffeeOrderInput = document.querySelector('.form-control');
    var emailInput = document.querySelector('[name="emailAddress"]');
    var flavorInput = document.querySelector('[name="flavor"]');
    var caffeineInput = document.querySelector('[name="strength"]');

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