// --- 1. HÀM QUẢN LÝ MODAL (POP-UP) CHUNG ---

// Hiện modal
function showModal(itemId) {
    var modal = document.getElementById(itemId + '_modal');
    if (modal) {
        modal.style.display = "block";
    }
}

// Ẩn modal
function closeModal(itemId) {
    var modal = document.getElementById(itemId + '_modal');
    if (modal) {
        modal.style.display = "none";
    }
}

// Ẩn modal khi click ra ngoài nền đen
window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

// --- 2. HÀM TƯƠNG TÁC CHÍNH ---

// Xử lý khi bấm nút "Đăng nhập" (Yêu cầu hiển thị chữ trên)
function showLoginMessage(event) {
    event.preventDefault(); 
    alert("Chức năng Đăng nhập đang được xây dựng. (Trong .NET, bạn sẽ chuyển hướng đến trang /Identity/Account/Login ở đây)");
}

// Xử lý khi bấm nút "THANH TOÁN" (Modal 1 -> Modal 2)
function showPaymentModal(event, productName, price) {
    event.preventDefault();

    // Đóng Modal chi tiết sản phẩm hiện tại
    var currentModal = event.target.closest('.modal');
    if (currentModal) {
        currentModal.style.display = 'none';
    }

    // Cập nhật thông tin trong Modal Thanh toán
    const paymentModal = document.getElementById('payment_modal');
    
    if (paymentModal) {
        paymentModal.querySelector('.product-name-display').textContent = productName;
        paymentModal.querySelector('.price-display').textContent = price;

        // Hiển thị Modal Thanh toán
        showModal('payment');
    }
}

// --- 3. HÀM QUẢN LÝ DROPDOWN THÀNH VIÊN ---

// Hiện/Ẩn menu thả xuống
function toggleDropdown(event) {
    event.preventDefault(); 
    event.stopPropagation(); 

    const dropdown = document.getElementById("member-dropdown");
    const arrow = document.querySelector("#member-btn .dropdown-arrow");
    
    closeOtherDropdowns(dropdown);
    
    dropdown.classList.toggle('show');
    arrow.classList.toggle('rotated');
}

// Đóng các dropdown khác
function closeOtherDropdowns(currentDropdown) {
    const dropdowns = document.querySelectorAll('.dropdown-content.show');
    dropdowns.forEach(function(d) {
        if (d !== currentDropdown) {
            d.classList.remove('show');
            const relatedArrow = d.previousElementSibling.querySelector('.dropdown-arrow');
            if (relatedArrow) {
                relatedArrow.classList.remove('rotated');
            }
        }
    });
}

// Đóng dropdown khi click ra ngoài
window.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown-member')) {
        const dropdowns = document.querySelectorAll('.dropdown-content.show');
        dropdowns.forEach(function(dropdown) {
            dropdown.classList.remove('show');
            
            const arrow = dropdown.previousElementSibling.querySelector('.dropdown-arrow');
            if (arrow) {
                arrow.classList.remove('rotated');
            }
        });
    }
});

// --- 4. HÀM NÂNG CẤP VIP ---

// Xử lý khi bấm "Nâng cấp tài khoản" (Mở Modal Nâng cấp)
function showUpgradeModal(event) {
    event.preventDefault(); 
    
    // Đóng menu thả xuống thành viên
    const dropdown = document.getElementById("member-dropdown");
    const arrow = document.querySelector("#member-btn .dropdown-arrow");
    if (dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        arrow.classList.remove('rotated');
    }

    // Mở Modal Nâng cấp
    showModal('upgrade');
}

// --- 5. HÀM XỬ LÝ SỰ KIỆN KHI TẢI TRANG (Đóng Alert Bar) ---

document.addEventListener('DOMContentLoaded', (event) => {
    const closeBtn = document.querySelector('.alert-bar .close-btn');
    const alertBar = document.querySelector('.alert-bar');

    if (closeBtn && alertBar) {
        closeBtn.onclick = function() {
            alertBar.style.display = 'none';
        }
    }
});
