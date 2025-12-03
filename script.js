// HÀM HIỆN POP-UP (MODAL)
function showModal(itemId) {
    // Tìm modal dựa trên ID (ví dụ: 'item_a' -> 'item_a_modal')
    var modal = document.getElementById(itemId + '_modal');
    if (modal) {
        // Hiển thị modal
        modal.style.display = "block";
    }
}

// HÀM ẨN POP-UP (MODAL)
function closeModal(itemId) {
    var modal = document.getElementById(itemId + '_modal');
    if (modal) {
        // Ẩn modal
        modal.style.display = "none";
    }
}

// XỬ LÝ SỰ KIỆN: Ẩn modal khi người dùng click vào vùng nền tối bên ngoài
window.onclick = function(event) {
    // Lấy tất cả các modal trên trang
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        // Nếu khu vực click là chính modal (nền đen mờ), thì ẩn modal đó đi
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

// XỬ LÝ SỰ KIỆN: Đóng thanh thông báo đỏ khi click vào nút X
document.addEventListener('DOMContentLoaded', (event) => {
    const closeBtn = document.querySelector('.alert-bar .close-btn');
    const alertBar = document.querySelector('.alert-bar');

    if (closeBtn && alertBar) {
        closeBtn.onclick = function() {
            // Ẩn thanh thông báo bằng cách thay đổi display
            alertBar.style.display = 'none';
        }
    }
});
