document.addEventListener('DOMContentLoaded', () => {
  // --- スムーススクロール ---
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = 80; // ヘッダーの高さ
        const offsetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- FAQ アコーディオン ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // 他のアイテムを閉じる（オプション）
      // faqItems.forEach(otherItem => {
      //   if (otherItem !== item) otherItem.classList.remove('active');
      // });
      
      item.classList.toggle('active');
    });
  });

  // --- スクロール時フェードインアニメーション ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // 一度表示されたら監視をやめる
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  // --- フォームバリデーション ---
  const form = document.getElementById('trial-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required]');
      
      inputs.forEach(input => {
        const errorMsg = input.nextElementSibling;
        
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#dc3545';
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'block';
          }
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          isValid = false;
          input.style.borderColor = '#dc3545';
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.innerText = '有効なメールアドレスを入力してください';
            errorMsg.style.display = 'block';
          }
        } else {
          input.style.borderColor = '#EEEEEE';
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'none';
          }
        }
      });

      if (isValid) {
        alert('お問い合わせありがとうございます。担当者より改めてご連絡いたします。');
        form.reset();
      }
    });

    // 入力時にエラーを消す
    form.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('input', () => {
        input.style.borderColor = '#EEEEEE';
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
          errorMsg.style.display = 'none';
        }
      });
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
