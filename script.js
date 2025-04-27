// Function 1: getMenu()
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const foodData = await response.json();
        
        // Assuming you have a div with id="menu" to show the menu
        const menuDiv = document.getElementById('menu');
        menuDiv.innerHTML = ''; // Clear previous items

        foodData.forEach(item => {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';
            foodItem.innerHTML = `
            <img src="https://plus.unsplash.com/premium_photo-1684534125661-614f59f16f2e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D" alt="${item.name}" width="150" height="150" />
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
        `;
        
            menuDiv.appendChild(foodItem);
        });

    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

// Function 2: TakeOrder()
function TakeOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Randomly picking 3 burgers
            const burgers = ['Cheeseburger', 'Veggie Burger', 'Chicken Burger', 'Fish Burger', 'Bacon Burger', 'Mushroom Burger'];
            const selectedBurgers = [];

            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * burgers.length);
                selectedBurgers.push(burgers[randomIndex]);
            }

            resolve({ burgers: selectedBurgers });
        }, 2500);
    });
}

// Function 3: orderPrep()
function orderPrep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Function 4: payOrder()
function payOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Function 5: thankyouFnc()
function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

// Calling everything in sequence
async function handleOrderFlow() {
    try {
        await getMenu();
        const order = await TakeOrder();
        console.log('Order Taken:', order);

        const orderStatus = await orderPrep();
        console.log('Order Prepared:', orderStatus);

        const paymentStatus = await payOrder();
        console.log('Payment Done:', paymentStatus);

        if (paymentStatus.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error('Error in order flow:', error);
    }
}

window.onload = handleOrderFlow;
