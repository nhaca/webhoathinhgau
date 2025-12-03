// --- 1. HÀM QUẢN LÝ MODAL (POP-UP) CHUNG ---

function showModal(itemId) {
    var modal = document.getElementById(itemId + '_modal');
    if (modal) {
        modal.style.display = "block";
    }
}

function closeModal(itemId) {
    var modal = document.getElementById(itemId + '_modal');
    if (modal) {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

// --- 2. HÀM TƯƠNG TÁC CHÍNH (FIX LỖI 2, 3, 4) ---

// Xử lý khi bấm nút "Đăng nhập" trên thanh nav
function showLoginModal(event) {
    event.preventDefault(); 
    // Mở Modal thanh toán/đăng nhập (dù không có sản phẩm nào) để người dùng đăng nhập
    showModal('payment'); 
    // Ẩn thông tin giao dịch nếu chưa có sản phẩm được chọn
    document.querySelector('.info-section').style.display = 'none'; 
    document.querySelector('.auth-section').style.flex = '100%'; 
    document.querySelector('#payment_modal .modal-title p').textContent = 'VUI LÒNG ĐĂNG NHẬP';
}

// Xử lý khi bấm nút "THANH TOÁN" (Modal 1 -> Modal 2) - FIX LỖI THANH TOÁN
function showPaymentModal(event, productName, price) {
    event.preventDefault();

    // Đóng Modal chi tiết sản phẩm
    var currentModal = event.target.closest('.modal');
    if (currentModal) {
        currentModal.style.display = 'none';
    }

    // Cập nhật thông tin trong Modal Thanh toán
    const paymentModal = document.getElementById('payment_modal');
    
    if (paymentModal) {
        // Hiện lại phần thông tin giao dịch nếu bị ẩn trước đó
        document.querySelector('.info-section').style.display = 'block';
        document.querySelector('.auth-section').style.flex = '1';
        document.querySelector('#payment_modal .modal-title p').textContent = 'ĐĂNG NHẬP/ĐĂNG KÝ ĐỂ THANH TOÁN';

        paymentModal.querySelector('.product-name-display').textContent = productName;
        paymentModal.querySelector('.price-display').textContent = price;
        showModal('payment');
    }
}

// Hàm mô phỏng hành động Đăng nhập (FIX LỖI ĐĂNG NHẬP)
function handleAuthSubmit(event, actionType) {
    event.preventDefault();
    // Đây là nơi logic xác thực tài khoản ASP.NET sẽ được gọi.
    
    const username = event.target.querySelector('input[type="text"]').value;
    const password = event.target.querySelector('input[type="password"]').value;

    if (username.length > 0 && password.length > 0) {
        alert(`Mô phỏng: Đăng nhập thành công cho tài khoản: ${username}! (Sau này sẽ gọi API .NET Identity)`);
        closeModal('payment');
    } else {
        alert("Lỗi Đăng nhập: Vui lòng điền đầy đủ tên tài khoản và mật khẩu.");
    }
}

// Hàm mô phỏng hành động Nâng cấp (FIX LỖI NÂNG CẤP)
function handleUpgrade(event, packageName, price) {
    event.preventDefault();
    closeModal('upgrade');
    alert(`Mô phỏng: Chuyển đến trang thanh toán cho ${packageName} với giá ${price}. (Sau này sẽ gọi API thanh toán của .NET)`);
}


// --- 3. HÀM QUẢN LÝ DROPDOWN VÀ SỰ KIỆN KHÁC ---

function toggleDropdown(event) {
    event.preventDefault(); 
    event.stopPropagation(); 

    const dropdown = document.getElementById("member-dropdown");
    const arrow = document.querySelector("#member-btn .dropdown-arrow");
    
    closeOtherDropdowns(dropdown);
    
    dropdown.classList.toggle('show');
    arrow.classList.toggle('rotated');
}

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

// Đóng Alert Bar
document.addEventListener('DOMContentLoaded', (event) => {
    const closeBtn = document.querySelector('.alert-bar .close-btn');
    const alertBar = document.querySelector('.alert-bar');

    if (closeBtn && alertBar) {
        closeBtn.onclick = function() {
            alertBar.style.display = 'none';
        }
    }
});
