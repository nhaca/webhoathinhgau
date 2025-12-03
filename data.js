/* ========================================================================= */
/* --- 1. MOCK DATA (DỮ LIỆU GIẢ LẬP) --- */
/* ========================================================================= */

// Danh sách các sản phẩm mẫu để đổ vào lưới (tăng tính linh hoạt)
const productData = [
    { 
        id: 'char_a1', 
        title: 'Nhân vật.a(1) - Cao cấp', 
        price: '250,000 VND', 
        tag: 'Bản quyền', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 1]',
        res: '4K',
        format: 'FBX/OBJ'
    },
    { 
        id: 'char_b2', 
        title: '萌娃.b - Phong cách Chibi', 
        price: '199,000 VND', 
        tag: 'Bản quyền', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 2]',
        res: '2K',
        format: 'OBJ/BLEND'
    },
    { 
        id: 'bg_city', 
        title: 'Bối cảnh thành phố hiện đại', 
        price: '400,000 VND', 
        tag: 'Miễn phí VIP', 
        isFree: true,
        imgPlaceholder: '[Placeholder Image 3]',
        res: '8K',
        format: 'PNG'
    },
    { 
        id: 'char_antique', 
        title: 'Nhân vật cổ trang - Nữ hiệp', 
        price: '320,000 VND', 
        tag: 'Bản quyền', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 4]',
        res: '4K',
        format: 'FBX'
    },
    { 
        id: 'prop_sword', 
        title: 'Đạo cụ Kiếm - Phong cách Fantasy', 
        price: '50,000 VND', 
        tag: 'Miễn phí', 
        isFree: true,
        imgPlaceholder: '[Placeholder Image 5]',
        res: 'HD',
        format: 'OBJ'
    },
    { 
        id: 'char_panda', 
        title: 'Mô hình gấu trúc hoạt hình', 
        price: '150,000 VND', 
        tag: 'Bản quyền', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 6]',
        res: '2K',
        format: 'BLEND'
    },
    { 
        id: 'bg_nature', 
        title: 'Bối cảnh thiên nhiên - Rừng rậm', 
        price: '280,000 VND', 
        tag: 'Miễn phí VIP', 
        isFree: true,
        imgPlaceholder: '[Placeholder Image 7]',
        res: '4K',
        format: 'PNG/JPG'
    },
    { 
        id: 'char_robot', 
        title: 'Nhân vật Robot - Cơ khí hạng nặng', 
        price: '550,000 VND', 
        tag: 'Bản quyền', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 8]',
        res: '8K',
        format: 'FBX'
    },
    // Thêm các sản phẩm khác để tăng dòng và nội dung
    { 
        id: 'fx_fire', 
        title: 'Hiệu ứng Lửa - 3D VFX', 
        price: '120,000 VND', 
        tag: 'Bản quyền', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 9]',
        res: '4K',
        format: 'VDB'
    },
    { 
        id: 'char_elf', 
        title: 'Nhân vật Tiên Nữ - Gói Premium', 
        price: '450,000 VND', 
        tag: 'Bản quyền', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 10]',
        res: '4K',
        format: 'FBX'
    },
    { 
        id: 'prop_car', 
        title: 'Đạo cụ Xe Hơi - Phong cách 8bit', 
        price: '90,000 VND', 
        tag: 'Miễn phí', 
        isFree: true,
        imgPlaceholder: '[Placeholder Image 11]',
        res: 'HD',
        format: 'OBJ'
    },
    { 
        id: 'bg_space', 
        title: 'Bối cảnh Vũ trụ - Tàu không gian', 
        price: '380,000 VND', 
        tag: 'Bản quyền', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 12]',
        res: '8K',
        format: 'PNG'
    },
    { 
        id: 'char_dragon', 
        title: 'Mô hình Rồng - Huyền thoại', 
        price: '999,000 VND', 
        tag: 'Bản quyền Vàng', 
        isFree: false,
        imgPlaceholder: '[Placeholder Image 13]',
        res: '16K',
        format: 'FBX/OBJ'
    },
    { 
        id: 'fx_water', 
        title: 'Hiệu ứng Nước - Sóng biển', 
        price: '180,000 VND', 
        tag: 'Miễn phí VIP', 
        isFree: true,
        imgPlaceholder: '[Placeholder Image 14]',
        res: '4K',
        format: 'VDB'
    },
];
