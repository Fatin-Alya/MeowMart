/*navigation*/
document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active'); // Add active class to the current link
        }
    });
});

// Handle form submission
document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Save to localStorage
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    // Display profile info in the modal
    document.getElementById("profileName").textContent = name;
    document.getElementById("profileEmail").textContent = email;
    document.getElementById("profileInfo").classList.remove("d-none");
    document.getElementById("profileForm").classList.add("d-none");

    alert("Profile saved successfully!");
});

// On page load, check if user details exist
window.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedName && savedEmail) {
        document.getElementById("profileName").textContent = savedName;
        document.getElementById("profileEmail").textContent = savedEmail;
        document.getElementById("profileInfo").classList.remove("d-none");
        document.getElementById("profileForm").classList.add("d-none");
    }
});

// On page load, display saved user details if available
window.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedName && savedEmail) {
        document.getElementById("profileName").textContent = savedName;
        document.getElementById("profileEmail").textContent = savedEmail;
        document.getElementById("profileInfo").classList.remove("d-none");
        document.getElementById("profileForm").classList.add("d-none");
    }
});

// Handle log out
document.getElementById("logoutButton").addEventListener("click", function () {
    // Clear user data
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    
    // Clear cart items
    document.getElementById('cartItems').innerHTML = '';
    // Reset cart count
    document.getElementById('cart-count').textContent = '0';
    // Hide cart dropdown
    document.getElementById('cartDropdown').classList.add('d-none');

    // Clear displayed profile info
    document.getElementById("profileName").textContent = "";
    document.getElementById("profileEmail").textContent = "";
    document.getElementById("profileInfo").classList.add("d-none");
    document.getElementById("profileForm").classList.remove("d-none");

    // Reset cart display
    updateCartDisplay();

    alert("You have logged out successfully!");
});


// Sample JavaScript to manage the cart functionality
document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cartIcon");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartItemsContainer = document.getElementById("cartItems");
    const clearCartButton = document.getElementById("clearCart");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartCount.innerText = "0";
        } else {
            cartCount.innerText = cart.length;
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.className = "cart-item d-flex justify-content-between align-items-center mb-2";
                itemElement.innerHTML = `
                    <span>${item.name} - ${item.price}</span>
                    <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }

    // Add to cart function
    document.querySelectorAll(".cart-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const itemCard = e.target.closest(".card");
            const itemName = itemCard.querySelector("h4").innerText;
            const itemPrice = itemCard.querySelector(".price").innerText;

            const item = { name: itemName, price: itemPrice };
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });
    });

    // Remove item from cart
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const itemIndex = e.target.dataset.index;
            cart.splice(itemIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // Clear cart
    clearCartButton.addEventListener("click", () => {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    });

    // Toggle cart dropdown
    cartIcon.addEventListener("click", () => {
        cartDropdown.classList.toggle("d-none");
    });

    // Initialize cart display
    updateCartDisplay();
});

// Swiper container Review
document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.querySelector('.filter-options .btn');
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');

    filterButton.addEventListener('click', function () {
        const selectedCategory = categorySelect.value;
        const selectedSort = sortSelect.value;

        const reviews = Array.from(document.querySelectorAll('.card'));

        // Filter reviews based on selected category
        const filteredReviews = reviews.filter(review => {
            return selectedCategory === 'all' || review.getAttribute('data-category') === selectedCategory;
        });

        // Sort reviews based on rating
        if (selectedSort === 'highest') {
            filteredReviews.sort((a, b) => b.getAttribute('data-rating') - a.getAttribute('data-rating'));
        } else {
            filteredReviews.sort((a, b) => a.getAttribute('data-rating') - b.getAttribute('data-rating'));
        }

        // Clear current displayed reviews
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = '';

        // Create new carousel items with filtered and sorted reviews
        let currentItem = document.createElement('div');
        currentItem.classList.add('carousel-item', 'active');
        let row = document.createElement('div');
        row.classList.add('row');

        filteredReviews.forEach((review, index) => {
            if (index > 0 && index % 3 === 0) {
                carouselInner.appendChild(currentItem);
                currentItem = document.createElement('div');
                currentItem.classList.add('carousel-item');
                row = document.createElement('div');
                row.classList.add('row');
            }
            const col = document.createElement('div');
            col.classList.add('col');
            col.appendChild(review.cloneNode(true));
            row.appendChild(col);
        });

        // Append the last item if it exists
        if (currentItem.children.length > 0) {
            currentItem.appendChild(row);
            carouselInner.appendChild(currentItem);
        }
    });
});