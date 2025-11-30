document.addEventListener('DOMContentLoaded', () => {
    // === 1. LOGIC SCROLL ANIMATION (FADE IN) ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Kích hoạt khi thấy 15% nội dung
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Nếu muốn hiệu ứng lặp lại mỗi lần scroll qua thì bỏ dòng unobserve
                // observer.unobserve(entry.target); 
            } else {
                // Tùy chọn: bỏ class này để fade-out khi scroll ngược lại
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // === 2. NAVIGATION ACTIVE STATE (UPDATED) ===
    const sections = document.querySelectorAll('section'); // Chỉ lấy các thẻ section chính
    const navLi = document.querySelectorAll('#nav li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Logic mới: Nếu cuộn quá 1/3 của section đó thì tính là đang xem section đó
            // scrollY + (chiều cao màn hình / 3) >= đỉnh của section
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        // Xử lý riêng: Nếu cuộn xuống cuối trang thì auto active phần Contact
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            current = 'contact';
        }

        navLi.forEach(a => {
            a.classList.remove('active');
            // So sánh href (VD: #about) với # + id (VD: #about)
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // === 3. MODAL LOGIC & PRICE CALCULATION ===
    const buyBtns = document.querySelectorAll('.js-buy-ticket');
    const modal = document.querySelector('.js-modal');
    const modalContainer = document.querySelector('.js-modal-container');
    const modalClose = document.querySelector('.js-modal-close');
    const modalCityName = document.getElementById('modal-city-name');
    
    // Logic tính giá
    const ticketQuantityInput = document.getElementById('ticket-quantity');
    const totalPriceDisplay = document.getElementById('total-price');
    const TICKET_PRICE = 200000;

    function showBuyTickets(location) {
        modalCityName.innerText = location || "";
        modal.classList.add('open');
    }

    function hideBuyTickets() {
        modal.classList.remove('open');
        // Reset form khi đóng
        ticketQuantityInput.value = '';
        totalPriceDisplay.innerText = '0';
    }

    // Lắng nghe click mở modal
    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const location = btn.getAttribute('data-location');
            showBuyTickets(location);
        });
    });

    // Lắng nghe click đóng modal
    modalClose.addEventListener('click', hideBuyTickets);
    modal.addEventListener('click', hideBuyTickets);
    modalContainer.addEventListener('click', (event) => event.stopPropagation());

    // Update giá tiền khi nhập số lượng
    ticketQuantityInput.addEventListener('input', (e) => {
        const qty = parseInt(e.target.value);
        if (qty > 0) {
            const total = qty * TICKET_PRICE;
            totalPriceDisplay.innerText = new Intl.NumberFormat('vi-VN').format(total);
        } else {
            totalPriceDisplay.innerText = '0';
        }
    });

    // Logic nút Booking trong Modal (Validation)
    const btnConfirmBooking = document.getElementById('buy-tickets');
    const dishInput = document.getElementById('ticket-dish');
    const emailInput = document.getElementById('ticket-email');

    btnConfirmBooking.addEventListener('click', () => {
        const qty = ticketQuantityInput.value;
        const dish = dishInput.value.trim();
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!qty || !dish || !email) {
            alert('Please fill all fields!');
            return;
        }

        if (qty <= 0) {
            alert('Invalid quantity!');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Invalid Email address!');
            return;
        }

        alert(`Booking Fill Successfully!\nVé sẽ được gửi tới: ${email}\nTổng tiền: ${totalPriceDisplay.innerText} VND`);
        hideBuyTickets();
    });

    // === 4. CONTACT FORM VALIDATION ===
    const contactForm = document.getElementById('contactForm');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactMessage = document.getElementById('contactMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            alert('Please fill all fields in contact form!');
        } else if (!emailRegex.test(email)) {
            alert('Invalid contact email!');
        } else {
            alert('Fill Successfully! We will contact you soon.');
            contactForm.reset();
        }
    });

    // === 5. RANDOM MIX COLOR BUTTON ===
    const randomBtn = document.getElementById('random-color-btn');
    const colors = ['#edd0ac', '#fbc3b9', '#f1745e', '#3fa3a0', '#e9b4a6', '#d8a48f', '#6c5b7b'];
    
    randomBtn.addEventListener('click', () => {
        // Trộn mảng màu
        const shuffled = colors.sort(() => 0.5 - Math.random());
        const root = document.documentElement;

        // Gán màu ngẫu nhiên cho các biến CSS
        root.style.setProperty('--primary-color', shuffled[0]);
        root.style.setProperty('--bg-color-1', shuffled[1]);
        root.style.setProperty('--bg-color-2', shuffled[2]);
        root.style.setProperty('--footer-color', shuffled[3]);
    });
});