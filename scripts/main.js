var runningOrderList = [];

var orderFormInput = document.querySelector('[data-coffee-order="form"]');

var coffeeOrderInput = document.querySelector('.form-control');
var emailInput = document.querySelector('[name="emailAddress"]');
var flavorInput = document.querySelector('[name="flavor"]');
var caffeineInput = document.querySelector('[name="strength"]');

var pendingOrderList = document.querySelector('.pending-orders');

var orderRefreshButton = document.querySelector('[class="pending-order-refresh"]');

// var addCheckbox = function (element) {
//     var newCheckbox = document.createElement('input');
//     newCheckbox.setAttribute('type', 'checkbox');
// };

orderFormInput.addEventListener('submit', function (event) {
    event.preventDefault();
    var sizeInput = document.querySelector('[name="size"]:checked');
    var pendingOrderItem = sizeInput.value + ' ' + coffeeOrderInput.value + ' ' + flavorInput.value + ' ' + caffeineInput.value + ' ' + emailInput.value;

    // var pendingOrderFormInput = [];
    // console.log(coffeeOrderInput.value);
    // var pendingOrderFormInput = {order: '', email: '', size: '', flavor: '', caffeine: ''};

    // var sizePending = document.createElement('span')
    // sizePending.textContent = sizeInput.value;
    // pendingOrderFormInput.size = sizePending;

    // var coffeeOrderPending = document.createElement('span')
    // coffeeOrderPending.textContent = coffeeOrderInput.value;

    var pendingOrder = document.createElement('li');
    var pendingOrderListItem = document.createElement('p');
    pendingOrderListItem.textContent = pendingOrderItem;
    pendingOrderListItem.classList.add('order-list-item');

    var newCheckbox = document.createElement('input');
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.classList.add('order-list-item');
    newCheckbox.classList.add('checkbox');
    
   

    // pendingOrderListItem.appendChild(pendingOrderItem);
    // pendingOrderItem.appendChild(coffeeOrderPending);
    // console.log(pendingOrderFormInput.order);
    // pendingOrderFormInput.order = coffeeOrderInput.value;
    // pendingOrderFormInput.email = emailInput.value;
    // pendingOrderFormInput.size = sizeInput.value;
    // pendingOrderFormInput.flavor = flavorInput.value;
    // pendingOrderFormInput.caffeine = caffeineInput.value;

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

    pendingOrder.appendChild(newCheckbox);
    pendingOrder.appendChild(pendingOrderListItem);
    pendingOrderList.appendChild(pendingOrder);

    // pendingOrderList.forEach(element(addCheckbox));

    // var pendingOrder = 'A ' + pendingOrderFormInput.size + ' ' + pendingOrderFormInput.order + ' with ' + pendingOrderFormInput.flavor + ' flavor shot and a caffeine rating of ' + pendingOrderFormInput.caffeine + ' for ' + pendingOrderFormInput.email;
    // console.log(pendingOrderFormInput);
    // runningOrderList.push(pendingOrder)
    // console.log(runningOrderList);
    JSON.stringify(pendingOrder);
    
    localStorage.setItem('order', pendingOrder);
    orderRefreshButton.addEventListener('submit', function (event) {
        event.preventDefault();
        if (newCheckbox.checked === true) {
            pendingOrderList.removeChild(pendingOrder);
        }
    });

    // var coffeeOrderInput = document.querySelector('.form-control');
    // coffeeOrderInput.textContent = 
});

// runningOrderList.forEach(function (element) {
//     orderRefreshButton.addEventListener('submit', function (event) {
//         event.preventDefault();
//         // console.log('hi');
//         var checkbox = document.querySelector('.checkbox');
//         if (checkbox.checked === true) {
//             console.log('hi');
//             // console.log(checkbox.checked);
//         }
//     });
// });
// newCheckbox.addEventListener('submit', function (event) {
//     event.preventDefault();
//     runningOrderList.forEach(function(element) {
//         if (element.input === checked) {
//             console.log('works');
//         }
//         else {
//             console.log('not working');
//         }
//     });
// });

