/* ========================================================================= */
/* --- 2. HÀM QUẢN LÝ MODAL (POP-UP) CHUNG --- */
/* ========================================================================= */

/**
 * Hiện một Modal cụ thể dựa trên ID.
 * @param {string} itemId - Phần đầu của ID modal (ví dụ: 'payment' cho 'payment_modal').
 */
function showModal(itemId) {
    const modal = document.getElementById(itemId + '_modal');
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden'; // Ngăn cuộn trang
    }
}

/**
 * Ẩn một Modal cụ thể dựa trên ID.
 * @param {string} itemId - Phần đầu của ID modal.
 */
function closeModal(itemId) {
    const modal = document.getElementById(itemId + '_modal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = ''; // Cho phép cuộn trang trở lại
    }
}

// Ẩn modal khi click ra ngoài nền đen
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }
    });
}

/* ========================================================================= */
/* --- 3. LOGIC TƯƠNG TÁC SẢN PHẨM & THANH TOÁN (FIX LỖI 2, 3) --- */
/* ========================================================================= */

// Biến toàn cục để lưu thông tin sản phẩm đang được chọn
let currentProduct = null;

/**
 * Hiển thị Modal chi tiết sản phẩm.
 * @param {string} productId - ID của sản phẩm.
 */
function showProductDetail(productId) {
    // Tìm sản phẩm trong mock data (được định nghĩa trong data.js)
    currentProduct = productData.find(p => p.id === productId);

    if (!currentProduct) {
        console.error(`Lỗi: Không tìm thấy sản phẩm với ID: ${productId}`);
        return;
    }

    // Cập nhật nội dung Modal chi tiết
    document.getElementById('detail-modal-title').textContent = currentProduct.title;
    document.getElementById('detail-modal-price').textContent = currentProduct.price;
    document.querySelector('.detail-res').textContent = currentProduct.res;
    document.querySelector('.detail-format').textContent = currentProduct.format;

    // Cập nhật nút THANH TOÁN để gọi hàm showPaymentModal
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.onclick = () => {
        showPaymentModal(currentProduct);
    };

    showModal('product_detail');
}

/**
 * Chuyển từ Modal Chi tiết Sản phẩm sang Modal Thanh toán/Đăng nhập.
 * (FIX LỖI THANH TOÁN - Đảm bảo dữ liệu được truyền)
 * @param {object} product - Đối tượng sản phẩm đang được chọn.
 */
function showPaymentModal(product) {
    closeModal('product_detail'); // Đóng Modal chi tiết

    const paymentModal = document.getElementById('payment_modal');
    
    // Đảm bảo Modal hiện đầy đủ cả 2 phần (Auth và Info)
    document.querySelector('.info-section').style.display = 'block';
    document.querySelector('.auth-section').style.flex = '1';
    document.getElementById('payment-modal-title').textContent = 'ĐĂNG NHẬP ĐỂ THANH TOÁN';

    // Cập nhật thông tin giao dịch
    paymentModal.querySelector('.product-name-display').textContent = product.title;
    paymentModal.querySelector('.price-display').textContent = product.price;

    showModal('payment');
}

/**
 * Xử lý khi bấm nút "Đăng nhập" trên thanh nav (Không liên quan đến sản phẩm)
 */
function showLoginModal(event) {
    event.preventDefault(); 
    showModal('payment'); 
    
    // Điều chỉnh Modal để chỉ hiển thị form đăng nhập
    document.querySelector('.info-section').style.display = 'none'; 
    document.querySelector('.auth-section').style.flex = '100%'; 
    document.getElementById('payment-modal-title').textContent = 'VUI LÒNG ĐĂNG NHẬP TÀI KHOẢN CỦA BẠN';
}

/**
 * Hàm mô phỏng hành động Đăng nhập (FIX LỖI ĐĂNG NHẬP)
 * @param {Event} event - Sự kiện submit form.
 */
function handleAuthSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    console.log(`Đang cố gắng đăng nhập: User=${username}, Pass=${password}`);

    // Logic kiểm tra cơ bản
    if (username.length > 3 && password.length > 5) {
        alert(`Đăng nhập thành công cho tài khoản: ${username}!\n(Mô phỏng: Sau này sẽ gọi API .NET Identity)`);
        closeModal('payment');
        // Reset form sau khi đăng nhập thành công
        form.reset(); 
    } else {
        alert("Lỗi Đăng nhập: Tên tài khoản phải trên 3 ký tự và Mật khẩu trên 5 ký tự.");
    }
}

/**
 * Hàm mô phỏng hành động Nâng cấp (FIX LỖI NÂNG CẤP)
 * @param {HTMLButtonElement} button - Nút được bấm.
 */
function handleUpgrade(button) {
    const packageName = button.getAttribute('data-package');
    const price = button.getAttribute('data-price');

    closeModal('upgrade');
    alert(`Mô phỏng: Chuyển đến trang thanh toán cho ${packageName} với giá ${price}.\n(Bạn sẽ thay thế bằng logic thanh toán)`);
}

/* ========================================================================= */
/* --- 4. HÀM TIỆN ÍCH VÀ SỰ KIỆN GIAO DIỆN (UI/UX) --- */
/* ========================================================================= */

/**
 * Hiện/Ẩn menu thả xuống Thành viên.
 * @param {Event} event - Sự kiện click.
 */
function toggleDropdown(event) {
    event.preventDefault(); 
    event.stopPropagation(); 

    const dropdown = document.getElementById("member-dropdown");
    const arrow = document.querySelector("#member-btn .dropdown-arrow");
    
    closeOtherDropdowns(dropdown);
    
    dropdown.classList.toggle('show');
    arrow.classList.toggle('rotated');
}

/**
 * Đóng tất cả các dropdown khác đang mở (giúp UI sạch hơn).
 * @param {HTMLElement} currentDropdown - Dropdown hiện tại (được phép mở).
 */
function closeOtherDropdowns(currentDropdown) {
    const dropdowns = document.querySelectorAll('.dropdown-content.show');
    dropdowns.forEach(function(d) {
        if (d !== currentDropdown) {
            d.classList.remove('show');
            const relatedArrow = d.closest('.dropdown-member').querySelector('.dropdown-arrow');
            if (relatedArrow) {
                relatedArrow.classList.remove('rotated');
            }
        }
    });
}

// Xử lý đóng dropdown khi click ra ngoài
window.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown-member')) {
        closeOtherDropdowns(null);
    }
});

// Mở Modal Nâng cấp từ menu Dropdown
function showUpgradeModal(event) {
    event.preventDefault(); 
    closeOtherDropdowns(null); // Đóng menu dropdown
    showModal('upgrade');
}

// Chức năng bật/tắt Theme (MOCKUP)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');

    // Cập nhật icon
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (body.classList.contains('light-theme')) {
        themeBtn.textContent = '🌙'; // Icon mặt trăng cho theme sáng
        alert("Mô phỏng: Chuyển sang Giao diện Sáng (Chức năng này cần thêm CSS cho light-theme)");
    } else {
        themeBtn.textContent = '☀️'; // Icon mặt trời cho theme tối
        alert("Mô phỏng: Chuyển sang Giao diện Tối");
    }
}

/**
 * Hàm render danh sách sản phẩm từ mock data vào lưới (Product Grid)
 */
function renderProductList() {
    const container = document.getElementById('product-list-container');
    if (!container) return;

    let htmlContent = '';

    // productData được load từ data.js
    productData.forEach(p => {
        const tagClass = p.tag === 'Miễn phí' || p.tag === 'Miễn phí VIP' ? 'free-tag' : '';
        
        htmlContent += `
            <div class="product-item" data-id="${p.id}" onclick="showProductDetail('${p.id}')">
                <div class="copyright-tag ${tagClass}">${p.tag}</div>
                <div class="product-image-area">${p.imgPlaceholder}</div>
                <p class="product-title">${p.title}</p>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}


/* ========================================================================= */
/* --- 5. INITIALIZATION VÀ SỰ KIỆN TRANG TẢI XONG --- */
/* ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo danh sách sản phẩm
    renderProductList();

    // 2. Xử lý nút Đóng Alert Bar
    const closeBtn = document.querySelector('.alert-bar .close-btn');
    const alertBar = document.querySelector('.alert-bar');

    if (closeBtn && alertBar) {
        closeBtn.onclick = function() {
            alertBar.style.display = 'none';
        }
    }

    // 3. Xử lý sự kiện Tìm kiếm (MOCKUP)
    const searchBtn = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    searchBtn.onclick = () => {
        alert(`Mô phỏng: Đang tìm kiếm từ khóa "${searchInput.value}"`);
    };

    console.log("WebApp đã được khởi tạo thành công với các chức năng đã sửa lỗi.");
});
