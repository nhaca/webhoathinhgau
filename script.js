// HÀM HIỆN POP-UP (MODAL)
function showModal(itemId) {
    // Lấy ID của modal (ví dụ: 'item_a' -> 'item_a_modal')
    var modal = document.getElementById(itemId + '_modal');
    if (modal) {
        // Hiện modal bằng cách thay đổi thuộc tính display
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

// XỬ LÝ SỰ KIỆN: Ẩn modal khi click ra ngoài khu vực nội dung modal
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
            // Ẩn thanh thông báo
            alertBar.style.display = 'none';
        }
    }
});
