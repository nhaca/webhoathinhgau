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
/* --- 3. LOGIC TƯƠNG TÁC SẢN PHẨM & THANH TOÁN (FIX LỖI CŨ) --- */
/* ========================================================================= */

// Biến toàn cục để lưu thông tin sản phẩm đang được chọn
let currentProduct = null;

/**
 * Hiển thị Modal chi tiết sản phẩm.
 * @param {string} productId - ID của sản phẩm.
 */
function showProductDetail(productId) {
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

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.onclick = () => {
        showPaymentModal(currentProduct);
    };

    showModal('product_detail');
}

/**
 * Chuyển từ Modal Chi tiết Sản phẩm sang Modal Thanh toán/Đăng nhập.
 * @param {object} product - Đối tượng sản phẩm đang được chọn.
 */
function showPaymentModal(product) {
    closeModal('product_detail'); 

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
    
    // Điều chỉnh Modal để chỉ hiển thị form đăng nhập (ẩn phần thông tin thanh toán)
    document.querySelector('.info-section').style.display = 'none'; 
    document.querySelector('.auth-section').style.flex = '100%'; 
    document.getElementById('payment-modal-title').textContent = 'VUI LÒNG ĐĂNG NHẬP TÀI KHOẢN CỦA BẠN';
}

/* ========================================================================= */
/* --- 4. LOGIC ĐĂNG NHẬP, PHÂN QUYỀN VÀ TẠO TÀI KHOẢN (YÊU CẦU 1, 3) --- */
/* ========================================================================= */

// Danh sách tài khoản (Mô phỏng - Hardcoded)
let userAccounts = [
    { tk: 'adminwebmachacminh', mk: 'phucdepzai@', role: 'Admin' }, // Yêu cầu 1
    { tk: 'thanhvien1', mk: '123456', role: 'Member' },
    { tk: 'vipuser', mk: 'vip999', role: 'VIP' }
];

let currentUser = null; // Lưu trữ thông tin người dùng đang đăng nhập

/**
 * Cập nhật giao diện sau khi đăng nhập/đăng xuất (Thanh Nav)
 */
function updateUI() {
    const loginBtn = document.getElementById('login-nav-btn');
    const memberBtn = document.getElementById('member-btn');
    const adminLink = document.getElementById('admin-link');
    const upgradeLink = document.getElementById('upgrade-link');

    if (currentUser) {
        // Đã đăng nhập
        loginBtn.style.display = 'none';
        memberBtn.textContent = `Xin chào, ${currentUser.tk} (${currentUser.role})`;
        
        // Hiện/Ẩn link Admin
        adminLink.style.display = currentUser.role === 'Admin' ? 'block' : 'none';
        
        // Ẩn link nâng cấp nếu là Admin hoặc đã là VIP (mô phỏng)
        upgradeLink.style.display = currentUser.role === 'VIP' || currentUser.role === 'Admin' ? 'none' : 'block';

    } else {
        // Chưa đăng nhập
        loginBtn.style.display = 'block';
        memberBtn.textContent = 'Thành Viên';
        adminLink.style.display = 'none';
        upgradeLink.style.display = 'block';
    }
}

/**
 * Hàm mô phỏng hành động Đăng nhập.
 * @param {Event} event - Sự kiện submit form.
 */
function handleAuthSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    const account = userAccounts.find(u => u.tk === username && u.mk === password);

    if (account) {
        currentUser = account;
        alert(`Đăng nhập thành công! Vai trò: ${currentUser.role}`);
        closeModal('payment');
        updateUI(); // Cập nhật giao diện
        form.reset(); 
    } else {
        alert("Lỗi Đăng nhập: Tên tài khoản hoặc Mật khẩu không đúng.");
    }
}

/**
 * Xử lý Đăng xuất
 */
function handleLogout() {
    currentUser = null;
    alert("Bạn đã đăng xuất.");
    updateUI(); // Cập nhật giao diện
    closeOtherDropdowns(null);
}


/* --- CHỨC NĂNG ADMIN (YÊU CẦU 3) --- */

/**
 * Hiển thị Modal Admin và kiểm tra quyền
 * @param {Event} event - Sự kiện click.
 */
function showAdminModal(event) {
    event.preventDefault();
    if (currentUser && currentUser.role === 'Admin') {
        closeOtherDropdowns(null);
        showModal('admin');
    } else {
        alert("Lỗi: Bạn không có quyền truy cập khu vực Quản trị.");
    }
}

/**
 * Xử lý tạo tài khoản thành viên mới (Chỉ Admin)
 * @param {Event} event - Sự kiện submit form.
 */
function handleCreateMember(event) {
    event.preventDefault();
    
    if (currentUser.role !== 'Admin') {
        alert("Lỗi: Chỉ Admin mới có thể tạo tài khoản.");
        return;
    }

    const newUsername = document.getElementById('new_username').value;
    const newPassword = document.getElementById('new_password').value;
    const newRole = document.getElementById('new_role').value;

    // Kiểm tra trùng lặp
    if (userAccounts.some(u => u.tk === newUsername)) {
        alert(`Lỗi: Tài khoản '${newUsername}' đã tồn tại.`);
        return;
    }

    // Thêm tài khoản mới vào danh sách mô phỏng
    userAccounts.push({
        tk: newUsername,
        mk: newPassword,
        role: newRole
    });

    alert(`Tạo tài khoản thành công!\nTK: ${newUsername}\nMK: ${newPassword}\nVai trò: ${newRole}`);
    document.getElementById('createMemberForm').reset();
    console.log("Danh sách tài khoản cập nhật:", userAccounts);
}

/* ========================================================================= */
/* --- 5. HÀM TIỆN ÍCH VÀ SỰ KIỆN GIAO DIỆN (UI/UX) --- */
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

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (body.classList.contains('light-theme')) {
        themeBtn.textContent = '🌙'; 
    } else {
        themeBtn.textContent = '☀️'; 
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
/* --- 6. INITIALIZATION VÀ SỰ KIỆN TRANG TẢI XONG --- */
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

    // 4. Cập nhật UI lần đầu (chắc chắn chưa đăng nhập)
    updateUI(); 

    console.log("WebApp đã được khởi tạo thành công. Vui lòng đăng nhập với TK Admin đã cung cấp.");
});
